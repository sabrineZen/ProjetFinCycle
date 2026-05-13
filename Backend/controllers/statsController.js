const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require("../models");
const { Sequelize, Op, fn, col, literal } = require("sequelize");

// ✅ 1. Stats pour l'Admin
exports.getGlobalStats = async (req, res) => {
  try {
    const totalRevenus   = await Commande.sum('total', { where: { statut: 'livree' } }) || 0;
    const totalCommandes = await Commande.count();
    const totalClients   = await Utilisateur.count({ where: { role: 'client' } });
    const totalRestos    = await Utilisateur.count({ where: { role: 'restaurateur', statut: 'approuve' } });

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
        { titre: "Commandes",      valeur: totalCommandes,        icon: "cart" },
        { titre: "Clients",        valeur: totalClients,          icon: "users" },
        { titre: "Restaurants",    valeur: totalRestos,           icon: "store" },
      ],
      revenusGraph: [{ mois: 'Jan', revenus: 2000 }, { mois: 'Fév', revenus: 5000 }],
      categoriesPie: categoriesData.map(c => ({
        name:  c.nom,
        value: parseInt(c.value) || 0,
        color: c.couleur || "#FF8238"
      })),
      platsPopulaires: platsPopulaires.map((p, index) => ({
        rang:       index + 1,
        nom:        p.nom,
        restaurant: p["Utilisateur.nomRestaurant"] || "N/A",
        commandes:  parseInt(p.total_commandes) || 0
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ 2. Stats pour le Restaurateur  ← COMPLET
exports.getRestaurateurDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const finJour = new Date();
    finJour.setHours(23, 59, 59, 999);

    // ── Stats cards ──────────────────────────────────────────────────────────
    const venteDuJour = await Commande.sum('total', {
      where: { statut: 'livree', dateCommande: { [Op.between]: [today, finJour] } }
    }) || 0;

    const nbCommandes = await Commande.count({
      where: { dateCommande: { [Op.between]: [today, finJour] } }
    });

    // ── Top plats ────────────────────────────────────────────────────────────
    const topPlatsRaw = await LigneCommande.findAll({
      attributes: [
        'platId',
        [fn('SUM', col('quantite')), 'totalQte']
      ],
      include: [{ model: Plat, attributes: ['nom'] }],
      group: ['platId', 'Plat.id'],
      order: [[literal('totalQte'), 'DESC']],
      limit: 4,
    });

    const maxQte = topPlatsRaw[0]?.dataValues?.totalQte ?? 1;
    const topPlats = topPlatsRaw.map((lc, i) => ({
      nom:       lc.Plat?.nom ?? 'Inconnu',
      commandes: parseInt(lc.dataValues.totalQte),
      progress:  Math.round((lc.dataValues.totalQte / maxQte) * 100),
    }));

    // ── Commandes récentes ───────────────────────────────────────────────────
    const commandesRaw = await Commande.findAll({
      include: [{ model: Utilisateur, attributes: ['nom', 'prenom'] }],
      order: [['dateCommande', 'DESC']],
      limit: 5,
    });

    const commandes = commandesRaw.map((cmd) => ({
      id:     `#${String(cmd.id).padStart(4, '0')}`,
      client: cmd.Utilisateur
        ? `${cmd.Utilisateur.prenom ?? ''} ${cmd.Utilisateur.nom ? cmd.Utilisateur.nom[0] + '.' : ''}`.trim()
        : 'Inconnu',
      montant: `${Number(cmd.total).toLocaleString('fr-DZ')} DA`,
      status:  cmd.statut,  // en_attente / confirmee / en_preparation / livree / annulee
      heure:   new Date(cmd.dateCommande).toLocaleTimeString('fr-DZ', { hour: '2-digit', minute: '2-digit' }),
    }));

    // ── Réponse complète ─────────────────────────────────────────────────────
    res.json({
      statsCards: [
        { id: 1, label: 'Vente du jour',  value: `${Number(venteDuJour).toLocaleString('fr-DZ')} DA` },
        { id: 2, label: 'Commandes',      value: String(nbCommandes) },
        { id: 3, label: 'Note Moyenne',   value: '4.7/5' },
        { id: 4, label: 'Temps moyen',    value: '28 min' },
      ],
      topPlats,   // ← était manquant
      commandes,  // ← était manquant
    });

  } catch (error) {
    console.error('Erreur getRestaurateurDashboard:', error.message);
    res.status(500).json({ error: error.message });
  }
};