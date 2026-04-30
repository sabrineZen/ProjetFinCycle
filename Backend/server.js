//framework node 
const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
//permettre de modifier les variables d'environnement à partir du fichier .env
dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
sequelize.authenticate()
    .then(() => {
        console.log("Database connection has been established successfully.");
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });

// test route
app.get("/", (req, res) => {
  res.send("hello world 🚀");
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});