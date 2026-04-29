function PlatPopular({ plat, hoverClass }) {
  return (
    <div
      className={`w-full flex flex-col overflow-hidden transition-all duration-500 ${hoverClass}`}
      style={{
        background: "#FFFFFF",
        borderRadius: "32px",
        boxShadow: "0 10px 30px rgba(26,18,8,0.05)",
        border: "1px solid rgba(255,69,0,0.1)",
      }}
    >
      {/* IMAGE */}
      <div className="w-full overflow-hidden" style={{ aspectRatio: "4/3", background: "#FDF6F0" }}>
        <img
          src={plat.image || "/default.png"}
          alt={plat.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>

      {/* CONTENU */}
      <div className="p-6 md:p-7 flex flex-col flex-grow">
        
        <span
          className="text-[10px] font-black uppercase tracking-[2px] mb-2"
          style={{ color: "#FF4500" }}
        >
          {plat.categorie || "Plat du jour"}
        </span>

        <h2
          className="text-lg font-black leading-tight mb-1 uppercase tracking-tighter"
          style={{ color: "#1A1208" }}
        >
          {plat.name}
        </h2>

        <p className="text-[10px] font-bold mb-5 uppercase tracking-wide" style={{ color: "rgba(26,18,8,0.4)" }}>
          Livraison · 15–25 min
        </p>

        {/* PRIX + BOUTON - AJUSTEMENT POUR L'ESPACE */}
        <div className="flex items-end justify-between mt-auto pt-2 w-full">
          <div className="flex flex-col">
            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: "rgba(26,18,8,0.3)" }}>
              Prix
            </p>
            <span className="text-2xl font-black leading-none" style={{ color: "#FF4500" }}>
              {plat.prix ? `${plat.prix} DA` : "1 200 DA"}
            </span>
          </div>
          
          <button
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: "#1A1208",
              padding: "14px 28px", // Padding ajusté pour un bouton plus élégant
              borderRadius: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              marginLeft: "10px" // Sécurité pour que le prix respire
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#FF4500";
              e.currentTarget.style.boxShadow = "0 6px 15px rgba(255,69,0,0.3)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#1A1208";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <span>+</span> Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlatPopular;