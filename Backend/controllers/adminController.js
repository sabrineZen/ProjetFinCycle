const { Utilisateur, Commande, Plat, Categorie, LigneCommande } = require('../models/index');

// ─────────────────────────────────────────
//  UTILISATEURS
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
      const totalDepenses = commandes.reduce(
        (sum, c) => sum + parseFloat(c.total || 0), 0
      );
      return {
        id:                data.id,
        email:             data.email,
        role:              data.role,
        nom:               data.role === 'client'
                             ? `${data.prenom || ''} ${data.nom || ''}`.trim() || 'Sans nom'
                             : data.nomRestaurant || 'Sans nom',
        telephone:         data.telephone || null,
        nombreCommandes:   data.role === 'client' ? commandes.length : null,
        totalDepenses:     data.role === 'client' ? `$${totalDepenses.toFixed(2)}` : null,
        adresseRestaurant: data.adresseRestaurant || null,
        statut:            data.statut || null,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Erreur getUtilisateurs :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const supprimerUtilisateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findByPk(id);
    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    if (utilisateur.role === 'admin') return res.status(403).json({ message: 'Impossible de supprimer un admin' });
    await utilisateur.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur supprimerUtilisateur :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ─────────────────────────────────────────
//  PLATS
// ─────────────────────────────────────────

const getPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({
      attributes: ['id', 'nom', 'description', 'prix', 'image', 'disponible'],
      include: [
        { model: Utilisateur,   attributes: ['id', 'nomRestaurant'] },
        { model: Categorie,     attributes: ['id', 'nom', 'couleur', 'image'] },
        { model: LigneCommande, attributes: ['id'], required: false }
      ]
    });

    const result = plats.map((p) => {
      const data = p.toJSON();

      const imagePlat      = data.image
        ? `http://localhost:5000/uploads/${data.image}`
        : null;
      const imageCategorie = data.Categorie?.image
        ? `http://localhost:5000/uploads/${data.Categorie.image}`
        : null;

      return {
        id:               data.id,
        nom:              data.nom,
        description:      data.description,
        prix:             parseFloat(data.prix),
        image:            data.image ? `http://localhost:5000/uploads/${data.image}` : null,
        disponible:       data.disponible,
        restaurant:       data.Utilisateur?.nomRestaurant || 'Inconnu',
        restaurantId:     data.Utilisateur?.id || null,
        categorie:        data.Categorie?.nom || 'Sans catégorie',
        categorieCouleur: data.Categorie?.couleur || '#FCCEC1',
        categorieId:      data.Categorie?.id || null,
        commandes:        data.LigneCommandes?.length || 0,
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
    const { id } = req.params;
    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: 'Plat non trouvé' });
    await plat.destroy();
    res.json({ message: 'Plat supprimé avec succès' });
  } catch (error) {
    console.error('Erreur supprimerPlat :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const toggleDisponibilite = async (req, res) => {
  try {
    const { id } = req.params;
    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: 'Plat non trouvé' });
    plat.disponible = !plat.disponible;
    await plat.save();
    res.json({ message: 'Disponibilité mise à jour', disponible: plat.disponible });
  } catch (error) {
    console.error('Erreur toggleDisponibilite :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// ─────────────────────────────────────────
//  CATEGORIES
// ─────────────────────────────────────────

const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      attributes: ['id', 'nom', 'description', 'couleur', 'image'],
      include: [{ model: Plat, attributes: ['id'], required: false }]
    });

    const result = categories.map((c) => {
      const data = c.toJSON();
      return {
        id:          data.id,
        nom:         data.nom,
        description: data.description,
        couleur:     data.couleur,
        image:       data.image ? `http://localhost:5000/uploads/${data.image}` : null,
        nombrePlats: data.Plats?.length || 0,
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Erreur getCategories :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const ajouterCategorie = async (req, res) => {
  try {
    const { nom, description, couleur } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!nom || !description) {
      return res.status(400).json({ message: 'Nom et description sont requis' });
    }

    const categorie = await Categorie.create({
      nom,
      description,
      couleur: couleur || '#FCCEC1',
      image,
    });

    res.status(201).json({
      id:          categorie.id,
      nom:         categorie.nom,
      description: categorie.description,
      couleur:     categorie.couleur,
      image:       categorie.image ? `http://localhost:5000/uploads/${categorie.image}` : null,
      nombrePlats: 0,
    });
  } catch (error) {
    console.error('Erreur ajouterCategorie :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const modifierCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, couleur } = req.body;
    const categorie = await Categorie.findByPk(id);

    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });

    if (nom)         categorie.nom         = nom;
    if (description) categorie.description = description;
    if (couleur)     categorie.couleur     = couleur;
    if (req.file)    categorie.image       = req.file.filename;

    await categorie.save();

    res.json({
      id:          categorie.id,
      nom:         categorie.nom,
      description: categorie.description,
      couleur:     categorie.couleur,
      image:       categorie.image ? `http://localhost:5000/uploads/${categorie.image}` : null,
    });
  } catch (error) {
    console.error('Erreur modifierCategorie :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const supprimerCategorie = async (req, res) => {
  try {
    const { id } = req.params;
    const categorie = await Categorie.findByPk(id);
    if (!categorie) return res.status(404).json({ message: 'Catégorie non trouvée' });
    await categorie.destroy();
    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error('Erreur supprimerCategorie :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = {
  getUtilisateurs,
  supprimerUtilisateur,
  getPlats,
  supprimerPlat,
  toggleDisponibilite,
  getCategories,
  ajouterCategorie,
  modifierCategorie,
  supprimerCategorie,
};