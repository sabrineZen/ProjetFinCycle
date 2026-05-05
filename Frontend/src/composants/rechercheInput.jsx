import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Recherche({ setProduitsFiltres }) {
  const [afficherInput, setAfficherInput] = useState(false);
  const [texte, setTexte] = useState("");

  // Fonction pour scroller vers les plats
  const scrollToPlats = () => {
    const element = document.getElementById("plats-populaires");
    if (element) {
      const offset = 120; // Pour ne pas coller à la Navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleChange = (e) => {
    const newTexte = e.target.value;
    setTexte(newTexte);

    if (setProduitsFiltres) {
      setProduitsFiltres(newTexte);
    }

    // SI l'utilisateur tape quelque chose (au moins 1 caractère)
    // ALORS on descend vers la section des plats
    if (newTexte.length === 1) {
      scrollToPlats();
    }
  };

  const handleBlur = () => {
    if (texte.trim() === "") {
      setAfficherInput(false);
    }
  };

  const handleClose = () => {
    setTexte("");
    if (setProduitsFiltres) setProduitsFiltres("");
    setAfficherInput(false);
    // Optionnel : remonter en haut quand on ferme la recherche
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2 relative">
      {afficherInput && (
        <div className="absolute right-10 md:relative md:right-0 flex items-center">
          <input
            autoFocus
            type="text"
            placeholder="Rechercher un plat..."
            value={texte}
            onChange={handleChange}
            onBlur={handleBlur}
            className="
              bg-transparent border-b border-current/20 p-1 
              w-32 sm:w-48 md:w-56 lg:w-64
              text-inherit placeholder-current/40 text-[11px] md:text-sm
              focus:outline-none focus:border-current transition-all duration-300
            "
          />
          {texte && (
            <button
              onClick={handleClose}
              className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 text-[10px] p-1"
            >
              ✕
            </button>
          )}
        </div>
      )}
      
      <button
        className={`p-2.5 rounded-full transition-all duration-300 ${
          afficherInput ? "bg-[#FE7D32]/10 shadow-inner" : "hover:bg-orange-100"
        }`}
        onClick={() => setAfficherInput(!afficherInput)}
      >
        <FaSearch className="text-[#FE7D32] h-4 w-4 md:h-5 md:w-5" />
      </button>
    </div>
  );
}

export default Recherche;