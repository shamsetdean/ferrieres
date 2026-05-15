/* ══════════════════════════════════════════════════════════
   FERRIÈRES — APP LOGIC
   Logique inchangée par rapport à l'original.
   Si MAPTILER_KEY est vide, on rend une carte SVG de secours.
══════════════════════════════════════════════════════════ */

var PHOTO_DIR = "./photos/";

function getPhotoUrl(b){ return b.photo ? PHOTO_DIR + b.photo : null; }

var CAT_CFG = {
  "administration":   {icon:"ti-building"},
  "services-mun":     {icon:"ti-tool"},
  "associations":     {icon:"ti-users"},
  "evenements":       {icon:"ti-calendar-event"},
  "sport":            {icon:"ti-run"},
  "culture":          {icon:"ti-music"},
  "environnement":    {icon:"ti-leaf"},
  "patrimoine":       {icon:"ti-arch"},
  "ceremonies":       {icon:"ti-rings"},
  "social":           {icon:"ti-heart"},
  "seniors":          {icon:"ti-armchair"},
  "services-publics": {icon:"ti-mail"},
  "infrastructure":   {icon:"ti-droplet"},
  "education":        {icon:"ti-school"}
};

var SUPER = [
  {id:"all",   label:"Tout",                    cats:null,         icon:"ti-layout-grid"},
  {id:"mairie",label:"Mairie & Services",       cats:["administration","services-mun","ceremonies","education"],icon:"ti-building"},
  {id:"assoc", label:"Culture",                 cats:["associations","evenements","culture","seniors"],icon:"ti-music"},
  {id:"sport", label:"Sport",                   cats:["sport"],    icon:"ti-run"},
  {id:"social",label:"Social",                  cats:["social"],   icon:"ti-heart"},
  {id:"nature",label:"Nature & Patrimoine",     cats:["services-publics","infrastructure","environnement","patrimoine"],icon:"ti-leaf"}
];

function catIcon(c){return (CAT_CFG[c]||{icon:"ti-building"}).icon;}

/* Icône(s) d'un bâtiment — priorité au champ b.icon sur la catégorie */
function buildingIcon(b){
  return (b && b.icon) ? b.icon.split(' ')[0] : catIcon(b.categorie);
}
/* Rendu HTML des icônes (1 ou 2) dans une pastille */
function buildingIconsHTML(b){
  if(!b || !b.icon) return '<i class="ti '+catIcon(b.categorie)+'" aria-hidden="true"></i>';
  var icons = b.icon.split(' ');
  if(icons.length===1) return '<i class="ti '+icons[0]+'" aria-hidden="true"></i>';
  /* Double icône : deux <i> superposés en minuscule */
  return icons.map(function(ic,idx){
    return '<i class="ti '+ic+'" aria-hidden="true" style="font-size:'+(idx===0?'14px':'11px')+';'+(idx===1?'margin-left:2px':'')+'"></i>';
  }).join('');
}
function catColor(c){return (CATEGORIES[c]||{color:"#8E6628"}).color;}
function catLabel(c){return (CATEGORIES[c]||{label:c}).label;}
function superOf(b){for(var i=1;i<SUPER.length;i++){if(SUPER[i].cats.indexOf(b.categorie)>=0)return SUPER[i].id;}return "all";}
function skip(v){return v===null||v===undefined||v===""||v==="--"||v==="-";}

