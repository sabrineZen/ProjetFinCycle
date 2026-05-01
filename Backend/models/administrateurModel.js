const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Administrateur = sequelize.define('Administrateur', {
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
    defaultValue: 'admin'
  }
  },{
  timestamps: false
});

module.exports = Administrateur;