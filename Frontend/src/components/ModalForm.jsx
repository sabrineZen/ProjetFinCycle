import React, { useState } from "react";

function ModalForm({ isOpen, onClose }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données du plat :", formData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ nom: "", description: "", prix: "", categorie: "" });
    setImagePreview(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-[15px] w-[378px] relative">
        <span
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={handleClose}
        >
          ×
        </span>

        <h2 className="text-[#951418] text-lg font-semibold mb-4">
          Ajouter un plat
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Prévisualisation image */}
          <div className="w-full h-[122px] border border-gray-300 rounded-[15px] mb-8">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Aperçu"
                className="w-full h-full object-cover rounded-[15px]"
              />
            )}
          </div>

          {/* Nom */}
          <label className="text-[#951418] mb-1 block">Nom de plat :</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du plat"
            className="bg-[#ffe3ce] w-full h-[35px] border border-gray-300 rounded-[5px] mb-8 px-2"
          />

          {/* Description */}
          <label className="text-[#951418] mb-1 block">Description :</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="bg-[#ffe3ce] w-full h-[51px] border border-gray-300 rounded-[5px] mb-8 px-2"
          />

          {/* Prix et catégorie */}
          <div className="flex gap-3 mb-8">
            <div className="flex flex-col">
              <label className="text-[#951418]" id="prx">
                Prix :
              </label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="Prix"
                className="bg-[#ffe3ce] w-[182px] h-[35px] border border-gray-300 rounded-[5px] px-2 mt-2"
              />
            </div>

            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="bg-[#ffe3ce] w-[182px] h-[38px] border border-gray-300 rounded-[5px] px-2 mt-6"
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Salade">Salade</option>
              <option value="Desserts">Desserts</option>
              <option value="Boissons">Boissons</option>
            </select>
          </div>

          {/* Upload image */}
          <label className="text-[#951418] mb-1 block">URL de l'image :</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="bg-[#ffe3ce] w-full border border-gray-300 rounded-[5px] mb-8 px-2 py-1"
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <input
              type="reset"
              value="Annuler"
              onClick={handleClose}
              className="bg-[#ffe3ce] w-[184px] h-[34px] rounded-[10px] border-none cursor-pointer"
            />
            <button
              type="submit"
              className="bg-[#ff7d31] text-white w-[184px] h-[34px] rounded-[10px] border-none cursor-pointer"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;