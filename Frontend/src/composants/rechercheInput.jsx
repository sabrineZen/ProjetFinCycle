import { useState } from "react";
import { FaSearch } from "react-icons/fa";

function Recherche({ setProduitsFiltres }) {
  const [afficherInput, setAfficherInput] = useState(false);
  const [texte, setTexte] = useState("");

  const handleChange = (e) => {
    const newTexte = e.target.value;
    setTexte(newTexte);
    if (setProduitsFiltres) {
      setProduitsFiltres(newTexte);
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
  };

  return (
    <div className="flex items-center gap-2 relative">
      {afficherInput && (
        <div className="relative flex items-center">
          <input
            autoFocus
            type="text"
            placeholder="Rechercher..."
            value={texte}
            onChange={handleChange}
            onBlur={handleBlur}
            /* MODIFICATIONS "SMART" :
               - bg-transparent : il ne cache jamais le fond (glass ou autre)
               - text-inherit : il écrit avec la couleur actuelle de la navbar
               - border-current : la ligne aura la même couleur que le texte
            */
            className="bg-transparent border-b border-current/30 p-2 w-32 sm:w-48 md:w-56 text-inherit placeholder-current opacity-80 focus:opacity-100 focus:outline-none transition-all duration-300"
          />
          {texte && (
            <button
              onClick={handleClose}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
      )}
      <button
        className="p-2 rounded-full hover:bg-current/10 transition-colors"
        onClick={() => setAfficherInput(!afficherInput)}
      >
        <FaSearch className="text-inherit h-5 w-5" />
      </button>
    </div>
  );
}

export default Recherche;