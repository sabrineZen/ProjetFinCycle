const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  nom:         { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  image:       { type: DataTypes.STRING, allowNull: false }
  },{
  timestamps: false
});

module.exports = Categorie;