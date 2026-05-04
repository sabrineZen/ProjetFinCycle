const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Utilisateur = require('./utilisateurModel');

const Commande = sequelize.define('Commande', {
  dateCommande:     { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  statut: {
    type: DataTypes.ENUM('en_attente','confirmee','en_preparation','livree','annulee'),
    defaultValue: 'en_attente'
  },
  adresseLivraison: { type: DataTypes.STRING, allowNull: false },
  total:            { type: DataTypes.DECIMAL(10,2), allowNull: false }
  },{
  timestamps: false
});

Commande.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' , onDelete: 'CASCADE'});
Utilisateur.hasMany(Commande,   { foreignKey: 'utilisateurId' });
module.exports = Commande;