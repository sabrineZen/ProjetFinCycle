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
<<<<<<< Updated upstream
  },

  // ── Colonnes Client ──
  nom:       { type: DataTypes.STRING, allowNull: false},
  prenom:    { type: DataTypes.STRING, allowNull: false },
  telephone: { type: DataTypes.STRING, allowNull: false ,unique: true},
  adresse:   { type: DataTypes.STRING, allowNull: false },

  // ── Colonnes Restaurateur ──
  nomRestaurant:      { type: DataTypes.STRING, allowNull: false },
  adresseRestaurant:  { type: DataTypes.STRING, allowNull: false },
  numeroRegistre:     { type: DataTypes.STRING, allowNull: false, unique: true },
  documentOfficiel:   { type: DataTypes.STRING, allowNull: false },
  statut: {
    type: DataTypes.ENUM('en_attente', 'approuve', 'refuse'),
    allowNull: true,
    defaultValue: 'en_attente'
  },
  // ── Reset mot de passe ──
  resetToken:  { type: DataTypes.STRING, allowNull: false },
  resetExpire: { type: DataTypes.DATE,   allowNull: false }
}, {
=======
  }
},{

>>>>>>> Stashed changes
  timestamps: false
});

module.exports = Utilisateur;