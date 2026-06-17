const { Utilisateur } = require('../models/index');
const bcrypt = require("bcrypt");
//modifier mot de passe client
const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;

    const user = await Utilisateur.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // vérifier ancien mot de passe
    const isMatch = await bcrypt.compare(
      //le mot de passe que l user tape
      ancienMotDePasse,
      //ce qui est stocké dans la base de données
      user.motDePasse
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect" });
    }

    // hash nouveau mot de passe
    const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);

    user.motDePasse = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe mis à jour avec succès" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

  //supprimer compte utilisateur(client)
  //supprimer compte utilisateur(client)
const supprimerMonCompte = async (req, res) => {
  try {
    const { id } = req.body;

    const utilisateur = await Utilisateur.findByPk(id);

    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    await utilisateur.destroy();

    res.json({ message: "Compte supprimé avec succès" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      attributes: ['id', 'nom', 'prenom', 'email', 'telephone', 'adresse', 'role']
    });

    if (!utilisateur) return res.status(404).json({ message: 'Utilisateur introuvable' });

    res.json(utilisateur);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfil = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse } = req.body;

    await Utilisateur.update(
      { nom, prenom, email, telephone, adresse },
      { where: { id: req.user.id } }
    );

    res.json({ message: '✅ Profil mis à jour avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfil, updateProfil, supprimerMonCompte, updatePassword };