const { Plat, Categorie,LigneCommande } = require('../models');
const { Sequelize } = require('sequelize');

const getAllPlats = async (req, res) => {
  try {
    const where = req.user.role === 'restaurateur' ? { utilisateurId: req.user.id } : {};
    const commandeCount = Sequelize.literal(`(
      SELECT COUNT(*)
      FROM "LigneCommandes"
      WHERE "LigneCommandes"."platId" = "Plat"."id"
    )`);

    const plats = await Plat.findAll({
      where,
      include: [{ model: Categorie, attributes: ['id', 'nom'] }],
      attributes: {
        include: [[commandeCount, 'commandes']]
      }
    });

    const result = plats.map((p) => {
      const data = p.toJSON();
      let fileName = data.image;

      if (fileName && fileName.startsWith('uploads/')) {
        fileName = fileName.replace('uploads/', '');
      }
      if (fileName && fileName.startsWith('uploads\\')) {
        fileName = fileName.replace('uploads\\', '');
      }

      return {
        ...data,
        image: fileName ? `http://${process.env.BACKEND_HOST}:${process.env.PORT}/uploads/${fileName}` : null,
        categorie: data.Categorie?.nom || '',
        adresseRestaurant: data.adresseRestaurant || "Adresse non disponible",
        commandes: Number(data.commandes || 0)
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération", erreur: err.message });
  }
};

const getPlatsPopulaires = async (req, res) => {
  try {
    const countCommandes = Sequelize.literal(`(
      SELECT COUNT(*)
      FROM "LigneCommandes"
      WHERE "LigneCommandes"."platId" = "Plat"."id"
    )`);

    const plats = await Plat.findAll({
      attributes: {
        include: [[countCommandes, 'nombreCommandes']]
      },
      include: [
        { model: Categorie, attributes: ['id', 'nom'] }
      ],
      order: [[countCommandes, 'DESC']],
      limit:6
    });

    res.json(plats);
  } catch (err) {
    res.status(500).json({
      message: "Erreur récupération plats populaires",
      erreur: err.message
    });
  }
};

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