const { Plat, Categorie, LigneCommande, Commande, LignePanier, Panier, Utilisateur } = require('../models/index');
const { sequelize } = require('../models/index');
const { Op } = require('sequelize');

// ── 1. PLATS POPULAIRES (Les plus commandés) ──
const getPlatPopulaires = async (req, res) => {
  try {
    const platsPopulaires = await Plat.findAll({
      attributes: [
        'id',
        'nom',
        'description',
        'prix',
        'image',
        'disponible',
        'categorieId',
        [sequelize.fn('COUNT', sequelize.col('LignePaniers.id')), 'totalCommandes']
      ],
      include: [
        {
          model: require('../models/index').LignePanier,
          attributes: [],
          required: false
        }
      ],
      group: ['Plat.id'],
      order: [[sequelize.fn('COUNT', sequelize.col('LignePaniers.id')), 'DESC']],
      limit: 10,
      subQuery: false,
      raw: true
    });

    res.json({ success: true, data: platsPopulaires });
  } catch (err) {
    console.error('PLATS POPULAIRES ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 2. CHARGER LES PLATS PAR CATÉGORIE ──
const getPlatsByCategorie = async (req, res) => {
  try {
    const { categorieId } = req.params;

    if (!categorieId) {
      return res.status(400).json({ message: 'ID catégorie requis' });
    }

    const plats = await Plat.findAll({
      where: { categorieId },
      attributes: ['id', 'nom', 'description', 'prix', 'image', 'disponible', 'categorieId'],
      order: [['nom', 'ASC']]
    });

    res.json({ success: true, data: plats });
  } catch (err) {
    console.error('PLATS BY CATEGORIE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 3. FILTRER LES PLATS (Par nom/recherche) ──
const filtrerPlats = async (req, res) => {
  try {
    const { search, categorieId, minPrix, maxPrix } = req.query;

    const whereClause = {};

    if (search) {
      whereClause.nom = { [Op.iLike]: `%${search}%` };
    }

    if (categorieId) {
      whereClause.categorieId = categorieId;
    }

    if (minPrix || maxPrix) {
      whereClause.prix = {};
      if (minPrix) whereClause.prix[Op.gte] = parseFloat(minPrix);
      if (maxPrix) whereClause.prix[Op.lte] = parseFloat(maxPrix);
    }

    const plats = await Plat.findAll({
      where: whereClause,
      attributes: ['id', 'nom', 'description', 'prix', 'image', 'disponible', 'categorieId'],
      include: [
        {
          model: Categorie,
          attributes: ['id', 'nom', 'couleur']
        }
      ],
      order: [['nom', 'ASC']]
    });

    res.json({ success: true, data: plats });
  } catch (err) {
    console.error('FILTRER PLATS ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 4. AJOUTER UN PLAT AU PANIER ──
const ajouterAuPanier = async (req, res) => {
  try {
    const { utilisateurId, platId, quantite } = req.body;

    if (!utilisateurId || !platId || !quantite) {
      return res.status(400).json({ message: 'Utilisateur, plat et quantité requis' });
    }

    // Vérifier que le plat existe
    const plat = await Plat.findByPk(platId);
    if (!plat) {
      return res.status(404).json({ message: 'Plat introuvable' });
    }

    // Récupérer ou créer le panier de l'utilisateur
    let panier = await Panier.findOne({
      where: { utilisateurId }
    });

    if (!panier) {
      panier = await Panier.create({ utilisateurId });
    }

    // Vérifier si le plat est déjà dans le panier
    let lignePanier = await LignePanier.findOne({
      where: { panierId: panier.id, platId }
    });

    if (lignePanier) {
      // Augmenter la quantité
      lignePanier.quantite += parseInt(quantite);
      lignePanier.sousTotal = lignePanier.quantite * plat.prix;
      await lignePanier.save();
    } else {
      // Créer une nouvelle ligne
      lignePanier = await LignePanier.create({
        panierId: panier.id,
        platId,
        quantite: parseInt(quantite),
        prixUnitaire: plat.prix,
        sousTotal: parseInt(quantite) * plat.prix
      });
    }

    // Recalculer le total du panier
    const lignes = await LignePanier.findAll({
      where: { panierId: panier.id }
    });

    const sousTotal = lignes.reduce((sum, l) => sum + parseFloat(l.sousTotal), 0);
    panier.sousTotal = sousTotal;
    panier.total = sousTotal + (panier.fraisLivraison || 0);
    await panier.save();

    res.json({ success: true, message: 'Plat ajouté au panier ✅', panier });
  } catch (err) {
    console.error('AJOUTER AU PANIER ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 5. AUGMENTER LA QUANTITÉ D'UN PLAT DANS LE PANIER ──
const augmenterQuantite = async (req, res) => {
  try {
    const { lignePanierId } = req.params;

    const lignePanier = await LignePanier.findByPk(lignePanierId);
    if (!lignePanier) {
      return res.status(404).json({ message: 'Ligne panier introuvable' });
    }

    lignePanier.quantite += 1;
    lignePanier.sousTotal = lignePanier.quantite * lignePanier.prixUnitaire;
    await lignePanier.save();

    // Recalculer le total du panier
    const panier = await LignePanier.findOne({
      where: { id: lignePanierId }
    }).then(lp => Panier.findByPk(lp.panierId));

    const lignes = await LignePanier.findAll({
      where: { panierId: panier.id }
    });

    const sousTotal = lignes.reduce((sum, l) => sum + parseFloat(l.sousTotal), 0);
    panier.sousTotal = sousTotal;
    panier.total = sousTotal + (panier.fraisLivraison || 0);
    await panier.save();

    res.json({ success: true, message: 'Quantité augmentée ✅', lignePanier });
  } catch (err) {
    console.error('AUGMENTER QUANTITE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 6. DIMINUER/SUPPRIMER UN PLAT DU PANIER ──
const diminuerQuantite = async (req, res) => {
  try {
    const { lignePanierId } = req.params;

    const lignePanier = await LignePanier.findByPk(lignePanierId);
    if (!lignePanier) {
      return res.status(404).json({ message: 'Ligne panier introuvable' });
    }

    if (lignePanier.quantite > 1) {
      lignePanier.quantite -= 1;
      lignePanier.sousTotal = lignePanier.quantite * lignePanier.prixUnitaire;
      await lignePanier.save();
    } else {
      // Supprimer la ligne si quantité = 0
      await lignePanier.destroy();
    }

    // Recalculer le total du panier
    const panier = await Panier.findByPk(lignePanier.panierId);
    const lignes = await LignePanier.findAll({
      where: { panierId: panier.id }
    });

    const sousTotal = lignes.reduce((sum, l) => sum + parseFloat(l.sousTotal), 0);
    panier.sousTotal = sousTotal;
    panier.total = sousTotal + (panier.fraisLivraison || 0);
    await panier.save();

    res.json({ success: true, message: 'Quantité diminuée ✅', panier });
  } catch (err) {
    console.error('DIMINUER QUANTITE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 7. SUPPRIMER UN PLAT DU PANIER ──
const supprimerDuPanier = async (req, res) => {
  try {
    const { lignePanierId } = req.params;

    const lignePanier = await LignePanier.findByPk(lignePanierId);
    if (!lignePanier) {
      return res.status(404).json({ message: 'Ligne panier introuvable' });
    }

    const panierId = lignePanier.panierId;
    await lignePanier.destroy();

    // Recalculer le total du panier
    const panier = await Panier.findByPk(panierId);
    const lignes = await LignePanier.findAll({
      where: { panierId }
    });

    const sousTotal = lignes.reduce((sum, l) => sum + parseFloat(l.sousTotal), 0);
    panier.sousTotal = sousTotal;
    panier.total = sousTotal + (panier.fraisLivraison || 0);
    await panier.save();

    res.json({ success: true, message: 'Plat supprimé du panier ✅', panier });
  } catch (err) {
    console.error('SUPPRIMER DU PANIER ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

// ── 8. RECHERCHER DANS L'HISTORIQUE (Commandes antérieures) ──
const historiquePanier = async (req, res) => {
  try {
    const { utilisateurId } = req.params;
    const { statut, dateDebut, dateFin } = req.query;

    const whereClause = { utilisateurId };

    if (statut) {
      whereClause.statut = statut;
    }

    if (dateDebut || dateFin) {
      whereClause.dateCommande = {};
      if (dateDebut) whereClause.dateCommande[Op.gte] = new Date(dateDebut);
      if (dateFin) whereClause.dateCommande[Op.lte] = new Date(dateFin);
    }

    const commandes = await Commande.findAll({
      where: whereClause,
      include: [
        {
          model: LigneCommande,
          attributes: ['id', 'quantite', 'prixUnitaire', 'sousTotal'],
          include: [
            {
              model: Plat,
              attributes: ['id', 'nom', 'prix', 'image']
            }
          ]
        }
      ],
      order: [['dateCommande', 'DESC']]
    });

    res.json({ success: true, data: commandes });
  } catch (err) {
    console.error('HISTORIQUE ERROR:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPlatPopulaires,
  getPlatsByCategorie,
  filtrerPlats,
  ajouterAuPanier,
  augmenterQuantite,
  diminuerQuantite,
  supprimerDuPanier,
  historiquePanier
};
