import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Navbar from "../../composants/Navbar";
import Hero from "../../composants/Hero";
import CardInfo from "../../composants/cardInfo";
import PlatPopular from "../../composants/platPopular";
import RestaurantPopular from "../../composants/retaurantPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";
import ChuteDuCiel from "../../composants/ChuteDuCiel";
import { categories as categoriesData } from "../../data/categories";
import HorizontalWheelScroller from "../../composants/HorizontalWheelScroller";
import videoLuxe from "../../assets/steak-grill.webm";
import { FaTruck, FaChartLine, FaMedal } from "react-icons/fa";

const LundingPage = () => {
  const navigate = useNavigate();

  const catScrollRef = useRef(null);
  const platScrollRef = useRef(null);
  const restScrollRef = useRef(null);
  const mousePos = useRef({ xPercent: 50, activeRef: null });

  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texte, setTexte] = useState("");
  const [isOutOfVideo, setIsOutOfVideo] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setIsOutOfVideo(window.scrollY > 80);
    const scrollInterval = setInterval(() => {
      const { xPercent, activeRef } = mousePos.current;
      if (activeRef?.current) {
        if (xPercent > 65) activeRef.current.scrollLeft += 10;
        else if (xPercent < 35) activeRef.current.scrollLeft -= 10;
      }
    }, 10);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      clearInterval(scrollInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (x, ref) => {
    mousePos.current = { xPercent: x, activeRef: ref };
  };
  const handleMouseLeave = () => {
    mousePos.current = { xPercent: 50, activeRef: null };
  };

  const plats = [
    { id: 1, name: "Pizza Royale",  prix: 15 },
    { id: 2, name: "Burger Truffe", prix: 18 },
    { id: 3, name: "Sushi Gold",    prix: 24 },
    { id: 4, name: "Tacos Deluxe",  prix: 12 },
    { id: 5, name: "Pasta Caviar",  prix: 30 },
  ];

  const restaurantsPopulaires = [
    { id: 1, name: "L'Oasis Dorée"  },
    { id: 2, name: "Le Diamant Noir" },
    { id: 3, name: "Sora Sushi"      },
    { id: 4, name: "La Pergola"      },
    { id: 5, name: "La chakchouka"      },
    { id: 6, name: "La 7amiss"      },
    { id: 7, name: "La kassra"      },
  ];

  const affichagePlats = texte.trim()
    ? plats.filter((p) => p.name.toLowerCase().includes(texte.toLowerCase()))
    : plats;

  return (
    <div
      className="relative w-full flex flex-col font-sans overflow-x-hidden"
      style={{ background: "#FFF9F5" }}
    >

      <Navbar
        isOutOfVideo={isOutOfVideo}
        setMontrerPanier={setMontrerPanier}
        plats={plats}
        setTexte={setTexte}
        navigate={navigate}
      />

      <Hero
        videoLuxe={videoLuxe}
        parallax={parallax}
        handleMouseMoveParallax={(e) =>
          setParallax({
            x: (window.innerWidth  / 2 - e.clientX) / 70,
            y: (window.innerHeight / 2 - e.clientY) / 70,
          })
        }
      />

      {/* ── PANIER ── */}
      <AnimatePresence>
        {montrerPanier && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMontrerPanier(false)}
              className="fixed inset-0 z-[150]"
              style={{ background: "rgba(0,0,0,0.25)", backdropFilter: "blur(3px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1,   y: 0  }}
              exit={{    opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="fixed top-24 right-6 md:right-12 z-[200] w-[90vw] md:w-[400px]"
            >
              <div
                className="overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.97)",
                  borderRadius: "32px",
                  border: "1px solid rgba(26,18,8,0.07)",
                  boxShadow: "0 24px 60px rgba(26,18,8,0.18)",
                  backdropFilter: "blur(24px)",
                }}
              >
                <Panier produits={affichagePlats} onClose={() => setMontrerPanier(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── MAIN ── */}
      <main
        className="relative z-40 -mt-16 px-4 md:px-20 max-w-[1700px] mx-auto w-full"
      >

        {/* CARDS INFO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 pt-10">
          <ChuteDuCiel delay={0}>
            <CardInfo icon={<FaMedal />}     titre="Restaurants prestige" valeur="80+"    couleur="#FF6B2B" />
          </ChuteDuCiel>
          <ChuteDuCiel delay={0.12}>
            <CardInfo icon={<FaChartLine />} titre="Commandes / jour"     valeur="10K"    couleur="#10B981" />
          </ChuteDuCiel>
          <ChuteDuCiel delay={0.24}>
            <CardInfo icon={<FaTruck />}     titre="Livraison moyenne"    valeur="10 min" couleur="#F59E0B" />
          </ChuteDuCiel>
        </div>

        {/* ── UNIVERS ── */}
        <section className="w-full py-6">

          <ChuteDuCiel delay={0}>
            <div
              className="flex items-end justify-between mb-6"
              style={{ padding: "0 0 0 2px" }}
            >
              <div>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#FF6B2B",
                  marginBottom: "4px",
                }}>
                  Explorer
                </p>
                <h2 style={{
                  fontSize: "clamp(24px,3vw,36px)",
                  fontWeight: 900,
                  color: "#1A1208",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}>
                  Univers
                </h2>
              </div>
              <button style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF6B2B",
                letterSpacing: "0.5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.85,
              }}>
                Voir tout →
              </button>
            </div>
          </ChuteDuCiel>

          {/* TON COMPOSANT — INTACT */}
          <ChuteDuCiel delay={0}>
         <HorizontalWheelScroller
  data={categoriesData}
  itemWidth={300}
  renderItem={(cat, isCenter) => (
    <div
      onClick={() => isCenter && navigate("/categoriesPage", { state: cat })}
      className={`relative w-[280px] h-[380px] rounded-[32px] p-7 flex flex-col items-center justify-between border transition-all ${
        isCenter
          ? "border-orange/100 shadow-2xl scale-105"
          : "border-gray/10 opacity-50 pointer-events-none"
      }`}
      /* MODIFICATION ICI : On utilise directement la valeur de l'objet */
      style={{ background: cat.couleur }}
    >
      <div className="w-32 h-32 rounded-full border-[3px] border-white/50 overflow-hidden bg-white/15">
        <img src={cat.image} className="w-full h-full object-cover" />
      </div>
      
      {/* Petit conseil : Ajoute un drop-shadow pour le texte blanc sur les fonds clairs (id: 1) */}
      <h2 className="text-2xl font-black text-white uppercase text-center drop-shadow-md">
        {cat.name}
      </h2>

      <button className="px-7 py-2 bg-white text-black font-black uppercase rounded-full text-xs shadow-sm">
        Découvrir
      </button>
    </div>
  )}
/> 
</ChuteDuCiel>
        </section>

        {/* ── PLATS POPULAIRES ── */}
        <section className="w-full py-10">

          <ChuteDuCiel delay={0}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#FF6B2B",
                  marginBottom: "4px",
                }}>
                  Sélection
                </p>
                <h2 style={{
                  fontSize: "clamp(24px,3vw,36px)",
                  fontWeight: 900,
                  color: "#1A1208",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}>
                  Plats{" "}
                  <span style={{ color: "#FF6B2B" }}>populaires</span>
                </h2>
              </div>
              <button style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF6B2B",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.85,
              }}>
                Voir tout →
              </button>
            </div>
          </ChuteDuCiel>

          {/* TON COMPOSANT — INTACT */}
          <ChuteDuCiel delay={0}>
          <HorizontalWheelScroller
            data={affichagePlats}
            itemWidth={340}
            renderItem={(plat, isCenter) => (
              <div className={`transition-all duration-500 ${
                isCenter ? "scale-110 shadow-2xl" : "scale-90 opacity-40 blur-[1px]"
              }`}>
                <PlatPopular plat={plat} />
              </div>
            )}
          />
          </ChuteDuCiel>
        </section>

        {/* ── RESTAURANTS ÉTOILÉS ── */}
        <section className="w-full py-10">

          <ChuteDuCiel delay={0}>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p style={{
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "#FF6B2B",
                  marginBottom: "4px",
                }}>
                  Premium
                </p>
                <h2 style={{
                  fontSize: "clamp(24px,3vw,36px)",
                  fontWeight: 900,
                  color: "#1A1208",
                  letterSpacing: "-0.5px",
                  lineHeight: 1,
                }}>
                  Restaurants{" "}
                  <span style={{ color: "#FF6B2B" }}>étoilés</span>
                </h2>
              </div>
              <button style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#FF6B2B",
                background: "none",
                border: "none",
                cursor: "pointer",
                opacity: 0.85,
              }}>
                Voir tout →
              </button>
            </div>
          </ChuteDuCiel>

          {/* TON COMPOSANT — INTACT */}
          <ChuteDuCiel delay={0}>
          <HorizontalWheelScroller
            data={restaurantsPopulaires}
            itemWidth={340}
            renderItem={(item, isCenter) => (
              <div className={`transition-all duration-500 ${
                isCenter
                  ? "scale-110 shadow-2xl opacity-100"
                  : "scale-90 opacity-40 blur-[1px] pointer-events-none"
              }`}>
                <RestaurantPopular restaurant={item} />
              </div>
            )}
            
          />
          </ChuteDuCiel>
        </section>

      </main>

      <Footer />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes shine {
          0%   { left: -100%; }
          20%  { left: 125%;  }
          100% { left: 125%;  }
        }
        .group-hover\\:animate-shine { animation: shine 1.6s infinite; }
      `}</style>
    </div>
  );
};
{/* didicasse men kongidimouqratiya*/}
export default LundingPage;