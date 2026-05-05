const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require('../models/index');

// ─────────────────────────────────────────
//  UTILISATEURS & VALIDATION
// ─────────────────────────────────────────

const getUtilisateurs = async (req, res) => {
  try {
    const utilisateurs = await Utilisateur.findAll({
      where: { role: ['client', 'restaurateur'] },
      attributes: [
        'id', 'email', 'role',
        'nom', 'prenom', 'telephone', 'adresse',
        'nomRestaurant', 'adresseRestaurant', 'numeroRegistre', 'statut'
      ],
      include: [{ model: Commande, attributes: ['id', 'total'], required: false }]
    });

    const result = utilisateurs.map((u) => {
      const data = u.toJSON();
      const commandes = data.Commandes || [];
      const totalDepenses = commandes.reduce((sum, c) => sum + parseFloat(c.total || 0), 0);
      return {
        id: data.id,
        email: data.email,
        role: data.role,
        nom: data.role === 'client' 
             ? `${data.prenom || ''} ${data.nom || ''}`.trim() || 'Sans nom'
             : data.nomRestaurant || 'Sans nom',
        telephone: data.telephone || null,
        nombreCommandes: data.role === 'client' ? commandes.length : null,
        totalDepenses: data.role === 'client' ? `$${totalDepenses.toFixed(2)}` : null,
        adresseRestaurant: data.adresseRestaurant || null,
        statut: data.statut || null,
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// --- FONCTION DE VALIDATION AJOUTÉE ---
const validerRestaurateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // 'approuve' ou 'refuse'

    const restaurant = await Utilisateur.findOne({ where: { id, role: 'restaurateur' } });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant non trouvé' });

    restaurant.statut = action === 'approuve' ? 'approuve' : 'refuse';
    await restaurant.save();

    res.json({ message: `Restaurant ${restaurant.statut} avec succès`, statut: restaurant.statut });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la validation' });
  }
};

const supprimerUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    await utilisateur.destroy();
    res.json({ message: 'Utilisateur supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ─────────────────────────────────────────
//  PLATS & CATÉGORIES
// ─────────────────────────────────────────

const getPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({
      include: [
        { model: Utilisateur, attributes: ['nomRestaurant'] },
        { model: Categorie, attributes: ['nom'] }
      ]
    });
    res.json(plats);
  } catch (error) { res.status(500).json({ message: 'Erreur' }); }
};

const supprimerPlat = async (req, res) => {
  try {
    await Plat.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Plat supprimé' });
  } catch (error) { res.status(500).json({ message: 'Erreur' }); }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) { res.status(500).json({ message: 'Erreur' }); }
};

module.exports = {
  getUtilisateurs,
  validerRestaurateur, // Exporté
  supprimerUtilisateur,
  getPlats,
  supprimerPlat,
  getCategories
};