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
        const res = await api.get("/plats/populaires");

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
    <div className="min-h-screen text-gray-900 bg-[radial-gradient(circle_at_top_left,_rgba(255,237,213,0.7),_transparent_35%),linear-gradient(135deg,_#fff9f5_0%,_#fff4ea_100%)]">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-orange-100 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} className="w-10 h-10 rounded-xl shadow-sm" alt="Platigo logo" />
            <span className="font-black text-xl tracking-wide text-[#8B2A1B]">
              PLATI<span className="text-orange-500">GO</span>
            </span>
          </div>

          <button
            onClick={goLogin}
            className="bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition cursor-pointer shadow-md shadow-orange-200"
          >
            Commander
          </button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-[#8B2A1B] shadow-sm">
              <span className="text-base">🍽️</span>
              Livraison rapide et fiable
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-black leading-tight text-gray-900">
              Ton repas préféré livré en quelques minutes
            </h1>

            <p className="mt-5 text-lg text-gray-600 max-w-xl">
              Explore les meilleurs restaurants autour de toi et commande en toute simplicité.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={goLogin}
                className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center gap-2 cursor-pointer hover:bg-orange-600 transition shadow-lg shadow-orange-200"
              >
                Commander <Arrow />
              </button>

              <button
                onClick={goLogin}
                className="border border-gray-200 bg-white px-6 py-3 rounded-full cursor-pointer hover:bg-orange-50 transition"
              >
                Voir menu
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-600">
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">⚡ 25 min max</span>
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">⭐ Restaurants vérifiés</span>
              <span className="rounded-full bg-white/80 px-3 py-2 shadow-sm">🍴 Choix variés</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-orange-200/40 to-transparent blur-3xl" />
            <img
              src={HeroImage}
              className="relative rounded-[2rem] shadow-2xl w-full h-[430px] object-cover border border-white/60"
              alt="Repas de qualité"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-bold mt-2 text-gray-900">Rapide</h3>
            <p className="text-gray-500 text-sm mt-1">Livraison en 25 min</p>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">🥗</div>
            <h3 className="font-bold mt-2 text-gray-900">Frais</h3>
            <p className="text-gray-500 text-sm mt-1">Produits du jour</p>
          </div>

          <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-orange-100">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="font-bold mt-2 text-gray-900">Qualité</h3>
            <p className="text-gray-500 text-sm mt-1">Top restaurants</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-orange-500 font-semibold uppercase tracking-[0.25em] text-sm">Nos favoris</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#8B2A1B] mt-2">
              Plats populaires
            </h2>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Chargement des plats...</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {plats.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.5rem] overflow-hidden bg-white shadow-md hover:shadow-xl transition border border-orange-100"
                >
                  <img src={item.img} className="h-48 w-full object-cover" alt={item.name} />

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <span className="text-orange-500 font-semibold">{item.price} DA</span>
                    </div>

                    <button
                      onClick={goLogin}
                      className="mt-4 w-full bg-orange-500 text-white py-2.5 rounded-xl cursor-pointer hover:bg-orange-600 transition"
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

      <footer className="mt-16 bg-gradient-to-r from-[#8B2A1B] to-[#B13A23] text-center py-14 px-6 text-white">
        <h2 className="text-3xl font-black">Prêt à commander ?</h2>
        <p className="mt-3 text-white/80 max-w-xl mx-auto">
          Rejoins des milliers d’utilisateurs et découvre les meilleurs repas près de chez toi.
        </p>

        <button
          onClick={goLogin}
          className="mt-8 bg-white text-[#8B2A1B] px-8 py-3 rounded-full font-semibold cursor-pointer shadow-lg shadow-black/10"
        >
          Commencer
        </button>
        <p className="mt-6 text-sm text-white/70">© 2026 Platigo</p>
      </footer>
    </div>
  );
};

export default PlatigoLanding;