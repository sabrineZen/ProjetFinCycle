const { Plat } = require('../models'); 

// ── RÉCUPÉRER TOUS LES PLATS ──
const getAllPlats = async (req, res) => {
  try {
    const plats = await Plat.findAll();
    res.json(plats);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des plats", erreur: err.message });
  }
};

// ── AJOUTER UN PLAT ──
const createPlat = async (req, res) => {
  try {
    const { nom, description, prix, categorie, disponible } = req.body;
    
    // Si une image a été envoyée, on crée son lien complet pour la base de données
    let imageUrl = null;
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    // Le FormData envoie du texte, on doit convertir "disponible" en vrai booléen
    const estDisponible = disponible === 'true' || disponible === true;

    const nouveauPlat = await Plat.create({
      nom,
      description,
      prix,
      categorie,
      image: imageUrl,
      disponible: estDisponible
    });

    res.status(201).json(nouveauPlat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'ajout du plat", erreur: err.message });
  }
};

// ── MODIFIER UN PLAT ──
const updatePlat = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, prix, categorie, disponible } = req.body;

    const plat = await Plat.findByPk(id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable" });
    }

    const estDisponible = disponible === 'true' || disponible === true;

    // On garde l'ancienne image par défaut, sauf si on en upload une nouvelle
    let imageUrl = plat.image;
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await plat.update({ 
      nom, 
      description, 
      prix, 
      categorie, 
      image: imageUrl, 
      disponible: estDisponible 
    });

    res.json(plat);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification du plat", erreur: err.message });
  }
};

// ── SUPPRIMER UN PLAT ──
const deletePlat = async (req, res) => {
  try {
    const { id } = req.params;

    const plat = await Plat.findByPk(id);
    if (!plat) {
      return res.status(404).json({ message: "Plat introuvable" });
    }

    await plat.destroy();
    res.json({ message: "✅ Plat supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression du plat", erreur: err.message });
  }
};

module.exports = { getAllPlats, createPlat, updatePlat, deletePlat };