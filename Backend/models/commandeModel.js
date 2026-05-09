const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Client = require('./clientModel');
const Restaurateur = require('./restaurateurModel');  

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

Commande.belongsTo(Client, { foreignKey: 'clientId' });
Client.hasMany(Commande,   { foreignKey: 'clientId' });
Commande.belongsTo(Restaurateur, { foreignKey: 'restaurateurId' });
Restaurateur.hasMany(Commande,   { foreignKey: 'restaurateurId' });
module.exports = Commande;