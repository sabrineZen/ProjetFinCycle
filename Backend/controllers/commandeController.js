const { Commande, LigneCommande, Plat } = require('../models');

const creerCommande = async (req, res) => {
  try {
    const { adresseLivraison, produits } = req.body;
    const utilisateurId = req.user.id;

    if (!produits || produits.length === 0)
      return res.status(400).json({ message: 'Panier vide' });

    // Calculer le total
    let total = 0;
    for (const p of produits) {
      total += parseFloat(p.prix) * p.quantite;
    }

    // Créer la commande
    const commande = await Commande.create({
      utilisateurId,
      adresseLivraison,
      total,
      statut: 'en_attente'
    });

    // Créer les lignes de commande
    for (const p of produits) {
      await LigneCommande.create({
        commandeId: commande.id,
        platId:     p.id,
        quantite:   p.quantite,
        prixUnitaire: parseFloat(p.prix),
        sousTotal:  parseFloat(p.prix) * p.quantite
      });
    }

    res.status(201).json({ message: 'Commande créée !', commande });
  } catch (err) {
    console.error('Erreur creerCommande:', err.message);
    console.error('Erreur creerCommande:', err);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
};

const getCommandesRestaurateur = async (req, res) => {
  try {
    const restaurateurId = req.user.id;

    const commandes = await Commande.findAll({
      include: [
        {
          model: LigneCommande,
          include: [{
            model: Plat,
            where: { utilisateurId: restaurateurId },
            attributes: ['id', 'nom', 'prix', 'image']
          }]
        },
        {
          model: require('../models/utilisateurModel'),
          attributes: ['nom', 'prenom', 'telephone', 'adresse']
        }
      ],
      order: [['dateCommande', 'DESC']]
    });

    res.json(commandes);
  } catch (err) {
    console.error('Erreur getCommandesRestaurateur:', err.message);
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
};

const changerStatutCommande = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const statutsValides = ['en_attente', 'confirmee', 'en_preparation', 'livree', 'annulee'];
    if (!statutsValides.includes(statut))
      return res.status(400).json({ message: 'Statut invalide' });

    const commande = await Commande.findByPk(id);
    if (!commande) return res.status(404).json({ message: 'Commande introuvable' });

    commande.statut = statut;
    await commande.save();

    res.json({ message: 'Statut mis à jour', commande });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', detail: err.message });
  }
};

module.exports = { creerCommande, getCommandesRestaurateur, changerStatutCommande };