import React, { useState } from 'react';
import { motion } from "framer-motion";
import {

  Search, Bell, Clock, CheckCircle2, Truck,
  AlertCircle, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';

  FaSearch, FaBell, FaClock, FaCheckCircle, FaTruck,
  FaExclamationCircle, FaChevronDown, FaChevronUp, FaExclamationTriangle
} from 'react-icons/fa';


const Commandes = () => {
  const [filter, setFilter] = useState('Tous');
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ STATE MODIFIABLE
  const [commandesList, setCommandesList] = useState([

    { id: "#0045", client: "GHANOU Y.", heure: "12:30", prix: "4100 DA", status: "Nouvelle", badge: "Nouveau!", icon: <Bell className="text-[#951418]" /> },
    { id: "#0046", client: "AHMED Y.", heure: "12:30", prix: "3200 DA", status: "En cours", icon: <Clock className="text-[#951418]" /> },
    { id: "#0047", client: "WASSIM Y.", heure: "12:35", prix: "3600 DA", status: "Pret", icon: <CheckCircle2 className="text-[#951418]" /> },
    { id: "#0048", client: "OUSSAMA Y.", heure: "12:36", prix: "5500 DA", status: "Livré", icon: <Truck className="text-[#951418]" /> },
    { id: "#0049", client: "DIANA Y.", heure: "12:45", prix: "2600 DA", status: "Annulé", icon: <AlertCircle className="text-[#951418]" /> },

    { id: "#0045", client: "GHANOU Y.", heure: "12:30", prix: "4100 DA", status: "Nouvelle", badge: "Nouveau!", icon: <FaBell className="text-[#951418]" /> },
    { id: "#0046", client: "AHMED Y.", heure: "12:30", prix: "3200 DA", status: "En cours", icon: <FaClock className="text-[#951418]" /> },
    { id: "#0047", client: "WASSIM Y.", heure: "12:35", prix: "3600 DA", status: "Pret", icon: <FaCheckCircle className="text-[#951418]" /> },
    { id: "#0048", client: "OUSSAMA Y.", heure: "12:36", prix: "5500 DA", status: "Livré", icon: <FaTruck className="text-[#951418]" /> },
    { id: "#0049", client: "DIANA Y.", heure: "12:45", prix: "2600 DA", status: "Annulé", icon: <FaExclamationCircle className="text-[#951418]" /> },

  ]);

  // 🔥 ANNULATION
  const handleCancel = (id) => {
    const updated = commandesList.map((cmd) =>
      cmd.id === id ? { ...cmd, status: "Annulé" } : cmd
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
    if (catId === 'Nouvelles') return commandesList.filter(c => c.status === 'Nouvelle').length;
    if (catId === 'Annuler') return commandesList.filter(c => c.status === 'Annulé').length;
    if (catId === 'Prets') return commandesList.filter(c => c.status === 'Pret').length;
    return commandesList.filter(c => c.status === catId).length;
  };

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

  const commandesFiltrées = commandesList.filter(cmd => {
    const matchesSearch =
      cmd.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.id.includes(searchQuery);

    const matchesFilter =
      filter === 'Tous' ||
      (filter === 'Nouvelles' && cmd.status === 'Nouvelle') ||
      (filter === 'Annuler' && cmd.status === 'Annulé') ||
      (filter === 'Prets' && cmd.status === 'Pret') ||
      cmd.status === filter;

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

              className={`px-3 sm:px-4 py-2 rounded-xl border text-xs sm:text-sm flex items-center gap-2 ${

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

          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#951418]" size={18} />

          <input
            type="text"
            placeholder="ID ou client .."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}

            className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl py-3 pl-10 pr-3 text-sm sm:text-base text-[#951418] outline-none focus:ring-1 focus:ring-[#FF843D]"

            className="w-full bg-[#FFE3CE] border border-[#C0A0A0] rounded-2xl py-3 pl-10 pr-3 text-sm sm:text-base text-[#951418] outline-none"

          />
        </div>
      </div>

      {/* LIST */}
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
                {cmd.icon}

                <div>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="text-[#951418]">
                      {cmd.id}
                    </span>

                    <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs ${getStatusColor(cmd.status)}`}>
                      {cmd.status}
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
                    {cmd.client} • {cmd.heure}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#951418]">
                  {cmd.prix}
                </span>


                {expandedId === cmd.id ? <ChevronUp /> : <ChevronDown />}

                {expandedId === cmd.id ? <FaChevronUp /> : <FaChevronDown />}

              </div>

            </div>

            {/* DETAILS */}
            {expandedId === cmd.id && (
              <div className="p-4 border-t space-y-4 border-gray-400">

                <div className="text-sm">
                  <p className="text-[#951418]">Client: Younsi Ghanou</p>
                  <p className="text-gray-500">0777777 513</p>
                  <p className="text-gray-500">Rue Didouche Morad, Alger</p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className='text-[#951418]'>2x Burger</span>
                  <span className='text-[#951418]'>3100 DA</span>
                </div>

                <div className="flex justify-between border-t pt-2 font-regular border-gray-400">
                  <span className='text-[#951418]'>Total</span>
                  <span className='text-[#951418]'>{cmd.prix}</span>
                </div>

                <div className="bg-[#FFCC99]/70 p-3 rounded-xl text-sm text-[#951418] shadow-md ">
                  Sans oignon s'il vous plaît
                </div>

                <div className="flex flex-col sm:flex-row gap-12">

                  <button className="bg-[#FF843D] text-white py-1  rounded-xl flex-1 hover:scale-103 transition-all">
                    En cours
                  </button>

                  {/* ✅ ANNULER */}
                  <button
                    onClick={() => handleCancel(cmd.id)}
                    className="bg-[#FFF4EC] text-[#951418] py-2 border border-[#951418] rounded-xl flex-1 flex items-center justify-center gap-2 hover:scale-103 transition-all"
                  >

                    <AlertTriangle size={18} /> Annulé

                    <FaExclamationTriangle size={18} /> Annulé

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