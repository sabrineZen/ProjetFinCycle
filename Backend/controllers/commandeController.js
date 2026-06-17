const { Commande, LigneCommande, Plat, Utilisateur, sequelize } = require('../models');
//compter le nombre de commande commande par le client
const countClientOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await Commande.count({
      where: { utilisateurId: userId }
    });

    res.json({ totalCommandes: count });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Crée une commande (checkout)
const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, adresseLivraison } = req.body; // items: [{ platId, quantite, prix }]
    // empêcher les restaurateurs de passer une commande client
    if (req.user.role === 'restaurateur') {
      return res.status(403).json({ message: "Les restaurateurs ne peuvent pas passer de commande." });
    }
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Panier vide' });

    // Récupération des prix des plats depuis la BDD si besoin
    const platIds = [...new Set(items.map((it) => it.platId))];
    const platsData = await Plat.findAll({ where: { id: platIds } });
    const prixParPlat = platsData.reduce((acc, plat) => {
      acc[plat.id] = parseFloat(plat.prix);
      return acc;
    }, {});

    const lignes = items.map((it) => {
      const quantite = Number(it.quantite) || 1;
      const prixUnitaire = it.prix != null && it.prix !== ''
        ? parseFloat(it.prix)
        : prixParPlat[it.platId];

      if (prixUnitaire == null || Number.isNaN(prixUnitaire)) {
        throw new Error(`Prix unitaire manquant pour le plat ${it.platId}`);
      }

      return {
        platId: it.platId,
        quantite,
        prixUnitaire,
        sousTotal: prixUnitaire * quantite,
      };
    });

    const total = lignes.reduce((sum, ligne) => sum + ligne.sousTotal, 0);

    const commande = await Commande.create({ utilisateurId: userId, total, adresseLivraison: adresseLivraison || '', statut: 'en_attente' });

    const lignesAvecCommande = lignes.map((ligne) => ({ ...ligne, commandeId: commande.id }));

    await LigneCommande.bulkCreate(lignesAvecCommande);

    const result = await Commande.findByPk(commande.id, { include: [{ model: LigneCommande, include: [Plat] }, { model: Utilisateur, attributes: ['id','nom','prenom','email'] }] });

    res.status(201).json(result);
  } catch (err) {
    console.error('CHECKOUT ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

const ORDER_STATUT_MAP = {
  'confirmé': 'confirmee',
  'confirmée': 'confirmee',
  'en cours': 'en_preparation',
  'en préparation': 'en_preparation',
  'préparation': 'en_preparation',
  'livré': 'livree',
  'livree': 'livree',
  'annulé': 'annulee',
  'annulee': 'annulee',
  'en attente': 'en_attente',
  'en_attente': 'en_attente',
  'confirmee': 'confirmee',
};

// Récupère les commandes : client => ses commandes, restaurateur => commandes liées à ses plats
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const commonInclude = [
      { model: LigneCommande, include: [Plat] },
      { model: Utilisateur, attributes: ['id','nom','prenom','email'] }
    ];

    if (role === 'client') {
      const commandes = await Commande.findAll({ where: { utilisateurId: userId }, include: commonInclude, order: [['dateCommande','DESC']] });
      return res.json(commandes);
    }

    if (role === 'restaurateur') {
      // Retourner uniquement les commandes qui contiennent au moins une ligne
      // dont le plat appartient au restaurateur, et n'inclure que
      // les lignes/plats appartenant à ce restaurateur (INNER JOIN).
      const commandes = await Commande.findAll({
        include: [
          {
            model: LigneCommande,
            required: true,
            include: [
              { model: Plat, required: true, where: { utilisateurId: userId } }
            ]
          },
          { model: Utilisateur, attributes: ['id','nom','prenom','email'] }
        ],
        order: [['dateCommande','DESC']],
      });
      return res.json(commandes);
    }

    // Admin -> toutes
    const commandes = await Commande.findAll({ include: commonInclude, order: [['dateCommande','DESC']] });
    res.json(commandes);
  } catch (err) {
    console.error('GET ORDERS ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour le statut d'une commande (ex: restaurateur confirme)
const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const commande = await Commande.findByPk(id, { include: [{ model: LigneCommande, include: [Plat] }, { model: Utilisateur, attributes: ['id','nom','prenom','email'] }] });
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });

    if (role === 'restaurateur') {
      // vérifier que restaurateur est propriétaire d'au moins un plat de la commande
      const owns = commande.LigneCommandes.some(l => l.Plat && l.Plat.utilisateurId === userId);
      if (!owns) return res.status(403).json({ message: 'Accès refusé' });
    }

    const statutNormalise = ORDER_STATUT_MAP[statut?.toString().toLowerCase()] || statut;
    if (!['en_attente','confirmee','en_preparation','livree','annulee'].includes(statutNormalise)) {
      return res.status(400).json({ message: `Statut invalide : ${statut}` });
    }

    commande.statut = statutNormalise;
    await commande.save();

    res.json(commande);
  } catch (err) {
    console.error('UPDATE ORDER STATUS ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkout, getOrders, updateStatus, countClientOrders };
