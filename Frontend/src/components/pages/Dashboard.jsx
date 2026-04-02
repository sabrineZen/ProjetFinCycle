import React from 'react';
import { DollarSign, ClipboardList, Star, Clock, ChevronRight, MoreHorizontal } from 'lucide-react';

// --- DONNÉES SIMULÉES (MOCK DATA) ---
// Ces données remplacent ta future base de données pour l'instant.

const statsCards = [
  { id: 1, label: 'Vente du jour', value: '36 700 DA', icon: <DollarSign size={24} />, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 2, label: 'Commandes', value: '24', icon: <ClipboardList size={24} />, color: 'text-red-600', bg: 'bg-red-50' },
  { id: 3, label: 'Note Moyenne', value: '4.7/5', icon: <Star size={24} />, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 4, label: 'Temps moyenne', value: '28 min', icon: <Clock size={24} />, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const topPlats = [
  { id: 1, nom: 'Pizza Margarita', commandes: 42, progress: 90, rank: 1 },
  { id: 2, nom: 'Burger Gurmet', commandes: 35, progress: 75, rank: 2 },
  { id: 3, nom: 'Couscous Royal', commandes: 28, progress: 60, rank: 3 },
  { id: 4, nom: 'Salade César', commandes: 21, progress: 45, rank: 4 },
];

const commandesRecentes = [
  { id: '#0045', client: 'Ahmed Y.', plats: 'Burger + Frittes', montant: '2800 DA', status: 'En cours', heure: '12 : 30' },
  { id: '#0040', client: 'Ghanou Y.', plats: 'Pizza Margeretta', montant: '3900 DA', status: 'Livré', heure: '12 : 30' },
  { id: '#0024', client: 'Wassim Y.', plats: 'Salade César * 2', montant: '4500 DA', status: 'Pret', heure: '12 : 30' },
  { id: '#0039', client: 'Oussama Y.', plats: 'Couscous Royale', montant: '1000 DA', status: 'Annuller', heure: '12 : 30' },
  { id: '#0023', client: 'zyada', plats: 'mazal', montant: '1020 DA', status: 'Nouvelle', heure: '12 : 30' },
];

// Fonction utilitaire pour le style des badges de statut
const getStatusStyle = (status) => {
  switch (status) {
    case 'En cours': return 'bg-orange-100 text-orange-600';
    case 'Livré': return 'bg-green-100 text-green-600';
    case 'Pret': return 'bg-blue-100 text-blue-600';
    case 'Annuller': return 'bg-red-100 text-red-600';
    case 'Nouvelle': return 'bg-emerald-100 text-emerald-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const Dashboard = ({ estActif, setEstActif }) => {
    
  return (
    <div className="flex-1 space-y-10 pb-10 text-[#951418] font-regular ">
      
      {/* 1. SECTION : Statut du Restaurant */}
      <section className="bg-white p-6 rounded-[20px] shadow-2xl  flex items-center justify-between transition-all">
        <div>
            <h2 className="text-xl ">Statut de votre restaurant</h2>
            <p className="text-sm text-[#951418]/70 mt-1">
            {estActif 
                ? "Votre restaurant est actuellement ouvert et visible par les clients" 
                : "Votre restaurant est fermé. Les clients ne peuvent pas commander"}
            </p>
        </div>

        {/* Le bouton Toggle interactif */}
        <div 
            onClick={() => setEstActif(!estActif)} // Inverse l'état au clic
            className={`flex items-center gap-3 px-4 py-2 rounded-full border cursor-pointer transition-all duration-300 ${
            estActif ? 'bg-orange-50 border-orange-100' : 'bg-red-50 border-gray-200'
            }`}
        >
            {/* Le switch (la glissière) */}
            <div className={`w-10 h-6 rounded-full p-1 flex transition-colors duration-300 ${
            estActif ? 'bg-[#FF843D] justify-end' : 'bg-[#FA0D15] justify-start'
            }`}>
            {/* Le petit rond blanc qui bouge */}
            <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
            </div>

            {/* Le texte qui change */}
            <span className={`text-sm font-bold transition-colors ${
            estActif ? 'text-[#FF843D]' : 'text-[#FA0D15]'
            }`}>
            {estActif ? 'Actif' : 'Inactif'}
            </span>
        </div>
        </section>

      {/* 2. SECTION : Cartes de Statistiques Clés */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <div key={stat.id} className="bg-white p-7 rounded-[20px] shadow-xl  flex items-center gap-5 transition-transform hover:translate-y-[-5px]">
            <div className={`p-4 rounded-3xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold ">{stat.value}</p>
              <p className="text-sm  font-medium mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 3. SECTION CENTRALE : Graphique Ventes & Top Plats (Grille 2 colonnes) */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* A. Graphique Ventes de la semaine (Prend 2/3 de l'espace sur grand écran) */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[20px] shadow-2xl  relative min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl">Ventes de la semaine</h3>
            <button className="flex items-center gap-2 bg-[#FF843D] text-white px-5 py-2.5 rounded-full text-sm font-bold  shadow-lg shadow-orange-100 hover:scale-105 transition-all">
              Cette semaine <ChevronRight size={19} />
            </button>
          </div>
          
          {/* Faux Graphique (Simulation) */}
          <div className="absolute inset-x-8 bottom-8 top-28 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
            <span className="text-gray-300 italic font-medium text-lg">Graphique des ventes bientôt...</span>
            <p className="text-gray-300 text-sm mt-1">(Demande base de données)</p>
          </div>
        </div>

        {/* B. Top Plats (Prend 1/3 de l'espace) */}
        <div className="bg-white p-8 rounded-[20px] shadow-xl ">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-regular">Top Plats</h3>
            <button className="flex items-center gap-2 bg-[#FF843D] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-orange-100 hover:scale-105 transition-all">
              Voir Tout <ChevronRight size={18} />
            </button>
          </div>

          <div className="space-y-6">
            {topPlats.map((plat) => (
              <div key={plat.id} className="flex items-center gap-4">
                {/* Badge de Rang */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md ${plat.rank === 1 ? 'bg-[#FF843D]' : 'bg-gray-300'}`}>
                  {plat.rank}
                </div>
                
                {/* Nom et Progression */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <p className="font-bold  text-sm">{plat.nom}</p>
                    <p className="text-xs  font-semibold">{plat.commandes} cmd</p>
                  </div>
                  {/* Barre de Progression */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF843D] rounded-full" 
                      style={{ width: `${plat.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION : Tableau des Commandes Récentes */}
      <section className="bg-white p-10 rounded-[20px] shadow-2xl ">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-3xl ">Commandes récentes</h3>
          <button className="flex items-center gap-2 bg-[#FF843D] text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-orange-100 hover:scale-105 transition-all">
            Toutes les commandes <ChevronRight size={18} />
          </button>
        </div>

        {/* Tableau Responsive */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead className="border-b border-gray-100">
              <tr className="text-sm font-bold  uppercase tracking-tight">
                <th className="pb-5 pr-4">ID</th>
                <th className="pb-5 pr-4">Client</th>
                <th className="pb-5 pr-4">Plats</th>
                <th className="pb-5 pr-4">Montant</th>
                <th className="pb-5 pr-4">Status</th>
                <th className="pb-5 pr-4">Heure</th>
                <th className="pb-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {commandesRecentes.map((commande, index) => (
                <tr key={index} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50">
                  <td className="py-6 font-semibold  text-sm">{commande.id}</td>
                  <td className="py-6 font-semibold text-sm">{commande.client}</td>
                  <td className="py-6 font-semibold text-sm">{commande.plats}</td>
                  <td className="py-6 font-bold  text-sm">{commande.montant}</td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusStyle(commande.status)}`}>
                      {commande.status}
                    </span>
                  </td>
                  <td className="py-6 font-semibold text-sm">{commande.heure}</td>
                  <td className="py-6 text-center">
                    <button className="p-2  hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
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