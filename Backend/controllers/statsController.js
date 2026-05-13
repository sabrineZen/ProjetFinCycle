const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require("../models");
const { Sequelize, Op } = require("sequelize");

// --- Garde ta fonction getGlobalStats existante (ne pas effacer) ---
exports.getGlobalStats = async (req, res) => {
  try {
    const totalRevenus = await Commande.sum('total', { where: { statut: 'livree' } }) || 0;
    const totalCommandes = await Commande.count();
    const totalClients = await Utilisateur.count({ where: { role: 'client' } });
    const totalRestos = await Utilisateur.count({ where: { role: 'restaurateur', statut: 'approuve' } });

    res.json({
      statsCards: [
        { titre: "Revenus totaux", valeur: `${totalRevenus} DA`, icon: "euro" },
        { titre: "Commandes", valeur: totalCommandes, icon: "cart" },
        { titre: "Clients", valeur: totalClients, icon: "users" },
        { titre: "Restaurants", valeur: totalRestos, icon: "store" },
      ],
      // ... suite de ta logique existante ...
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ LA FONCTION POUR LE DASHBOARD RESTAURATEUR
exports.getRestaurateurDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Chiffres clés
    const venteDuJour = await Commande.sum('total', { 
      where: { 
        statut: 'livree',
        dateCommande: { [Op.gte]: today }
      } 
    }) || 0;

    const nbCommandes = await Commande.count({
      where: { dateCommande: { [Op.gte]: today } }
    });

    // 2. Top Plats (Basé sur LigneCommande)
    const topPlatsData = await LigneCommande.findAll({
      attributes: [
        'platId',
        [Sequelize.fn('SUM', Sequelize.col('quantite')), 'totalVendu']
      ],
      group: ['platId', 'Plat.id'],
      include: [{ model: Plat, attributes: ['nom'] }],
      order: [[Sequelize.literal('totalVendu'), 'DESC']],
      limit: 4,
      raw: true,
      subQuery: false
    });

    // 3. Commandes Récentes (Jointure avec Utilisateur)
    const commandesRecentes = await Commande.findAll({
      limit: 5,
      order: [['dateCommande', 'DESC']],
      include: [{ model: Utilisateur, attributes: ['nom', 'prenom'] }]
    });

    res.json({
      statsCards: [
        { id: 1, label: 'Vente du jour', value: `${venteDuJour} DA` },
        { id: 2, label: 'Commandes', value: `${nbCommandes}` },
        { id: 3, label: 'Note Moyenne', value: '4.7/5' },
        { id: 4, label: 'Temps moyen', value: '28 min' }
      ],
      topPlats: topPlatsData.map((tp, index) => ({
        id: tp.platId,
        nom: tp['Plat.nom'],
        commandes: parseInt(tp.totalVendu),
        progress: 100 - (index * 20)
      })),
      commandes: commandesRecentes.map(cmd => ({
        id: `#${cmd.id.toString().padStart(4, '0')}`,
        client: `${cmd.Utilisateur?.nom || 'Client'} ${cmd.Utilisateur?.prenom?.charAt(0) || ''}.`,
        montant: `${cmd.total} DA`,
        status: cmd.statut, // ex: 'en_attente', 'livree'
        heure: new Date(cmd.dateCommande).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }))
    });

  } catch (error) {
    console.error("Erreur Stats Restaurateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};