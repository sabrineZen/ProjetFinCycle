import React, { useState } from 'react';
import { Plus, Search, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react';
import PlatModal from './PlatModal';

const MesPlats = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlat, setCurrentPlat] = useState(null);
  const [filter, setFilter] = useState('Tous');

  // Utilisation d'un State pour les catégories pour pouvoir supprimer les boutons
  const [categoriesList, setCategoriesList] = useState(['Tous', 'Burger', 'Pizza', 'Salade', 'Desserts', 'Boissons']);

  const [platsData, setPlatsData] = useState([
    { id: 1, nom: "Burger", description: "Steak haché, chedar fondu, salade...", prix: "1500 DA", categorie: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", disponible: true },
    { id: 2, nom: "Pizza", description: "Sauce tomate, mozzarella, basilic...", prix: "1000 DA", categorie: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", disponible: true },
    { id: 3, nom: "Salade César", description: "Romaine, parmesan, croutons...", prix: "1000 DA", categorie: "Salade", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500", disponible: false },
  ]);

  const platsFiltrés = filter === 'Tous' ? platsData : platsData.filter(p => p.categorie === filter);

  // --- LOGIQUE DE SUPPRESSION COMPLÈTE ---

  const handleDeleteCategory = () => {
    if (filter === 'Tous') return;

    if (window.confirm(`Voulez-vous supprimer tous les plats et retirer le bouton "${filter}" définitivement ?`)) {
      // 1. Supprimer les plats de la data
      setPlatsData(prev => prev.filter(plat => plat.categorie !== filter));
      
      // 2. Supprimer le bouton de la liste des catégories
      setCategoriesList(prev => prev.filter(cat => cat !== filter));
      
      // 3. Revenir à l'affichage "Tous"
      setFilter('Tous');
    }
  };

  // --- AUTRES FONCTIONS ---

  const handleToggleStatus = (id) => {
    setPlatsData(prev => prev.map(plat => plat.id === id ? { ...plat, disponible: !plat.disponible } : plat));
  };

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce plat ?")) {
      setPlatsData(prev => prev.filter(plat => plat.id !== id));
    }
  };

  const handleSavePlat = (platData) => {
    if (isEditing) {
      setPlatsData(prev => prev.map(p => p.id === platData.id ? platData : p));
    } else {
      setPlatsData(prev => [...prev, { ...platData, id: Date.now() }]);
    }
    setShowModal(false);
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentPlat(null);
    setShowModal(true);
  };

  const handleEdit = (plat) => {
    setIsEditing(true);
    setCurrentPlat(plat);
    setShowModal(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-[#951418]/70 font-regular">{platsData.length} plats au total</p>
        <button onClick={handleAdd} className="bg-[#FF843D] text-white px-6 py-4 rounded-[20px] font-regular flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          <Plus size={24} strokeWidth={3} /> Ajouter un plat
        </button>
      </div>

      {/* FILTRES & RECHERCHE */}
      <div className="bg-white p-4 rounded-[20px] shadow-xl flex flex-wrap items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          {categoriesList.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)} 
              className={`px-7 py-2 rounded-xl font-regular text-sm transition-all ${filter === cat ? 'bg-[#FF843D] text-white shadow-lg' : 'bg-[#FFE8D6]/40 text-[#951418] border-1 border-[#C0A0A0]'}`}
            >
              {cat}
            </button>
          ))}
          
          {/* Le bouton Supprimer qui efface TOUT (Plats + Bouton de catégorie) */}
          {filter !== 'Tous' && (
            <button 
              onClick={handleDeleteCategory}
              className="px-2 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 font-regular text-sm shadow-md"
            >
              <Trash2 size={16} /> Supprimer all plats
            </button>
          )}
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#951418]" size={25} />
          <input type="text" placeholder="Rechercher un plat..." className="w-full bg-[#FFE3CE] border-none rounded-2xl py-3 pl-14 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" />
        </div>
      </div>
      {/* GRILLE */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {platsFiltrés.map((plat) => (
          <div key={plat.id} className="bg-white rounded-[25px] overflow-hidden shadow-xl flex flex-col">
            <div className="relative h-50">
              <img src={plat.image} alt={plat.nom} className="w-full h-full object-cover" />
              <div className={`absolute top-5 right-5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase backdrop-blur-md ${plat.disponible ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
                {plat.disponible ? 'Disponible' : 'Indisponible'}
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col">
              <h3 className="text-2xl font-regular text-[#951418] mb-1">{plat.nom}</h3>
              <p className="text-[#951418]/70 text-sm font-medium line-clamp-2">{plat.description}</p>
              <div className="flex justify-between items-center mt-auto mb-5">
                <span className="text-[#951418] font-regular text-xl">{plat.prix}</span>
                <span className="bg-[#FFE0C2] text-[#951418] px-4 py-1.5 rounded-xl text-[12px] font-regular">{plat.categorie}</span>
              </div>
              
              <div className="flex gap-3 mb-6">
                <button onClick={() => handleToggleStatus(plat.id)} className="flex-1 flex items-center justify-center shadow-lg gap-2 py-4 rounded-2xl font-regular text-xs text-white bg-[#FF843D] hover:scale-105 transition-transform">
                  {plat.disponible ? <><EyeOff size={18} /> Masquer</> : <><Eye size={18} /> Activer</>}
                </button>
                <button onClick={() => handleEdit(plat)} className="p-4 bg-[#FF843D] text-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
                  <Edit2 size={20} />
                </button>
                <button onClick={() => handleDelete(plat.id)} className="p-4 bg-[#FF7D31] text-white rounded-2xl shadow-lg hover:bg-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Bouton Ajouter (Style simple) */}
        <div className="bg-white w-62 h-80 rounded-3xl flex items-center justify-center">
            <button onClick={handleAdd} className="flex flex-col items-center justify-center gap-3 p-6 text-[#951418] hover:scale-105 transition-all">
              <div className="w-16 h-16 bg-[#FF843D] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Plus size={32} strokeWidth={3} />
              </div>
              <span className="font-regular text-lg">Ajouter un plat</span>
            </button>
        </div>
      </div>
      
      

      <PlatModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={handleSavePlat}
        isEditing={isEditing} 
        currentPlat={currentPlat} 
      />
    </div>
  );
};

export default MesPlats;