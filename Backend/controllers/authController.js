const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Utilisateur, Client, Restaurateur } = require("../models/index");

// ── CONNEXION ──
const login = async (req, res) => {
    try {
        const { email, motDePasse } = req.body;

        const utilisateur = await Utilisateur.findOne({ where: { email } });
        if (!utilisateur) return res.status(404).json({ message: "Email introuvable ❌" });

        const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isMatch) return res.status(401).json({ message: "Mot de passe incorrect ❌" });

        // ✅ Récupère le nom
        let nom = "";
        if (utilisateur.role === "restaurateur") {
            const resto = await Restaurateur.findOne({ where: { utilisateurId: utilisateur.id } });
            nom = resto ? resto.nomRestaurant : "";
        } else if (utilisateur.role === "client") {
            const client = await Client.findOne({ where: { utilisateurId: utilisateur.id } });
            nom = client ? `${client.prenom} ${client.nom}` : "";
        } else if (utilisateur.role === "admin") {
            nom = "Admin";
        }

        const token = jwt.sign(
            { id: utilisateur.id, role: utilisateur.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, role: utilisateur.role, nom }); // ✅ nom ajouté

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── INSCRIPTION CLIENT ──
const registerClient = async (req, res) => {
    try {
        const { nom, prenom, email, motDePasse, telephone, adresse } = req.body;

        const exists = await Utilisateur.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ message: "Email déjà utilisé ❌" });
        }

        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            role: "client"
        });

        await Client.create({
            nom,
            prenom,
            telephone,
            adresse,
            utilisateurId: utilisateur.id
        });

        res.status(201).json({ message: "Compte créé avec succès ✅" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ── INSCRIPTION RESTAURATEUR ──
const registerRestaurateur = async (req, res) => {
    try {
        const { nomRestaurant, adresseRestaurant, email, motDePasse, telephone, numeroRegistre } = req.body;
        const documentOfficiel = req.file ? req.file.filename : null;

        const exists = await Utilisateur.findOne({ where: { email } });
        if (exists) {
            return res.status(400).json({ message: "Email déjà utilisé ❌" });
        }

        const hashedPassword = await bcrypt.hash(motDePasse, 10);

        const utilisateur = await Utilisateur.create({
            email,
            motDePasse: hashedPassword,
            role: "restaurateur"
        });

        await Restaurateur.create({
            nomRestaurant,
            adresseRestaurant,
            telephone,
            numeroRegistre,
            documentOfficiel,
            utilisateurId: utilisateur.id
        });

        res.status(201).json({ message: "Restaurant créé avec succès ✅" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { login, registerClient, registerRestaurateur };