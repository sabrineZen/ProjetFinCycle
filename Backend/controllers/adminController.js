const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require('../models/index');
const { Op } = require('sequelize');
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
        'nomRestaurant', 'adresseRestaurant', 'numeroRegistre', 'documentOfficiel','statut'
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
        documentOfficiel: data.documentOfficiel || null,
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

// Après — transformation complète ✅
const getPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({
      attributes: ['id', 'nom', 'description', 'prix', 'image', 'disponible'],
      include: [
        { model: Utilisateur,   attributes: ['id', 'nomRestaurant'] },
        { model: Categorie,     attributes: ['id', 'nom'] },
        { model: LigneCommande, attributes: ['id'], required: false }
      ]
    });

    const result = plats.map((p) => {
      const data = p.toJSON();
      return {
        id:           data.id,
        nom:          data.nom,
        description:  data.description,
        prix:         parseFloat(data.prix),
        image:        data.image
                        ? `http://localhost:5000/uploads/${data.image}`
                        : null,
        disponible:   data.disponible,
        restaurant:   data.Utilisateur?.nomRestaurant || 'Inconnu',
        restaurantId: data.Utilisateur?.id            || null,
        categorie:    data.Categorie?.nom             || 'Sans catégorie',
        categorieId:  data.Categorie?.id              || null,
        commandes:    data.LigneCommandes?.length     || 0,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Erreur getPlats :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
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


//Toggle disponibilité
const toggleDisponibilite = async (req, res) => {
  try {
    const { id } = req.params;
    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: 'Plat non trouvé' });
    plat.disponible = !plat.disponible;
    await plat.save();
    res.json({ message: 'Disponibilité mise à jour', disponible: plat.disponible });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


//dashboard controller
// Stats globales
const getStats = async (req, res) => {
  try {
    const totalUtilisateurs = await Utilisateur.count({
      where: { role: 'client' }
    });

    const totalRestaurants = await Utilisateur.count({
      where: { role: 'restaurateur', statut: 'approuve' }
    });

    const totalPlats = await Plat.count({
      where: { disponible: true }
    });

    const revenus = await LigneCommande.sum('sousTotal') || 0;

    res.json({ totalUtilisateurs, totalRestaurants, totalPlats, revenus });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Restaurateurs en attente
const getRestaurantsEnAttente = async (req, res) => {
  try {
    const enAttente = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'en_attente' },
      attributes: ['id', 'nomRestaurant', 'nom', 'prenom', 'email','documentOfficiel'],
    });
    res.json(enAttente);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// Activités récentes
// adminController.js — getActivites corrigé
const getActivites = async (req, res) => {
  try {
    const dernierClients = await Utilisateur.findAll({
      where: { role: 'client' },
      attributes: ['id', 'nom', 'prenom', 'email'],
      limit: 5,
    });

    const derniersApprouves = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'approuve' },
      attributes: ['id', 'nomRestaurant'],
      limit: 5,
    });

    const derniersRefuses = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'refuse' },
      attributes: ['id', 'nomRestaurant'],
      limit: 3,
    });

    const derniersEnAttente = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'en_attente' },
      attributes: ['id', 'nomRestaurant'],
      limit: 3,
    });

    const activites = [
      ...dernierClients.map(u => ({
        type: 'inscription',
        message: `Nouvel utilisateur inscrit : ${u.prenom || ''} ${u.nom || ''}`.trim() || u.email,
        date: null,
      })),
      ...derniersApprouves.map(r => ({
        type: 'validation',
        message: `Restaurant "${r.nomRestaurant}" a été approuvé`,
        date: null,
      })),
      ...derniersRefuses.map(r => ({
        type: 'refus',
        message: `Restaurant "${r.nomRestaurant}" a été refusé`,
        date: null,
      })),
      ...derniersEnAttente.map(r => ({
        type: 'attente',
        message: `Restaurant "${r.nomRestaurant}" attend une validation`,
        date: null,
      })),
    ].slice(0, 8);

    res.json(activites);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};
module.exports = {
  getUtilisateurs,
  validerRestaurateur, // Exporté
  supprimerUtilisateur,
  getPlats,
  supprimerPlat,
  toggleDisponibilite,
  getCategories,
  getStats,
  getRestaurantsEnAttente,
  getActivites
};