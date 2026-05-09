const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Categorie = require('./categorieModel');
const Restaurateur = require('./restaurateurModel');

const Plat = sequelize.define('Plat', {
  nom:         { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  prix:        { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image:       { type: DataTypes.STRING },
  disponible:  { type: DataTypes.BOOLEAN, defaultValue: true }
},{
  timestamps: false
});

Plat.belongsTo(Categorie,    { foreignKey: 'categorieId' });
Plat.belongsTo(Restaurateur, { foreignKey: 'restaurateurId' });

module.exports = Plat;