import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import {
  FaEuroSign, FaShoppingCart, FaUsers, FaStore, FaBars
} from "react-icons/fa";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

function StatistiquesPage() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false); // ✅ ajouté

  const stats = [
    { titre: "Revenus totaux", valeur: "€ 2,847", evolution: "+12.5%", icon: <FaEuroSign /> },
    { titre: "Commandes totaux", valeur: "142", evolution: "+8.2%", icon: <FaShoppingCart /> },
    { titre: "Nouveaux clients", valeur: "3,847", evolution: "+24.5%", icon: <FaUsers /> },
    { titre: "Taux de statistique", valeur: "22,847", evolution: "+12.5%", icon: <FaStore /> },
  ];

  const revenusData = [
    { mois: "Jan", revenus: 30000 },
    { mois: "Fév", revenus: 32000 },
    { mois: "Mar", revenus: 34000 },
  ];

  const commandesData = [
    { mois: "Jan", commandes: 250 },
    { mois: "Fév", commandes: 260 },
    { mois: "Mar", commandes: 270 },
  ];

  const categoriesData = [
    { name: "Français", value: 35, color: "#4A90D9" },
    { name: "Italien", value: 25, color: "#2ECC71" },
  ];

  const topRestaurants = [
    { rang: 1, nom: "Sushi Paradise", commandes: 523, revenus: "$38,920", evolution: "+15.2%" },
    { rang: 2, nom: "Le Gourmet", commandes: 523, revenus: "$45,670", evolution: "+23.5%" },
  ];

  const platsPopulaires = [
    { rang: 1, nom: "nom plats", restaurant: "nom restaurant", commandes: 2004 },
  ];

  return (
    <div className="flex">

      {/* Overlay mobile */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Statistiques</h1>
      </div>

      {/* Content */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* Header */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Statistiques</h1>
          <p className="text-gray-400 mt-1 mb-8">
            Vue d'ensemble des performances
          </p>
        </div>

        {/* Mobile subtitle */}
        <p className="text-gray-400 mb-4 lg:hidden">
          Performance globale
        </p>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-bordure">
              <div className="flex justify-between items-start">
                <span className="text-secondary text-xl">{stat.icon}</span>
                <span className="text-green-500 text-sm font-medium">{stat.evolution}</span>
              </div>
              <p className="text-secondary text-sm mt-2">{stat.titre}</p>
              <p className="text-3xl font-bold text-secondary mt-1">{stat.valeur}</p>
            </div>
          ))}
        </div>

        {/* 📈 GRAPHS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Revenus */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Revenus mensuels</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenusData}>
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenus" stroke="#4A90D9" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Commandes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Commandes mensuelles</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={commandesData}>
                <XAxis dataKey="mois" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commandes" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📊 PIE + TOP RESTAURANTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Pie */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Catégories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoriesData} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
                  {categoriesData.map((c, i) => (
                    <Cell key={i} fill={c.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top restaurants */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Top Restaurants</h2>

            <div className="flex flex-col gap-3">
              {topRestaurants.map((r) => (
                <div key={r.rang} className="flex justify-between">
                  <p className="text-secondary text-sm">{r.nom}</p>
                  <p className="text-secondary text-sm">{r.revenus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TABLE scroll mobile */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure overflow-x-auto">
          <h2 className="text-secondary font-semibold mb-4">Plats populaires</h2>

          <table className="w-full min-w-150">
            <thead>
              <tr className="border-b border-bordure">
                <th className="text-left px-4 py-2">Rank</th>
                <th className="text-left px-4 py-2">Plat</th>
                <th className="text-left px-4 py-2">Restaurant</th>
                <th className="text-right px-4 py-2">Commandes</th>
              </tr>
            </thead>

            <tbody>
              {platsPopulaires.map((p) => (
                <tr key={p.rang} className="border-b border-bordure">
                  <td className="px-4 py-3">{p.rang}</td>
                  <td className="px-4 py-3">{p.nom}</td>
                  <td className="px-4 py-3">{p.restaurant}</td>
                  <td className="px-4 py-3 text-right">{p.commandes}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default StatistiquesPage;