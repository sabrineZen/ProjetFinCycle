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

module.exports = { creerCommande };