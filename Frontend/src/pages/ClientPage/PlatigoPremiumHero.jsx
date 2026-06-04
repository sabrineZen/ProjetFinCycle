import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import logoImage from "../../assets/Design-logo .png";
import burgerFallback from "../../assets/burger.png";

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 5l7 7-7 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const HeroImage =
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200";

const PlatigoLanding = () => {
  const navigate = useNavigate();

  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(false);

  const goLogin = () => navigate("/login");

  // ================= FETCH PLATS =================
  useEffect(() => {
    const fetchPlats = async () => {
      setLoading(true);

      try {
        const res = await api.get("/plats");

        const formatted = (res.data || []).map((p) => ({
          id: p.id,
          name: p.nom,
          price: p.prix,
          img: p.image || burgerFallback,
        }));

        setPlats(formatted);
      } catch (err) {
        console.error("Erreur chargement plats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlats();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-2">
            <img src={logoImage} className="w-8 h-8 rounded-lg" />
            <span className="font-bold text-lg text-[#8B2A1B]">
              PLATI<span className="text-[#8B2A1B]">GO</span>
            </span>
          </div>

          <button
            onClick={goLogin}
            className="bg-orange-500 text-white px-5 py-2 rounded-full hover:bg-orange-600 transition cursor-pointer "
          >
            Commander
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <p className="text-[#8B2A1B] font-medium mb-3">
              Livraison rapide 🍕
            </p>

            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Ton repas préféré livré en quelques minutes
            </h1>

            <p className="text-gray-500 mt-5">
              Commande tes plats favoris depuis les meilleurs restaurants près de toi.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={goLogin}
                className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-orange-600 transition"
              >
                Commander <Arrow />
              </button>

              <button
                onClick={goLogin}
                className="border px-6 py-3 rounded-full cursor-pointer hover:bg-gray-100 transition"
              >
                Voir menu
              </button>
            </div>
          </div>

          <div>
            <img
              src={HeroImage}
              className="rounded-3xl shadow-lg w-full h-[420px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          <div className="bg-white p-6 rounded-xl">
            🚀 <h3 className="font-bold mt-2">Rapide</h3>
            <p className="text-gray-500 text-sm">Livraison en 25 min</p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            🥗 <h3 className="font-bold mt-2">Frais</h3>
            <p className="text-gray-500 text-sm">Produits du jour</p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            ⭐ <h3 className="font-bold mt-2">Qualité</h3>
            <p className="text-gray-500 text-sm">Top restaurants</p>
          </div>

        </div>
      </section>

      {/* ================= PLATS DYNAMIQUES ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-10 text-[#8B2A1B]">
            Plats populaires
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">
              Chargement des plats...
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">

              {plats.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  <img
                    src={item.img}
                    className="h-44 w-full object-cover"
                    alt={item.name}
                  />

                  <div className="p-4">
                    <h3 className="font-bold">{item.name}</h3>

                    <p className="text-orange-500 font-semibold">
                      {item.price} DA
                    </p>

                    <button
                      onClick={goLogin}
                      className="mt-3 w-full bg-orange-500 text-white py-2 rounded-xl cursor-pointer hover:bg-orange-600 transition"
                    >
                      Commander
                    </button>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </section>

   

      {/* ================= FOOTER ================= */}
      <footer className="text-center py-10 text-white text-sm bg-[#8B2A1B] mt-16 flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold">
          Prêt à commander ?
        </h2>

        <p className="mt-3 text-white/80">
          Rejoins des milliers d’utilisateurs
        </p>

        <button
          onClick={goLogin}
          className="mt-8 bg-white text-black px-8 py-3 rounded-full font-semibold cursor-pointer"
        >
          Commencer
        </button>
        © 2026 Platigo
      </footer>

    </div>
  );
};

export default PlatigoLanding;