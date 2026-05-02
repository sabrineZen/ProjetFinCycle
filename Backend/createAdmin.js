const bcrypt = require("bcrypt");
const { Utilisateur } = require("./models/index");
require("dotenv").config();

const createAdmin = async () => {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    
    await Utilisateur.create({
        email: "admin@platigo.com",
        motDePasse: hashedPassword,
        role: "admin"
    });

    console.log("✅ Admin créé !");
    process.exit();
};

createAdmin();