const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Utilisateur = sequelize.define('Utilisateur', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('client', 'restaurateur', 'admin'),
    allowNull: false,
    defaultValue: 'client'
  }
},{
  timestamps: false
});

module.exports = Utilisateur;