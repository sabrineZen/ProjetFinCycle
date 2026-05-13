const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { sequelize } = require('./models'); 

// Charger les variables d'environnement
dotenv.config();

const app = express();

// ── Middlewares de base ──
app.use(cors());
app.use(express.json());

// ── Gestion des Images (Dossier Uploads) ──
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));
console.log("Dossier des images configuré sur :", uploadsPath);

// ── Imports des Routes ──
const authRoutes         = require('./routes/authRoutes');
const clientRoutes       = require('./routes/clientRoutes');
const restaurateurRoutes = require('./routes/restaurateurRoutes');
const adminRoutes         = require('./routes/adminRoutes');
const categorieRoutes    = require('./routes/categorieRoutes');
const platRoutes         = require('./routes/platRoutes');
const panierRoutes       = require('./routes/panierRoutes');
const commandeRoutes     = require('./routes/commandeRoutes');
const utilisateurRoutes  = require('./routes/utilisateurRoutes');

// Import des Statistiques (Directement dans le dossier routes)
const statsRoutes        = require("./routes/statsRoutes");

// Utilisation des Routes
app.use('/api/auth',          authRoutes);
app.use('/api/clients',       clientRoutes);
app.use('/api/restaurateurs', restaurateurRoutes);
app.use('/api/admin',         adminRoutes);
app.use('/api/categories',    categorieRoutes);
app.use('/api/plats',         platRoutes);
app.use('/api/panier',        panierRoutes);
app.use('/api/commandes',     commandeRoutes);
app.use('/api/utilisateurs',  utilisateurRoutes);

// Route pour les statistiques globales de l'admin
app.use("/api/admin/statistiques", statsRoutes);

// ── Route de test (Vérification serveur) ──
app.get("/", (req, res) => {
  res.send("Le serveur fonctionne parfaitement");
});

// ── Lancement du Serveur et Connexion BDD ──
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log("Base de données connectée avec succès");
    // .sync({ alter: false }) pour ne pas casser la structure existante
    return sequelize.sync({ alter: false }); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur : http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Erreur critique lors du démarrage :", err.message);
    process.exit(1); 
  });