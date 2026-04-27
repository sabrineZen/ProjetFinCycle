import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEuroSign, FaShoppingCart, FaUsers, FaStore } from "react-icons/fa";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function StatistiquesPage() {

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
    { mois: "Avr", revenus: 36000 },
    { mois: "Mai", revenus: 38000 },
    { mois: "Juin", revenus: 42000 },
    { mois: "Juil", revenus: 45000 },
    { mois: "Août", revenus: 50000 },
  ];

  const commandesData = [
    { mois: "Jan", commandes: 250 },
    { mois: "Fév", commandes: 260 },
    { mois: "Mar", commandes: 270 },
    { mois: "Avr", commandes: 280 },
    { mois: "Mai", commandes: 300 },
    { mois: "Juin", commandes: 310 },
    { mois: "Juil", commandes: 320 },
    { mois: "Août", commandes: 340 },
  ];

  const categoriesData = [
    { name: "Français", value: 35, color: "#4A90D9" },
    { name: "Italien", value: 25, color: "#2ECC71" },
    { name: "Japonais", value: 20, color: "#F39C12" },
    { name: "Fast-food", value: 12, color: "#E74C3C" },
    { name: "Autres", value: 8, color: "#9B59B6" },
  ];

  const topRestaurants = [
    { rang: 1, nom: "Sushi Paradise", commandes: 523, revenus: "$38,920", evolution: "+15.2%" },
    { rang: 2, nom: "Le Gourmet", commandes: 523, revenus: "$45,670", evolution: "+23.5%" },
    { rang: 3, nom: "Le Petit Bistrot", commandes: 523, revenus: "$23,450", evolution: "+8.7%" },
    { rang: 4, nom: "Pizza Roma", commandes: 523, revenus: "$19,340", evolution: "+12.3%" },
    { rang: 5, nom: "Burger House", commandes: 523, revenus: "$12,890", evolution: "-5.2%" },
  ];

  const platsPopulaires = [
    { rang: 1, nom: "nom plats", restaurant: "nom restaurant", commandes: 2004 },
    { rang: 2, nom: "", restaurant: "", commandes: null },
    { rang: 3, nom: "", restaurant: "", commandes: null },
    { rang: 4, nom: "", restaurant: "", commandes: null },
    { rang: 5, nom: "", restaurant: "", commandes: null },
    { rang: 6, nom: "", restaurant: "", commandes: null },
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-56 p-8 w-full min-h-screen bg-fond">

        {/* Titre */}
        <h1 className="text-3xl font-bold text-secondary">Statistiques</h1>
        <p className="text-gray-400 mt-1 mb-8">Vue d'ensemble des performances de la plateforme</p>

        {/* Cards KPI */}
        <div className="grid grid-cols-4 gap-4 mb-8">
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

        {/* Graphiques ligne + barres */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Revenus mensuels */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Revenus mensuels ($)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenusData}>
                <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenus" stroke="#4A90D9" strokeWidth={2} dot={{ r: 4 }} name="Revenus" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Commandes mensuelles */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Commandes mensuelles</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={commandesData}>
                <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="commandes" fill="#2ECC71" name="Commandes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Camembert + Top restaurants */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Distribution par catégorie */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Distribution par catégorie</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={categoriesData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
                  {categoriesData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Top Restaurants */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold mb-4">Top Restaurants</h2>
            <div className="flex flex-col gap-3">
              {topRestaurants.map((r) => (
                <div key={r.rang} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-button text-white text-xs flex items-center justify-center font-bold flex-shrink-0">{r.rang}</span>
                  <div className="flex-1">
                    <p className="text-secondary text-sm font-medium">{r.nom}</p>
                    <p className="text-gray-400 text-xs">{r.commandes} commandes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary text-sm font-bold">{r.revenus}</p>
                    <p className={`text-xs ${r.evolution.startsWith("+") ? "text-green-500" : "text-red-500"}`}>{r.evolution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Plats les plus commandés */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
          <h2 className="text-secondary font-semibold mb-4">Plats les plus commandés</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b border-bordure">
                <th className="text-left px-4 py-2 text-secondary text-sm font-medium">Range</th>
                <th className="text-left px-4 py-2 text-secondary text-sm font-medium">Plat</th>
                <th className="text-left px-4 py-2 text-button text-sm font-medium">Restaurant</th>
                <th className="text-right px-4 py-2 text-button text-sm font-medium">Commandes</th>
              </tr>
            </thead>
            <tbody>
              {platsPopulaires.map((p) => (
                <tr key={p.rang} className="border-b border-bordure">
                  <td className="px-4 py-3">
                    <span className="w-7 h-7 rounded-full bg-button text-white text-xs flex items-center justify-center font-bold">{p.rang}</span>
                  </td>
                  <td className="px-4 py-3 text-secondary text-sm">{p.nom}</td>
                  <td className="px-4 py-3 text-secondary text-sm">{p.restaurant}</td>
                  <td className="px-4 py-3 text-secondary text-sm text-right">{p.commandes}</td>
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