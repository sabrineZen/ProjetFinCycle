const bcrypt = require('bcryptjs');
const { Utilisateur } = require('./models/index'); 
require('dotenv').config();

const createAdmin = async () => {
  try {
    const email = "admin@platigo.com";
    const password = "admin123"; 

    // Vérification si l'admin existe déjà
    const exist = await Utilisateur.findOne({ where: { email } });
    if (exist) {
      console.log("L'admin existe déjà");
      process.exit();
    }

    // Hachage du mot de passe (indispensable pour que bcrypt.compare fonctionne au login)
    const hash = await bcrypt.hash(password, 10);

    // Création avec uniquement le strict nécessaire
    await Utilisateur.create({
      email: email,
      motDePasse: hash,
      role: 'admin'
    });

    console.log("Compte Admin minimaliste créé avec succès");
    console.log("Email :", email);
    console.log("Password :", password);
    
    process.exit();
  } catch (err) {
    console.error("Erreur lors de la création :", err);
    process.exit(1);
  }
};

createAdmin();