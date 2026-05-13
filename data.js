var MAPTILER_KEY = "AhQ10drEx79exZrx0qNv";

var CATEGORIES = {
  "administration": { label: "Administration", color: "#1E3A5F" },
  "culture":        { label: "Culture",        color: "#1D4ED8" },
  "sport":          { label: "Sport",           color: "#15803D" },
  "nature":         { label: "Nature",          color: "#4D7C0F" },
  "technique":      { label: "Technique",       color: "#475569" },
  "social":         { label: "Social",          color: "#B45309" },
  "infrastructure": { label: "Infrastructure",  color: "#6D28D9" }
};

/*
  SOURCE UNIQUE : document officiel "BATIMENTS FERRIÈRES-EN-BRIE" (PDF fourni).
  Coordonnées GPS : liste fournie par la commune.
  Règle absolue : aucune information inventée, extrapolée ou supposée.
  Champ null = non renseigné ou absent dans le document source.
  "--" ou "-" dans le PDF = null dans ce fichier.
  Pour ajouter une photo : renseigner photoData avec une chaîne base64
  "data:image/jpeg;base64,..." — visible pour tous les visiteurs.
*/

var BATIMENTS = [

  /* ── GPS #1 ─────────────────────────────────────────────── */
  {
    id: "salle-rothschild",
    nom: "Salle Rothschild",
    categorie: "administration",
    adresse: "Av. Jean Jaurès, Ferrières-en-Brie",
    lat: 48.82157462254268, lng: 2.7045034945885544,
    photoData: null,
    capacite: "50 personnes",
    etages: "2 étages",
    pmr: "Oui", ascenseur: "Oui", parking: "Oui", transports: "Oui",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Oui",
    sonorisation: "Oui", cuisine: "Oui", chauffage: "Oui", climatisation: "Non",
    associations: null,
    jours: null,
    activites: "Réunion, formation, conseil municipal",
    evenements: null,
    etat: "RAS",
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #2 ─────────────────────────────────────────────── */
  {
    id: "salle-saint-remy",
    nom: "Salle Saint-Rémy",
    categorie: "culture",
    adresse: "3 Place Auguste Trézy, Ferrières-en-Brie",
    lat: 48.82112062643225, lng: 2.7037958312694776,
    photoData: null,
    capacite: "30 personnes",
    etages: null,
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: null, cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Phenomen'danse, Lusitanos, Son d'histoire et cours de Pastel",
    jours: "Du lundi au dimanche",
    activites: null,
    evenements: null,
    etat: "Moyen",
    travaux_recents: "Aucun",
    travaux_a_prevoir: "Mur"
  },

  /* ── GPS #3 ─────────────────────────────────────────────── */
  {
    id: "salle-des-fetes",
    nom: "Salle des Fêtes",
    categorie: "culture",
    adresse: "Rue Maryse Bastié, Ferrières-en-Brie",
    lat: 48.82224738111118, lng: 2.703495604599944,
    photoData: null,
    capacite: "150 personnes",
    etages: null,
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Oui (agents uniquement)", telephone: "Non", videoprojecteur: "Oui",
    sonorisation: "Sur demande", cuisine: "Oui", chauffage: "Oui", climatisation: "Non",
    associations: "ADF, Viet vodao, USDF, Jardin enchanté et Ecole",
    jours: "Du lundi au dimanche",
    activites: null,
    evenements: null,
    etat: "Moyen",
    travaux_recents: "Wifi",
    travaux_a_prevoir: "En totalité"
  },

  /* ── GPS #4 ─────────────────────────────────────────────── */
  {
    id: "modulaire",
    nom: "Le Modulaire",
    categorie: "technique",
    adresse: "Place Verdun, Ferrières-en-Brie",
    lat: 48.82234738111118, lng: 2.703595604599944,
    photoData: null,
    capacite: "20 personnes",
    etages: null,
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: "Sur demande", cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Ecole et syndic",
    jours: null,
    activites: "Réunion, formation",
    evenements: null,
    etat: "RAS",
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #5 ─────────────────────────────────────────────── */
  {
    id: "salle-trezy",
    nom: "Salle Trézy",
    categorie: "culture",
    adresse: "Rue Jean Jaurès, Ferrières-en-Brie",
    lat: 48.82129198504133, lng: 2.7047645063731216,
    photoData: null,
    capacite: "30 personnes",
    etages: "1 étage",
    pmr: "Oui", ascenseur: "Oui", parking: "Oui", transports: "Oui",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Oui",
    sonorisation: "Sur demande", cuisine: "Oui", chauffage: "Oui", climatisation: "Oui",
    associations: "Sur demande",
    jours: null,
    activites: null,
    evenements: null,
    etat: "RAS",
    travaux_recents: "Cuisine",
    travaux_a_prevoir: null
  },

  /* ── GPS #6 ─────────────────────────────────────────────── */
  {
    id: "salle-des-mariages",
    nom: "Salle des Mariages",
    categorie: "culture",
    adresse: "Av. Jean Jaurès, Ferrières-en-Brie",
    lat: 48.82139198504133, lng: 2.7048645063731216,
    photoData: null,
    capacite: "40 personnes",
    etages: "1 étage",
    pmr: "Oui", ascenseur: "Oui", parking: "Oui", transports: "Non",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Non",
    sonorisation: "Oui", cuisine: "Oui", chauffage: "Oui", climatisation: "Oui",
    associations: null,
    jours: null,
    activites: "Mariages",
    evenements: null,
    etat: "RAS",
    travaux_recents: "Cuisine",
    travaux_a_prevoir: null
  },

  /* ── GPS #7 ─────────────────────────────────────────────── */
  {
    id: "maison-de-la-nature",
    nom: "Maison de la Nature",
    categorie: "nature",
    adresse: "3 Allée du Château, Ferrières-en-Brie",
    lat: 48.81854716539286, lng: 2.721547044824098,
    photoData: null,
    capacite: "50 personnes",
    etages: null,
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Non",
    sonorisation: null, cuisine: "Oui", chauffage: "Oui", climatisation: null,
    associations: null,
    jours: null,
    activites: null,
    evenements: "Manifestations Marne et Gondoire",
    etat: "RAS",
    travaux_recents: "RAS",
    travaux_a_prevoir: "RAS"
  },

  /* ── GPS #8 ─────────────────────────────────────────────── */
  {
    id: "bulle-de-tennis",
    nom: "Bulle de Tennis",
    categorie: "sport",
    adresse: "Allée de la Taffarette, Ferrières-en-Brie",
    lat: 48.819888023494, lng: 2.6949069456523755,
    photoData: null,
    capacite: "4 personnes",
    etages: null,
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: "Non", cuisine: "Non", chauffage: "Non", climatisation: "Non",
    associations: "Tennis Club",
    jours: "Du lundi au dimanche",
    activites: "Tennis",
    evenements: null,
    etat: "RAS",
    travaux_recents: "Eclairage LED et serrure",
    travaux_a_prevoir: "Changement de la bulle"
  },

  /* ── GPS #9 — CTM1 ──────────────────────────────────────── */
  {
    id: "service-technique-ctm1",
    nom: "Service Technique (CTM1)",
    categorie: "technique",
    adresse: "1 rue Charles Cordier, Ferrières-en-Brie",
    lat: 48.82592639926443, lng: 2.7163507979906174,
    photoData: null,
    capacite: null,
    etages: "1 étage",
    pmr: "Non", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Non",
    sonorisation: "Non", cuisine: "Oui", chauffage: "Oui", climatisation: "Non",
    associations: "Non",
    jours: null,
    activites: null,
    evenements: null,
    etat: "RAS",
    travaux_recents: "Cuisine",
    travaux_a_prevoir: "Éclairage"
  },

  /* ── GPS #10 ────────────────────────────────────────────── */
  {
    id: "salle-leonard",
    nom: "Salle Léonard de Vinci",
    categorie: "culture",
    adresse: "Av. de Paris, Ferrières-en-Brie",
    lat: 48.82578342705441, lng: 2.703882512036084,
    photoData: null,
    capacite: "30 personnes",
    etages: "1 étage",
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Non", telephone: "Oui", videoprojecteur: "Non",
    sonorisation: "Sur demande", cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Ping-pong, Ours hibou, Entract, Sons d'histoire et Poker",
    jours: null,
    activites: null,
    evenements: "Manifestations officielles",
    etat: "RAS",
    travaux_recents: "Cuisine",
    travaux_a_prevoir: null
  },

  /* ── GPS #11 ────────────────────────────────────────────── */
  {
    id: "kiosque",
    nom: "Le Kiosque",
    categorie: "nature",
    adresse: "Place Auguste Trézy, Ferrières-en-Brie",
    lat: 48.82071152305836, lng: 2.7034540782217116,
    photoData: null,
    capacite: "0 personne",
    etages: null,
    pmr: "Non", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: "Sur demande", cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Les Amis de la Taffarette",
    jours: "Du lundi au dimanche",
    activites: "Stockage",
    evenements: "Pêche",
    etat: "Moyen",
    travaux_recents: "Aucun",
    travaux_a_prevoir: "Aucun"
  },

  /* ── GPS #12 ────────────────────────────────────────────── */
  {
    id: "lavoir",
    nom: "Le Lavoir",
    categorie: "nature",
    adresse: "Rue Jean Jaurès, Ferrières-en-Brie",
    lat: 48.822159310761165, lng: 2.699754626238832,
    photoData: null,
    capacite: null,
    etages: null,
    pmr: "Non", ascenseur: null, parking: "Non", transports: "Non",
    wifi: "Non", telephone: "Non", videoprojecteur: null,
    sonorisation: null, cuisine: "Non", chauffage: "Non", climatisation: "Non",
    associations: null,
    jours: null,
    activites: null,
    evenements: null,
    etat: null,
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #13 ────────────────────────────────────────────── */
  {
    id: "presbytere",
    nom: "Le Presbytère",
    categorie: "culture",
    adresse: "2 Pl. Auguste Trézy, Ferrières-en-Brie",
    lat: 48.82111040446145, lng: 2.704497749017735,
    photoData: null,
    capacite: "30 personnes",
    etages: "1 étage",
    pmr: "Oui (RDC)", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Oui",
    sonorisation: "Sur demande", cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Sur demande",
    jours: null,
    activites: "Réunion, formation",
    evenements: null,
    etat: "RAS",
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #14 — CTM2 ─────────────────────────────────────── */
  {
    id: "service-technique-ctm2",
    nom: "Service Technique (CTM2)",
    categorie: "technique",
    adresse: "13 avenue Paxton, Ferrières-en-Brie",
    lat: 48.8257513164453, lng: 2.7168265000639265,
    photoData: null,
    capacite: null,
    etages: "1 étage",
    pmr: "Non", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: "Non", cuisine: "Non", chauffage: "Non", climatisation: "Non",
    associations: null,
    jours: null,
    activites: null,
    evenements: null,
    etat: "Bon état",
    travaux_recents: "Aucun",
    travaux_a_prevoir: "Eclairage"
  },

  /* ── GPS #15 ────────────────────────────────────────────── */
  {
    id: "salle-ginkgo",
    nom: "Salle Ginkgo",
    categorie: "social",
    adresse: "3 Rue du Général de Gaulle, Ferrières-en-Brie",
    lat: 48.82201482885651, lng: 2.706793154522755,
    photoData: null,
    capacite: "30 personnes",
    etages: "0 étage",
    pmr: "Oui", ascenseur: "Non", parking: "Non", transports: "Non",
    wifi: "Oui", telephone: "Oui", videoprojecteur: "Télévision",
    sonorisation: "Sur demande", cuisine: "Oui", chauffage: "Oui", climatisation: "Non",
    associations: "Ginkgo Club",
    jours: "Du lundi au vendredi",
    activites: "Récréatives et sportives",
    evenements: null,
    etat: "Vétuste",
    travaux_recents: null,
    travaux_a_prevoir: "L'ensemble"
  },

  /* ── GPS #16 ────────────────────────────────────────────── */
  {
    id: "maison-accueil",
    nom: "Maison d'Accueil Provisoire",
    categorie: "social",
    adresse: "Rue Jean Jaurès, Ferrières-en-Brie",
    lat: 48.821894516339746, lng: 2.703837128674898,
    photoData: null,
    capacite: "4 personnes",
    etages: "1 étage",
    pmr: "Non", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: null, telephone: null, videoprojecteur: null,
    sonorisation: null, cuisine: "Oui", chauffage: "Oui", climatisation: "Non",
    associations: null,
    jours: null,
    activites: null,
    evenements: null,
    etat: null,
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #17 ────────────────────────────────────────────── */
  {
    id: "dojo",
    nom: "Le Dojo",
    categorie: "sport",
    adresse: "396 route de la Brosse, Ferrières-en-Brie",
    lat: 48.82321853695472, lng: 2.699041197568539,
    photoData: null,
    capacite: "50 personnes",
    etages: "0 étage",
    pmr: "Oui", ascenseur: "Non", parking: "Oui", transports: "Non",
    wifi: "Non", telephone: "Oui", videoprojecteur: "Non",
    sonorisation: "Non", cuisine: "Oui", chauffage: "Oui", climatisation: "Oui",
    associations: "Ecole, Judo Club et Pilates",
    jours: "Du lundi au dimanche",
    activites: "Sport",
    evenements: null,
    etat: "RAS",
    travaux_recents: "Pompe à chaleur",
    travaux_a_prevoir: null
  },

  /* ── GPS #18 ────────────────────────────────────────────── */
  {
    id: "meal-repas",
    nom: "Salle Meal Repas",
    categorie: "social",
    adresse: "3 Place Auguste Trézy, Ferrières-en-Brie",
    lat: 48.821208526478905, lng: 2.7038969084203717,
    photoData: null,
    capacite: null,
    etages: "0 étage",
    pmr: "Non", ascenseur: "Non", parking: "Oui", transports: "Oui",
    wifi: "Non", telephone: "Non", videoprojecteur: "Non",
    sonorisation: "Sur demande", cuisine: "Non", chauffage: "Oui", climatisation: "Non",
    associations: "Meal Repas",
    jours: "Jeudi",
    activites: null,
    evenements: null,
    etat: "Moyen",
    travaux_recents: "Aucun",
    travaux_a_prevoir: "Aucun"
  },

  /* ── GPS #19 ────────────────────────────────────────────── */
  {
    id: "la-poste",
    nom: "La Poste",
    categorie: "administration",
    adresse: "Rue Jean Jaurès, Ferrières-en-Brie",
    lat: 48.82096804126956, lng: 2.7056198557389313,
    photoData: null,
    capacite: null,
    etages: "1 étage",
    pmr: "Non", ascenseur: null, parking: "Non", transports: "Non",
    wifi: null, telephone: "Oui", videoprojecteur: null,
    sonorisation: null, cuisine: "Oui", chauffage: "Oui", climatisation: null,
    associations: null,
    jours: null,
    activites: "La Poste",
    evenements: null,
    etat: null,
    travaux_recents: null,
    travaux_a_prevoir: null
  },

  /* ── GPS #20 ────────────────────────────────────────────── */
  {
    id: "chateau-eau",
    nom: "Château d'Eau",
    categorie: "infrastructure",
    adresse: "All. du Château d'eau, Ferrières-en-Brie",
    lat: 48.82146351197768, lng: 2.7237055348700334,
    photoData: null,
    capacite: null,
    etages: null,
    pmr: "Non", ascenseur: "Non", parking: "Non", transports: "Non",
    wifi: "Non", telephone: "Non", videoprojecteur: null,
    sonorisation: null, cuisine: null, chauffage: null, climatisation: null,
    associations: null,
    jours: null,
    activites: "Réserve tampon",
    evenements: null,
    etat: "RAS",
    travaux_recents: null,
    travaux_a_prevoir: null
  }

];
