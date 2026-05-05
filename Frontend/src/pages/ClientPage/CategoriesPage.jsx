import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Composants
import NavbarHome from "../../composants/navbarHome";
import PlatPopular from "../../composants/platPopular"; 
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";

function CategoriesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateRecu = location.state;

  // ─── ÉTATS ───
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [panier, setPanier] = useState([]);
  const [texteRecherche, setTexteRecherche] = useState(""); // État pour la recherche

  // Ta base de données locale
  const categories = [
    { id: 1, nom: "Plats Traditionnel", plats: [{ id: 11, name: "Couscous", prix: 450, image: "/couscous.png" }, { id: 12, name: "Rechta", prix: 380, image: "/rechta.png" }, { id: 13, name: "Chakhchoukha", prix: 400, image: "/chakh.png" }] },
    { id: 2, nom: "Grillades", plats: [{ id: 21, name: "Brochettes Viande", prix: 350, image: "/broch.png" }, { id: 22, name: "Kefta", prix: 300, image: "/kefta.png" }] },
    { id: 3, nom: "Fast Food", plats: [{ id: 31, name: "Burger Maison", prix: 250, image: "/burger.png" }, { id: 32, name: "Pizza Rapide", prix: 280, image: "/pizza.png" }] },
    { id: 4, nom: "Salades", plats: [{ id: 41, name: "Salade Mechouia", prix: 180, image: "/mechouia.png" }, { id: 42, name: "Salade Niçoise", prix: 200, image: "/nicoise.png" }] },
    { id: 5, nom: "Dessert", plats: [{ id: 51, name: "Baklawa", prix: 200, image: "/baklawa.png" }, { id: 52, name: "Qalb Louz", prix: 180, image: "/qalblouz.png" }] },
    { id: 6, nom: "Boissons", plats: [{ id: 61, name: "Jus Citron", prix: 120, image: "/citron.png" }, { id: 62, name: "Thé Menthe", prix: 80, image: "/the.png" }] },
    { id: 7, nom: "Plats Asiatique", plats: [{ id: 71, name: "Sushi Maison", prix: 450, image: "/sushi.png" }, { id: 72, name: "Riz Cantonais", prix: 350, image: "/riz.png" }] },
    { id: 8, nom: "Plats africains", plats: [{ id: 81, name: "Poulet Yassa", prix: 400, image: "/yassa.png" }, { id: 82, name: "Mafé", prix: 350, image: "/mafe.png" }] }, 
  ];

  const idAChercher = stateRecu?.id || stateRecu?.catId;
  const catAfficher = categories.find((cat) => String(cat.id) === String(idAChercher));

  // ─── LOGIQUE DE FILTRATION ───
  // On filtre les plats de la catégorie selon le texte saisi
  const platsFiltrés = catAfficher?.plats.filter((plat) =>
    plat.name.toLowerCase().includes(texteRecherche.toLowerCase())
  ) || [];

  const ajouterAuPanier = (plat) => {
    setPanier((prev) => [...prev, { ...plat, instanceId: Date.now() }]);
  };

  if (!catAfficher) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FFF9F5]">
        <h2 className="text-2xl font-black text-secondary mb-4 uppercase">Catégorie introuvable</h2>
        <button onClick={() => navigate("/home")} className="bg-[#FE7D32] text-white px-8 py-3 rounded-full font-bold shadow-lg">
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen font-sans">
      {/* NAVBAR : On connecte l'état de recherche ici */}
      <NavbarHome 
        panierCount={panier.length} 
        onTogglePanier={() => setMontrerPanier(!montrerPanier)} 
        plats={catAfficher.plats} // On passe les plats à la navbar si elle en a besoin pour l'auto-suggestion
        setTexteRecherche={setTexteRecherche} // Fonction de mise à jour du texte
        montrerPanier={montrerPanier}
      />

      <AnimatePresence>
        {montrerPanier && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMontrerPanier(false)} className="fixed inset-0 z-[250] bg-black/5 backdrop-blur-[4px]" />
            <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="fixed top-[100px] right-4 md:right-16 z-[300] w-full max-w-[420px]">
              <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-white/50">
                <Panier produits={panier} setPanier={setPanier} onClose={() => setMontrerPanier(false)} />
              </div>
            </motion.div>
          </>
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

        {/* AFFICHAGE DES RÉSULTATS OU MESSAGE VIDE */}
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
                  onAjouter={() => ajouterAuPanier(plat)} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 font-bold uppercase tracking-widest">Aucun plat ne correspond à "{texteRecherche}"</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CategoriesPage;