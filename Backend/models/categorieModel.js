const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  nom:         { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  image:       { type: DataTypes.STRING }
  },{
  timestamps: false
});

module.exports = Categorie;