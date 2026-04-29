const CardInfo = ({ icon, titre, valeur, couleur }) => (
  <div
    className="bg-white rounded-[20px] p-5 flex gap-4 items-center"
    style={{
      border: "1px solid rgba(26,18,8,0.08)",
      boxShadow: "0 4px 24px rgba(26,18,8,0.07)",
    }}
  >
    <div
      className="w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0 text-xl"
      style={{ background: couleur + "22", color: couleur }}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-black" style={{ color: "#1A1208" }}>
        {valeur}
      </p>
      <p className="text-xs font-medium mt-0.5" style={{ color: "rgba(26,18,8,0.45)" }}>
        {titre}
      </p>
    </div>
  </div>
);

export default CardInfo;