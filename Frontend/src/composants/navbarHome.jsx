import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Recherche from "./rechercheInput"; 
import logoImage from "../assets/Design-logo .png";
function NavbarHome({ panierCount, onTogglePanier, plats, setTexteRecherche, montrerPanier }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#FFF9F5]/95 backdrop-blur-md border-b border-gray-100 fixed top-0 left-0 w-full h-[80px] md:h-[100px] px-6 md:px-20 z-[200] flex justify-between items-center shadow-sm">
      
      {/* LOGO - Identique Figma avec Image + Texte */}
<div 
  onClick={() => navigate("/home")}
  className="flex items-center gap-3 cursor-pointer group"
>
  {/* L'IMAGE DU LOGO */}
  <img 
    src={logoImage}
    alt="Logo Platigo" 
    className="h-15 w-15 md:h-12 md:w-12 object-contain transition-transform group-hover:scale-110" 
  />

  {/* LE TEXTE DU LOGO */}
  <span className="text-secondary text-2xl sm:text-3xl md:text-2xl font-black tracking-tighter uppercase">
    Platigo
  </span>
</div>

      {/* BLOC DROIT : RECHERCHE + ACTIONS */}
      <div className="flex items-center gap-3 md:gap-8">
        
        {/* RECHERCHE - On passe les props pour filtrer le Home */}
        <div className="hidden sm:block">
          <Recherche produits={plats} setProduitsFiltres={setTexteRecherche} />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* BOUTON PANIER - Style Figma avec badge */}
          <button
            className={`p-3 md:p-4 rounded-2xl transition-all relative ${
              montrerPanier 
              ? "bg-[#FE7D32] text-white shadow-lg scale-95" 
              : "bg-white text-[#FE7D32] hover:bg-orange-50 shadow-sm border border-gray-50"
            }`}
            onClick={onTogglePanier}
          >
            <FaShoppingCart className={`text-xl md:text-2xl ${montrerPanier ? "text-white" : "text-[#FE7D32]"}`} />
            
            {panierCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] md:text-[12px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#FFF9F5] shadow-sm">
                {panierCount}
              </span>
            )}
          </button>

          {/* BOUTON PROFIL */}
          <button 
            className="p-3 md:p-4 rounded-2xl bg-white text-[#FE7D32] hover:bg-orange-50 shadow-sm border border-gray-50 transition-all"
            onClick={() => navigate("/profil")}
          >
            <FaUser className="text-xl md:text-2xl" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavbarHome;