import React from "react";

function Footer() {
  // Fonction pour un défilement fluide vers les sections de la Home
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Décalage pour la Navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Mise à jour des items pour correspondre aux IDs de ta nouvelle Home
  const navItems = [
    { name: "Accueil", id: "top" }, 
    { name: "Nos Univers", id: "univers" }, // ID pour le carrousel 3D
    { name: "Plats Populaires", id: "plats-populaires" }, // ID section plats
    { name: "Partenaires", id: "partenaires" }, // ID section restaurants
  ];

  return (
    <footer className="w-full mt-16" style={{ background: "#8B2A1B" }}>
      
      {/* Bande orange supérieure */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #FF6B2B, #FF9D4A, #FF6B2B)" }} />

      <div className="max-w-[1600px] mx-auto px-6 md:px-20 pt-14 pb-10 text-white">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          
          {/* COLONNE MARQUE */}
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-1 uppercase">
              PLATI<span style={{ color: "#FF6B2B" }}>GO</span>
            </h2>
            <p className="text-sm leading-relaxed mt-3 opacity-70">
              Découvrez les meilleurs plats près de chez vous 🍕. 
              L'excellence culinaire livrée avec élégance et rapidité.
            </p>

            <div className="flex gap-3 mt-6">
              {["f", "in", "tw"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#FF6B2B";
                    e.currentTarget.style.borderColor = "#FF6B2B";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE NAVIGATION (MISE À JOUR) */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase mb-5" style={{ color: "#FF6B2B" }}>
              Navigation
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => item.id === "top" ? window.scrollTo({top: 0, behavior: 'smooth'}) : scrollToSection(item.id)}
                  className="text-sm cursor-pointer transition-all duration-200 opacity-60 hover:opacity-100 flex items-center gap-2 group"
                >
                  {/* Petit indicateur visuel au survol */}
                  <span className="w-0 group-hover:w-3 h-[1px] bg-[#FF6B2B] transition-all"></span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE CONTACT */}
          <div>
            <h3 className="text-xs font-bold tracking-[2px] uppercase mb-5" style={{ color: "#FF6B2B" }}>
              Contact
            </h3>
            <div className="space-y-4">
              {[
                { label: "Email", val: "contact@platigo.dz" },
                { label: "Téléphone", val: "+213 00 00 00 00" },
                { label: "Adresse", val: "Sétif, Algérie" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5 opacity-40">
                    {label}
                  </p>
                  <p className="text-sm opacity-80 italic">
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.1)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs opacity-40">
            © 2026 PLATIGO. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {["Confidentialité", "Conditions", "Cookies"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer transition-colors duration-200 opacity-40 hover:opacity-100 hover:text-[#FF6B2B]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;