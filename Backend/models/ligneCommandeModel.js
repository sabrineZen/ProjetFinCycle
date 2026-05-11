const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Commande = require('./commandeModel');
const Plat     = require('./platModel');

const LigneCommande = sequelize.define('LigneCommande', {
  quantite:     { type: DataTypes.INTEGER, allowNull: false },
  prixUnitaire: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  sousTotal:    { type: DataTypes.DECIMAL(10,2), allowNull: false }
  },{
  timestamps: false
});

LigneCommande.belongsTo(Commande, { foreignKey: 'commandeId' , onDelete: 'CASCADE'});
LigneCommande.belongsTo(Plat,     { foreignKey: 'platId' , onDelete: 'CASCADE'});
Commande.hasMany(LigneCommande,   { foreignKey: 'commandeId' });
Plat.hasMany(LigneCommande,   { foreignKey: 'platId' });
module.exports = LigneCommande;