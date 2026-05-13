import { MdOutlineLanguage } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Parametre() {
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState("")
  const token = localStorage.getItem("token")
  const navigate = useNavigate()

  function changerMotDePasse() {
    if (!nouveauMotDePasse) {
      alert("Entrez un nouveau mot de passe")
      return
    }

    fetch("http://localhost:5000/api/utilisateurs/motdepasse", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ nouveauMotDePasse: nouveauMotDePasse })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message)
      setNouveauMotDePasse("")
    })
  }

  function supprimerCompte() {
    const confirmation = window.confirm("Êtes-vous sûr ? Cette action est irréversible !")
    if (!confirmation) return

    fetch("http://localhost:5000/api/utilisateurs/supprimer", {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message)
      localStorage.removeItem("token")
      navigate("/")
    })
  }

  return (
    <div className="space-y-6">

      {/* Langue */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <MdOutlineLanguage className="text-[#FF6900] text-xl" />
          <p className="font-bold" style={{ color: '#8B2A1B' }}>Langues</p>
        </div>
        <div className="relative">
          <select className="w-full bg-[#FFF0E8] rounded-xl px-4 py-3 appearance-none outline-none">
            <option>Français</option>
            <option>English</option>
          </select>
          <IoChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
      </div>

      {/* Sécurité */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <IoLockClosed className="text-[#FF6900] text-xl" />
          <p className="font-bold" style={{ color: '#8B2A1B' }}>Securité</p>
        </div>
        <div className="bg-[#FFF0E8] rounded-xl p-4 space-y-3">
          <p className="font-semibold text-[#8B2A1B]">Modifier Mot passe</p>
          <div className="flex items-center bg-white rounded-lg px-3 py-2">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={nouveauMotDePasse}
              onChange={e => setNouveauMotDePasse(e.target.value)}
              className="outline-none bg-transparent w-full"
            />
          </div>
          <button onClick={changerMotDePasse} className="bg-[#FF6900] text-white px-4 py-2 rounded-lg">
            Mettre a jour
          </button>
        </div>
      </div>

      {/* Supprimer compte */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <RiDeleteBinLine className="text-red-500 text-xl" />
          <p className="font-bold" style={{ color: '#8B2A1B' }}>Compte</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4">
          <p className="font-semibold text-red-500">Supprimer Mon compte</p>
          <p className="text-red-400 text-sm mt-1">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
          <button onClick={supprimerCompte} className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg">
            Supprimer le Compte
          </button>
        </div>
      </div>

    </div>
  )
}

export default Parametre