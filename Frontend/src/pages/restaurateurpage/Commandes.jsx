import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import api from '../../api';
import {
  Search, Bell, Clock, CheckCircle2, Truck,
  AlertCircle, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';

const Commandes = () => {
  const [filter, setFilter] = useState('Tous');
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [commandesList, setCommandesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/commandes')
      .then(res => {
        setCommandesList(res.data || []);
      })
      .catch(err => console.error('Erreur fetch commandes', err))
      .finally(() => setLoading(false));
  }, []);

  const statusLabels = {
    en_attente: 'Nouvelle',
    confirmee: 'Confirmée',
    en_preparation: 'En cours',
    livree: 'Livré',
    annulee: 'Annulé',
  };

  const formatStatus = (status) => statusLabels[status] || status || 'Inconnu';

  const handleCancel = (id) => {
    const updated = commandesList.map((cmd) =>
      cmd.id === id ? { ...cmd, statut: 'annulee' } : cmd
    );
    setCommandesList(updated);
    setExpandedId(null);
  };

  const categories = [
    { id: 'Tous', label: 'Tous' },
    { id: 'Nouvelles', label: 'Nouvelles' },
    { id: 'En cours', label: 'En cours' },
    { id: 'Prets', label: 'Prets' },
    { id: 'Livrés', label: 'Livrés' },
    { id: 'Annuler', label: 'Annuler' },
  ];

  const getCount = (catId) => {
    if (catId === 'Tous') return commandesList.length;
    if (catId === 'Nouvelles') return commandesList.filter(c => c.statut === 'en_attente').length;
    if (catId === 'Annuler') return commandesList.filter(c => c.statut === 'annulee').length;
    if (catId === 'Prets') return commandesList.filter(c => c.statut === 'en_preparation').length;
    if (catId === 'Livrés') return commandesList.filter(c => c.statut === 'livree').length;
    return commandesList.filter(c => formatStatus(c.statut) === catId).length;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Nouvelle': return 'bg-red-100 text-red-500';
      case 'Confirmée': return 'bg-orange-100 text-orange-500';
      case 'En cours': return 'bg-blue-100 text-blue-500';
      case 'Livré': return 'bg-green-100 text-green-500';
      case 'Annulé': return 'bg-red-50 text-red-400';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const commandesFiltrées = commandesList.filter(cmd => {
    const matchesSearch =
      (cmd.Utilisateur?.nom || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(cmd.id).includes(searchQuery);

    const matchesFilter =
      filter === 'Tous' ||
      (filter === 'Nouvelles' && formatStatus(cmd.statut) === 'Nouvelle') ||
      (filter === 'Annuler' && formatStatus(cmd.statut) === 'Annulé') ||
      (filter === 'Prets' && formatStatus(cmd.statut) === 'En cours') ||
      formatStatus(cmd.statut) === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5 w-full max-w-[100vw] overflow-x-hidden px-3 sm:px-4">

      {/* BANNER */}
      <div className="bg-[#FF843D] text-white p-4 rounded-[14px] flex items-center gap-3 shadow-md">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm sm:text-base">
          nouvelle(s) commande(s) reçue(s)
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {['Nouvelles', 'En cours', 'Prets', 'Livrés'].map((l) => (
          <div key={l} className="bg-white p-3 sm:p-4 rounded-[20px] shadow-md flex flex-col items-center">
            <span className="text-2xl sm:text-4xl text-[#951418]">
              {getCount(l)}
            </span>
            <span className="text-xs sm:text-sm text-[#951418]/60">
              {l}
            </span>
          </div>
        ))}
      </div>

      {/* FILTER + SEARCH */}
      <div className="bg-white p-3 sm:p-4 rounded-[20px] shadow-md flex flex-col gap-4">

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setFilter(cat.id); setExpandedId(null); }}
              className={`px-3 sm:px-4 py-2 rounded-xl border border-[#C0A0A0] text-xs sm:text-sm flex items-center gap-2 ${
                filter === cat.id
                  ? 'bg-[#FF843D] text-white'
                  : 'bg-[#FFE3CE]/40 text-[#8B2C21]'
              }`}
            >
              {cat.label}
              <span className="text-[10px] sm:text-xs">
                {getCount(cat.id)}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#951418]" size={18} />
          <input
            type="text"
            placeholder="ID ou client .."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl py-3 pl-10 pr-3 text-sm sm:text-base text-[#951418] outline-none focus:ring-1 focus:ring-[#FF843D]"
          />
        </div>
      </div>

      {/* LIST */}
      {loading ? <div className="text-center py-8">Chargement des commandes...</div> : null}
      <div className="space-y-4">

        {commandesFiltrées.map((cmd) => (
          <div
            key={cmd.id}
            className="bg-white rounded-[20px] shadow-md overflow-hidden w-full"
          >

            {/* HEADER */}
            <div
              onClick={() =>
                setExpandedId(expandedId === cmd.id ? null : cmd.id)
              }
              className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >

              <div className="flex items-center gap-8 sm:gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FFE8D8] text-[#951418]">
                  <Bell size={20} />
                </div>

                <div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-[#951418]">
                      {cmd.id}
                    </span>

                    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${getStatusColor(formatStatus(cmd.statut))}`}>
                      {formatStatus(cmd.statut)}
                    </span>

                    {cmd.badge && (
                      <motion.span
                        animate={{
                          scale: [1, 1.1, 1],
                          boxShadow: [
                            "0px 0px 0px rgba(239,68,68,0)",
                            "0px 0px 12px rgba(239,68,68,0.8)",
                            "0px 0px 0px rgba(239,68,68,0)"
                          ]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px]"
                      >
                        {cmd.badge}
                      </motion.span>
                    )}
                  </div>

                  <div className="text-xs text-gray-400">
                    {cmd.Utilisateur ? `${cmd.Utilisateur.nom} ${cmd.Utilisateur.prenom || ''}` : 'Client inconnu'} • {new Date(cmd.dateCommande).toLocaleString('fr-FR')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#951418]">
                  {(cmd.total || 0).toLocaleString()} DA
                </span>

                {expandedId === cmd.id ? <ChevronUp /> : <ChevronDown />}
              </div>

            </div>

            {/* DETAILS */}
            {expandedId === cmd.id && (
              <div className="p-4 border-t space-y-4 border-gray-400">

                <div className="text-sm">
                  <p className="text-[#951418]">Client: {cmd.Utilisateur ? `${cmd.Utilisateur.nom} ${cmd.Utilisateur.prenom || ''}` : 'Client'}</p>
                  <p className="text-gray-500">{cmd.adresseLivraison || ''}</p>
                </div>

                <div className="space-y-2">
                  {(cmd.LigneCommandes || []).map((l) => (
                    <div key={l.id} className="flex justify-between text-sm">
                      <span className='text-[#951418]'>{l.Plat?.nom || l.platId} x{l.quantite}</span>
                      <span className='text-[#951418]'>{(l.sousTotal || (l.prix * l.quantite) || 0).toLocaleString()} DA</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between border-t pt-2 font-regular border-gray-400">
                  <span className='text-[#951418]'>Total</span>
                  <span className='text-[#951418]'>{(cmd.total || 0).toLocaleString()} DA</span>
                </div>

                <div className="bg-[#FFCC99]/70 p-3 rounded-xl text-sm text-[#951418] shadow-md ">
                  {cmd.commentaire || '—'}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">

                  <button onClick={async () => {
                      try {
                        await api.put(`/commandes/${cmd.id}/status`, { statut: 'confirmee' });
                        setCommandesList(prev => prev.map(p => p.id === cmd.id ? { ...p, statut: 'confirmee' } : p));
                      } catch (err) {
                        console.error(err);
                        alert(err.response?.data?.message || 'Erreur lors de la confirmation');
                      }
                    }}
                    className="bg-[#FF843D] text-white py-2 rounded-xl flex-1 hover:scale-103 transition-all">
                    Confirmer
                  </button>

                  {/* ✅ ANNULER */}
                  <button
                    onClick={() => handleCancel(cmd.id)}
                    className="bg-[#FFF4EC] text-[#951418] py-2 border border-[#951418] rounded-xl flex-1 flex items-center justify-center gap-2 hover:scale-103 transition-all"
                  >
                    <AlertTriangle size={18} /> Annuler
                  </button>

                </div>

              </div>
            )}

          </div>
        ))}

      </div>

    </div>
  );
};

export default Commandes;