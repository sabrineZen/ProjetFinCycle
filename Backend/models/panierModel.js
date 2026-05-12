const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Utilisateur = require('./utilisateurModel');

const Panier = sequelize.define('Panier', {
  sousTotal:      { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  fraisLivraison: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
  total:          { type: DataTypes.DECIMAL(10,2), defaultValue: 0 }
}, {
  timestamps: false
});

Panier.belongsTo(Utilisateur, { foreignKey: 'utilisateurId', onDelete: 'CASCADE' });
Utilisateur.hasMany(Panier, { foreignKey: 'utilisateurId' });

module.exports = Panier;