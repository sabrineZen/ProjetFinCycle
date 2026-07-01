import React, { useState, useEffect } from "react";
import { DollarSign, ClipboardList, Star, Clock, MoreHorizontal } from "lucide-react";
import api from "../../api";

const Dashboard = ({ estActif, setEstActif }) => {
  const [stats, setStats] = useState(null);
  const [topPlats, setTopPlats] = useState([]);
  const [commandesRecentes, setCommandesRecentes] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, platsRes, commandesRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/plats"),
          api.get("/commandes")
        ]);

        const commandesData = commandesRes.data || [];
        const salesByDay = Array.from({ length: 7 }, (_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - index));
          const label = date.toLocaleDateString("fr-FR", { weekday: "short" });
          const total = commandesData.reduce((sum, commande) => {
            const commandeDate = new Date(commande.dateCommande || commande.createdAt || commande.created_at);
            if (commandeDate.toDateString() === date.toDateString()) {
              return sum + Number(commande.total || 0);
            }
            return sum;
          }, 0);

          return { label, total };
        });

        setStats({
          ventes: salesByDay.reduce((sum, day) => sum + day.total, 0),
          commandes: commandesData.length,
          note: 4.7,
          temps: "28 min"
        });
        setWeeklySales(salesByDay);

        const platsFormates = (platsRes.data || [])
          .map((plat) => ({
            id: plat.id,
            nom: plat.nom,
            commandes: Number(plat.commandes || 0),
            progress: Math.min((Number(plat.commandes || 0) * 20), 100),
            rank: 0
          }))
          .sort((a, b) => b.commandes - a.commandes)
          .map((plat, index) => ({ ...plat, rank: index + 1 }))
          .slice(0, 4);

        setTopPlats(platsFormates);

        const commandesFormatees = (commandesData || []).map((commande) => ({
          id: `#${commande.id}`,
          client: commande.clientNom || "Client",
          plats: commande.plats?.map((plat) => plat.nom).join(" + ") || "",
          montant: `${commande.total} DA`,
          status: commande.status,
          heure: new Date(commande.createdAt || commande.dateCommande).toLocaleTimeString([], {
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

  return (
    <div className="flex-1 space-y-8 pb-10 text-[#951418]">
      <section className="rounded-[28px] border border-orange-100 bg-[radial-gradient(circle_at_top_left,_rgba(255,237,213,0.7),_transparent_35%),linear-gradient(135deg,_#fff9f5_0%,_#fff4ea_100%)] p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">Tableau de bord</p>
            <h2 className="text-2xl font-bold text-[#951418]">Statut de votre restaurant</h2>
            <p className="mt-2 text-sm text-[#951418]/70">
              {estActif ? "Votre restaurant est ouvert" : "Votre restaurant est fermé"}
            </p>
          </div>

          <div
            onClick={() => setEstActif(!estActif)}
            className={`flex items-center gap-3 px-4 py-2 rounded-full border cursor-pointer ${
              estActif ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200"
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
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Ventes", value: `${stats.ventes} DA`, icon: <DollarSign /> },
          { label: "Commandes", value: stats.commandes, icon: <ClipboardList /> },
          { label: "Note", value: stats.note, icon: <Star /> },
          { label: "Temps", value: stats.temps, icon: <Clock /> }
        ].map((s, i) => (
          <div key={i} className="rounded-[24px] border border-orange-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 rounded-[24px] border border-orange-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Ventes de la semaine</h3>
            <p className="text-sm text-gray-500">{stats.ventes} DA</p>
          </div>
          <div className="mt-4 flex h-56 items-end justify-between gap-2">
            {weeklySales.map((day) => {
              const height = Math.max(8, Math.round((day.total / Math.max(...weeklySales.map((item) => item.total), 1)) * 100));
              return (
                <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-44 w-full items-end justify-center">
                    <div
                      className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-300"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase">{day.label}</p>
                    <p className="text-[10px] text-gray-500">{day.total} DA</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[24px] border border-orange-100 bg-white p-8 shadow-sm">
          <h3 className="mb-6 text-xl font-bold text-gray-900">Top Plats</h3>

          <div className="space-y-5">
            {topPlats.map((plat) => (
              <div key={plat.id} className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 font-bold text-white">
                  {plat.rank}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-900">{plat.nom}</p>
                    <p className="text-xs text-gray-500">{plat.commandes} cmd</p>
                  </div>

                  <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-orange-400"
                      style={{ width: `${plat.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-orange-100 bg-white p-8 shadow-sm">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">Commandes récentes</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="pb-3">ID</th>
                <th className="pb-3">Client</th>
                <th className="pb-3">Plats</th>
                <th className="pb-3">Montant</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Heure</th>
                <th className="pb-3"></th>
              </tr>
            </thead>

            <tbody>
              {commandesRecentes.map((c, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-semibold text-gray-900">{c.id}</td>
                  <td className="py-3 text-gray-700">{c.client}</td>
                  <td className="py-3 text-gray-700">{c.plats}</td>
                  <td className="py-3 text-gray-700">{c.montant}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-3 py-1 text-xs ${getStatusStyle(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-700">{c.heure}</td>
                  <td className="py-3 text-center text-gray-400">
                    <MoreHorizontal size={18} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;