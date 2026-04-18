import React from 'react';
import { X, Image as ImageIcon, AlertCircle, Plus, Edit2 } from 'lucide-react';

const PlatModal = ({ isOpen, onClose, isEditing, currentPlat }) => {
  if (!isOpen) return null;

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
          <form className="space-y-6 pb-6">
            <div className="h-44 w-full bg-[#FFE3CE] rounded-[25px]  border-2 border-[#C0A0A0] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-orange-50 transition-colors group overflow-hidden">
               {isEditing && currentPlat?.image ? (
                 <img src={currentPlat.image} className="w-full h-full object-cover" alt="preview" />
               ) : (
                 <>
                  <div className="p-4 bg-white rounded-2xl text-[#FF843D] shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon size={32} />
                  </div>
                  <span className="text-[#951418] font-regular">Télécharger une image</span>
                 </>
               )}
            </div>

            <div className="space-y-2">
              <label className="text-md font-regular text-[#951418] ml-2 ">Nom du plat *</label>
              <input 
                type="text" 
                defaultValue={isEditing ? currentPlat?.nom : ""}
                className="w-full bg-[#FFE3CE] border-1 border-[#C0A0A0] rounded-2xl p-4 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
                placeholder="Ex: Pizza Fruits de Mer" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-regular text-[#951418] ml-2">Description</label>
              <textarea 
                rows="2" 
                defaultValue={isEditing ? currentPlat?.description : ""}
                className="w-full bg-[#FFE3CE] border-1 border-[#C0A0A0] rounded-2xl p-4 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
                placeholder="Ingrédients..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-md font-regular text-[#951418] ml-2">Prix (DA) *</label>
                <input 
                  type="number" 
                  defaultValue={isEditing ? currentPlat?.prix.replace(" DA", "") : ""}
                  className="w-full bg-[#FFE3CE] border-1 border-[#C0A0A0] rounded-2xl p-4 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-md font-regular text-[#951418]  ml-2">Catégorie</label>
                <select 
                  defaultValue={isEditing ? currentPlat?.categorie : "Pizza"}
                  className="w-full bg-[#FFE3CE] border-1 border-[#C0A0A0] rounded-2xl p-4 appearance-none text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none "
                >
                  <option >Pizza</option>
                  <option>Burger</option>
                  <option>Salade</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2">
              <div className={`w-12 h-7 rounded-full p-1 flex items-center cursor-pointer transition-all ${
                (isEditing ? currentPlat?.disponible : true) ? 'bg-[#FF843D] justify-end' : 'bg-gray-300 justify-start'
              }`}>
                <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
              </div>
              <span className="text-md font-regular text-[#951418]">Disponible à la commande</span>
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