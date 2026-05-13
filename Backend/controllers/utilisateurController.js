const bcrypt = require('bcryptjs')
const { Utilisateur } = require('../models');

const getRestaurateurs = async (req, res) => {
  try {
    const restaurateurs = await Utilisateur.findAll({
      where: { role: 'restaurateur' },
      attributes: ['id', 'email', 'nomRestaurant', 'adresseRestaurant', 'numeroRegistre', 'statut', 'nom', 'prenom']
    });
    res.json(restaurateurs);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const deleteRestaurateur = async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateur = await Utilisateur.findOne({ where: { id, role: 'restaurateur' } });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Restaurateur non trouvé' });
    }
    await utilisateur.destroy();
    res.json({ message: 'Restaurateur supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

const getProfil = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id, {
      attributes: ['nom', 'prenom', 'email', 'telephone', 'adresse']
    });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const updateProfil = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse } = req.body;
    const utilisateur = await Utilisateur.findByPk(req.user.id);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    if (email && email !== utilisateur.email) {
      const emailExistant = await Utilisateur.findOne({ where: { email } });
      if (emailExistant) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé' });
      }
    }
    if (telephone && telephone !== utilisateur.telephone) {
      const telExistant = await Utilisateur.findOne({ where: { telephone } });
      if (telExistant) {
        return res.status(400).json({ message: 'Ce téléphone est déjà utilisé' });
      }
    }
    await utilisateur.update({ nom, prenom, email, telephone, adresse });
    await utilisateur.reload();
    res.status(200).json({
      message: 'Profil mis à jour avec succès',
      utilisateur: {
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        email: utilisateur.email,
        telephone: utilisateur.telephone,
        adresse: utilisateur.adresse
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

const changerMotDePasse = async (req, res) => {
  try {
    const { nouveauMotDePasse } = req.body
    const utilisateur = await Utilisateur.findByPk(req.user.id)
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }
    const hash = await bcrypt.hash(nouveauMotDePasse, 10)
    await utilisateur.update({ motDePasse: hash })
    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

const supprimerCompte = async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findByPk(req.user.id)
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }
    await utilisateur.destroy()
    res.status(200).json({ message: 'Compte supprimé avec succès' })
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message })
  }
}

module.exports = { getRestaurateurs, deleteRestaurateur, getProfil, updateProfil, changerMotDePasse, supprimerCompte };