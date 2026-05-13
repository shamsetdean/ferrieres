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
  PHOTOS — Comment ajouter une photo pour tous les visiteurs :
  Remplis le champ photoData avec une chaîne base64 :
  photoData: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
  La photo sera visible sur tous les appareils, sans serveur.

  Pour l'ajouter via l'appli (admin) : accès réservé à l'administrateur,
  stocké en localStorage sur l'appareil utilisé seulement.
*/

var BATIMENTS = [
  { id:"mairie-annexe",       nom:"Mairie Annexe",              categorie:"administration", lat:48.82157462254268,  lng:2.7045034945885544,  photoData:null, description:"Annexe administrative de la mairie de Ferrières-en-Brie.",    capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-saint-remy",    nom:"Salle Saint-Rémy",           categorie:"culture",        lat:48.82112062643225,  lng:2.7037958312694776,  photoData:null, description:"Salle polyvalente à usage culturel.",                         capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-des-fetes",     nom:"Salle des Fêtes",            categorie:"culture",        lat:48.82224738111118,  lng:2.703495604599944,   photoData:null, description:"Salle des fêtes communale.",                                  capacite:null, pmr:null, equipements:null, etat:null },
  { id:"modulaire",           nom:"Modulaire",                  categorie:"technique",      lat:48.82234738111118,  lng:2.703595604599944,   photoData:null, description:"Bâtiment modulaire communal.",                                capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-trezy",         nom:"Salle Auguste Trézy",        categorie:"culture",        lat:48.82129198504133,  lng:2.7047645063731216,  photoData:null, description:"Salle polyvalente Auguste Trézy.",                            capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-des-mariages",  nom:"Salle des Mariages",         categorie:"culture",        lat:48.82129198504133,  lng:2.7048645063731216,  photoData:null, description:"Salle des mariages — même bâtiment que la Salle Trézy.",       capacite:null, pmr:null, equipements:null, etat:null },
  { id:"maison-de-la-nature", nom:"Maison de la Nature",        categorie:"nature",         lat:48.81854716539286,  lng:2.7215470448240988,  photoData:null, description:"Espace dédié à la sensibilisation environnementale.",          capacite:null, pmr:null, equipements:null, etat:null },
  { id:"bulle-de-tennis",     nom:"Bulle de Tennis",            categorie:"sport",          lat:48.819888023494,    lng:2.6949069456523755,  photoData:null, description:"Structure gonflable couvrant les terrains de tennis.",          capacite:null, pmr:null, equipements:null, etat:null },
  { id:"service-technique",   nom:"Service Technique",          categorie:"technique",      lat:48.82592639926443,  lng:2.7163507979906174,  photoData:null, description:"Bâtiment du service technique municipal.",                    capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-leonard",       nom:"Salle Léonard de Vinci",     categorie:"sport",          lat:48.82578342705441,  lng:2.70388251203608,    photoData:null, description:"Salle sportive et polyvalente Léonard de Vinci.",              capacite:null, pmr:null, equipements:null, etat:null },
  { id:"kiosque",             nom:"Le Kiosque",                 categorie:"culture",        lat:48.82071152305836,  lng:2.7034540782217116,  photoData:null, description:"Kiosque municipal.",                                          capacite:null, pmr:null, equipements:null, etat:null },
  { id:"lavoir",              nom:"Le Lavoir",                  categorie:"nature",         lat:48.822159310761165, lng:2.699754626238832,   photoData:null, description:"Lavoir ancien du patrimoine communal.",                        capacite:null, pmr:null, equipements:null, etat:null },
  { id:"presbytere",          nom:"Le Presbytère",              categorie:"administration", lat:48.82111040446145,  lng:2.704497749017735,   photoData:null, description:"Presbytère communal.",                                         capacite:null, pmr:null, equipements:null, etat:null },
  { id:"service-technique-2", nom:"Service Technique (STM 2)",  categorie:"technique",      lat:48.8257513164453,   lng:2.7168265000639265,  photoData:null, description:"Second site du service technique municipal.",                  capacite:null, pmr:null, equipements:null, etat:null },
  { id:"salle-ginkgo",        nom:"Salle Ginkgo",               categorie:"social",         lat:48.82201482885651,  lng:2.70679315452275,    photoData:null, description:"Salle à vocation sociale et associative.",                     capacite:null, pmr:null, equipements:null, etat:null },
  { id:"maison-accueil",      nom:"Maison d'Accueil Provisoire",categorie:"social",         lat:48.821894516339746, lng:2.703837128674898,   photoData:null, description:"Structure d'accueil temporaire.",                              capacite:null, pmr:null, equipements:null, etat:null },
  { id:"dojo",                nom:"Le Dojo",                    categorie:"sport",          lat:48.82321853695472,  lng:2.69904119756853,    photoData:null, description:"Salle de sport dédiée aux arts martiaux.",                     capacite:null, pmr:null, equipements:null, etat:null },
  { id:"meal-repas",          nom:"Meal Repas",                 categorie:"social",         lat:48.821208526478905, lng:2.7038969084203717,  photoData:null, description:"Espace restauration collective.",                              capacite:null, pmr:null, equipements:null, etat:null },
  { id:"la-poste",            nom:"La Poste",                   categorie:"administration", lat:48.82096804126956,  lng:2.7056198557389313,  photoData:null, description:"Bureau de poste communal.",                                    capacite:null, pmr:null, equipements:null, etat:null },
  { id:"chateau-eau",         nom:"Château d'Eau",              categorie:"infrastructure", lat:48.82146351197768,  lng:2.7237055348700334,  photoData:null, description:"Château d'eau du réseau communal.",                            capacite:null, pmr:null, equipements:null, etat:null }
];
