import React, { useState } from "react";
import "./style.css";

export default function RestaurantProfile() {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profil">
      <div
        className="profil-img"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="insert" onClick={() => document.getElementById("fileInput").click()} />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
      <p className="nom-rest">Chez les berberes</p>
      <p className="categorie-rest">Pizza</p>
    </div>
  );
}