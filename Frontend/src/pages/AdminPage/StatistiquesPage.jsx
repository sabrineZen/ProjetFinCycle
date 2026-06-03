import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { API } from '../../config';
import {
  FaEuroSign, FaShoppingCart, FaUsers, FaStore, FaBars
} from "react-icons/fa";
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function StatistiquesPage() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Récupération des données du backend
  useEffect(() => {
    fetch(`${API}/admin/statistiques/global`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-secondary">Chargement...</div>;

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
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8 font-sans">

        {/* Header Style Ancien */}
        <div className="hidden lg:block text-left">
          <h1 className="text-3xl font-bold text-secondary">Statistiques</h1>
          <p className="text-gray-400 mt-1 mb-8">
            Vue d'ensemble des performances
          </p>
        </div>

        <p className="text-gray-400 mb-4 lg:hidden text-left">
          Performance globale
        </p>

        {/* 📊 STATS CARDS (Dynamique avec ton style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {data?.statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-bordure text-left">
              <div className="flex justify-between items-start">
                <span className="text-orange-400 text-xl">
                    {stat.icon === 'euro' && <FaEuroSign />}
                    {stat.icon === 'cart' && <FaShoppingCart />}
                    {stat.icon === 'users' && <FaUsers />}
                    {stat.icon === 'store' && <FaStore />}
                </span>
                <span className="text-green-500 text-sm font-medium">+12%</span>
              </div>
              <p className="text-secondary text-sm mt-2 uppercase tracking-tighter font-medium">{stat.titre}</p>
              <p className="text-3xl font-bold text-secondary mt-1">{stat.valeur}</p>
            </div>
          ))}
        </div>

        {/* 📈 GRAPHS (Gardant ton ancienne disposition) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenus */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure text-left">
            <h2 className="text-secondary font-semibold mb-4 italic text-left">Revenus mensuels (DA)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data?.revenusGraph}>
                <XAxis dataKey="mois" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="revenus" stroke="#FB923C" strokeWidth={3} dot={{r:4, fill:'#FB923C'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Catégories */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure text-left">
            <h2 className="text-secondary font-semibold mb-4 italic text-left">Répartition par Catégories</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={data?.categoriesPie} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                  {data?.categoriesPie.map((c, i) => (
                    <Cell key={i} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🏆 TABLE PLATS POPULAIRES (Design Image 5 & 6) */}
<div className="bg-white rounded-[25px] p-8 shadow-sm border border-[#EEDDDA] mt-8 text-left">
  <h2 className="text-[#4A1D1D] font-bold text-lg mb-6 italic">Plats populaires</h2>
  
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="text-[#8C7474] text-xs uppercase tracking-widest border-b border-[#F5E6E0]">
          <th className="pb-4 font-semibold px-4">Rank</th>
          <th className="pb-4 font-semibold px-4">Plat</th>
          <th className="pb-4 font-semibold px-4">Restaurant</th>
          <th className="pb-4 font-semibold px-4 text-right">Commandes</th>
        </tr>
      </thead>
      <tbody className="text-sm">
        {data?.platsPopulaires?.length > 0 ? (
          data.platsPopulaires.map((p) => (
            <tr key={p.rang} className="group hover:bg-[#FDF1E9] transition-colors border-b border-[#F5E6E0] last:border-0">
              {/* Le rang vient de ton backend (index + 1) */}
              <td className="py-5 px-4 text-[#8C7474] font-medium">{p.rang}</td>
              
              {/* Le nom du plat en bordeaux foncé comme sur l'image */}
              <td className="py-5 px-4 text-[#4A1D1D] font-bold">{p.nom}</td>
              
              {/* Le nom du restaurant en gris-rosé */}
              <td className="py-5 px-4 text-[#8C7474]">{p.restaurant}</td>
              
              {/* Le nombre de commandes avec badge discret */}
              <td className="py-5 px-4 text-right font-bold text-[#4A1D1D]">
                <span className="bg-[#FFF9F7] px-3 py-1 rounded-lg border border-[#FEECE2]">
                  {p.commandes?.toLocaleString() || 0}
                </span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="py-10 text-center text-[#8C7474] italic">
              Aucune donnée disponible pour le moment.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
}

export default StatistiquesPage;