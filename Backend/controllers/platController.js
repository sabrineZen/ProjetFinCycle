const { Plat, Categorie } = require('../models');

// ── RÉCUPÉRER TOUS LES PLATS ──
const getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll({
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
        image: fileName ? `http://localhost:5000/uploads/${fileName}` : null,
        categorie: data.Categorie?.nom || '',
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Erreur récupération", erreur: err.message });
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
    });

    const cat = await Categorie.findByPk(categorieId);

    res.status(201).json({
      ...nouveauPlat.toJSON(),
      image: imageName ? `http://localhost:5000/uploads/${imageName}` : null,
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

    res.json({
      ...plat.toJSON(),
      image: imageName ? `http://localhost:5000/uploads/${imageName}` : null,
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

module.exports = { getAllPlats, createPlat, updatePlat, deletePlat };