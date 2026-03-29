import React, { useState } from "react";
import './style.css';

function ModalForm({ isOpen, onClose }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
  });

  // Gestion des champs
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Prévisualisation de l'image
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  // Soumission du formulaire
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Données du plat :", formData);
    // Ici tu peux envoyer les données au serveur ou les stocker
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      nom: "",
      description: "",
      prix: "",
      categorie: "",
    });
    setImagePreview(null);
    onClose(); // ferme le modal
  };

  if (!isOpen) return null; // ne rien afficher si le modal est fermé

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>×</span>
        <h2 className="ecriteur">Ajouter un plat</h2>
        <form onSubmit={handleSubmit}>
          <div className="photo">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Aperçu"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "5px" }}
              />
            )}
          </div>
          <label className="ecriteur">Nom de plat :</label><br />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom du plat"
            className="input"
          /><br />

          <label className="ecriteur">Description :</label><br />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="input3"
          /><br />

          <div className="ligne-prix-categorie">
            <div className="ligne-prix">
              <label className="ecriteur" id="prx">Prix :</label><br />
              <input
                type="number"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                placeholder="Prix"
                className="input1"
              /><br />
            </div>

            <select
              name="categorie"
              value={formData.categorie}
              onChange={handleChange}
              className="input2"
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Salade">Salade</option>
              <option value="Desserts">Desserts</option>
              <option value="Boissons">Boissons</option>
            </select>
          </div>

          <label className="ecriteur">URL de l'image :</label><br />
          <input
            type="file"
            onChange={handleImageChange}
            className="input4"
          /><br />

          <input type="reset" value="Annuler" className="reset" onClick={handleClose} />
          <button type="submit" id="save">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;