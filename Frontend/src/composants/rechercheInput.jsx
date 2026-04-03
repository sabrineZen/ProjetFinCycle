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
    setProduitsFiltres("");
    setAfficherInput(false);
  };

  return (
    <div className="flex items-center gap-2 relative">
      {afficherInput ? (
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={texte}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded-lg p-2 w-40 sm:w-52 md:w-64 pl-10 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          />
          {texte && (
            <button
              onClick={handleClose}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Effacer"
            >
              ✕
            </button>
          )}
        </div>
      ) : ""}
      <button
        className="p-3 rounded-full hover:bg-orange-100 transition"
        onClick={() => setAfficherInput(!afficherInput)}
      >
        <FaSearch className="text-secondary h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
export default Recherche;