import React, { useState } from 'react';
import { Search, Bell, Clock, CheckCircle2, Truck, AlertCircle, ChevronDown, ChevronUp, MapPin, User, Phone, AlertTriangle, Clock3 } from 'lucide-react';

const Commandes = () => {
  const [filter, setFilter] = useState('Tous');
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Données basées sur vos captures
  const [commandesList] = useState([
    { id: "#0045", client: "GHANOU Y.", heure: "12:30", prix: "4100 DA", status: "Nouvelle", badge: "Nouveau!", icon: <Bell className="text-[#951418]" /> },
    { id: "#0046", client: "AHMED Y.", heure: "12:30", prix: "3200 DA", status: "En cours", icon: <Clock className="text-[#951418]" /> },
    { id: "#0047", client: "WASSIM Y.", heure: "12:35", prix: "3600 DA", status: "Pret", icon: <CheckCircle2 className="text-[#951418]" /> },
    { id: "#0048", client: "OUSSAMA Y.", heure: "12:36", prix: "5500 DA", status: "Livré", icon: <Truck className="text-[#951418]" /> },
    { id: "#0049", client: "DIANA Y.", heure: "12:45", prix: "2600 DA", status: "Annulé", icon: <AlertCircle className="text-[#951418]" /> },
  ]);

  // Calcul dynamique des nombres pour la To-do liste
  const getCount = (catId) => {
    if (catId === 'Tous') return commandesList.length;
    if (catId === 'Nouvelles') return commandesList.filter(c => c.status === 'Nouvelle').length;
    if (catId === 'Annuler') return commandesList.filter(c => c.status === 'Annulé').length;
    if (catId === 'Prets') return commandesList.filter(c => c.status === 'Pret').length;
    return commandesList.filter(c => c.status === catId).length;
  };

  const categories = [
    { id: 'Tous', label: 'Tous' },
    { id: 'Nouvelles', label: 'Nouvelles' },
    { id: 'En cours', label: 'En cours' },
    { id: 'Prets', label: 'Prets' },
    { id: 'Livrés', label: 'Livrés' },
    { id: 'Annuler', label: 'Annuler' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Nouvelle': return 'bg-red-100 text-red-500';
      case 'En cours': return 'bg-blue-100 text-blue-500';
      case 'Pret': return 'bg-purple-100 text-purple-500';
      case 'Livré': return 'bg-green-100 text-green-500';
      case 'Annulé': return 'bg-red-50 text-red-400';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  // Filtrage combiné (Catégorie + Recherche)
  const commandesFiltrées = commandesList.filter(cmd => {
    const matchesSearch = cmd.client.toLowerCase().includes(searchQuery.toLowerCase()) || cmd.id.includes(searchQuery);
    const matchesFilter = filter === 'Tous' || 
                         (filter === 'Nouvelles' && cmd.status === 'Nouvelle') ||
                         (filter === 'Annuler' && cmd.status === 'Annulé') ||
                         (filter === 'Prets' && cmd.status === 'Pret') ||
                         cmd.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5">
      {/* BANNIÈRE ALERTE */}
      <div className="bg-[#FF843D] text-white p-4 rounded-[14px] flex items-center gap-3 shadow-xl ">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="font-regular">nouvelle(s) commande(s) reçue(s)</span>
      </div>

      {/* CARTES STATS */}
      <div className="grid grid-cols-4 gap-4">
        {['Nouvelles', 'En cours', 'Prets', 'Livrés'].map((l) => (
          <div key={l} className="bg-white p-3 rounded-[20px] shadow-lg  flex flex-col items-center">
            <span className="text-4xl font-regular text-[#951418]">{getCount(l)}</span>
            <span className=" text-[#951418]/60 font-regular">{l}</span>
          </div>
        ))}
      </div>

      {/* TO-DO LISTE (FILTRES) */}
      <div className="bg-white p-4 rounded-[20px] shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.id); setExpandedId(null); }}
              className={`px-6 py-3 rounded-xl border-1 border-[#C0A0A0] font-regular text-sm flex items-center gap-3 transition-all ${
                filter === cat.id ? 'bg-[#FF843D] text-white shadow-sm s' : 'bg-[#FFE3CE]/40 text-[#8B2C21]'
              }`}
            >
              {cat.label} 
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                filter === cat.id ? 'bg-white/20' : 'bg-[#FF843D]/20 text-[#FF843D]'
              }`}>
                {getCount(cat.id)}
              </span>
            </button>
          ))}
        </div>
        <div className="relative min-w-[250px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#951418]" size={20} />
          <input 
            type="text" 
            placeholder="ID ou client .." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFE3CE] border-1 border-[#C0A0A0] rounded-2xl py-3 pl-12 pr-4 font-regular text-[#951418] placeholder-[#951418]/40 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
          />
        </div>
      </div>

      {/* LISTE DES COMMANDES AVEC ACCORDÉON */}
      <div className="space-y-4">
        {commandesFiltrées.length > 0 ? (
          commandesFiltrées.map((cmd) => (
            <div key={cmd.id} className="bg-white rounded-[20px] shadow-xl  overflow-hidden transition-all">
              
              {/* LIGNE PRINCIPALE */}
              <div 
                onClick={() => setExpandedId(expandedId === cmd.id ? null : cmd.id)}
                className="p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#951418]">{cmd.icon}</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-regular text-[#951418]">{cmd.id}</span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-regular uppercase ${getStatusColor(cmd.status)}`}>{cmd.status}</span>
                      {cmd.badge && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-regular animate-bounce">{cmd.badge}</span>}
                    </div>
                    <div className="text-xs font-regular text-gray-400">{cmd.client} • {cmd.heure}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-regular text-[#951418]">{cmd.prix}</span>
                  {expandedId === cmd.id ? <ChevronUp className="text-[#951418]" size={24} /> : <ChevronDown className="text-[#951418]/70 group-hover:text-[#951418]" size={24} />}
                </div>
              </div>

              {/* DÉTAILS DÉPLOYÉS */}
              {expandedId === cmd.id && (
                <div className="px-10 pb-8 pt-4 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-10 mb-8 text-sm">
                    <div className="space-y-2">
                      <h4 className="text-[#951418]/70 font-regular">Client</h4>
                      <p className="font-regular text-[#951418]">Younsi Ghanou</p>
                      <p className=" text-[#951418]/70 font-regular">0777777 513</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[#951418]/70 font-regular">Adresse de livraison</h4>
                      <p className="text-[#951418]/70 font-regular">Rue Didouche Morad, Alger</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h4 className="font-regular text-[#951418] text-lg border-gray-300 pb-2">Détail de commande</h4>
                    <div className="flex justify-between font-regular text-[#951418]">
                      <span className="text-[#951418]/70">2 * Burger Gourmet</span>
                      <span>3100 DA</span>
                    </div>
                    <div className="flex justify-between font-regular text-[#951418]">
                      <span className="text-[#951418]/70">2 * Frites Maison</span>
                      <span>1000 DA</span>
                    </div>
                    <div className="flex justify-between border-t pt-4 font-regular text-lg text-[#951418]">
                      <span>Total</span>
                      <span>{cmd.prix}</span>
                    </div>
                  </div>

                  {/* NOTE CLIENT */}
                  <div className="bg-[#FFCC99]/70 p-4 rounded-xl mb-8 font-regular text-[#951418] text-sm shadow-md">
                    <span className="text-[#951418]/70 font-regular">Note de client :</span> Sans oignon s'il vous plaît
                  </div>

                  {/* BOUTONS D'ACTION */}
                  <div className="flex gap-10">
                    <button className="flex-1 bg-[#FF843D] text-white py-2 rounded-xl font-regular flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[1.02] transition-all">
                      <CheckCircle2 size={20} /> Passer à "En cours"
                    </button>
                    <button className="bg-[#FFF4EC] text-[#951418] px-8 py-4 rounded-xl font-regular flex items-center justify-center gap-2 shadow-lg hover:scale-[1.03] active:scale-[1.02] transition-alll">
                      <AlertTriangle size={20} /> Annulé
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-[#95141870 font-regular bg-white rounded-[20px] shadow-xl">
            Aucune commande trouvée.
          </div>
        )}
      </div>
    </div>
  );
};

export default Commandes;