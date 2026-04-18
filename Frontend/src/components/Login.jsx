import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; 
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";

const images = [img1, img2, img3, img4,img5,img6,img7,img8,img9,img10];

export default function Login() {
  const [index, setIndex] = useState(0);
  const [showInscription, setShowInscription] = useState(false);
  const [role, setRole] = useState("client");

  // Fonctions de navigation stabilisées pour le timer
  const nextImage = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Logique de défilement automatique (Reset au clic manuel)
  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 10000); // 10 secondes

    return () => clearInterval(interval);
  }, [nextImage, index]);

  // Transition lente de base (1.1s)
  const slowTransition = { type: "tween", duration: 1.1, ease: "easeInOut" };

  // --- MODIFICATION ICI : Transition avec RETARD (Delay) ---
  // On garde la même durée (1.1s), mais on attend 0.4s avant de commencer.
  const delayedTransition = { ...slowTransition, delay: 0.2 };

  return (
    <div className="min-h-screen flex justify-center items-center font-sans relative bg-[#FDE9DC] overflow-hidden">
      
      {/* IMAGE DE FOND ANIMÉE AVEC RETARD */}
      <motion.div 
        layout
        transition={delayedTransition} // <-- Utilisation de la transition retardée
        className={`absolute inset-y-0 w-[60%] z-0 ${showInscription ? "right-0" : "left-0"}`}
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          clipPath: showInscription 
            ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" 
            : "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
        }}
      />

      {/* COULEUR UNIE ANIMÉE AVEC RETARD */}
      <motion.div 
        layout
        transition={delayedTransition} // <-- Utilisation de la transition retardée
        className={`absolute inset-y-0 w-[35%] bg-[#FDE9DC] z-0 ${showInscription ? "left-0" : "right-0"}`}
      />

      {/* CARTE PRINCIPALE (S'anime IMMÉDIATEMENT) */}
      <motion.div 
        layout
        transition={slowTransition} // <-- S'anime tout de suite
        className={`relative z-10 bg-[#FFF7F1] w-[950px] h-[580px] rounded-[45px] flex p-2 shadow-2xl ${
          showInscription ? "flex-row-reverse" : "flex-row"
        }`}
      >
        
        {/* SECTION IMAGE DANS LA CARTE */}
        <motion.div 
          layout 
          transition={slowTransition}
          style={{ zIndex: 20 }} 
          className="flex-[1.2] relative rounded-[40px] overflow-hidden"
        >
          {/* Petite animation de fondu lors du changement d'image auto */}
          <motion.img
            key={index}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={images[index]}
            alt="Hero"
            className="w-full h-full object-cover"
            style={{ 
              clipPath: showInscription 
                ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" 
                : "polygon(0 0, 100% 0, 90% 100%, 0 100%)" 
            }}
          />

          <div className={`absolute bottom-8 flex gap-3 ${showInscription ? "left-12" : "right-12"}`}>
            <div
              className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition"
              onClick={prevImage}
            >
              <ChevronLeft size={18} />
            </div>
            <div
              className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition"
              onClick={nextImage}
            >
              <ChevronRight size={18} />
            </div>
          </div>
        </motion.div>

        {/* SECTION FORMULAIRE (Inchangée) */}
        <motion.div 
          layout 
          transition={slowTransition}
          style={{ zIndex: 10 }}
          className="flex-1 p-8 flex flex-col items-center"
        >
          {/* HEADER AVEC LOGO + ROLE */}
          <div className="w-full flex justify-between items-center mb-1">
            <div className="text-[#951418] font-bold ml-2 cursor-pointer" onClick={() => setShowInscription(false)}>
              <span className="">P</span>Latigo
            </div>
            {showInscription && (
              <div className="flex bg-[#FFE2D3] rounded-full p-1 mr-0 shadow-md">
                <button type="button" onClick={() => setRole("client")} className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "client" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>Client</button>
                <button type="button" onClick={() => setRole("restaurateur")} className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "restaurateur" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>Restaurateur</button>
              </div>
            )}
          </div>

          {/* TITRE */}
          {showInscription ? (
            <h1 className="text-[#951418] text-4xl mb-2 font-semibold mt-0">
              {role === "client" ? "Client" : "Restaurateur"}
            </h1>
          ) : (
            <h1 className="text-[#951418] text-6xl mb-12 font-semibold mt-4">Welcome</h1>
          )}

          <div className="w-full flex flex-col items-center gap-4 mb-2">
            {showInscription ? (
              <form className="w-full flex flex-col items-center gap-2">
                {role === "client" ? (
                  <>
                    <input type="text" placeholder="Nom" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="text" placeholder="Prénom" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="email" placeholder="Email" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="password" placeholder="Mot de passe" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="tel" placeholder="Numéro de tél." className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="text" placeholder="Adresse" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                  </>
                ) : (
                  <>
                    <input type="text" placeholder="Nom du Restaurant" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="text" placeholder="Adresse du restaurant" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="email" placeholder="Email pro" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="password" placeholder="Mot de passe" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="tel" placeholder="Téléphone du restaurant" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <input type="text" placeholder="Numéro de Registre du commerce" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none" />
                    <div className="w-[85%] relative">
                      <input type="file" id="file-upload" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                      <label htmlFor="file-upload" className="text-[#951418] block p-2 border border-[#BD897D] rounded-xl bg-[#FFF7F4] text-center cursor-pointer">Télécharger document officiel</label>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <>
                <input type="email" placeholder="Email" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none" />
                <input type="password" placeholder="Mot de passe" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none" />
              </>
            )}
          </div>

          {!showInscription && (
            <div className="w-[82%] mb-8">
              <a href="#" className="text-xs text-gray-700">Mot de passe oublié ?</a>
            </div>
          )}

          <div className="flex w-[90%] gap-2 mb-3 mt-1">
            <button onClick={() => setShowInscription(!showInscription)} className="flex-1 bg-[#951418] p-3 rounded-3xl text-white font-bold hover:bg-[#7a1012] transition duration-100 shadow-md">
              {showInscription ? "Annuler" : "Inscrire"}
            </button>
            <button className="flex-1 bg-[#FF7031] p-3 rounded-3xl text-white font-bold hover:bg-[#e65f25] transition duration-100 shadow-md">
              {showInscription ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          <footer className="text-[10px] text-gray-500 text-center px-4">
            En continuant, vous acceptez nos <span className="text-[#8b2323] font-bold">condition d'utilisation</span>, et notre <span className="text-[#8b2323] font-bold">politique de confidentialité</span>.
          </footer>
        </motion.div>
      </motion.div>
    </div>
  );
}