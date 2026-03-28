import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";

const images = [img1, img2, img3, img4];

export default function InscriptionClient() {
  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex justify-center items-center font-sans relative bg-[#FDE9DC]">
      
      {/* SECTION DROITE : Image de fond */}
      <div
        className="absolute inset-y-0 right-0 w-[60%] z-0"
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)"
        }}
      ></div>

      {/* SECTION GAUCHE : Couleur unie */}
      <div className="absolute inset-y-0 left-0 w-[40%] bg-[#FDE9DC] z-0"></div>

      {/* Carte principale */}
      <div className="relative z-10 bg-[#FFF7F1] w-[950px] h-[580px] rounded-[45px] flex flex-row-reverse p-2 shadow-2xl">
        
        {/* IMAGE (à droite maintenant) */}
        <div className="flex-[1.2] relative rounded-[40px] overflow-hidden">
          <img
            src={images[index]}
            alt="Hero"
            className="w-full h-full object-cover"
            style={{
              clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)"
            }}
          />

          {/* Flèches */}
          <div className="absolute bottom-8 left-12 flex gap-3">
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
        </div>

        {/* FORMULAIRE (à gauche maintenant) */}
        <div className="flex-1 p-8 flex flex-col items-center">
          <div className="self-start text-[#951418] font-bold mb-4 ml-4">
            LOGO
          </div>

          <h1 className="text-[#951418] text-6xl mb-12 font-semibold mt-4">
            Welcome
          </h1>

          <div className="w-full flex flex-col items-center gap-4 mb-2">
            <input
              type="email"
              placeholder="Email"
              className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none hover:shadow-[0_5px_15px_rgba(255,124,72,0.4)] transition"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none hover:shadow-[0_5px_15px_rgba(255,124,72,0.4)] transition"
            />
          </div>

          <div className="w-[82%] mb-8">
            <a href="#" className="text-xs text-gray-700">
              Mot de passe oublié ?
            </a>
          </div>

          <div className="flex items-center w-[85%] mb-8">
            <hr className="flex-1 border-gray-300" />
            <span className="px-3 text-xs text-gray-400">ou</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="flex w-[90%] gap-2 mb-8">
            <button className="flex-1 bg-[#951418] p-3 rounded-3xl text-white font-bold hover:bg-[#7a1012] transition shadow-md">
              S'inscrire
            </button>
            <button className="flex-1 bg-[#FF7031] p-3 rounded-3xl text-white font-bold hover:bg-[#e65f25] transition shadow-md">
              Se connecter
            </button>
          </div>

          <footer className="text-[10px] text-gray-500 text-center px-4">
            En continuant, vous acceptez nos{" "}
            <span className="text-[#8b2323] font-bold">
              conditions d'utilisation
            </span>{" "}
            et notre{" "}
            <span className="text-[#8b2323] font-bold">
              politique de confidentialité
            </span>.
          </footer>
        </div>
      </div>
    </div>
  );
}