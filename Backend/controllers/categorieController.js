const { Categorie, Plat } = require("../models");

const getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();

    const data = await Promise.all(
      categories.map(async (cat) => {
        try {
          // Utilise categorieId (minuscule) pour être cohérent avec le reste
          const plats = await Plat.count({ 
            where: { categorieId: cat.id } 
          });
          
          const restaurants = await Plat.count({
            where: { categorieId: cat.id },
            distinct: true,
            col: "utilisateurId",
          });

          return {
            id: cat.id,
            nom: cat.nom,
            description: cat.description,
            couleur: cat.couleur || "#FCCEC1",
            image: cat.image || null,
            restaurants: restaurants || 0,
            plats: plats || 0,
          };
        } catch (countErr) {
          return {
            id: cat.id,
            nom: cat.nom,
            description: cat.description,
            couleur: cat.couleur || "#FCCEC1",
            restaurants: 0,
            plats: 0,
          };
        }
      })
    );

    res.json(data);
  } catch (err) {
    console.error("getCategories erreur :", err.message);
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
};

const getCategorieById = async (req, res) => {
  try {
    const cat = await Categorie.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: "Catégorie introuvable" });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
};

const createCategorie = async (req, res) => {
  const { nom, description = "", couleur, image = "" } = req.body;
  if (!nom?.trim() || !couleur?.trim())
    return res.status(400).json({ message: "Nom et couleur requis." });

  try {
    const cat = await Categorie.create({ nom: nom.trim(), description, couleur, image });
    res.status(201).json({ ...cat.dataValues, restaurants: 0, plats: 0 });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
};

const updateCategorie = async (req, res) => {
  const { nom, description, couleur, image } = req.body;
  try {
    const cat = await Categorie.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: "Catégorie introuvable" });

    await cat.update({
      nom: nom ? nom.trim() : cat.nom,
      description: description ?? cat.description,
      couleur: couleur ?? cat.couleur,
      image: image ?? cat.image,
    });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
};

const deleteCategorie = async (req, res) => {
  try {
    const cat = await Categorie.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ message: "Catégorie introuvable" });

    
    // pour que Sequelize trouve bien les plats liés
    const nbPlats = await Plat.count({ where: { categorieId: cat.id } });
    
    if (nbPlats > 0) {
      return res.status(409).json({
        message: `Impossible : ${nbPlats} plat(s) sont rattachés à cette catégorie.`,
      });
    }

    await cat.destroy();
    res.json({ success: true });
  } catch (err) {
    console.error("deleteCategorie erreur :", err.message);
    res.status(500).json({ message: "Erreur serveur", detail: err.message });
  }
};

module.exports = { getCategories, getCategorieById, createCategorie, updateCategorie, deleteCategorie };