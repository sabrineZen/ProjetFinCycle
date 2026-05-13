const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')
const Utilisateur = require('./utilisateurModel')

const Adresse = sequelize.define('Adresse', {
  type:      { type: DataTypes.ENUM('domicile', 'bureau', 'autre'), defaultValue: 'domicile' },
  rue:       { type: DataTypes.STRING, allowNull: false },
  ville:     { type: DataTypes.STRING, allowNull: false },
  pays:      { type: DataTypes.STRING, allowNull: false },
  parDefaut: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  timestamps: false
})

Adresse.belongsTo(Utilisateur, { foreignKey: 'utilisateurId', onDelete: 'CASCADE' })
Utilisateur.hasMany(Adresse,   { foreignKey: 'utilisateurId' })

module.exports = Adresse