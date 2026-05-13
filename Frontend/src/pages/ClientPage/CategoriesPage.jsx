import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Composants
import NavbarHome from "../../composants/navbarHome";
import PlatPopular from "../../composants/platPopular"; 
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";

// RÉCUPÉRATION DES PROPS GLOBAL (panier, setPanier, ajouterAuPanier)
function CategoriesPage({ panier, setPanier, ajouterAuPanier }) {
  const location = useLocation();
  const navigate = useNavigate();
  const stateRecu = location.state;

  // ─── ÉTATS LOCAUX ───
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texteRecherche, setTexteRecherche] = useState(""); 

  // Ta base de données locale
  const categories = [
    { 
        id: 1, nom: "Plats Traditionnel", 
        plats: [
            { id: 11, name: "Couscous", prix: 450, image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80" }, 
            { id: 12, name: "Rechta", prix: 380, image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80" }, 
            { id: 13, name: "Chakhchoukha", prix: 400, image: "https://images.unsplash.com/photo-1589113103503-4966640c5780?auto=format&fit=crop&w=800&q=80" }
        ] 
    },
    { 
        id: 2, nom: "Grillades", 
        plats: [
            { id: 21, name: "Brochettes Viande", prix: 350, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80" }, 
            { id: 22, name: "Kefta", prix: 300, image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80" }
        ] 
    },
    { 
        id: 3, nom: "Fast Food", 
        plats: [
            { id: 31, name: "Burger Maison", prix: 250, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" }, 
            { id: 32, name: "Pizza Rapide", prix: 280, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" }
        ] 
    },
    { id: 4, nom: "Salades", plats: [{ id: 41, name: "Salade Mechouia", prix: 180, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" }] },
    { id: 5, nom: "Dessert", plats: [{ id: 51, name: "Baklawa", prix: 200, image: "https://images.unsplash.com/photo-1519676867240-f031ee04a113?auto=format&fit=crop&w=800&q=80" }] },
    { id: 6, nom: "Boissons", plats: [{ id: 61, name: "Jus Citron", prix: 120, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80" }] },
    { id: 7, nom: "Plats Asiatique", plats: [{ id: 71, name: "Sushi Maison", prix: 450, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80" }] },
    { id: 8, nom: "Plats africains", plats: [{ id: 81, name: "Poulet Yassa", prix: 400, image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=80" }] }
  ];

  const idAChercher = stateRecu?.id || stateRecu?.catId;
  const catAfficher = categories.find((cat) => String(cat.id) === String(idAChercher));

  // ─── LOGIQUE DE FILTRATION ───
  const platsFiltrés = catAfficher?.plats.filter((plat) =>
    plat.name.toLowerCase().includes(texteRecherche.toLowerCase())
  ) || [];

  // SI CATÉGORIE NON TROUVÉE
  if (!catAfficher) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FFF9F5]">
        <h2 className="text-2xl font-black text-secondary mb-4 uppercase">Catégorie introuvable</h2>
        <button onClick={() => navigate("/homeClient")} className="bg-[#FE7D32] text-white px-8 py-3 rounded-full font-bold shadow-lg">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen font-sans">
      
      {/* NAVBAR (Connectée au panier global) */}
      <NavbarHome 
        panierCount={panier.length} 
        onTogglePanier={() => setMontrerPanier(!montrerPanier)} 
        plats={catAfficher.plats} 
        setTexteRecherche={setTexteRecherche} 
        montrerPanier={montrerPanier}
      />

      {/* PANIER FLOTTANT */}
      <AnimatePresence>
        {montrerPanier && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="z-[300]"
          >
            <Panier 
              produits={panier} 
              setPanier={setPanier} 
              onClose={() => setMontrerPanier(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow pt-32 md:pt-40 px-6 md:px-20 max-w-[1600px] mx-auto w-full">
        <header className="mb-12">
          <p className="text-[#FE7D32] text-xs font-bold uppercase tracking-[4px] mb-2">Nos délices</p>
          <h1 className="text-4xl md:text-6xl font-black text-secondary uppercase tracking-tighter">
            {catAfficher.nom}
          </h1>
          <div className="h-1.5 w-24 bg-[#FE7D32] mt-4 rounded-full"></div>
        </header>

        {/* AFFICHAGE DES RÉSULTATS */}
        {platsFiltrés.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-24">
            {platsFiltrés.map((plat, index) => (
              <motion.div
                key={plat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PlatPopular 
                  plat={plat} 
                  onAjouter={() => ajouterAuPanier(plat)} // Appelle la fonction de App.js
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
                Aucun plat ne correspond à "{texteRecherche}"
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CategoriesPage;