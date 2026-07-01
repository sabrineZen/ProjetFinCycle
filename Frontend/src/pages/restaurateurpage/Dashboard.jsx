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
    <div className="flex-1 space-y-10 pb-10 text-[#951418] font-regular">

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

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-[20px] shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl">Ventes de la semaine</h3>
            <p className="text-sm text-gray-500">{stats.ventes} DA</p>
          </div>
          <div className="flex items-end justify-between gap-2 h-56 mt-4">
            {weeklySales.map((day) => {
              const height = Math.max(8, Math.round((day.total / Math.max(...weeklySales.map((item) => item.total), 1)) * 100));
              return (
                <div key={day.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex justify-center items-end h-44">
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