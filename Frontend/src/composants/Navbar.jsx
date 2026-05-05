import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 1. Importation indispensable
import Recherche from "./rechercheInput";
import logoImage from "../assets/Design-logo .png";

const Navbar = ({ isOutOfVideo, setMontrerPanier, plats, setTexte }) => {
  const navigate = useNavigate(); // 2. Initialisation du hook de navigation

  return (
    <div className={`fixed top-0 left-0 right-0 z-[100] flex items-center transition-all duration-500 
      ${isOutOfVideo 
        ? "justify-center md:justify-end px-4 md:px-20 py-2 md:py-8" 
        : "justify-between px-6 md:px-20 py-4 md:py-8" 
      }`}>
      
      {/* --- LOGO --- */}
      {!isOutOfVideo && (
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate("/home")} // Optionnel : clic sur logo retourne au home
          className="cursor-pointer flex-shrink-0 text-white font-black text-xl bg-white/20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 mr-2 overflow-hidden"
        >
          <img 
            src={logoImage} 
            alt="Logo" 
            className="w-full h-full object-contain p-1" 
          />
        </motion.div>
      )}

      {/* --- BARRE DE NAVIGATION --- */}
      <motion.div 
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 rounded-full border shadow-2xl transition-all duration-500 pointer-events-auto
          ${isOutOfVideo 
            ? "bg-white/50 backdrop-blur-md border-gray-100 text-gray-900 w-full md:w-auto shadow-lg" 
            : "bg-white/10 backdrop-blur-md border-white/20 text-white w-[80%] md:w-auto" 
          }`}
      >
        <div className="flex-1 min-w-0">
          <Recherche produits={plats} setProduitsFiltres={setTexte} />
        </div>

        <div className={`h-6 w-[1.5px] mx-1 md:mx-2 transition-colors ${isOutOfVideo ? "bg-gray-300" : "bg-white/30"}`} />

        <div className="flex items-center gap-1 md:gap-3">
          {/* PANIER */}
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={() => setMontrerPanier(true)} 
            className="relative p-1 hover:text-orange-500 transition-colors"
          >
            <FaShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold bg-orange-600 text-white border border-white shadow-sm">
              2
            </span>
          </motion.button>

          {/* PROFIL : C'est ici que la magie opère */}
          <motion.button 
            whileTap={{ scale: 0.9 }} 
            onClick={() => navigate("/profil")} // Redirection vers ProfilPage.jsx
            className="p-1 hover:text-orange-500 transition-colors"
          >
            <FaUser size={16} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;