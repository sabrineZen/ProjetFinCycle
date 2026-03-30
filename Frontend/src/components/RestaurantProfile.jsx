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
    <div className="bg-white w-[300px] h-[392px] rounded-[15px] flex flex-col items-center mb-4">
      {/* Image */}
      <div
        className="w-[143px] h-[143px] bg-[#ffe3ce] rounded-[15px] relative mt-8 mb-8 bg-center bg-cover"
        style={{
          backgroundImage: image ? `url(${image})` : "none",
        }}
      >
        <div
          className="w-[41px] h-[41px] bg-[#ff7d31] rounded-[15px] absolute bottom-0 right-0 cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>

      {/* Nom et catégorie */}
      <p className="text-[#951418] text-[25px] mb-0">Chez les berberes</p>
      <p className="text-gray-500 text-[20px] mt-0">Pizza</p>
    </div>
  );
}