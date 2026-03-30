import React, { useState } from "react";

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
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm mx-auto text-center space-y-4">
      {/* Image de profil */}
      <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
        {image ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-gray-400">
            Image
          </span>
        )}

        {/* Overlay pour cliquer et changer l'image */}
        <div
          className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <span className="text-white font-semibold">Changer</span>
        </div>

        <input
          type="file"
          id="fileInput"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Nom et catégorie */}
      <p className="text-lg font-semibold text-gray-800">Chez les berberes</p>
      <p className="text-sm text-gray-500">Pizza</p>
    </div>
  );
}