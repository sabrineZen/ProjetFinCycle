import React, { useState } from 'react';
import { Plus, Search, Eye, EyeOff, Edit2, Trash2 } from 'lucide-react';
import PlatModal from './PlatModal';

const MesPlats = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPlat, setCurrentPlat] = useState(null);
  const [filter, setFilter] = useState('Tous');

  const [categoriesList, setCategoriesList] = useState([
    'Tous', 'Burger', 'Pizza', 'Salade', 'Desserts', 'Boissons'
  ]);

  const [platsData, setPlatsData] = useState([
    { id: 1, nom: "Burger", description: "Steak haché, chedar fondu, salade...", prix: "1500 DA", categorie: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", disponible: true },
    { id: 2, nom: "Pizza", description: "Sauce tomate, mozzarella, basilic...", prix: "1000 DA", categorie: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", disponible: true },
    { id: 3, nom: "Salade César", description: "Romaine, parmesan, croutons...", prix: "1000 DA", categorie: "Salade", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500", disponible: false },
  ]);

  const platsFiltrés = filter === 'Tous'
    ? platsData
    : platsData.filter(p => p.categorie === filter);

  const handleDeleteCategory = () => {
    if (filter === 'Tous') return;

    if (window.confirm(`Supprimer "${filter}" ?`)) {
      setPlatsData(prev => prev.filter(p => p.categorie !== filter));
      setCategoriesList(prev => prev.filter(c => c !== filter));
      setFilter('Tous');
    }
  };

  const handleToggleStatus = (id) => {
    setPlatsData(prev =>
      prev.map(plat =>
        plat.id === id ? { ...plat, disponible: !plat.disponible } : plat
      )
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce plat ?")) {
      setPlatsData(prev => prev.filter(p => p.id !== id));
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
    <div className="relative min-h-screen overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-8">
        <p className="text-[#951418]/70 font-regular">
          {platsData.length} plats au total
        </p>

        <button
          onClick={handleAdd}
          className="bg-[#FF843D] text-white px-6 py-4 rounded-[20px] font-regular flex items-center gap-2 shadow-lg hover:scale-105 transition-all w-full sm:w-auto justify-center"
        >
          <Plus size={22} strokeWidth={3} />
          Ajouter un plat
        </button>
      </div>

      {/* FILTRES */}
      <div className="bg-white p-4 rounded-[20px] shadow-md flex flex-wrap items-center justify-between gap-4 mb-10">

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-7 py-2 rounded-xl font-regular text-xs md:text-sm transition-all ${
                filter === cat
                  ? 'bg-[#FF843D] text-white shadow-lg'
                  : 'bg-[#FFE8D6]/40 text-[#951418] border border-[#C0A0A0]'
              }`}
            >
              {cat}
            </button>
          ))}

          {filter !== 'Tous' && (
            <button
              onClick={handleDeleteCategory}
              className="px-3 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 text-xs md:text-sm"
            >
              <Trash2 size={14} /> Supprimer
            </button>
          )}
        </div>

        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#951418]" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-[#FFF7F4] rounded-2xl py-3 pl-12 text-[#951418] border border-[#C0A0A0] focus:ring-1 focus:ring-[#FF843D] outline-none"
          />
        </div>
      </div>

      {/* GRILLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">

        {platsFiltrés.map((plat) => (
          <div key={plat.id} className="bg-white rounded-[25px] overflow-hidden shadow-md flex flex-col">

            <div className="relative h-40 sm:h-44 md:h-50">
              <img src={plat.image} className="w-full h-full object-cover" />

              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold ${
                plat.disponible
                  ? 'bg-green-500/20 text-green-600'
                  : 'bg-red-500/20 text-red-600'
              }`}>
                {plat.disponible ? 'Disponible' : 'Indisponible'}
              </div>
            </div>

            <div className="p-3 md:p-4 flex flex-col flex-1">

              <h3 className="text-lg md:text-2xl font-regular text-[#951418]">
                {plat.nom}
              </h3>

              <p className="text-sm text-[#951418]/70 line-clamp-2">
                {plat.description}
              </p>

              <div className="flex justify-between items-center mt-auto mb-4">
                <span className="font-regular text-[#951418] text-lg">
                  {plat.prix}
                </span>
                <span className="bg-[#FFE0C2] px-3 py-1 rounded-xl text-xs">
                  {plat.categorie}
                </span>
              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => handleToggleStatus(plat.id)}
                  className="flex-1 bg-[#FF843D] text-white py-3 rounded-2xl text-xs flex items-center justify-center gap-2"
                >
                  {plat.disponible ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>

                <button
                  onClick={() => handleEdit(plat)}
                  className="bg-[#FF843D] text-white p-3 rounded-2xl"
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() => handleDelete(plat.id)}
                  className="bg-red-500 text-white p-3 rounded-2xl"
                >
                  <Trash2 size={18} />
                </button>

              </div>
            </div>
          </div>
        ))}
        <div className="bg-white w-full sm:w-57.5 h-70 mt-8 rounded-2xl flex items-center justify-center shadow-md hover: transition-all">

          <button
            onClick={handleAdd}
            className="flex flex-col items-center justify-center gap-3 p-6 text-[#951418]"
          >
            <div className="w-16 h-16 bg-[#FF843D] rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Plus size={32} strokeWidth={3} />
            </div>

            <span className="font-regular text-lg">
              Ajouter un plat
            </span>

          </button>

        </div>
      </div>

      {/* MODAL */}
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