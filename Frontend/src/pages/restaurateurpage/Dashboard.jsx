import React, { useState, useEffect } from 'react';
import { DollarSign, ClipboardList, Star, Clock, ChevronRight, MoreHorizontal } from 'lucide-react';

const Dashboard = ({ estActif, setEstActif }) => {
  const [data, setData] = useState({ stats: [], topPlats: [], commandes: [], loading: true });

  useEffect(() => {
    // On appelle la nouvelle route du contrôleur
    fetch("http://localhost:5000/api/admin/statistiques/dashboard-restaurateur")
      .then(res => res.json())
      .then(json => {
        setData({
          stats: json.statsCards,
          topPlats: json.topPlats,
          commandes: json.commandes,
          loading: false
        });
      })
      .catch(err => {
        console.error("Erreur API:", err);
        setData(prev => ({ ...prev, loading: false }));
      });
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      'en_attente': 'bg-orange-100 text-orange-600',
      'confirmee': 'bg-blue-100 text-blue-600',
      'en_preparation': 'bg-purple-100 text-purple-600',
      'livree': 'bg-green-100 text-green-600',
      'annulee': 'bg-red-100 text-red-600'
    };
    return styles[status] || 'bg-gray-100 text-gray-600';
  };

  if (data.loading) return <div className="p-10 text-center font-bold text-[#951418]">Chargement des données SQL...</div>;

  return (
    <div className="flex-1 space-y-10 pb-10 text-[#951418]">
      
      {/* 1. SECTION : Statut */}
      <section className="bg-white p-6 rounded-[20px] shadow-md flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Statut de votre restaurant</h2>
          <p className="text-sm opacity-70">{estActif ? "Ouvert aux clients" : "Fermé"}</p>
        </div>
        <div onClick={() => setEstActif(!estActif)} className="cursor-pointer flex items-center gap-3">
          <div className={`w-10 h-6 rounded-full p-1 flex transition-all ${estActif ? 'bg-[#FF843D] justify-end' : 'bg-[#FA0D15] justify-start'}`}>
            <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
          </div>
          <span className="text-sm font-bold">{estActif ? 'Actif' : 'Inactif'}</span>
        </div>
      </section>

      {/* 2. SECTION : Stats Cards */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-[20px] shadow-md flex items-center gap-4 transition-transform hover:-translate-y-1">
            <div className="p-3 bg-red-50 text-[#951418] rounded-2xl">
              {stat.label.includes('Vente') ? <DollarSign size={24}/> : <ClipboardList size={24}/>}
            </div>
            <div>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium opacity-70">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. SECTION : Graphique & Top Plats */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-[20px] shadow-md min-h-[300px]">
          <h3 className="text-2xl font-bold mb-8">Performance des ventes</h3>
          <div className="flex items-end gap-3 h-48 border-b border-gray-100 pb-2">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="flex-1 bg-[#FF843D]/20 hover:bg-[#FF843D] rounded-t-lg transition-all" style={{height: `${h}%`}}></div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase">
            <span>Lun</span><span>Mar</span><span>Mer</span><span>Jeu</span><span>Ven</span><span>Sam</span><span>Dim</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[20px] shadow-md">
          <h3 className="text-xl font-bold mb-8">Top Plats</h3>
          <div className="space-y-6">
            {data.topPlats.map((plat, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${i === 0 ? 'bg-[#FF843D]' : 'bg-gray-300'}`}>{i+1}</div>
                <div className="flex-1">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{plat.nom}</span>
                    <span>{plat.commandes} ventes</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#FF843D] transition-all duration-1000" style={{width: `${plat.progress}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION : Tableau Commandes */}
      <section className="bg-white p-8 rounded-[20px] shadow-md">
        <h3 className="text-2xl font-bold mb-8">Commandes récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase text-gray-400 border-b border-gray-100">
                <th className="pb-4">ID</th>
                <th className="pb-4">Client</th>
                <th className="pb-4">Montant</th>
                <th className="pb-4">Statut</th>
                <th className="pb-4">Heure</th>
                <th className="pb-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.commandes.map((cmd, index) => (
                <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50">
                  <td className="py-4 font-bold text-sm">{cmd.id}</td>
                  <td className="py-4 text-sm">{cmd.client}</td>
                  <td className="py-4 font-bold text-sm">{cmd.montant}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(cmd.status)}`}>
                      {cmd.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 text-sm opacity-70">{cmd.heure}</td>
                  <td className="py-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><MoreHorizontal size={18}/></button>
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