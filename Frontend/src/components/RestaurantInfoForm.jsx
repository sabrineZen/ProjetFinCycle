import React, { useState } from "react";
import "./style.css";

export default function RestaurantInfoForm() {
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ouverture, setOuverture] = useState("");
  const [fermeture, setFermeture] = useState("");

  const [savedData, setSavedData] = useState({});

  const handleSave = () => {
    setSavedData({ nom, categorie, tel, adresse, ouverture, fermeture });
  };

  return (
    <>
      <div className="form1">
        <div className="titlee">
          <span className="img-profil"></span>
          <span className="info_generale">Informations generales</span>
        </div>
        <br />
        <label className="l1">Nom de Restaurant</label>
        <input type="text" className="info-input1" value={nom} onChange={e => setNom(e.target.value)} />
        <br />
        <label className="l2">Description</label>
        <textarea className="info-input2"></textarea>
        <br />
        <div className="ligne3">
          <label className="l3">Categorie</label>
          <select className="info-input3" value={categorie} onChange={e => setCategorie(e.target.value)}>
            <option value="">-- Choisir une catégorie --</option>
            <option value="Burger">Burger</option>
            <option value="Pizza">Pizza</option>
            <option value="Salade">Salade</option>
            <option value="Desserts">Desserts</option>
            <option value="Boissons">Boissons</option>
          </select>
          <label className="l4">Email</label>
          <input type="email" className="info-input4" />
        </div>
        <div className="ligne4">
          <label className="l5">Telephone</label>
          <input type="tel" className="info-input5" value={tel} onChange={e => setTel(e.target.value)} />
          <label className="l6">Adresse</label>
          <input type="text" className="info-input6" value={adresse} onChange={e => setAdresse(e.target.value)} />
        </div>
      </div>
      <div className="form2">
        <p className="info_generale">Horaires & livraison</p>  
        <div className="lignee1">
          <label className="l7">Heure d'ouverture</label>
          <input type="text" className="info-input7" value={ouverture} onChange={e => setOuverture(e.target.value)} />
          <label className="l8">Heure de fermeture</label>
          <input type="text" className="info-input8" value={fermeture} onChange={e => setFermeture(e.target.value)} />
          <label htmlFor className="l9">Delai de livraison</label><br />
          <input type="text" name id className="info-input9" />
        </div>
        <div className="lignee2">
          <label className="l10">Commande min</label>
          <input type="text" className="info-input10" />
          <label className="l11">Frais de livraison</label>
          <input type="text" className="info-input11" />
        </div>
      </div>
      
      <button className="sauv" onClick={handleSave}>Sauvegarder</button>

      <div className="infos-sauvegardees">
        <p className="inf-sau">Informations rapides</p>
        <p className="tel">{savedData.tel}</p>
        <p className="adresse">{savedData.adresse}</p>
        <div className="hr"> 
          <span className="h-ouverture">{savedData.ouverture}</span>
          <span> - </span>
          <span className="h-fermeteure">{savedData.fermeture}</span>
        </div>  
      </div>
    </>
  );
}