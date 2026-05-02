import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, AlertCircle, Plus, Edit2 } from 'lucide-react';

const PlatModal = ({ isOpen, onClose, onSave, isEditing, currentPlat }) => {
  // 1. Déclaration des états pour stocker les valeurs du formulaire
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorie, setCategorie] = useState('Pizza');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null); // 🌟 NOUVEAU : État pour l'aperçu de l'image
  const [disponible, setDisponible] = useState(true);

  // 2. Pré-remplir le formulaire si on modifie, ou le vider si on ajoute
  useEffect(() => {
    if (isOpen) {
      if (isEditing && currentPlat) {
        setNom(currentPlat.nom || '');
        setDescription(currentPlat.description || '');
        setPrix(currentPlat.prix ? currentPlat.prix.replace(" DA", "") : '');
        setCategorie(currentPlat.categorie || 'Pizza');
        setImage(currentPlat.image || '');
        setImagePreview(currentPlat.image || null); // 🌟 NOUVEAU : Affiche l'image existante si on modifie
        setDisponible(currentPlat.disponible !== undefined ? currentPlat.disponible : true);
      } else {
        setNom('');
        setDescription('');
        setPrix('');
        setCategorie('Pizza');
        setImage(''); // 🌟 NOUVEAU : On vide le vrai fichier
        setImagePreview(null); // 🌟 NOUVEAU : On vide l'aperçu
        setDisponible(true);
      }
    }
  }, [isOpen, isEditing, currentPlat]);

  // 🌟 NOUVEAU : Fonction pour gérer le choix de l'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // On garde le fichier réel en mémoire pour l'envoyer au backend
      setImagePreview(URL.createObjectURL(file)); // On crée un faux lien juste pour l'aperçu visuel
    }
  };

  if (!isOpen) return null;

  // 3. Fonction déclenchée quand on clique sur "Ajouter" ou "Enregistrer"
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // On prépare l'objet à envoyer au backend
    const platData = {
      ...(isEditing && currentPlat ? { id: currentPlat.id } : {}),
      nom,
      description,
      prix: `${prix} DA`, // On remet le " DA"
      categorie,
      image,
      disponible
    };

    // On envoie les données à MesPlats.jsx
    onSave(platData);
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-5 animate-in fade-in duration-300 text-[#951418]">
      {/* Overlay flou */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" 
        onClick={onClose}
      ></div>

      {/* Contenu Modal */}
      <div className="relative bg-white w-full max-w-xl rounded-[20px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-10 pb-4 flex justify-between items-center bg-white z-10">
          <h2 className="text-3xl font-regular text-[#951418]">
            {isEditing ? "Modifier le plat" : "Ajouter un plat"}
          </h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center bg-[#FF7D31] rounded-full text-white hover:bg-red-600 transition-colors"
          >
            <X size={24}  />
          </button>
        </div>

        {/* Formulaire Scrollable */}
        <div className="px-10 overflow-y-auto custom-scrollbar flex-1">
          <form id="plat-form" onSubmit={handleSubmit} className="space-y-6 pb-6">
            
            {/* 🌟 NOUVEAU : La boîte de l'image complètement modifiée */}
            <div className="relative h-44 w-full bg-[#FFF7F4] rounded-[25px] border-2 border-dashed border-[#C0A0A0] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors group overflow-hidden">
              
              {/* Le vrai bouton d'upload (invisible mais cliquable partout sur la boîte) */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              {/* L'affichage de l'aperçu ou du texte par défaut */}
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" alt="preview" />
              ) : (
                <>
                  <div className="p-4 bg-white rounded-2xl text-[#FF843D] shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} />
                  </div>
                  <span className="text-[#951418] font-regular">Cliquez pour ajouter une photo</span>
                </>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-md font-regular text-[#951418] ml-2 ">Nom du plat *</label>
              <input 
                type="text" 
                required // Rend le champ obligatoire
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl p-4 focus:ring-1 focus:ring-[#FF843D] transition-all outline-none" 
                placeholder="Ex: Pizza Fruits de Mer" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-regular text-[#951418] ml-2">Description</label>
              <textarea 
                rows="2" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl p-4 focus:ring-1 focus:ring-[#FF843D] transition-all outline-none" 
                placeholder="Ingrédients..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-md font-regular text-[#951418] ml-2">Prix (DA) *</label>
                <input 
                  type="number" 
                  required
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl p-4 focus:ring-1 focus:ring-[#FF843D] transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-md font-regular text-[#951418]  ml-2">Catégorie</label>
                <select 
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  className="w-full bg-[#FFF7F4] border border-[#C0A0A0] rounded-2xl p-4 appearance-none text-[#951418] focus:ring-1 focus:ring-[#FF843D] transition-all outline-none "
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Salade">Salade</option>
                  <option value="Desserts">Desserts</option>
                  <option value="Boissons">Boissons</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div 
                onClick={() => setDisponible(!disponible)}
                className={`w-12 h-7 rounded-full p-1 flex items-center cursor-pointer transition-all ${
                  disponible ? 'bg-[#FF843D] justify-end' : 'bg-gray-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
              </div>
              <span className="text-md font-regular text-[#951418]">
                {disponible ? 'Disponible à la commande' : 'Indisponible'}
              </span>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-10 pt-6 border-t border-gray-50 bg-white">
          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#FFE3CE] text-[#951418] py-4 rounded-[22px] font-regular flex items-center justify-center gap-2 shadow-xl hover:scale-105 transition-transform"
            >
              <AlertCircle size={22} /> Annuler
            </button>
            <button 
              type="submit"
              form="plat-form" // Relie ce bouton au formulaire au-dessus
              className="flex-[1.5] bg-[#FF843D] text-white py-4 rounded-[22px] font-regular flex items-center justify-center gap-2 shadow-xl  hover:scale-105 transition-transform"
            >
              {isEditing ? <Edit2 size={24} /> : <Plus size={24} strokeWidth={3} />}
              {isEditing ? "Enregistrer" : "Ajouter le plat"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatModal;