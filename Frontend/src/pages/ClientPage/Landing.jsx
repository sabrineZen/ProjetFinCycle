import React from 'react';

const T = {
  gold: "#E2B857",
  white: "#FFFFFF",
  glass: "rgba(255, 255, 255, 0.1)",
  glassDark: "rgba(0, 0, 0, 0.6)",
  serif: "'Playfair Display', serif",
  sans: "'Plus Jakarta Sans', sans-serif"
};

export default function LuxuryLanding() {
  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Google Fonts */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');
          
          @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .animate { animation: fadeIn 1s ease forwards; }
          .glass-btn:hover { background: ${T.gold} !important; color: #000 !important; transform: scale(1.05); transition: 0.4s; }
        `}
      </style>

      {/* --- VIDEO BACKGROUND SECTION --- */}
      <div style={{ position: "relative", height: "100vh", width: "100%", overflow: "hidden" }}>
        {/* La Vidéo */}
        <video 
          autoPlay loop muted playsInline 
          style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-gourmet-dish-34440-large.mp4" type="video/mp4" />
          {/* Remplacez l'URL par votre vidéo locale : /videos/votre-video.mp4 */}
        </video>

        {/* Overlay Sombre pour la lisibilité */}
        <div style={{ 
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%", 
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%)", 
          zIndex: 2 
        }} />

        {/* CONTENU AU-DESSUS DE LA VIDÉO */}
        <header style={{ position: "absolute", top: 0, width: "100%", zIndex: 10, padding: "30px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <div style={{ fontFamily: T.serif, fontSize: "28px", color: T.white, fontWeight: "bold", letterSpacing: "2px" }}>
            GASTRON<span style={{ color: T.gold }}>Ô</span>ME
           </div>
           <div style={{ display: "flex", gap: "40px", color: T.white, fontFamily: T.sans, fontSize: "13px", fontWeight: 500, letterSpacing: "1px" }}>
             {['MENU', 'CHEFS', 'RESERVATIONS', 'CONTACT'].map(m => (
               <a key={m} href="#" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>{m}</a>
             ))}
           </div>
        </header>

        <div className="animate" style={{ position: "relative", zIndex: 3, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", color: T.white }}>
          <h2 style={{ fontFamily: T.sans, fontSize: "14px", letterSpacing: "10px", color: T.gold, marginBottom: "20px" }}>ALGERIE • LUXE CULINAIRE</h2>
          <h1 style={{ fontFamily: T.serif, fontSize: "clamp(50px, 10vw, 110px)", lineHeight: "0.9", margin: "0 0 40px 0" }}>
            L'Émotion des <br /> <span style={{ fontStyle: "italic" }}>Saveurs Rare.</span>
          </h1>
          
          <div style={{ display: "flex", gap: "20px" }}>
            <button className="glass-btn" style={{ 
              background: "transparent", border: `1px solid ${T.gold}`, color: T.gold, 
              padding: "18px 45px", fontFamily: T.sans, fontWeight: 700, fontSize: "12px", 
              letterSpacing: "2px", cursor: "pointer", transition: "0.4s" 
            }}>
              DÉCOUVRIR LA CARTE
            </button>
            <button style={{ 
              background: T.white, border: "none", color: "#000", 
              padding: "18px 45px", fontFamily: T.sans, fontWeight: 700, fontSize: "12px", 
              letterSpacing: "2px", cursor: "pointer" 
            }}>
              RÉSERVER UN CHEF
            </button>
          </div>
        </div>

        {/* Petit scroll indicateur */}
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 3, color: T.white, fontSize: "10px", letterSpacing: "3px", opacity: 0.5 }}>
          SCROLL POUR EXPLORER
        </div>
      </div>

      {/* --- SECTION DES SERVICES (GLASSMORPHISM) --- */}
      <section style={{ 
        padding: "100px 60px", background: "#080808", display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginTop: "-50px", position: "relative", zIndex: 4 
      }}>
        {[
          { t: "EXPÉRIENCE PRIVÉE", d: "Un service de majordome et un chef privé pour vos soirées à Hydra ou Sidi Fredj." },
          { t: "PRODUITS D'EXCEPTION", d: "Wagyu, Truffes fraîches et Caviar livrés en moins de 45 minutes." },
          { t: "CONCIERGERIE 24/7", d: "Une équipe dédiée pour répondre à vos envies gastronomiques les plus folles." }
        ].map((item, i) => (
          <div key={i} style={{ 
            background: T.glassDark, border: "1px solid rgba(255,255,255,0.05)", 
            padding: "50px", borderRadius: "4px", backdropFilter: "blur(10px)",
            textAlign: "left"
          }}>
            <h3 style={{ fontFamily: T.serif, color: T.gold, fontSize: "24px", marginBottom: "20px" }}>{item.t}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontFamily: T.sans, lineHeight: "1.8", fontSize: "15px" }}>{item.d}</p>
          </div>
        ))}
      </section>
    </div>
  );
}