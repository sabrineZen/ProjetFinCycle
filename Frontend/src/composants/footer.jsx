function Footer() {
  return (
    <footer className="w-full mt-16" style={{ background: "#1A1208" }}>
      
      {/* Bande orange supérieure */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, #FF6B2B, #FF9D4A, #FF6B2B)" }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-14 pb-10">
        
        {/* GRILLE PRINCIPALE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          
          {/* COLONNE MARQUE */}
          <div>
            <h2
              className="text-2xl font-black tracking-tight mb-1"
              style={{ color: "#FFFFFF" }}
            >
              PLATI<span style={{ color: "#FF6B2B" }}>GO</span>
            </h2>
            <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              L'excellence culinaire livrée avec élégance. Des restaurants d'exception, sélectionnés pour vous.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex gap-3 mt-6">
              {["f", "in", "tw"].map((s) => (
                <div
                  key={s}
                  className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.5)",
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
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {s.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* COLONNE NAVIGATION */}
          <div>
            <h3
              className="text-xs font-bold tracking-[2px] uppercase mb-5"
              style={{ color: "#FF6B2B" }}
            >
              Navigation
            </h3>
            <ul className="space-y-3">
              {["Accueil", "Catégories", "Restaurants", "Promotions"].map((item) => (
                <li
                  key={item}
                  className="text-sm cursor-pointer transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#FF6B2B"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE CONTACT */}
          <div>
            <h3
              className="text-xs font-bold tracking-[2px] uppercase mb-5"
              style={{ color: "#FF6B2B" }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              {[
                { label: "Email", val: "contact@platigo.com" },
                { label: "Téléphone", val: "+213 00 00 00 00" },
                { label: "Adresse", val: "Sétif, Algérie" },
              ].map(({ label, val }) => (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {label}
                  </p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                    {val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SÉPARATEUR */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)" }} />

        {/* BAS DE PAGE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            © 2026 Platigo. Tous droits réservés.
          </p>
          <div className="flex gap-5">
            {["Confidentialité", "Conditions", "Cookies"].map((item) => (
              <span
                key={item}
                className="text-xs cursor-pointer transition-colors duration-200"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FF6B2B"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.25)"}
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