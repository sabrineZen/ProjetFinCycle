const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require("../models");
const { Sequelize, Op } = require("sequelize");

// ✅ 1. Stats pour l'Admin
exports.getGlobalStats = async (req, res) => {
  try {
    const totalRevenus = await Commande.sum('total', { where: { statut: 'livree' } }) || 0;
    const totalCommandes = await Commande.count();
    const totalClients = await Utilisateur.count({ where: { role: 'client' } });
    const totalRestos = await Utilisateur.count({ where: { role: 'restaurateur', statut: 'approuve' } });

    const categoriesData = await Categorie.findAll({
      attributes: ['nom', 'couleur', [Sequelize.fn('COUNT', Sequelize.col('Plats.id')), 'value']],
      include: [{ model: Plat, attributes: [], required: false }],
      group: ['Categorie.id', 'Categorie.nom', 'Categorie.couleur'],
      raw: true
    });

    const platsPopulaires = await Plat.findAll({
      attributes: ['nom', [Sequelize.fn('SUM', Sequelize.col('LigneCommandes.quantite')), 'total_commandes']],
      include: [
        { model: Utilisateur, attributes: ['nomRestaurant'] },
        { model: LigneCommande, attributes: [], required: true }
      ],
      group: ['Plat.id', 'Utilisateur.id'], 
      order: [[Sequelize.literal('total_commandes'), 'DESC']],
      limit: 5,
      raw: true,
      subQuery: false 
    });

    res.json({
      statsCards: [
        { titre: "Revenus totaux", valeur: `${totalRevenus} DA`, icon: "euro" },
        { titre: "Commandes", valeur: totalCommandes, icon: "cart" },
        { titre: "Clients", valeur: totalClients, icon: "users" },
        { titre: "Restaurants", valeur: totalRestos, icon: "store" },
      ],
      revenusGraph: [{ mois: 'Jan', revenus: 2000 }, { mois: 'Fév', revenus: 5000 }],
      categoriesPie: categoriesData.map(c => ({ 
        name: c.nom, 
        value: parseInt(c.value) || 0, 
        color: c.couleur || "#FF8238" 
      })),
      platsPopulaires: platsPopulaires.map((p, index) => ({
        rang: index + 1,
        nom: p.nom,
        restaurant: p["Utilisateur.nomRestaurant"] || "N/A", 
        commandes: parseInt(p.total_commandes) || 0
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ 2. Stats pour le Restaurateur
exports.getRestaurateurDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const venteDuJour = await Commande.sum('total', { 
      where: { statut: 'livree', dateCommande: { [Op.gte]: today } } 
    }) || 0;

    const nbCommandes = await Commande.count({
      where: { dateCommande: { [Op.gte]: today } }
    });

    res.json({
      statsCards: [
        { id: 1, label: 'Vente du jour', value: `${venteDuJour} DA` },
        { id: 2, label: 'Commandes', value: `${nbCommandes}` },
        { id: 3, label: 'Note Moyenne', value: '4.7/5' },
        { id: 4, label: 'Temps moyen', value: '28 min' }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};