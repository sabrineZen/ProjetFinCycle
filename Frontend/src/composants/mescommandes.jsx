import { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [afficherTout, setAfficherTout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/commandes/client", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => { setCommandes(data); setChargement(false); })
      .catch(() => setChargement(false));
  }, []);

  const getStyle = (statut) => {
    const map = {
      livree:         { cls: "bg-green-100 text-green-600",  label: "Livrée",          icon: "livree"    },
      en_preparation: { cls: "bg-blue-100 text-blue-600",    label: "En préparation",   icon: "cours"     },
      confirmee:      { cls: "bg-blue-100 text-blue-600",    label: "Confirmée",        icon: "cours"     },
      en_attente:     { cls: "bg-orange-100 text-orange-600",label: "En attente",       icon: "cours"     },
      annulee:        { cls: "bg-red-100 text-red-600",      label: "Annulée",          icon: "annulee"   },
    };
    return map[statut] || { cls: "bg-gray-100 text-gray-600", label: statut, icon: "cours" };
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });

  const commandesAffichees = afficherTout ? commandes : commandes.slice(0, 4);

  if (chargement) return (
    <div className="flex justify-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
    </div>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Mes Commandes</h2>

      {commandes.length === 0 ? (
        <p className="text-center text-gray-400 italic py-10">Aucune commande pour l'instant.</p>
      ) : (
        <>
          {commandesAffichees.map((cmd) => {
            const style      = getStyle(cmd.statut);
            const nbArticles = cmd.LigneCommandes?.reduce((s, l) => s + l.quantite, 0) || 0;

            return (
              <div key={cmd.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${style.cls}`}>
                  {style.icon === "livree"  && <FiCheckCircle className="text-2xl" />}
                  {style.icon === "cours"   && <MdLocalShipping className="text-2xl" />}
                  {style.icon === "annulee" && <MdOutlineCancel className="text-2xl" />}
                </div>
                <div className="flex-1 ml-4">
                  <div className="flex items-center gap-2">
                    <p className="font-bold" style={{ color: '#8B2A1B' }}>Commande #{cmd.id}</p>
                    <span className={`text-xs font-sans px-2 py-1 rounded-full ${style.cls}`}>
                      {style.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {formatDate(cmd.dateCommande)} • {nbArticles} article{nbArticles > 1 ? "s" : ""} • {parseFloat(cmd.total).toLocaleString()} DA
                  </p>
                </div>
              </div>
            );
          })}

          {commandes.length > 4 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setAfficherTout(!afficherTout)}
                className="border-2 border-[#FF6900] text-[#FF6900] px-6 py-3 rounded-xl font-bold hover:bg-[#FFF0E8]"
              >
                {afficherTout ? "Voir moins" : "Voir plus de commandes"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MesCommandes;