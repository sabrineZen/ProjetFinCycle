// --- IMPORTATION DES IMAGES ---
import imgTraditionnel from "../assets/Plat traditionnel.png";
import imgGrillades from "../assets/grillades.png";
import imgFastfood from "../assets/fastfood.png";
import imgSalades from "../assets/Salades.png";
import imgDesserts from "../assets/Desserts.png";
import imgBoissons from "../assets/Boissons.png";
import imgAsiatique from "../assets/Plats asiatique.png";
import imgAfricain from "../assets/Plats africains.png";


// 2. Tableau des catégories avec tes couleurs spécifiques
export const categories = [
  { id: 1, name: "Plat traditionnel", image: imgTraditionnel, couleur: "#FCCEC1" },
  { id: 2, name: "Grillades", image: imgGrillades, couleur: "#FF8238" },
  { id: 3, name: "Fastfood", image: imgFastfood, couleur: "#FFD700" },
  { id: 4, name: "Salades", image: imgSalades, couleur: "#FFF9F5" }, // Attention: texte noir ici car fond très clair
  { id: 5, name: "Desserts", image: imgDesserts, couleur: "#FFB391" },
  { id: 6, name: "Boissons", image: imgBoissons, couleur: "#8B2A1B" },
  { id: 7, name: "Plats asiatique", image: imgAsiatique, couleur: "#C76366" },
  { id: 8, name: "Plats africains", image: imgAfricain, couleur: "#FCCEC1" }, // On réutilise la 1ère
];