const { Utilisateur, Commande, Plat, Categorie } = require('../models/index');

// ─────────────────────────────────────────
//  STATISTIQUES DASHBOARD (LA NOUVELLE FONCTION)
// ─────────────────────────────────────────

const getDashboardStats = async (req, res) => {
  try {
    const [nbUtilisateurs, nbRestaurants, nbPlats] = await Promise.all([
      // On compte TOUS les utilisateurs pour ne plus avoir 0
      Utilisateur.count({ 
    where: { 
      role: ['client', 'restaurateur'] 
    } 
  }), 
      // On compte tous les restaurateurs (même ceux en attente pour le moment)
      Utilisateur.count({ where: { role: 'restaurateur' } }),
      Plat.count()
    ]);

    // On récupère les restos en attente SANS utiliser createdAt
    const enAttente = await Utilisateur.findAll({
      where: { role: 'restaurateur', statut: 'en_attente' },
      limit: 5,
      // Suppression de l'ORDER BY createdAt qui faisait planter le code
    });

    res.json({
      utilisateurs: nbUtilisateurs,
      restaurants: nbRestaurants,
      plats: nbPlats,
      revenus: 0, 
      enAttente: enAttente.map(v => ({
        id: v.id,
        nom: v.nomRestaurant || "Sans nom",
        proprio: `${v.prenom || ''} ${v.nom || ''}`.trim() || "Inconnu",
        date: "Récemment" // Texte simple car la colonne date manque
      }))
    });
  } catch (error) {
    console.error("Erreur Stats Dashboard:", error);
    res.status(500).json({ message: 'Erreur lors du calcul des statistiques' });
  }
};

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
        totalDepenses: data.role === 'client' ? `${totalDepenses.toFixed(2)} DA` : null,
        adresseRestaurant: data.adresseRestaurant || null,
        statut: data.statut || null,
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const validerRestaurateur = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; 

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
        { model: Utilisateur, attributes: ['nomRestaurant'], required: false },
        { model: Categorie, attributes: ['nom'], required: false }
      ]
    });

    const formattedPlats = plats.map(p => {
      const data = p.toJSON();
      return {
        id: data.id,
        nom: data.nom,
        prix: data.prix,
        description: data.description,
        image: data.image,
        restaurant: data.Utilisateur ? data.Utilisateur.nomRestaurant : "Restaurant inconnu",
        categorie: data.Categorie ? data.Categorie.nom : "Non classé"
      };
    });

    res.json(formattedPlats);
  } catch (error) { 
    res.status(500).json({ message: 'Erreur lors de la récupération des plats' }); 
  }
};

const supprimerPlat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Plat.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Plat supprimé avec succès' });
    } else {
      res.status(404).json({ message: 'Plat non trouvé' });
    }
  } catch (error) { 
    res.status(500).json({ message: 'Erreur lors de la suppression' }); 
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) { 
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories' }); 
  }
};

// ─────────────────────────────────────────
//  EXPORTATIONS (CRUCIAL)
// ─────────────────────────────────────────
module.exports = {
  getDashboardStats, // <--- BIEN AJOUTÉ ICI
  getUtilisateurs,
  validerRestaurateur,
  supprimerUtilisateur,
  getPlats,
  supprimerPlat,
  getCategories
};