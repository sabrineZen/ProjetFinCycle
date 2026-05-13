import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";

function MesCommandes() {
  const [commandes, setCommandes] = useState([])
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:5000/api/commandes/mescommandes", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => res.json())
    .then(data => {
      setCommandes(data)
    })
  }, [])

  const styles = {
    "livree":        "bg-green-100 text-green-600",
    "en_attente":    "bg-blue-100 text-blue-600",
    "confirmee":     "bg-blue-100 text-blue-600",
    "en_preparation":"bg-blue-100 text-blue-600",
    "annulee":       "bg-red-100 text-red-600"
  }

  const labels = {
    "livree":         "Livrée",
    "en_attente":     "En Cours",
    "confirmee":      "En Cours",
    "en_preparation": "En Cours",
    "annulee":        "Annulée"
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Mes Commandes</h2>

      {commandes.length === 0 && (
        <p className="text-gray-400 text-center">Aucune commande pour l'instant</p>
      )}

      {commandes.map(cmd =>
        <div key={cmd.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
          <div className={"w-12 h-12 rounded-full flex items-center justify-center " + styles[cmd.statut]}>
            {cmd.statut === "livree"                                          && <FiCheckCircle className="text-2xl" />}
            {(cmd.statut === "en_attente" || cmd.statut === "confirmee" || cmd.statut === "en_preparation") && <MdLocalShipping className="text-2xl" />}
            {cmd.statut === "annulee"                                         && <MdOutlineCancel className="text-2xl" />}
          </div>

          <div className="flex-1 ml-4">
            <div className="flex items-center gap-2">
              <p className="font-bold" style={{ color: '#8B2A1B' }}>Commande</p>
              <p className="font-bold" style={{ color: '#8B2A1B' }}>#{cmd.id}</p>
              <span className={"text-xs px-2 py-1 rounded-full " + styles[cmd.statut]}>
                {labels[cmd.statut]}
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {new Date(cmd.dateCommande).toLocaleDateString('fr-FR')} • {cmd.total} DA
            </p>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-4">
        <button className="border-2 border-[#FF6900] text-[#FF6900] px-6 py-3 rounded-xl font-bold hover:bg-[#FFF0E8]">
          Voir plus de Commandes
        </button>
      </div>
    </div>
  )
}

export default MesCommandes