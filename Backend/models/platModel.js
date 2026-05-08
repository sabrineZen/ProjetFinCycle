const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Utilisateur = require('./utilisateurModel');
const Categorie = require('./categorieModel');

const Plat = sequelize.define('Plat', {
  nom:         { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  prix:        { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image:       { type: DataTypes.STRING },
  disponible:  { type: DataTypes.BOOLEAN, defaultValue: true }
},{
  timestamps: false
});

Plat.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });
Utilisateur.hasMany(Plat,   { foreignKey: 'utilisateurId' });

Plat.belongsTo(Categorie, { foreignKey: 'categorieId' });
Categorie.hasMany(Plat,    { foreignKey: 'categorieId' });
module.exports = Plat;