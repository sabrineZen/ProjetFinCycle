import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import NavbarHome from "../../composants/navbarHome";
import PlatPopular from "../../composants/platPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";

function CategoriesPage({ panier, setPanier, ajouterAuPanier }) {
  const location = useLocation();
  const navigate = useNavigate();
  const stateRecu = location.state;

  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texteRecherche, setTexteRecherche] = useState("");
  const [categorie, setCategorie] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const id = stateRecu?.id;
    if (!id) { setChargement(false); return; }

    fetch(`/api/categories/${id}`)
      .then(r => r.json())
      .then(data => { 
        console.log("Data reçue:", data); 
        console.log("Plats:", data.Plats); 
        setCategorie(data); 
        setChargement(false); 
      })
      .catch(() => setChargement(false));
  }, [stateRecu]);

  if (chargement) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FFF9F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE7D32]" />
      </div>
    );
  }

  if (!categorie) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FFF9F5]">
        <h2 className="text-2xl font-black text-secondary mb-4 uppercase">Catégorie introuvable</h2>
        <button onClick={() => navigate("/homeClient")} className="bg-[#FE7D32] text-white px-8 py-3 rounded-full font-bold shadow-lg">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const platsFiltrés = (categorie.Plats || []).filter(p =>
    p.nom.toLowerCase().includes(texteRecherche.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen font-sans">

      <NavbarHome
        panierCount={panier.length}
        onTogglePanier={() => setMontrerPanier(!montrerPanier)}
        plats={categorie.Plats || []}
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
            {categorie.nom}
          </h1>
          <div className="h-1.5 w-24 bg-[#FE7D32] mt-4 rounded-full"></div>
        </header>

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
                  plat={{ ...plat, image: plat.image ? `http://localhost:5000/uploads/${plat.image}` : null }}
                  onAjouter={() => ajouterAuPanier(plat)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              {texteRecherche ? `Aucun plat ne correspond à "${texteRecherche}"` : "Aucun plat dans cette catégorie"}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CategoriesPage;