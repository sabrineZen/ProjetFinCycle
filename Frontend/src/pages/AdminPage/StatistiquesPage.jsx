import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEuroSign, FaShoppingCart, FaUsers, FaStore, FaBars } from "react-icons/fa";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StatistiquesPage() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/statistiques/global`)
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

  if (loading) return <div className="p-10 text-center font-bold text-[#4A1D1D]">Chargement...</div>;

  return (
    <div className="flex bg-[#FDF8F6] min-h-screen">
      {/* Sidebar logic... */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarAdmin />
      </div>

      <div className="w-full p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8 font-sans">
        <h1 className="text-3xl font-bold text-[#4A1D1D] mb-8 text-left">Statistiques</h1>

        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {data?.statsCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-[#EEDDDA] text-left">
              <div className="flex justify-between items-start">
                <span className="text-orange-400 text-xl">
                  {stat.icon === 'euro' && <FaEuroSign />}
                  {stat.icon === 'cart' && <FaShoppingCart />}
                  {stat.icon === 'users' && <FaUsers />}
                  {stat.icon === 'store' && <FaStore />}
                </span>
              </div>
              <p className="text-[#8C7474] text-sm mt-2 uppercase font-medium">{stat.titre}</p>
              <p className="text-3xl font-bold text-[#4A1D1D] mt-1">{stat.valeur}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenus mensuels */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EEDDDA] text-left">
            <h2 className="text-[#4A1D1D] font-semibold mb-4 italic">Revenus mensuels (DA)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data?.revenusGraph}>
                <XAxis dataKey="mois" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="revenus" stroke="#FB923C" strokeWidth={3} dot={{r:4, fill:'#FB923C'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Répartition (Le cercle corrigé) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#EEDDDA] text-left">
            <h2 className="text-[#4A1D1D] font-semibold mb-4 italic">Répartition par Catégories</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie 
                  data={data?.categoriesPie || []} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" cy="50%" 
                  innerRadius={60} 
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {data?.categoriesPie?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tableau Plats Populaires... */}
        <div className="bg-white rounded-[25px] p-8 shadow-sm border border-[#EEDDDA] mt-8 text-left">
          <h2 className="text-[#4A1D1D] font-bold text-lg mb-6 italic">Plats populaires</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#8C7474] text-xs uppercase border-b border-[#F5E6E0]">
                <th className="pb-4 px-4 font-semibold text-left">Rank</th>
                <th className="pb-4 px-4 font-semibold text-left">Plat</th>
                <th className="pb-4 px-4 font-semibold text-left">Restaurant</th>
                <th className="pb-4 px-4 font-semibold text-right">Commandes</th>
              </tr>
            </thead>
            <tbody>
              {data?.platsPopulaires.map((p) => (
                <tr key={p.rang} className="border-b border-[#F5E6E0] last:border-0 hover:bg-[#FDF1E9] transition-colors">
                  <td className="py-5 px-4 text-[#8C7474]">{p.rang}</td>
                  <td className="py-5 px-4 text-[#4A1D1D] font-bold">{p.nom}</td>
                  <td className="py-5 px-4 text-[#8C7474]">{p.restaurant}</td>
                  <td className="py-5 px-4 text-right font-bold text-[#4A1D1D]">
                    <span className="bg-[#FFF9F7] px-3 py-1 rounded-lg border border-[#FEECE2]">{p.commandes}</span>
                  </td>
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