const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Utilisateur = sequelize.define('Utilisateur', {
  // ── Commun à tous ──
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
  },

  // ── Colonnes Client (nullable car absent chez restaurateur/admin) ──
  nom:       { type: DataTypes.STRING, allowNull: true },
  prenom:    { type: DataTypes.STRING, allowNull: true },
  telephone: { type: DataTypes.STRING, allowNull: true, unique: true },
  adresse:   { type: DataTypes.STRING, allowNull: true },

  // ── Colonnes Restaurateur (nullable car absent chez client/admin) ──
  nomRestaurant:     { type: DataTypes.STRING, allowNull: true },
  adresseRestaurant: { type: DataTypes.STRING, allowNull: true },
  numeroRegistre:    { type: DataTypes.STRING, allowNull: true, unique: true },
  documentOfficiel:  { type: DataTypes.STRING, allowNull: true },
  statut: {
    type: DataTypes.ENUM('en_attente', 'approuve', 'refuse'),
    allowNull: true,
    defaultValue: null
  },
}, {
  timestamps: false
});

module.exports = Utilisateur;