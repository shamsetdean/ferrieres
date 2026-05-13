// data.js — données des bâtiments publics de Ferrières-en-Brie
// Partagé entre index.html et ar.html
// Format GeoJSON-compatible avec métadonnées étendues

const BATIMENTS = [
  {
    id: 'mairie',
    nom: 'Mairie de Ferrières-en-Brie',
    categorie: 'administration',
    adresse: '1 place de la Mairie, 77164 Ferrières-en-Brie',
    horaires: 'Lun–Ven : 8h30–12h00 · 13h30–17h30',
    telephone: '01 64 26 10 10',
    description: 'Hôtel de ville, siège de l\'administration municipale de Ferrières-en-Brie.',
    annee: 'XIXe siècle',
    lat: 48.8262,
    lng: 2.7093
  },
  {
    id: 'chateau',
    nom: 'Château de Ferrières',
    categorie: 'culture',
    adresse: 'Route du Château, 77164 Ferrières-en-Brie',
    horaires: 'Visites sur rendez-vous',
    telephone: '—',
    description: 'Construit pour le baron James de Rothschild (1855–1859) par Joseph Paxton. Monument historique classé.',
    annee: '1855–1859',
    lat: 48.8240,
    lng: 2.7058
  },
  {
    id: 'ecole',
    nom: 'École Élémentaire Publique',
    categorie: 'education',
    adresse: 'Ferrières-en-Brie',
    horaires: 'Lun, Mar, Jeu, Ven : 8h30–16h30',
    telephone: '—',
    description: 'École élémentaire publique de la commune.',
    annee: '—',
    lat: 48.8275,
    lng: 2.7105
  },
  {
    id: 'sports',
    nom: 'Salle de Sports Municipale',
    categorie: 'sport',
    adresse: 'Ferrières-en-Brie',
    horaires: 'Selon planning des clubs',
    telephone: '—',
    description: 'Équipement sportif municipal à disposition des associations et des scolaires.',
    annee: '—',
    lat: 48.8255,
    lng: 2.7120
  },
  {
    id: 'eglise',
    nom: 'Église Saint-Martin',
    categorie: 'culture',
    adresse: 'Place de l\'Église, 77164 Ferrières-en-Brie',
    horaires: 'Ouvert au public',
    telephone: '—',
    description: 'Église paroissiale historique de Ferrières-en-Brie, datant des XIIe–XIXe siècles.',
    annee: 'XIIe–XIXe siècle',
    lat: 48.8268,
    lng: 2.7080
  },
  {
    id: 'mediatheque',
    nom: 'Médiathèque Municipale',
    categorie: 'culture',
    adresse: 'Ferrières-en-Brie',
    horaires: 'Mar–Sam : 10h00–18h00',
    telephone: '—',
    description: 'Médiathèque intercommunale proposant livres, DVD et ressources numériques.',
    annee: '—',
    lat: 48.8270,
    lng: 2.7098
  }
];
