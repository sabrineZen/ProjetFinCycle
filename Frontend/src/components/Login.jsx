import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion"; 
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const images = [img1, img2, img3, img4];

export default function Login() {
  const [index, setIndex] = useState(0);
  const [showInscription, setShowInscription] = useState(false);

  const prevImage = () => setIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));

  // Réglage de la vitesse (1.3 secondes pour un mouvement bien fluide)
  const slowTransition = { type: "tween", duration: 1.1, ease: "easeInOut" };

  return (
    <div className="min-h-screen flex justify-center items-center font-sans relative bg-[#FDE9DC] overflow-hidden">
      
      {/* IMAGE DE FOND (EXTÉRIEUR) */}
      <motion.div 
        layout
        transition={slowTransition}
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
      ></motion.div>

      {/* COULEUR UNIE (EXTÉRIEUR) */}
      <motion.div 
        layout
        transition={slowTransition}
        className={`absolute inset-y-0 w-[35%] bg-[#FDE9DC] z-0 ${showInscription ? "left-0" : "right-0"}`}
      ></motion.div>

      {/* CARTE BLANCHE PRINCIPALE */}
      <motion.div 
        layout
        transition={slowTransition}
        className={`relative z-10 bg-[#FFF7F1] w-[950px] h-[580px] rounded-[45px] flex p-2 shadow-2xl ${
          showInscription ? "flex-row-reverse" : "flex-row"
        }`}
      >
        
        {/* SECTION IMAGE : zIndex 20 pour passer au-dessus */}
        <motion.div 
          layout 
          transition={slowTransition}
          style={{ zIndex: 20 }} 
          className="flex-[1.2] relative rounded-[40px] overflow-hidden l"
        >
          <img
            src={images[index]}
            alt="Hero"
            className="w-full h-full object-cover"
            style={{ 
              clipPath: showInscription 
                ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" 
                : "polygon(0 0, 100% 0, 90% 100%, 0 100%)" 
            }}
          />

          {/* Boutons flèches */}
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

        {/* SECTION FORMULAIRE : zIndex 10 pour rester en dessous */}
        <motion.div 
          layout 
          transition={slowTransition}
          style={{ zIndex: 10 }}
          className="flex-1 p-8 flex flex-col items-center"
        >
          <div 
            className="self-start text-[#951418] font-bold mb-4 ml-4 cursor-pointer"
            onClick={() => setShowInscription(false)}
          >
            LOGO
          </div>

          {showInscription ? (
          <h1 className="text-[#951418] text-6xl mb-2 font-semibold mt-4 ">
            Client
          </h1>
        ) : (
          <h1 className="text-[#951418] text-6xl mb-12 font-semibold mt-4">
            Welcome
          </h1>
        )}

          <div className="w-full flex flex-col items-center gap-4 mb-2">
            {showInscription ? (
              <>
                <form className="">
                  <input type="text" placeholder="Nom" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                  <input type="text" placeholder="Prénom" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                  <input type="email" placeholder="Email" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                  <input type="password" placeholder="Mot de passe" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                  <input type="tel" placeholder="Numéro de tél." className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                  <input type="text" placeholder="Adresse" className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 mb-2 ml-8 rounded-xl outline-none" />
                </form>
              </>
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

          <div className="flex w-[90%] gap-2 mb-2 mt-4">
  
            {/* BOUTON 1 */}
            <button
              onClick={() => setShowInscription(!showInscription)}
              className="flex-1 bg-[#951418] p-3 rounded-3xl text-white font-bold hover:bg-[#7a1012] transition duration-100 shadow-md"
            >
              {showInscription ? "Annuler" : "Inscrire"}
            </button>

            {/* BOUTON 2 */}
            <button
              onClick={() => {
                if (showInscription) {
                  // ici tu peux ajouter la logique d'inscription
                  console.log("Inscription...");
                } else {
                  // logique de connexion
                  console.log("Connexion...");
                }
              }}
              className="flex-1 bg-[#FF7031] p-3 rounded-3xl text-white font-bold hover:bg-[#e65f25] transition duration-100 shadow-md"
            >
              {showInscription ? "S'inscrire" : "Se connecter"}
            </button>

          </div>

          <footer className="text-[10px] text-gray-500 text-center px-4 ">
            En continuant, vous acceptez nos <span className="text-[#8b2323] font-bold">condition d'utilisation</span>, et notre <span className="text-[#8b2323] font-bold">politique de confidentialité</span>.
          </footer>
        </motion.div>
      </motion.div>
    </div>
  );
}