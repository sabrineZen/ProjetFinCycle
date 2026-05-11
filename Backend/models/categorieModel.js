const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Categorie = sequelize.define('Categorie', {
  nom:         { type: DataTypes.STRING,     allowNull: false },
  description: { type: DataTypes.STRING,     allowNull: false },
  couleur:     { type: DataTypes.STRING(7),  allowNull: false, defaultValue: '#FCCEC1' },
  image:       { type: DataTypes.STRING,     allowNull: true  }
}, {
  timestamps: false
});

module.exports = Categorie;