import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const inputClass =
  "w-[92%] bg-[#FFF7F4] border border-[#BD897D] p-2.5 rounded-xl outline-none focus:ring-1 focus:ring-[#FF843D] transition-all text-sm";

export default function Login() {
  const [index, setIndex] = useState(0);
  const [showInscription, setShowInscription] = useState(false);
  const [role, setRole] = useState("client");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Détection taille écran
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 10000);
    return () => clearInterval(interval);
  }, [nextImage, index]);

  const slowTransition = { type: "tween", duration: 1.1, ease: "easeInOut" };
  const delayedTransition = { ...slowTransition, delay: 0.3 };

  // ClipPath uniquement sur desktop (>= 1024px)
  const clipPath = isDesktop
    ? showInscription
      ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 100% 0, 90% 100%, 0 100%)"
    : "none";

  return (
    <div className="min-h-screen flex justify-center items-center font-sans relative bg-[#FDE9DC] overflow-hidden px-4 py-8">

      {/* FOND ANIMÉ — visible uniquement desktop */}
      <motion.div
        layout
        transition={delayedTransition}
        className={`hidden lg:block absolute inset-y-0 w-[60%] z-0 overflow-hidden ${
          showInscription ? "right-0" : "left-0"
        }`}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${images[index]})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              clipPath,
            }}
          />
        </AnimatePresence>
      </motion.div>

      {/* COULEUR UNIE — visible uniquement desktop */}
      <motion.div
        layout
        transition={delayedTransition}
        className={`hidden lg:block absolute inset-y-0 w-[35%] bg-[#FDE9DC] z-0 ${
          showInscription ? "left-0" : "right-0"
        }`}
      />

      {/* CARTE PRINCIPALE */}
      <motion.div
        layout
        transition={slowTransition}
        className={`
          relative z-10 bg-[#FFF7F1] w-full max-w-[950px]
          rounded-[24px] lg:rounded-[45px]
          flex shadow-2xl p-2
          flex-col
          lg:flex-row
          ${showInscription ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        {/* SECTION IMAGE */}
        <motion.div
          layout
          transition={slowTransition}
          style={{ zIndex: 20 }}
          className="
            relative overflow-hidden
            rounded-t-[20px] lg:rounded-[40px]
            h-[220px] sm:h-[260px] lg:h-auto
            flex-none lg:flex-[1.2]
          "
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.img
              key={index}
              src={images[index]}
              alt="Hero"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute w-full h-full object-cover"
              style={{ clipPath }}
            />
          </AnimatePresence>

          {/* BOUTONS NAVIGATION */}
          <div
            className={`absolute bottom-4 flex gap-3 z-30 ${
              showInscription ? "left-8 lg:left-12" : "right-8 lg:right-12"
            }`}
          >
            <button
              type="button"
              className="bg-[#ff7c48]/60 text-white w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition"
              onClick={prevImage}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="bg-[#ff7c48]/60 text-white w-8 h-8 lg:w-9 lg:h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition"
              onClick={nextImage}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* SECTION FORMULAIRE */}
        <motion.div
          layout
          transition={slowTransition}
          style={{ zIndex: 10 }}
          className="flex-1 p-5 lg:p-8 flex flex-col items-center"
        >
          {/* TOP BAR */}
          <div className="w-full flex justify-between items-center mb-1">
            <div
              className="text-[#951418] font-bold ml-1 cursor-pointer text-sm lg:text-base"
              onClick={() => setShowInscription(false)}
            >
              <span>P</span>Latigo
            </div>
            {showInscription && (
              <div className="flex bg-[#FFE2D3] rounded-full p-1 shadow-md">
                <button
                  type="button"
                  onClick={() => setRole("client")}
                  className={`px-3 lg:px-4 py-1 text-xs lg:text-sm font-medium rounded-full transition ${
                    role === "client"
                      ? "bg-[#FF7031] text-white"
                      : "text-[#951418]"
                  }`}
                >
                  Client
                </button>
                <button
                  type="button"
                  onClick={() => setRole("restaurateur")}
                  className={`px-3 lg:px-4 py-1 text-xs lg:text-sm font-medium rounded-full transition ${
                    role === "restaurateur"
                      ? "bg-[#FF7031] text-white"
                      : "text-[#951418]"
                  }`}
                >
                  Restaurateur
                </button>
              </div>
            )}
          </div>

          {/* TITRE */}
          {showInscription ? (
            <h1 className="text-[#951418] text-2xl lg:text-4xl mb-2 font-semibold">
              {role === "client" ? "Client" : "Restaurateur"}
            </h1>
          ) : (
            <h1 className="text-[#951418] text-4xl lg:text-6xl mb-6 lg:mb-12 font-semibold mt-2 lg:mt-4">
              Welcome
            </h1>
          )}

          {/* CHAMPS */}
          <div className="w-full flex flex-col items-center gap-3 mb-2">
            {showInscription ? (
              <form className="w-full flex flex-col items-center gap-2 max-h-[38vh] lg:max-h-none overflow-y-auto pr-1">
                {role === "client" ? (
                  <>
                    <input type="text" placeholder="Nom" className={inputClass} />
                    <input type="text" placeholder="Prénom" className={inputClass} />
                    <input type="email" placeholder="Email" className={inputClass} />
                    <input type="password" placeholder="Mot de passe" className={inputClass} />
                    <input type="tel" placeholder="Numéro de tél." className={inputClass} />
                    <input type="text" placeholder="Adresse" className={inputClass} />
                  </>
                ) : (
                  <>
                    <input type="text" placeholder="Nom du Restaurant" className={inputClass} />
                    <input type="text" placeholder="Adresse du restaurant" className={inputClass} />
                    <input type="email" placeholder="Email pro" className={inputClass} />
                    <input type="password" placeholder="Mot de passe" className={inputClass} />
                    <input type="tel" placeholder="Téléphone du restaurant" className={inputClass} />
                    <input type="text" placeholder="Numéro de Registre du commerce" className={inputClass} />
                    <div className="w-[92%] relative">
                      <input
                        type="file"
                        id="file-upload"
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <label
                        htmlFor="file-upload"
                        className="text-[#951418] block p-2.5 border border-[#BD897D] rounded-xl bg-[#FFF7F4] text-center cursor-pointer text-sm"
                      >
                        Télécharger document officiel
                      </label>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-[92%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none focus:ring-1 focus:ring-[#FF843D] transition-all text-sm"
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="w-[92%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none focus:ring-1 focus:ring-[#FF843D] transition-all text-sm"
                />
              </>
            )}
          </div>

          {/* MOT DE PASSE OUBLIÉ */}
          {!showInscription && (
            <div className="w-[89%] mb-5 lg:mb-8">
              <a href="#" className="text-xs text-gray-700">
                Mot de passe oublié ?
              </a>
            </div>
          )}

          {/* BOUTONS */}
          <div className="flex w-[92%] gap-3 mb-3 mt-1">
            <button
              onClick={() => setShowInscription(!showInscription)}
              className="flex-1 bg-[#951418] py-2.5 rounded-xl text-white font-bold hover:bg-[#7a1012] transition duration-100 shadow-md text-sm"
            >
              {showInscription ? "Annuler" : "S'inscrire"}
            </button>
            <button className="flex-1 bg-[#FF7031] py-2.5 rounded-xl text-white font-bold hover:bg-[#e65f25] transition duration-100 shadow-md text-sm">
              {showInscription ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          {/* FOOTER */}
          <footer className="text-[10px] text-gray-500 text-center px-3 mt-1">
            En continuant, vous acceptez nos{" "}
            <span className="text-[#8b2323] font-bold">conditions d'utilisation</span>
            , et notre{" "}
            <span className="text-[#8b2323] font-bold">politique de confidentialité</span>.
          </footer>
        </motion.div>
      </motion.div>
    </div>
  );
}