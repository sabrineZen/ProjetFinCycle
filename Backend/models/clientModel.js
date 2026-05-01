const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Utilisateur = require('./utilisateurModel');

const Client = sequelize.define('Client', {
  prenom: { type: DataTypes.STRING, allowNull: false },
  nom:    { type: DataTypes.STRING, allowNull: false },
  telephone: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING }
  },{
  timestamps: false
});

// Héritage : Client appartient à un Utilisateur
Client.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Utilisateur.hasOne(Client,    { foreignKey: 'utilisateurId' });

module.exports = Client;