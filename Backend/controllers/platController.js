const { Plat, Categorie } = require('../models');

// ── RÉCUPÉRER TOUS LES PLATS ──
const getAllPlats = async (req, res) => {
  try {
    // Si c'est un restaurateur, il voit UNIQUEMENT ses propres plats
    const where = req.user.role === 'restaurateur' ? { utilisateurId: req.user.id } : {};
    
    const plats = await Plat.findAll({
      where,
      include: [{ model: Categorie, attributes: ['id', 'nom'] }]
    });

    const result = plats.map((p) => {
      const data = p.toJSON();
      
      // LOGIQUE DE CORRECTION DU LIEN DOUBLÉ
      let fileName = data.image;
      
      // Si le nom contient déjà "uploads/", on l'enlève pour ne pas l'avoir 2 fois
      if (fileName && fileName.startsWith('uploads/')) {
        fileName = fileName.replace('uploads/', '');
      }
      if (fileName && fileName.startsWith('uploads\\')) {
        fileName = fileName.replace('uploads\\', '');
      }

      return {
        ...data,
        // On construit l'URL proprement avec un seul "/uploads/"
        image: fileName ? `http://${process.env.BACKEND_HOST}:${process.env.PORT}/uploads/${fileName}` : null,
        categorie: data.Categorie?.nom || '',
        adresseRestaurant: data.adresseRestaurant || "Adresse non disponible",
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération", erreur: err.message });
  }
};
//les plats populaires a parir du nombre de commandes

const getPlatsPopulaires = async (req, res) => {
  try {
    const plats = await Plat.findAll({
      attributes: {
        include: [
          [
            Sequelize.fn('COUNT', Sequelize.col('LigneCommandes.id')),
            'nombreCommandes'
          ]
        ]
      },
      include: [
        { model: Categorie, attributes: ['id', 'nom'] },
        {
          model: LigneCommande,
          attributes: [],
          required: false
        }
      ],
      group: ['Plat.id', 'Categorie.id'],
      order: [[Sequelize.literal('nombreCommandes'), 'DESC']]
    });

    const result = plats.map(p => {
      const data = p.toJSON();

      let fileName = data.image;
      if (fileName?.startsWith('uploads/')) fileName = fileName.replace('uploads/', '');

      return {
        id: data.id,
        nom: data.nom,
        prix: data.prix,
        image: fileName ? `http://${process.env.BACKEND_HOST}:${process.env.PORT}/uploads/${fileName}` : null,
        categorie: data.Categorie?.nom || '',
        nombreCommandes: data.nombreCommandes || 0
      };
    });

    res.json(result);

  } catch (err) {
    res.status(500).json({
      message: "Erreur récupération plats populaires",
      erreur: err.message
    });
  }
};
// ── AJOUTER UN PLAT ──
const createPlat = async (req, res) => {
  try {
    const { nom, description, prix, categorieId, disponible } = req.body;
    
    // On enregistre UNIQUEMENT le nom du fichier, pas le chemin "uploads/"
    const imageName = req.file ? req.file.filename : null; 

    const nouveauPlat = await Plat.create({
      nom,
      description,
      prix,
      categorieId,
      image: imageName, 
      disponible: disponible === 'true' || disponible === true,
      utilisateurId: req.user.id
    });

    const cat = await Categorie.findByPk(categorieId);
    const host = process.env.BACKEND_HOST || 'localhost';
    const port = process.env.PORT || 5000;

    res.status(201).json({
      ...nouveauPlat.toJSON(),
      image: imageName ? `http://${host}:${port}/uploads/${imageName}` : null,
      categorie: cat ? cat.nom : ''
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur ajout", erreur: err.message });
  }
};

// ── MODIFIER UN PLAT ──
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, categorieId, disponible } = req.body;

    const plat = await Plat.findByPk(id);
    if (!plat) return res.status(404).json({ message: "Plat introuvable" });

    // On garde l'ancien nom si pas de nouvelle image
    const imageName = req.file ? req.file.filename : plat.image;

    await plat.update({ 
      nom, 
      description, 
      prix, 
      categorieId, 
      image: imageName, 
      disponible: disponible === 'true' || disponible === true 
    });

    const cat = await Categorie.findByPk(categorieId);
    const host = process.env.BACKEND_HOST || 'localhost';
    const port = process.env.PORT || 5000;

    res.json({
      ...plat.toJSON(),
      image: imageName ? `http://${host}:${port}/uploads/${imageName}` : null,
      categorie: cat ? cat.nom : ''
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur modification", erreur: err.message });
  }
};

const deletePlat = async (req, res) => {
  try {
    const plat = await Plat.findByPk(req.params.id);
    if (!plat) return res.status(404).json({ message: "Plat introuvable" });
    await plat.destroy();
    res.json({ message: "✅ Plat supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur suppression", erreur: err.message });
  }
  
};

module.exports = { getAllPlats, createPlat, updatePlat, deletePlat,getPlatsPopulaires }; 