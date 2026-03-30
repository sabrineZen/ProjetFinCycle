import React, { useState } from "react";

function ModalForm({ isOpen, onClose }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
    else setImagePreview(null);
  };

  const handleSubmit = e => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={handleClose}
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-orange-500">Ajouter un plat</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Aperçu"
              className="w-full h-48 object-cover rounded-md mb-2"
            />
          )}

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Nom du plat :</label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom du plat"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Description :</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex flex-col">
              <label className="font-medium text-gray-700">Prix :</label>
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="Prix"
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="font-medium text-gray-700">Catégorie :</label>
              <select
                name="categorie"
                value={formData.categorie}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
              >
                <option value="">-- Choisir une catégorie --</option>
                <option value="Burger">Burger</option>
                <option value="Pizza">Pizza</option>
                <option value="Salade">Salade</option>
                <option value="Desserts">Desserts</option>
                <option value="Boissons">Boissons</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">URL de l'image :</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
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