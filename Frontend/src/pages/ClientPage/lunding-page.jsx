import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Tes composants
import CardInfo from "../../composants/cardInfo";
import CategoryCard from "../../composants/categoryCard";
import PlatPopular from "../../composants/platPopular";
import RestaurantPopular from "../../composants/retaurantPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";
import Recherche from "../../composants/rechercheInput";
import ChuteDuCiel from "../../composants/ChuteDuCiel"; // Ton nouveau composant
import { categories as categoriesData } from "../../data/categories";

// Assets & Icons
import videoLuxe from "../../assets/steak-grill.webm";
import { FaShoppingCart, FaUser, FaTruck, FaChartLine, FaMedal } from "react-icons/fa";

const LundingPage = () => {
  const navigate = useNavigate();
  
  // --- REFS POUR LE SCROLL HORIZONTAL ---
  const catScrollRef = useRef(null);
  const platScrollRef = useRef(null);
  const restScrollRef = useRef(null);
  const mousePos = useRef({ xPercent: 50, activeRef: null });
  const scrollInterval = useRef(null);

  // --- ÉTATS ---
  const [showElements, setShowElements] = useState(false);
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texte, setTexte] = useState("");
  const [isOutOfVideo, setIsOutOfVideo] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // --- DONNÉES ---
  const [panier] = useState([
    { id: 1, name: "Pizza Margherita", prix: 102 },
    { id: 2, name: "Burger Classique", prix: 10 },
  ]);

  const categories = categoriesData;
  const plats = [
    { id: 1, name: "Pizza" }, { id: 2, name: "Burger" },
    { id: 3, name: "Sushi" }, { id: 4, name: "Tacos" }, { id: 5, name: "Pâtes" },
  ];
  const restaurantsPopulaires = [
    { id: 1, name: "Pizza Margherita" }, { id: 2, name: "Burger Classique" },
    { id: 3, name: "Sushi California Roll" }, { id: 4, name: "Sushi California Roll" },
  ];

  // --- LOGIQUE FILTRAGE ---
  const affichagePlats = texte.trim() 
    ? plats.filter((p) => p.name.toLowerCase().includes(texte.toLowerCase())) 
    : plats;

  // --- EFFETS ---
  useEffect(() => {
    const handleScroll = () => {
      setIsOutOfVideo(window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setShowElements(true), 500);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Moteur de défilement horizontal fluide
  useEffect(() => {
    scrollInterval.current = setInterval(() => {
      const { xPercent, activeRef } = mousePos.current;
      if (activeRef && activeRef.current) {
        let speed = 0;
        const threshold = 25;
        if (xPercent > (100 - threshold)) speed = (xPercent - (100 - threshold)) * 0.8;
        else if (xPercent < threshold) speed = (xPercent - threshold) * 0.8;
        if (speed !== 0) activeRef.current.scrollLeft += speed;
      }
    }, 16);
    return () => clearInterval(scrollInterval.current);
  }, []);

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---
  const handleMouseMoveParallax = (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 70;
    const y = (window.innerHeight / 2 - e.clientY) / 70;
    setParallax({ x, y });
  };

  const handleMouseMoveScroll = (e, ref) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    const xPercent = ((clientX - left) / width) * 100;
    mousePos.current = { xPercent, activeRef: ref };
  };

  const handleMouseLeave = () => {
    mousePos.current = { xPercent: 50, activeRef: null };
  };

  return (
    <div className="relative w-full bg-[#FFF4EC] flex flex-col font-sans overflow-x-hidden">
      
      {/* --- LOGO GAUCHE --- */}
      <div className="absolute top-0 left-0 z-50 px-6 md:px-20 py-10">
        <div className="flex items-center space-x-4 group cursor-pointer text-white" onClick={() => navigate("/")}>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl bg-white/5 uppercase font-black transition-all duration-700 group-hover:bg-orange-600">P</div>
          <span className="text-2xl font-black tracking-[0.4em] uppercase">PLATIGO</span>
        </div>
      </div>

      {/* --- NAV BAR DROITE FIXE --- */}
      <div className="fixed top-0 right-0 z-[100] px-6 md:px-20 py-10">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center gap-4 sm:gap-6 px-6 py-3 rounded-full border transition-all duration-1000 shadow-2xl ${
            isOutOfVideo 
            ? "bg-orange-500/30 backdrop-blur-2xl border-white/20 text-white" 
            : "bg-white/5 backdrop-blur-md border-white/10 text-white"
          }`}
        >
          <Recherche produits={plats} setProduitsFiltres={setTexte} />
          <div className="w-[1px] h-6 bg-white/20 mx-1" />
          <button onClick={() => setMontrerPanier(!montrerPanier)} className="relative hover:scale-125 transition-transform p-2">
            <FaShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold bg-orange-600 text-white">
              {panier.length}
            </span>
          </button>
          <button onClick={() => navigate("/profil")} className="hover:scale-125 transition-transform p-2"><FaUser size={20} /></button>
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section onMouseMove={handleMouseMoveParallax} className="relative w-full h-screen overflow-hidden bg-black">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 scale-110">
          <source src={videoLuxe} type="video/webm" />
        </video>

        <div 
          style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
          className="relative z-30 h-full flex flex-col justify-center px-8 md:px-24 text-white transition-transform duration-500 ease-out"
        >
          <motion.div initial={{ opacity: 0, y: 30 }} animate={showElements ? { opacity: 1, y: 0 } : {}}>
            <h1 className="text-[14vw] md:text-[11vw] font-black leading-[0.75] uppercase tracking-tighter">
              PLAT<span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>IGO</span>
            </h1>
            <div className="h-[2px] w-40 bg-orange-600 my-10" />
            <p className="text-white/90 text-xl md:text-3xl font-extralight max-w-2xl mb-14 tracking-widest">
              L'excellence culinaire <span className="font-bold border-b-2 border-orange-600">livrée</span> avec élégance.
            </p>
            <button className="group relative overflow-hidden px-16 py-6 bg-orange-600 text-white font-black rounded-full shadow-2xl transition-all hover:scale-105 uppercase tracking-[0.5em] text-xs">
              <span className="relative z-10">Commander Maintenant</span>
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shine" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-40 -mt-16 px-6 md:px-20 max-w-[1700px] mx-auto w-full">
        
        {/* PANIER ANIMÉ */}
        <AnimatePresence>
          {montrerPanier && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-28 right-4 md:right-10 z-[110]"
            >
              <Panier produits={panier} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATS (Effet Chute Cascade) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-44 pt-10">
          <ChuteDuCiel delay={0.1}><CardInfo icon={<FaMedal />} titre="Restaurants" valeur="120+" couleur="linear-gradient(135deg, #FF8339, #FF7629)" /></ChuteDuCiel>
          <ChuteDuCiel delay={0.2}><CardInfo icon={<FaChartLine />} titre="Commandes" valeur="10K" couleur="linear-gradient(135deg, #10B981, #059669)" /></ChuteDuCiel>
          <ChuteDuCiel delay={0.3}><CardInfo icon={<FaTruck />} titre="Livraison" valeur="30 min" couleur="linear-gradient(135deg, #FFAC4A, #FF9544)" /></ChuteDuCiel>
        </div>

        {/* CATÉGORIES */}
        <section className="mb-44">
          <ChuteDuCiel>
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="text-orange-600 font-bold tracking-[0.6em] text-xs uppercase">Sélection Privée</span>
                <h2 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter mt-2">Univers</h2>
              </div>
              <button onClick={() => navigate("/CategoriesAll")} className="text-orange-600 font-bold uppercase tracking-widest text-xs border-b border-orange-600/30 pb-2">Voir tout</button>
            </div>
          </ChuteDuCiel>
          
          <div className="relative overflow-hidden cursor-ew-resize" onMouseMove={(e) => handleMouseMoveScroll(e, catScrollRef)} onMouseLeave={handleMouseLeave}>
            <div ref={catScrollRef} className="flex space-x-12 overflow-x-auto scrollbar-hide pb-12 px-2">
              {categories.map((cat) => (
                <div key={cat.id} className="min-w-[400px] flex-shrink-0 transition-transform duration-700 hover:-translate-y-4">
                  <CategoryCard category={cat} onClick={() => navigate("/categoriesPage", { state: cat })} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATS POPULAIRES (Chaque plat tombe séparément) */}
        <section className="mb-44 relative">
          <ChuteDuCiel>
            <h2 className="text-4xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter text-center mb-24 relative z-10">
              Inspirations <span className="text-orange-500 italic">du moment</span>
            </h2>
          </ChuteDuCiel>
          
          <div className="relative overflow-hidden cursor-ew-resize" onMouseMove={(e) => handleMouseMoveScroll(e, platScrollRef)} onMouseLeave={handleMouseLeave}>
            <div ref={platScrollRef} className="flex space-x-12 overflow-x-auto scrollbar-hide pb-12 px-2">
              {affichagePlats.map((plat, index) => (
                <ChuteDuCiel key={plat.id} delay={index * 0.1}>
                  <div className="min-w-[320px] flex-shrink-0 transition-all hover:scale-110">
                    <PlatPopular plat={plat} />
                  </div>
                </ChuteDuCiel>
              ))}
            </div>
          </div>
        </section>

        {/* RESTAURANTS */}
        <section className="mb-44">
          <ChuteDuCiel>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase mb-16 tracking-tighter border-l-8 border-orange-600 pl-8">Établissements Étoilés</h2>
          </ChuteDuCiel>
          <div className="relative overflow-hidden cursor-ew-resize" onMouseMove={(e) => handleMouseMoveScroll(e, restScrollRef)} onMouseLeave={handleMouseLeave}>
            <div ref={restScrollRef} className="flex space-x-12 overflow-x-auto scrollbar-hide pb-12 px-2">
              {restaurantsPopulaires.map((res, index) => (
                <ChuteDuCiel key={index} delay={index * 0.2}>
                  <div className="min-w-[380px] flex-shrink-0 transition-all hover:grayscale-[0.5]">
                    <RestaurantPopular restaurant={res} />
                  </div>
                </ChuteDuCiel>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* CSS INTERNE */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shine { 0% { left: -100%; } 30% { left: 125%; } 100% { left: 125%; } }
        .group-hover\\:animate-shine { animation: shine 1.2s infinite; }
      `}</style>
    </div>
  );
};

export default LundingPage;