function hav(a,b,c,d){
  var R=6371000, dl=(c-a)*Math.PI/180, dn=(d-b)*Math.PI/180,
      x=Math.sin(dl/2)*Math.sin(dl/2)+Math.cos(a*Math.PI/180)*Math.cos(c*Math.PI/180)*Math.sin(dn/2)*Math.sin(dn/2);
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
function fd(m){return m<1000?Math.round(m)+" m":(m/1000).toFixed(1)+" km";}
function toast(msg){var t=document.getElementById("toast");t.textContent=msg;t.classList.add("on");setTimeout(function(){t.classList.remove("on");},2800);}

var S = {map:null, useFallback:false, uMk:null, watchId:null, lat:null, lng:null, filter:"all", cur:null, curIdx:0, pins:{}};

/* ── BOUNDS de Ferrières (approx du fichier original) ── */
var BBOX = {minLng:2.640, minLat:48.790, maxLng:2.790, maxLat:48.860};
/* Bbox plus serré pour les batiments réels */
var BBOX_FOCUS = {minLng:2.700, minLat:48.815, maxLng:2.715, maxLat:48.826};

/* ────────────────────────────────────────────────
   FALLBACK MAP (rendu SVG quand pas de MapTiler)
──────────────────────────────────────────────── */
function buildFallbackMap(){
  S.useFallback = true;
  var map = document.getElementById("map");
  map.innerHTML = '<div id="fallback-map">'+
    '<div class="fm-grid"></div>'+
    /* Courbes de niveau topo (effet 2D) */
    '<div class="fm-contours">'+
      '<svg viewBox="0 0 1000 700" preserveAspectRatio="none">'+
        '<path d="M 100 350 Q 300 250 500 320 T 900 360" />'+
        '<path d="M  80 380 Q 300 280 510 350 T 920 390" />'+
        '<path d="M  60 410 Q 300 310 520 380 T 940 420" />'+
        '<path d="M  40 450 Q 300 350 530 420 T 960 460" />'+
        '<path d="M 380 180 Q 420 240 470 260 T 580 320 T 620 420" />'+
        '<path d="M 340 160 Q 400 220 460 240 T 590 320 T 650 440" />'+
        '<path d="M 760 100 Q 820 200 830 320 T 800 540" />'+
        '<path d="M 790 110 Q 850 210 860 320 T 830 560" />'+
      '</svg>'+
    '</div>'+
    /* Routes */
    '<div class="fm-roads">'+
      '<svg viewBox="0 0 1000 700" preserveAspectRatio="none">'+
        '<path d="M -50 200 Q 250 180 500 240 T 1050 280" />'+
        '<path d="M -50 480 Q 300 460 600 500 T 1050 540" />'+
        '<path d="M 200 -50 Q 220 200 280 380 T 350 750" />'+
        '<path d="M 700 -50 Q 680 200 720 380 T 760 750" class="thin" />'+
        '<path d="M 450 -50 Q 460 250 480 480 T 510 750" class="thin" />'+
        '<path d="M -50 350 Q 200 340 500 360 T 1050 370" class="thin" />'+
      '</svg>'+
    '</div>'+
    /* Plans d'eau / b\u00e2tis */
    '<div class="fm-water" style="width:180px;height:140px;left:78%;top:62%;"></div>'+
    '<div class="fm-water" style="width:90px;height:70px;left:8%;top:18%;"></div>'+
    /* B\u00e2tis g\u00e9n\u00e9riques (effet plan 2D) */
    '<div class="fm-block" style="width:60px;height:40px;left:22%;top:32%;"></div>'+
    '<div class="fm-block" style="width:38px;height:28px;left:30%;top:28%;"></div>'+
    '<div class="fm-block" style="width:80px;height:50px;left:48%;top:48%;"></div>'+
    '<div class="fm-block" style="width:45px;height:35px;left:55%;top:46%;"></div>'+
    '<div class="fm-block" style="width:55px;height:32px;left:42%;top:56%;"></div>'+
    '<div class="fm-block" style="width:70px;height:42px;left:65%;top:32%;"></div>'+
    '<div class="fm-block" style="width:35px;height:25px;left:18%;top:62%;"></div>'+
    '<div class="fm-block" style="width:90px;height:55px;left:8%;top:52%;"></div>'+
    /* Labels */
    '<div class="fm-label" style="left:8%;top:8%;">Bois</div>'+
    '<div class="fm-label" style="left:78%;top:80%;">Étang</div>'+
    '<div class="fm-label" style="left:35%;top:45%;">Centre</div>'+
    '<div class="fm-label" style="left:60%;top:18%;">Plateau</div>'+
  '</div>';
  renderFallbackPins();
}
function projectFallback(lat, lng, container){
  var rect = container.getBoundingClientRect();
  var x = (lng - BBOX_FOCUS.minLng) / (BBOX_FOCUS.maxLng - BBOX_FOCUS.minLng);
  var y = 1 - (lat - BBOX_FOCUS.minLat) / (BBOX_FOCUS.maxLat - BBOX_FOCUS.minLat);
  /* margins */
  x = 0.08 + x * 0.84;
  y = 0.08 + y * 0.84;
  return {x: x * rect.width, y: y * rect.height};
}
function renderFallbackPins(){
  var fb = document.getElementById("fallback-map");
  if(!fb) return;
  /* clear old pins */
  fb.querySelectorAll(".pin").forEach(function(p){p.remove();});
  S.pins = {};
  var filtered = getFiltered();
  filtered.forEach(function(b){
    var pos = projectFallback(b.lat, b.lng, fb);
    var pin = document.createElement("div");
    pin.className = "pin";
    pin.style.left = pos.x + "px";
    pin.style.top = pos.y + "px";
    pin.style.setProperty("--c", catColor(b.categorie));
    pin.innerHTML =
      '<div class="pin-pill">'+buildingIconsHTML(b)+'</div>'+
      '<div class="pin-tail"></div>'+
      '<div class="pin-label">'+b.nom+'</div>';
    pin.onclick = function(e){e.stopPropagation();openDetail(b.id);};
    fb.appendChild(pin);
    S.pins[b.id] = pin;
  });
}

/* ────────────────────────────────────────────────
   MAPTILER (si clé fournie)
──────────────────────────────────────────────── */
function initMapTiler(){
  if(!window.maptilersdk) return false;
  maptilersdk.config.apiKey = MAPTILER_KEY;
  S.map = new maptilersdk.Map({
    container:"map",
    style:"https://api.maptiler.com/maps/streets-v2/style.json?key="+MAPTILER_KEY,
    center:[2.7050,48.8215], zoom:14.8,
    attributionControl:false, navigationControl:false,
    maxBounds:[2.640,48.790,2.790,48.860]
  });
  /* Éviter les warnings "Image X could not be loaded" */
  S.map.on("styleimagemissing",function(e){
    try{var c=document.createElement("canvas");c.width=2;c.height=2;
      var id=c.getContext("2d").getImageData(0,0,2,2);
      S.map.addImage(e.id,{data:id.data,width:2,height:2});}catch(err){}
  });
  S.map.on("load", function(){
    (S.map.getStyle().layers||[]).forEach(function(l){
      if(l.type==="symbol"){try{S.map.setLayoutProperty(l.id,"visibility","none");}catch(e){}}
    });
    renderMaptilerPins();
  });
  return true;
}
function renderMaptilerPins(){
  /* purge old */
  Object.values(S.pins).forEach(function(m){if(m.remove)m.remove();});
  S.pins = {};
  getFiltered().forEach(function(b){
    var el = document.createElement("div");
    el.className = "pin";
    el.style.setProperty("--c", catColor(b.categorie));
    el.innerHTML =
      '<div class="pin-pill">'+buildingIconsHTML(b)+'</div>'+
      '<div class="pin-tail"></div>'+
      '<div class="pin-label">'+b.nom+'</div>';
    el.onclick = function(e){e.stopPropagation();openDetail(b.id);};
    var mk = new maptilersdk.Marker({element:el, anchor:"bottom"}).setLngLat([b.lng,b.lat]).addTo(S.map);
    S.pins[b.id] = mk;
  });
}

function initMap(){
  if(MAPTILER_KEY && window.maptilersdk){
    if(initMapTiler()) return;
  }
  buildFallbackMap();
}

function refreshPins(){
  if(S.useFallback) renderFallbackPins();
  else renderMaptilerPins();
}

function highlightPin(id){
  Object.entries(S.pins).forEach(function(kv){
    var el = S.useFallback ? kv[1] : kv[1].getElement();
    el.classList.toggle("sel", kv[0]===id);
  });
}

/* ────────────────────────────────────────────────
   FILTER RAIL (mobile)
──────────────────────────────────────────────── */
function buildRail(){
  var r = document.getElementById("filt-rail"); r.innerHTML = "";
  SUPER.forEach(function(sf){
    var btn = document.createElement("button");
    btn.className = "fr-btn" + (S.filter===sf.id?" on":"");
    btn.dataset.cat = sf.id;
    btn.innerHTML = '<i class="ti '+sf.icon+'" aria-hidden="true"></i>'+
                    '<span class="fr-tip">'+sf.label+'</span>';
    btn.onclick = function(){setFilter(sf.id);};
    r.appendChild(btn);
  });
}

function setFilter(cat){
  S.filter = cat;
  document.querySelectorAll(".fr-btn").forEach(function(b){b.classList.toggle("on", b.dataset.cat===cat);});
  document.querySelectorAll(".dpf").forEach(function(p){p.classList.toggle("on", p.dataset.cat===cat);});
  refreshPins();
  buildShelf();
  buildDpList();
}

function getFiltered(){
  var out = BATIMENTS.filter(function(b){return S.filter==="all" || superOf(b)===S.filter;});
  if(S.lat !== null) out.sort(function(a,b){return hav(S.lat,S.lng,a.lat,a.lng) - hav(S.lat,S.lng,b.lat,b.lng);});
  return out;
}

/* ────────────────────────────────────────────────
   SHELF (mobile)
──────────────────────────────────────────────── */
function buildShelf(){
  var c = document.getElementById("shelf-cards");
  var f = getFiltered();
  c.innerHTML = "";
  f.forEach(function(b,i){
    var card = document.createElement("div");
    card.className = "sh-card" + (S.cur && S.cur.id===b.id ? " sel" : "");
    card.style.animationDelay = (i*0.04)+"s";
    card.style.setProperty("--c", catColor(b.categorie));
    var cap = b.capacite && b.capacite !== "0 personne" ? b.capacite : null;
    var dist = S.lat!==null ? fd(hav(S.lat,S.lng,b.lat,b.lng)) : null;
    var url = getPhotoUrl(b);
    card.innerHTML =
      '<div class="sh-photo">'+
        '<div class="sh-photo-cat"><span class="dot"></span>'+catLabel(b.categorie)+'</div>'+
        (url
          ? '<img class="sh-photo-img" src="'+url+'" alt="'+b.nom+'" loading="lazy"'+
            ' style="opacity:0;transition:opacity .3s;" onload="this.style.opacity=1"'+
            ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">'+ 
            '<div class="sh-photo-ph" style="display:none;position:absolute;inset:0;">'+buildingIconsHTML(b)+'</div>'
          : '<div class="sh-photo-ph">'+buildingIconsHTML(b)+'</div>'
        )+
      '</div>'+
      '<div class="sh-body">'+
        '<div class="sh-name">'+b.nom+'</div>'+
        '<div class="sh-meta">'+
          (cap ? '<span class="cap"><i class="ti ti-users" aria-hidden="true"></i>'+cap+'</span>' : '<span>—</span>')+
          (dist ? '<span class="dot"></span><span>'+dist+'</span>' : '')+
        '</div>'+
      '</div>';
    card.onclick = function(){openDetail(b.id);};
    c.appendChild(card);
  });
}

/* ────────────────────────────────────────────────
   DETAIL
──────────────────────────────────────────────── */
function infoHTML(b){
  function row(l, v){if(skip(v))return "";
    return '<div class="det-row"><div class="det-row-label">'+l+'</div><div class="det-row-value">'+v+'</div></div>';
  }
  function link(l, v, prefix){if(skip(v))return "";
    return '<div class="det-row"><div class="det-row-label">'+l+'</div><div class="det-row-value"><a href="'+(prefix||"")+v+'">'+v.replace(/^https?:\/\/(www\.)?/,"")+'</a></div></div>';
  }

  var pratique = row("Adresse", b.adresse) + row("Horaires", b.horaires) +
                 (b.capacite && b.capacite!=="0 personne" ? row("Capacité", b.capacite) : "") +
                 row("Public concerné", b.public);

  var contact = "";
  if(b.contact)   contact += '<div class="det-row"><div class="det-row-label">Email</div><div class="det-row-value"><a href="mailto:'+b.contact+'">'+b.contact+'</a></div></div>';
  if(b.telephone) contact += '<div class="det-row"><div class="det-row-label">Téléphone</div><div class="det-row-value"><a href="tel:'+b.telephone+'">'+b.telephone+'</a></div></div>';
  if(b.site)      contact += link("Site web", b.site, "");

  var eq = [];
  if(b.wifi && b.wifi!=="Non") eq.push(b.wifi==="Oui"?"Wi-Fi":"Wi-Fi ("+b.wifi+")");
  if(b.sonorisation && b.sonorisation!=="Non") eq.push("Sonorisation");
  if(b.videoprojecteur && b.videoprojecteur!=="Non") eq.push("Vidéoprojecteur");
  if(b.cuisine==="Oui") eq.push("Cuisine");
  if(b.chauffage==="Oui") eq.push("Chauffage");
  if(b.climatisation==="Oui") eq.push("Climatisation");

  var acc = [];
  if(!skip(b.pmr)) acc.push("PMR : "+b.pmr);
  if(!skip(b.parking)) acc.push("Parking : "+b.parking);

  var equipments = "";
  if(eq.length || acc.length){
    equipments = '<div class="det-card">'+
      (acc.length ? '<div class="det-row"><div class="det-row-label">Accessibilité</div><div class="det-row-value">'+acc.join(" · ")+'</div></div>' : '')+
      (eq.length  ? '<div class="det-row"><div class="det-row-label">Équipements</div><div class="det-chips">'+eq.map(function(e){return '<span class="det-chip">'+e+'</span>';}).join("")+'</div></div>' : '')+
    '</div>';
  }

  var etat = "";
  if(!skip(b.etat)){
    var cls = b.etat==="Bon état"||b.etat==="RAS" ? "ok" : (b.etat==="Moyen" ? "mid" : "bad");
    etat += '<div class="det-row"><div class="det-row-label">État général</div><div class="det-row-value"><span class="det-badge '+cls+'">'+b.etat+'</span></div></div>';
  }
  if(!skip(b.travaux_a_prevoir) && b.travaux_a_prevoir!=="Aucun"){
    etat += '<div class="det-row"><div class="det-row-label">Travaux à prévoir</div><div class="det-row-value">'+b.travaux_a_prevoir+'</div></div>';
  }
  var etatCard = etat ? '<div class="det-card">'+etat+'</div>' : "";

  var html = "";
  if(b.description) html += '<div class="det-section">'+
    '<div class="det-section-eyebrow">À propos</div>'+
    '<div class="det-card"><div class="det-desc">'+b.description+'</div></div>'+
  '</div>';

  if(pratique) html += '<div class="det-section">'+
    '<div class="det-section-eyebrow">Informations pratiques</div>'+
    '<div class="det-card">'+pratique+'</div>'+
  '</div>';

  if(contact) html += '<div class="det-section">'+
    '<div class="det-section-eyebrow">Contact</div>'+
    '<div class="det-card">'+contact+'</div>'+
  '</div>';

  if(equipments) html += '<div class="det-section">'+
    '<div class="det-section-eyebrow">Équipements & accès</div>'+
    equipments+
  '</div>';

  if(etatCard) html += '<div class="det-section">'+
    '<div class="det-section-eyebrow">Patrimoine</div>'+
    etatCard+
  '</div>';

  return html;
}

function openDetail(id){
  var f = getFiltered(), b = null, idx = 0;
  for(var i=0;i<f.length;i++){if(f[i].id===id){b = f[i]; idx = i; break;}}
  if(!b){BATIMENTS.forEach(function(x){if(x.id===id) b = x;});if(!b)return;}
  S.cur = b; S.curIdx = idx;
  highlightPin(id);

  document.querySelectorAll(".sh-card").forEach(function(c,i){c.classList.toggle("sel", i===idx);});
  document.querySelectorAll(".dp-row").forEach(function(r){r.classList.toggle("sel", r.dataset.bid===id);});

  document.getElementById("det-title").textContent = b.nom;

  /* Hero */
  var hero = document.getElementById("det-hero");
  hero.style.setProperty("--c", catColor(b.categorie));
  var url = getPhotoUrl(b);
  hero.innerHTML =
    (url
      ? '<img class="dh-hero-img" src="'+url+'" alt="'+b.nom+'"'+
        ' onload="this.style.opacity=1"'+
        ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'"'+
        ' style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .35s;">'
      : '')+
    '<div class="dh-hero-ph"'+(url?' style="display:none"':'')+'>'+
      '<i class="ti '+buildingIcon(b)+'" aria-hidden="true"></i>'+
      '<span>Photo à venir · '+b.nom+'</span>'+
    '</div>'+
    '<div class="dh-hero-overlay">'+
      '<div class="dh-hero-cat"><span class="dot"></span>'+catLabel(b.categorie)+'</div>'+
    '</div>';

  document.getElementById("det-info").innerHTML = infoHTML(b);

  document.getElementById("det").classList.add("on");
}

function detNav(dir){
  var f = getFiltered();
  if(!f.length) return;
  var next = (S.curIdx + dir + f.length) % f.length;
  openDetail(f[next].id);
}

/* ────────────────────────────────────────────────
   DESKTOP PANEL
──────────────────────────────────────────────── */
function buildDpFilters(){
  var df = document.getElementById("dp-filt"); if(!df) return;
  df.innerHTML = SUPER.map(function(sf){
    return '<button class="dpf'+(S.filter===sf.id?" on":"")+'" data-cat="'+sf.id+'" onclick="setFilter(\''+sf.id+'\')">'+
           '<i class="ti '+sf.icon+'" aria-hidden="true"></i>'+sf.label+'</button>';
  }).join("");
}

function buildDpList(){
  var dl = document.getElementById("dp-list"); if(!dl) return;
  var f = getFiltered();
  dl.innerHTML = f.map(function(b){
    var dist = S.lat!==null ? '<span class="dp-row-dist">'+fd(hav(S.lat,S.lng,b.lat,b.lng))+'</span>' : '';
    var cap  = b.capacite && b.capacite!=="0 personne" ? b.capacite : "";
    return '<div class="dp-row" data-bid="'+b.id+'" onclick="openDetail(\''+b.id+'\')">'+
      '<div class="dp-row-thumb">'+
        '<i class="ti '+buildingIcon(b)+'" aria-hidden="true"></i>'+
        '<div class="dp-row-thumb-cat" style="background:'+catColor(b.categorie)+'"></div>'+
      '</div>'+
      '<div class="dp-row-body">'+
        '<div class="dp-row-name">'+b.nom+'</div>'+
        '<div class="dp-row-meta"><span>'+catLabel(b.categorie)+'</span>'+
          (cap ? '<span class="dot"></span><span>'+cap+'</span>' : '')+
        '</div>'+
      '</div>'+
      dist+
    '</div>';
  }).join("");
}

/* ── Triangle doré directionnel ── */
var TRI_SVG=
  '<svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">'+
    '<defs>'+
      '<linearGradient id="tg" x1="14" y1="0" x2="14" y2="34" gradientUnits="userSpaceOnUse">'+
        '<stop offset="0%" stop-color="#F0C866"/>'+
        '<stop offset="55%" stop-color="#C8963A"/>'+
        '<stop offset="100%" stop-color="#9A6E20"/>'+
      '</linearGradient>'+
      '<linearGradient id="tspec" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">'+
        '<stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>'+
        '<stop offset="100%" stop-color="rgba(255,255,255,0)"/>'+
      '</linearGradient>'+
    '</defs>'+
    '<polygon points="14,3 26,31 14,24 2,31" fill="rgba(0,0,0,0.18)" transform="translate(0,2)"/>'+
    '<polygon points="14,2 26,30 14,23 2,30" fill="url(#tg)" stroke="rgba(255,255,255,0.65)" stroke-width="1.2" stroke-linejoin="round"/>'+
    '<polygon points="14,4 23,26 14,20" fill="url(#tspec)"/>'+
  '</svg>';

function locateMe(){
  if(!navigator.geolocation){toast("Géolocalisation non disponible");return;}
  var btn=document.getElementById("btn-locate");
  btn.classList.add("on");
  if(S.watchId!==null){navigator.geolocation.clearWatch(S.watchId);S.watchId=null;}
  S.watchId=navigator.geolocation.watchPosition(
    function(p){
      S.lat=p.coords.latitude;S.lng=p.coords.longitude;
      var heading=p.coords.heading;
      if(!S.uMk){
        /* Marqueur HTML triangle */
        var el=document.createElement("div");
        el.style.cssText="position:relative;width:56px;height:56px;display:flex;align-items:center;justify-content:center;pointer-events:none;";
        el.innerHTML=
          '<div style="position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle,rgba(176,140,80,.16),rgba(176,140,80,.04));border:1px solid rgba(176,140,80,.22);animation:hpulse 3s ease-in-out infinite;"></div>'+
          '<div style="position:absolute;width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(176,140,80,.55);animation:hring 2.4s ease-out infinite;"></div>'+
          '<div class="user-tri" style="position:relative;z-index:2;filter:drop-shadow(0 0 8px rgba(176,140,80,.70)) drop-shadow(0 3px 10px rgba(176,140,80,.40)) drop-shadow(0 1px 3px rgba(0,0,0,.25));transition:transform .5s cubic-bezier(.32,.72,0,1);">'+TRI_SVG+'</div>';
        if(!document.getElementById("tri-kf")){
          var s=document.createElement("style");s.id="tri-kf";
          s.textContent='@keyframes hpulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.08);opacity:1}}@keyframes hring{0%{transform:scale(1);opacity:.6}80%{transform:scale(2);opacity:0}100%{transform:scale(2);opacity:0}}';
          document.head.appendChild(s);
        }
        if(S.useFallback){
          /* fallback : positionner le marqueur HTML dans la carte SVG */
          var fb=document.getElementById("fallback-map");
          if(fb){var pos=projectFallback(S.lat,S.lng,fb);el.style.position="absolute";el.style.left=(pos.x-28)+"px";el.style.top=(pos.y-28)+"px";fb.appendChild(el);S.uMk=el;}
        } else if(S.map&&window.maptilersdk){
          S.uMk=new maptilersdk.Marker({element:el,anchor:"center"}).setLngLat([S.lng,S.lat]).addTo(S.map);
        }
        if(S.map&&!S.useFallback)S.map.flyTo({center:[S.lng,S.lat],zoom:15,duration:900});
        toast("Position obtenue");
      } else {
        if(!S.useFallback&&S.uMk.setLngLat)S.uMk.setLngLat([S.lng,S.lat]);
      }
      /* Rotation selon le cap */
      var tri=document.querySelector(".user-tri");
      if(tri&&heading!==null&&heading!==undefined)tri.style.transform="rotate("+heading+"deg)";
      buildShelf();buildDpList();
    },
    function(){btn.classList.remove("on");toast("Position indisponible");},
    {enableHighAccuracy:true,timeout:10000,maximumAge:2000}
  );
}

/* ────────────────────────────────────────────────
   EVENTS
──────────────────────────────────────────────── */
document.getElementById("det-close").onclick = function(){
  document.getElementById("det").classList.remove("on");
  S.cur = null; highlightPin(null);
  document.querySelectorAll(".sh-card, .dp-row").forEach(function(c){c.classList.remove("sel");});
};
document.getElementById("det-prev").onclick = function(){detNav(-1);};
document.getElementById("det-next").onclick = function(){detNav(1);};
document.getElementById("btn-about").onclick = function(){document.getElementById("about").classList.add("on");};
document.getElementById("about-close").onclick = function(){document.getElementById("about").classList.remove("on");};
document.getElementById("btn-locate").onclick = locateMe;

window.setFilter = setFilter;
window.openDetail = openDetail;

/* Init */
buildRail();
buildShelf();
buildDpFilters();
buildDpList();
initMap();

/* Re-render pins on resize for fallback */
window.addEventListener("resize", function(){if(S.useFallback) renderFallbackPins();});
