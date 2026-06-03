import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api";

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

  const [categories, setCategories] = useState([]);
  const [plats, setPlats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoadingCats(true);
      try {
        const [categoriesRes, platsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/plats'),
        ]);

        setCategories(categoriesRes.data || []);
        setPlats((platsRes.data || []).map((plat) => ({
          ...plat,
          name: plat.nom,
          prix: parseFloat(plat.prix),
          categorieId: plat.categorieId,
        })));
      } catch (err) {
        console.error('Erreur fetch catégories ou plats', err);
      } finally {
        setLoadingCats(false);
      }
    };
    loadData();
  }, []);

  const idAChercher = stateRecu?.id || stateRecu?.catId;
  const catAfficher = categories.find((cat) => String(cat.id) === String(idAChercher));

  // ─── LOGIQUE DE FILTRATION ───
  const platsFiltrés = plats.filter((plat) =>
    String(plat.categorieId) === String(catAfficher?.id) &&
    plat.name.toLowerCase().includes(texteRecherche.toLowerCase())
  );

  // ATTENDRE LE CHARGEMENT AVANT D'AFFICHER UNE ERREUR
  if (loadingCats) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FFF9F5]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE7D32]" />
      </div>
    );
  }

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
        plats={platsFiltrés} 
        setTexteRecherche={setTexteRecherche} 
        montrerPanier={montrerPanier}
      />

      {/* PANIER FLOTTANT (Connecté au panier global) */}
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
        {loadingCats ? (
          <div className="text-center py-20">Chargement des catégories...</div>
        ) : platsFiltrés.length > 0 ? (
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
                  onAjouter={() => {
                    const role = localStorage.getItem('role');
                    if (role === 'restaurateur') {
                      alert('Action non autorisée: un restaurateur ne peut pas ajouter au panier client.');
                      return;
                    }
                    ajouterAuPanier(plat);
                  }}
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