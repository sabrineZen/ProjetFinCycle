import { useEffect, useState } from "react";
import api from "../api";
import { MdOutlineCancel } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { MdLocalShipping } from "react-icons/md";

function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  //  configuration statuts 
  const config = {
    livree: {
      bg: "bg-green-100",
      text: "text-green-600",
      icon: <FiCheckCircle className="text-2xl" />,
    },
    en_preparation: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <MdLocalShipping className="text-2xl" />,
    },
    annulee: {
      bg: "bg-red-100",
      text: "text-red-600",
      icon: <MdOutlineCancel className="text-2xl" />,
    },
    en_attente: {
      bg: "bg-gray-100",
      text: "text-gray-600",
      icon: <MdLocalShipping className="text-2xl opacity-60" />,
    },
    confirmee: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      icon: <FiCheckCircle className="text-2xl" />,
    },
  };

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await api.get("/commandes");
        setCommandes(res.data || []);
      } catch (err) {
        console.error("Erreur chargement commandes :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommandes();
  }, []);

  if (loading) {
    return (
      <p className="text-gray-500">Chargement des commandes...</p>
    );
  }

  return (
    <div className="space-y-4">
      {/*  TITLE */}
      <h2 className="text-2xl font-bold" style={{ color: "#8B2A1B" }}>
        Mes Commandes
      </h2>

      {/* LISTE SCROLLABLE */}
      <div className="max-h-[500px] overflow-y-auto pr-2 space-y-3">
        {commandes.length === 0 ? (
          <p className="text-gray-500">
            Aucune commande disponible.
          </p>
        ) : (
          commandes.map((cmd) => {
            const c = config[cmd.statut] || {
              bg: "bg-gray-100",
              text: "text-gray-500",
              icon: <MdLocalShipping className="text-2xl" />,
            };

            return (
              <div
                key={cmd.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition"
              >
                {/*  ICON STATUS */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${c.bg} ${c.text}`}
                >
                  {c.icon}
                </div>

                {/*  INFOS */}
                <div className="flex-1 ml-4">
                  {/* header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold" style={{ color: "#8B2A1B" }}>
                      Commande
                    </p>

                    <p className="font-bold" style={{ color: "#8B2A1B" }}>
                      #{cmd.id}
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${c.bg} ${c.text}`}
                    >
                      {cmd.statut}
                    </span>
                  </div>

                  {/* details */}
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(cmd.createdAt).toLocaleDateString()} •{" "}
                    {cmd.LigneCommandes?.length || 0} articles •{" "}
                    {cmd.total} DA
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default MesCommandes;