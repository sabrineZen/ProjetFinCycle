const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require("../models"); // ✅ Ajouté LigneCommande
const { Sequelize } = require("sequelize");

exports.getGlobalStats = async (req, res) => {
  try {
    // 1. Chiffres clés
    const totalRevenus = await Commande.sum('total', { where: { statut: 'livré' } }).catch(() => 0) || 0;
    const totalCommandes = await Commande.count().catch(() => 0);
    const totalClients = await Utilisateur.count({ where: { role: 'client' } }).catch(() => 0);
    const totalRestos = await Utilisateur.count({ where: { role: 'restaurateur', statut: 'approuve' } }).catch(() => 0);

    // 2. Graphique Revenus
    let revenusMensuels = [];
    try {
      revenusMensuels = await Commande.findAll({
        attributes: [
          [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%b'), 'mois'],
          [Sequelize.fn('SUM', Sequelize.col('total')), 'revenus']
        ],
        where: { statut: 'livré' },
        group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%b')],
        raw: true
      });
    } catch (e) {
      revenusMensuels = [{ mois: 'N/A', revenus: 0 }];
    }

    // 3. Répartition par Catégorie
    let categoriesData = [];
    try {
      categoriesData = await Categorie.findAll({
        attributes: ['nom', 'couleur'],
        include: [{ 
            model: Plat, 
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('Plats.id')), 'value']] 
        }],
        group: ['Categorie.id', 'Categorie.nom', 'Categorie.couleur'],
        raw: true
      });
    } catch (e) {
      categoriesData = [];
    }

   // 4. Plats Populaires
let platsPopulaires = [];
try {
  platsPopulaires = await Plat.findAll({
    attributes: [
      'nom',
      [Sequelize.fn('SUM', Sequelize.col('LigneCommandes.quantite')), 'total_commandes']
    ],
    include: [
      {
        model: Utilisateur,
        attributes: ['nomRestaurant'],
        required: false // Pour ne pas bloquer si un resto est supprimé
      },
      {
        model: LigneCommande,
        attributes: [],
        required: true 
      }
    ],
    group: ['Plat.id', 'Utilisateur.id'], 
    order: [[Sequelize.literal('total_commandes'), 'DESC']], 
    limit: 5,
    raw: true,
    subQuery: false 
  });
} catch (e) {
  console.error("❌ Erreur SQL Plats Populaires :", e.message);
  platsPopulaires = []; 
}


platsPopulaires: platsPopulaires.map((p, index) => ({
  rang: index + 1,
  nom: p.nom,
  restaurant: p["Utilisateur.nomRestaurant"] || "N/A", 
  commandes: parseInt(p.total_commandes) || 0
}))

    res.json({
      statsCards: [
        { titre: "Revenus totaux", valeur: `${totalRevenus} DA`, icon: "euro" },
        { titre: "Commandes", valeur: totalCommandes, icon: "cart" },
        { titre: "Clients", valeur: totalClients, icon: "users" },
        { titre: "Restaurants", valeur: totalRestos, icon: "store" },
      ],
      revenusGraph: revenusMensuels.length > 0 ? revenusMensuels : [{ mois: 'Jan', revenus: 0 }],
      categoriesPie: categoriesData.map(c => ({ 
        name: c.nom, 
        value: parseInt(c['Plats.value']) || 0, 
        color: c.couleur || "#FF8238" 
      })),
      platsPopulaires: platsPopulaires.map((p, index) => ({
        rang: index + 1,
        nom: p.nom,
        restaurant: p["restaurateur.nom_restaurant"] || "N/A",
        commandes: p.total_commandes || 0
      })) 
    });

  } catch (error) {
    console.error("Erreur Stats Controller:", error);
    res.status(500).json({ error: "Erreur lors du calcul des statistiques" });
  }
};