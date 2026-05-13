import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import {
  Search, Bell, Clock, CheckCircle2, Truck,
  AlertCircle, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';

const statutsEtapes = ['en_attente', 'confirmee', 'en_preparation', 'livree'];

const getIconStatut = (statut) => {
  switch (statut) {
    case 'en_attente':    return <Bell className="text-[#951418]" />;
    case 'confirmee':     return <Clock className="text-[#951418]" />;
    case 'en_preparation':return <Clock className="text-[#951418]" />;
    case 'livree':        return <Truck className="text-[#951418]" />;
    case 'annulee':       return <AlertCircle className="text-[#951418]" />;
    default:              return <Bell className="text-[#951418]" />;
  }
};

const getLabelStatut = (statut) => {
  switch (statut) {
    case 'en_attente':     return 'En attente';
    case 'confirmee':      return 'Confirmée';
    case 'en_preparation': return 'En préparation';
    case 'livree':         return 'Livrée';
    case 'annulee':        return 'Annulée';
    default:               return statut;
  }
};

const getStatusColor = (statut) => {
  switch (statut) {
    case 'en_attente':     return 'bg-red-100 text-red-500';
    case 'confirmee':      return 'bg-blue-100 text-blue-500';
    case 'en_preparation': return 'bg-purple-100 text-purple-500';
    case 'livree':         return 'bg-green-100 text-green-500';
    case 'annulee':        return 'bg-red-50 text-red-400';
    default:               return 'bg-gray-100 text-gray-500';
  }
};

const getProchainStatut = (statut) => {
  const index = statutsEtapes.indexOf(statut);
  if (index === -1 || index === statutsEtapes.length - 1) return null;
  return statutsEtapes[index + 1];
};

const getLabelBouton = (statut) => {
  switch (statut) {
    case 'en_attente':     return 'Confirmer';
    case 'confirmee':      return 'En préparation';
    case 'en_preparation': return 'Livrée';
    default:               return null;
  }
};

const Commandes = () => {
  const [filter, setFilter]           = useState('Tous');
  const [expandedId, setExpandedId]   = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [commandes, setCommandes]     = useState([]);
  const [chargement, setChargement]   = useState(true);

  const token = localStorage.getItem('token');

  // ── Charger les commandes ──
  const fetchCommandes = async () => {
    try {
      const res = await fetch('/api/commandes/restaurateur', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      setCommandes(data);
    } catch (err) {
      console.error('Erreur fetch commandes:', err);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => { fetchCommandes(); }, []);

  // ── Changer statut ──
  const handleChangerStatut = async (id, statut) => {
    try {
      const res = await fetch(`/api/commandes/${id}/statut`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ statut })
      });
      if (res.ok) {
        setCommandes(prev => prev.map(c =>
          c.id === id ? { ...c, statut } : c
        ));
      }
    } catch (err) {
      console.error('Erreur changement statut:', err);
    }
  };

  const categories = [
    { id: 'Tous',          label: 'Tous' },
    { id: 'en_attente',    label: 'En attente' },
    { id: 'confirmee',     label: 'Confirmées' },
    { id: 'en_preparation',label: 'En préparation' },
    { id: 'livree',        label: 'Livrées' },
    { id: 'annulee',       label: 'Annulées' },
  ];

  const getCount = (catId) => {
    if (catId === 'Tous') return commandes.length;
    return commandes.filter(c => c.statut === catId).length;
  };

  const commandesFiltrees = commandes.filter(cmd => {
    const client = cmd.Utilisateur
      ? `${cmd.Utilisateur.prenom || ''} ${cmd.Utilisateur.nom || ''}`.toLowerCase()
      : '';
    const matchSearch =
      client.includes(searchQuery.toLowerCase()) ||
      String(cmd.id).includes(searchQuery);
    const matchFilter = filter === 'Tous' || cmd.statut === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-5 w-full max-w-[100vw] overflow-x-hidden px-3 sm:px-4">

      {/* BANNER */}
      <div className="bg-[#FF843D] text-white p-4 rounded-[14px] flex items-center gap-3 shadow-md">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm sm:text-base">
          {getCount('en_attente')} nouvelle(s) commande(s) reçue(s)
        </span>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {['en_attente', 'confirmee', 'en_preparation', 'livree'].map((s) => (
          <div key={s} className="bg-white p-3 sm:p-4 rounded-[20px] shadow-md flex flex-col items-center">
            <span className="text-2xl sm:text-4xl text-[#951418]">{getCount(s)}</span>
            <span className="text-xs sm:text-sm text-[#951418]/60">{getLabelStatut(s)}</span>
          </div>
        ))}
      </div>

      {/* FILTRES + RECHERCHE */}
      <div className="bg-white p-3 sm:p-4 rounded-[20px] shadow-md flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setFilter(cat.id); setExpandedId(null); }}
              className={`px-3 sm:px-4 py-2 rounded-xl border border-[#C0A0A0] text-xs sm:text-sm flex items-center gap-2 ${
                filter === cat.id ? 'bg-[#FF843D] text-white' : 'bg-[#FFE3CE]/40 text-[#8B2C21]'
              }`}>
              {cat.label}
              <span className="text-[10px] sm:text-xs">{getCount(cat.id)}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#951418]" size={18} />
          <input type="text" placeholder="ID ou client .." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl py-3 pl-10 pr-3 text-sm text-[#951418] outline-none focus:ring-1 focus:ring-[#FF843D]"
          />
        </div>
      </div>

      {/* LISTE */}
      {chargement ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF843D]" />
        </div>
      ) : (
        <div className="space-y-4">
          {commandesFiltrees.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Aucune commande trouvée.</p>
          ) : (
            commandesFiltrees.map((cmd) => {
              const client = cmd.Utilisateur
                ? `${cmd.Utilisateur.prenom || ''} ${cmd.Utilisateur.nom || ''}`.trim()
                : 'Client inconnu';
              const prochainStatut = getProchainStatut(cmd.statut);
              const labelBouton   = getLabelBouton(cmd.statut);

              return (
                <div key={cmd.id} className="bg-white rounded-[20px] shadow-md overflow-hidden">

                  {/* HEADER */}
                  <div onClick={() => setExpandedId(expandedId === cmd.id ? null : cmd.id)}
                    className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer">
                    <div className="flex items-center gap-4">
                      {getIconStatut(cmd.statut)}
                      <div>
                        <div className="flex flex-wrap gap-3 items-center">
                          <span className="text-[#951418]">#{cmd.id}</span>
                          <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${getStatusColor(cmd.statut)}`}>
                            {getLabelStatut(cmd.statut)}
                          </span>
                          {cmd.statut === 'en_attente' && (
                            <motion.span
                              animate={{ scale: [1, 1.1, 1], boxShadow: ["0px 0px 0px rgba(239,68,68,0)", "0px 0px 12px rgba(239,68,68,0.8)", "0px 0px 0px rgba(239,68,68,0)"] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                              className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px]"
                            >
                              Nouveau!
                            </motion.span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          {client} • {new Date(cmd.dateCommande).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[#951418]">{parseFloat(cmd.total).toFixed(2)} DA</span>
                      {expandedId === cmd.id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>

                  {/* DÉTAILS */}
                  {expandedId === cmd.id && (
                    <div className="p-4 border-t space-y-4 border-gray-400">

                      {/* Infos client */}
                      <div className="text-sm">
                        <p className="text-[#951418]">Client : {client}</p>
                        <p className="text-gray-500">{cmd.Utilisateur?.telephone || '—'}</p>
                        <p className="text-gray-500">{cmd.adresseLivraison}</p>
                      </div>

                      {/* Lignes commande */}
                      {(cmd.LigneCommandes || []).map((ligne) => (
                        <div key={ligne.id} className="flex justify-between text-sm">
                          <span className="text-[#951418]">
                            {ligne.quantite}x {ligne.Plat?.nom || 'Plat'}
                          </span>
                          <span className="text-[#951418]">
                            {parseFloat(ligne.sousTotal).toFixed(2)} DA
                          </span>
                        </div>
                      ))}

                      {/* Total */}
                      <div className="flex justify-between border-t pt-2 border-gray-400">
                        <span className="text-[#951418]">Total</span>
                        <span className="text-[#951418]">{parseFloat(cmd.total).toFixed(2)} DA</span>
                      </div>

                      {/* Boutons */}
                      {cmd.statut !== 'annulee' && cmd.statut !== 'livree' && (
                        <div className="flex flex-col sm:flex-row gap-3">
                          {labelBouton && (
                            <button
                              onClick={() => handleChangerStatut(cmd.id, prochainStatut)}
                              className="bg-[#FF843D] text-white py-2 rounded-xl flex-1 hover:opacity-90 transition"
                            >
                              {labelBouton}
                            </button>
                          )}
                          <button
                            onClick={() => handleChangerStatut(cmd.id, 'annulee')}
                            className="bg-[#FFF4EC] text-[#951418] py-2 border border-[#951418] rounded-xl flex-1 flex items-center justify-center gap-2 hover:opacity-90 transition"
                          >
                            <AlertTriangle size={18} /> Annuler
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Commandes;