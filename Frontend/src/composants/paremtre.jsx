import { MdOutlineLanguage } from "react-icons/md";
import { IoLockClosed } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoChevronDown } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase, FaStar } from "react-icons/fa"
import { MdAddCard } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"
import { useEffect } from "react"
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

  const [adresses, setAdresses] = useState([])
const [rue, setRue] = useState("")
const [ville, setVille] = useState("")
const [pays, setPays] = useState("")
const [type, setType] = useState("domicile")
const [afficherFormulaire, setAfficherFormulaire] = useState(false)

useEffect(() => {
  fetch("http://localhost:5000/api/adresses", {
    headers: { Authorization: "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => setAdresses(data))
}, [])

function ajouterAdresse() {
  fetch("http://localhost:5000/api/adresses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    body: JSON.stringify({ type, rue, ville, pays })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message)
    setAdresses([...adresses, data.adresse])
    setAfficherFormulaire(false)
    setRue(""); setVille(""); setPays("")
  })
}

function definirParDefaut(id) {
  fetch("http://localhost:5000/api/adresses/" + id + "/defaut", {
    method: "PUT",
    headers: { Authorization: "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message)
    setAdresses(adresses.map(a => ({
      ...a,
      parDefaut: a.id === id
    })))
  })
}

function supprimerAdresse(id) {
  const confirmation = window.confirm("Supprimer cette adresse ?")
  if (!confirmation) return

  fetch("http://localhost:5000/api/adresses/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message)
    setAdresses(adresses.filter(a => a.id !== id))
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

      {/*Mes Adresses*/}
       <div className="pb-4 border-b border-gray-200">
           <p className="font-bold mb-3" style={{ color: '#8B2A1B' }}>Mes adresses</p>

           {adresses.map(adresse =>
             <div key={adresse.id} className={"rounded-xl p-4 mb-3 border-2 " + (adresse.parDefaut ? "border-[#FF6900] bg-[#FFF0E8]" : "border-gray-100 bg-white")}>
                <div className="flex items-center justify-between mb-2">
                   <div className="flex items-center gap-2">
                     <div className={"w-10 h-10 rounded-full flex items-center justify-center " + (adresse.parDefaut ? "bg-[#FF6900]" : "bg-gray-100")}>
                        {adresse.type === "domicile" && <FaHome className={"text-xl " + (adresse.parDefaut ? "text-white" : "text-gray-500")} />}
                         {adresse.type === "bureau"   && <FaBriefcase className={"text-xl " + (adresse.parDefaut ? "text-white" : "text-gray-500")} />}
                     </div>
                    <div>
                       <p className="font-bold text-sm" style={{ color: '#8B2A1B' }}>
                       {adresse.type === "domicile" ? "Domicile" : "Bureau"}
                       </p>
                         {adresse.parDefaut && (
                         <span className="text-xs bg-[#FF6900] text-white px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                           <FaStar className="text-xs" /> Par défaut
                         </span>
                        )}
                     </div>
                    </div>
                        <button onClick={() => supprimerAdresse(adresse.id)}>
                          <RiDeleteBinLine className="text-red-400 text-xl" />
                        </button>
                </div>
                  <p className="text-gray-600 text-sm">{adresse.rue}</p>
                  <p className="text-gray-600 text-sm">{adresse.ville}</p>
                  <p className="text-gray-600 text-sm">{adresse.pays}</p>
                  {!adresse.parDefaut && (
                   <button onClick={() => definirParDefaut(adresse.id)} className="mt-2 border-2 border-[#FF6900] text-[#FF6900] px-4 py-1 rounded-lg text-sm font-bold hover:bg-[#FFF0E8]">
                     Définir par défaut
                   </button>
                  )}
      </div>
         )}

  {/* Formulaire ajouter */}
      {afficherFormulaire && (
        <div className="bg-[#FFF0E8] rounded-xl p-4 space-y-3 mb-3">
          <select value={type} onChange={e => setType(e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 outline-none">
            <option value="domicile">Domicile</option>
            <option value="bureau">Bureau</option>
            <option value="autre">Autre</option>
          </select>
          <input type="text" placeholder="Rue" value={rue} onChange={e => setRue(e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 outline-none" />
          <input type="text" placeholder="Ville" value={ville} onChange={e => setVille(e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 outline-none" />
          <input type="text" placeholder="Pays" value={pays} onChange={e => setPays(e.target.value)} className="w-full bg-white rounded-lg px-3 py-2 outline-none" />
          <div className="flex gap-2">
               <button onClick={ajouterAdresse} className="bg-[#FF6900] text-white px-4 py-2 rounded-lg">Ajouter</button>
               <button onClick={() => setAfficherFormulaire(false)} className="border border-gray-300 px-4 py-2 rounded-lg">Annuler</button>
          </div>
       </div>
     )}

          <button onClick={() => setAfficherFormulaire(true)} className="flex items-center gap-2 border-2 border-[#FF6900] text-[#FF6900] px-4 py-2 rounded-lg font-bold hover:bg-[#FFF0E8]">
            <MdAddCard className="text-xl" /> Ajouter une adresse
          </button>
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