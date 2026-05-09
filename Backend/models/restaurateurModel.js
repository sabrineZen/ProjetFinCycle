const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Utilisateur = require('./utilisateurModel');

const Restaurateur = sequelize.define('Restaurateur', {
  nomRestaurant:      { type: DataTypes.STRING, allowNull: false },
  adresseRestaurant:  { type: DataTypes.STRING, allowNull: false },
  telephone:          { type: DataTypes.STRING, allowNull: false },
  numeroRegistre:     { type: DataTypes.STRING, allowNull: false, unique: true },
  documentOfficiel:   { type: DataTypes.STRING },
  statut: {
    type: DataTypes.ENUM('en_attente', 'approuve', 'refuse'),
    defaultValue: 'en_attente'
  }
  },{
  timestamps: false
});

Restaurateur.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Utilisateur.hasOne(Restaurateur,    { foreignKey: 'utilisateurId' });

module.exports = Restaurateur;