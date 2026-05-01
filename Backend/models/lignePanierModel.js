const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Panier = require('./panierModel');
const Plat   = require('./platModel');

const LignePanier = sequelize.define('LignePanier', {
  quantite:     { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  prixUnitaire: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  sousTotal:    { type: DataTypes.DECIMAL(10,2), allowNull: false }
  },{
  timestamps: false
});

LignePanier.belongsTo(Panier, { foreignKey: 'panierId' });
LignePanier.belongsTo(Plat,   { foreignKey: 'platId' });
Panier.hasMany(LignePanier,   { foreignKey: 'panierId' });
Plat.hasMany(LignePanier,   { foreignKey: 'platId' });
module.exports = LignePanier;