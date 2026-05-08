const sequelize = require('../config/db');

const Utilisateur   = require('./utilisateurModel');
const Categorie     = require('./categorieModel');
const Plat          = require('./platModel');
const Panier        = require('./panierModel');
const LignePanier   = require('./lignePanierModel');
const Commande      = require('./commandeModel');
const LigneCommande = require('./ligneCommandeModel');

module.exports = {
  sequelize,
  Utilisateur,
  Categorie,
  Plat,
  Panier,
  LignePanier,
  Commande,
  LigneCommande
};