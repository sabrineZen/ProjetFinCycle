import React, { useState, useEffect } from "react";
import { DollarSign, ClipboardList, Star, Clock, ChevronRight, MoreHorizontal } from "lucide-react";
import api from "../../api";

// ─────────────────────────────
// DASHBOARD
// ─────────────────────────────

const Dashboard = ({ estActif, setEstActif }) => {
  

  const [stats, setStats] = useState(null);
  const [topPlats, setTopPlats] = useState([]);
  const [commandesRecentes, setCommandesRecentes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────
  // CHARGEMENT BACKEND
  // ─────────────────────────────
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, platsRes, commandesRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/plats"), // ou /plats/populaires si tu l’as
          api.get("/commandes")
        ]);

        // ─── STATS ───
        setStats({
          ventes: statsRes.data.revenus || 0,
          commandes: statsRes.data.totalPlats || 0,
          note: 4.7,
          temps: "28 min"
        });

        // ─── TOP PLATS ───
        const platsFormates = (platsRes.data || []).map((p, index) => ({
          id: p.id,
          nom: p.nom,
          commandes: p.commandes || 0,
          progress: Math.min((p.commandes || 0) * 10, 100),
          rank: index + 1
        }));

        setTopPlats(platsFormates.slice(0, 4));

        // ─── COMMANDES RÉCENTES ───
        const commandesFormatees = (commandesRes.data || []).map((c) => ({
          id: `#${c.id}`,
          client: c.clientNom || "Client",
          plats: c.plats?.map(p => p.nom).join(" + ") || "",
          montant: `${c.total} DA`,
          status: c.status,
          heure: new Date(c.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
        }));

        setCommandesRecentes(commandesFormatees);

      } catch (err) {
        console.error("Erreur dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ─────────────────────────────
  // STYLE STATUS
  // ─────────────────────────────
  const getStatusStyle = (status) => {
    switch (status) {
      case "En cours": return "bg-orange-100 text-orange-600";
      case "Livré": return "bg-green-100 text-green-600";
      case "Préparé": return "bg-blue-100 text-blue-600";
      case "Annulé": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-400">
        Chargement dashboard...
      </div>
    );
  }

  // ─────────────────────────────
  // UI
  // ─────────────────────────────
  return (
    <div className="flex-1 space-y-10 pb-10 text-[#951418] font-regular">

      {/* ───── STATUT RESTAURANT ───── */}
      <section className="bg-white p-6 rounded-[20px] shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl">Statut de votre restaurant</h2>
          <p className="text-sm text-[#951418]/70 mt-1">
            {estActif
              ? "Votre restaurant est ouvert"
              : "Votre restaurant est fermé"}
          </p>
        </div>

        <div
          onClick={() => setEstActif(!estActif)}
          className={`flex items-center gap-3 px-4 py-2 rounded-full border cursor-pointer ${
            estActif ? "bg-orange-50" : "bg-red-50"
          }`}
        >
          <div className={`w-10 h-6 rounded-full p-1 flex ${
            estActif ? "bg-orange-500 justify-end" : "bg-red-500 justify-start"
          }`}>
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-bold">
            {estActif ? "Actif" : "Inactif"}
          </span>
        </div>
      </section>

      {/* ───── STATS ───── */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Ventes", value: `${stats.ventes} DA`, icon: <DollarSign /> },
          { label: "Commandes", value: stats.commandes, icon: <ClipboardList /> },
          { label: "Note", value: stats.note, icon: <Star /> },
          { label: "Temps", value: stats.temps, icon: <Clock /> }
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[20px] shadow-md flex items-center gap-4">
            <div className="text-orange-500">{s.icon}</div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ───── TOP PLATS + GRAPH (mock graph gardé) ───── */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2 bg-white p-8 rounded-[20px] shadow-md min-h-100">
          <h3 className="text-2xl mb-6">Ventes de la semaine</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-3xl h-60 flex items-center justify-center text-gray-300">
            Graphique dynamique à connecter
          </div>
        </div>

        <div className="bg-white p-8 rounded-[20px] shadow-md">
          <h3 className="text-xl mb-6">Top Plats</h3>

          <div className="space-y-5">
            {topPlats.map((plat) => (
              <div key={plat.id} className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-orange-400 text-white flex items-center justify-center font-bold">
                  {plat.rank}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-sm">{plat.nom}</p>
                    <p className="text-xs">{plat.commandes} cmd</p>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                    <div
                      className="bg-orange-400 h-2 rounded-full"
                      style={{ width: `${plat.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── COMMANDES RÉCENTES ───── */}
      <section className="bg-white p-8 rounded-[20px] shadow-md">

        <h3 className="text-2xl mb-6">Commandes récentes</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th>ID</th>
              <th>Client</th>
              <th>Plats</th>
              <th>Montant</th>
              <th>Status</th>
              <th>Heure</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {commandesRecentes.map((c, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-3 font-semibold">{c.id}</td>
                <td>{c.client}</td>
                <td>{c.plats}</td>
                <td>{c.montant}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyle(c.status)}`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.heure}</td>
                <td className="text-center">
                  <MoreHorizontal size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </section>

    </div>
  );
};

export default Dashboard;