const bcrypt = require("bcrypt");
const { Utilisateur } = require("./models/index");
require("dotenv").config();

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Utilisateur.create({
    email:    "admin@platigo.com",
    motDePasse: hashedPassword,
    role:     "admin",
    // Champs client — null pour admin
    nom:      null,
    prenom:   null,
    telephone: null,
    adresse:  null,
    // Champs restaurateur — null pour admin
    nomRestaurant:     null,
    adresseRestaurant: null,
    numeroRegistre:    null,
    documentOfficiel:  null,
    statut:            null,
  });

  console.log("Admin créé");
  process.exit();
};

createAdmin();