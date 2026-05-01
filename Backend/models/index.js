const sequelize = require('../config/db');

const Utilisateur    = require('./utilisateurModel');
const Client         = require('./clientModel');
const Restaurateur   = require('./restaurateurModel');
const Categorie      = require('./categorieModel');
const Plat           = require('./platModel');
const Panier         = require('./panierModel');
const LignePanier    = require('./lignePanierModel');
const Commande       = require('./commandeModel');
const LigneCommande  = require('./ligneCommandeModel');

// ── Utilisateur → Client / Restaurateur (héritage) ──
Utilisateur.hasOne(Client,       { foreignKey: 'utilisateurId', onDelete: 'CASCADE' });
Client.belongsTo(Utilisateur,    { foreignKey: 'utilisateurId' });

Utilisateur.hasOne(Restaurateur,    { foreignKey: 'utilisateurId', onDelete: 'CASCADE' });
Restaurateur.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

// ── Restaurateur → Plat (1 propose *) ──
Restaurateur.hasMany(Plat, { foreignKey: 'restaurateurId', onDelete: 'CASCADE' });
Plat.belongsTo(Restaurateur, { foreignKey: 'restaurateurId' });

// ── Categorie → Plat (1..* → *) ──
Categorie.hasMany(Plat, { foreignKey: 'categorieId' });
Plat.belongsTo(Categorie, { foreignKey: 'categorieId' });

// ── Panier → LignePanier (1 → *) ──
Panier.hasMany(LignePanier,       { foreignKey: 'panierId', onDelete: 'CASCADE' });
LignePanier.belongsTo(Panier,     { foreignKey: 'panierId' });

// ── Plat → LignePanier (* → *) ──
Plat.hasMany(LignePanier,     { foreignKey: 'platId' });
LignePanier.belongsTo(Plat,   { foreignKey: 'platId' });

// ── Client → Commande (1 passer *) ──
Client.hasMany(Commande,    { foreignKey: 'clientId', onDelete: 'CASCADE' });
Commande.belongsTo(Client,  { foreignKey: 'clientId' });

// ── Commande → LigneCommande (1 → *) ──
Commande.hasMany(LigneCommande,      { foreignKey: 'commandeId', onDelete: 'CASCADE' });
LigneCommande.belongsTo(Commande,    { foreignKey: 'commandeId' });

// ── Plat → LigneCommande ──
Plat.hasMany(LigneCommande,    { foreignKey: 'platId' });
LigneCommande.belongsTo(Plat,  { foreignKey: 'platId' });

module.exports = {
  sequelize,
  Utilisateur,
  Client,
  Restaurateur,
  Categorie,
  Plat,
  Panier,
  LignePanier,
  Commande,
  LigneCommande
};