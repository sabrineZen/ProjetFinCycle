import api from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import {
  FiUser, FiShoppingBag, FiSettings,
  FiLogOut, FiChevronRight, FiArrowLeft
} from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { BiBasket } from "react-icons/bi";

// Tes imports de composants
import InfoPersonnelles from "../../composants/infospersonnelles";
import MesCommandes from "../../composants/mescommandes";
import Parametre from "../../composants/paremtre";

function ProfilPage() {
  const navigate = useNavigate();
  const [pageActive, setPageActive] = useState("informations");
  const [profil, setProfil] = useState({
    role: "client",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    nomRestaurant: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setProfil(JSON.parse(storedUser));
      } catch (error) {
        console.warn("Impossible de charger le profil utilisateur :", error);
      }
    }
  }, []);

  const [loadingProfil, setLoadingProfil] = useState(true);
  const [errorProfil, setErrorProfil] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("nom");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setProfil(JSON.parse(storedUser));
      } catch (error) {
        console.warn("Impossible de charger le profil utilisateur :", error);
      }
    }

    const fetchProfil = async () => {
      try {
        const res = await api.get("/clients/profil");
        setProfil(res.data);
        localStorage.setItem("user", JSON.stringify({ ...JSON.parse(storedUser || "{}"), ...res.data }));
      } catch (err) {
        console.warn("Erreur récupération profil client :", err.response?.data?.message || err.message);
        setErrorProfil("Impossible de charger le profil depuis le serveur.");
      } finally {
        setLoadingProfil(false);
      }
    };

    if (localStorage.getItem("token")) {
      fetchProfil();
    } else {
      setLoadingProfil(false);
    }
  }, []);

  const menuItems = [
    { id: "informations", label: "Informations", icon: FiUser },
    { id: "commandes", label: "Mes commandes", icon: FiShoppingBag },
    { id: "parametres", label: "Paramètres", icon: FiSettings },
  ];

  const profileName =
    profil.role === "restaurateur"
      ? profil.nomRestaurant || "Restaurateur"
      : [profil.prenom, profil.nom?.split(" ").pop()].filter(Boolean).join(" ") || "Utilisateur";

  const handleProfilUpdate = (updatedProfil) => {
    setProfil(updatedProfil);
    localStorage.setItem("user", JSON.stringify(updatedProfil));
  };

  const renderContent = () => {
    switch (pageActive) {
      case "informations":
        return <InfoPersonnelles profil={profil} onProfileUpdate={handleProfilUpdate} />;
      case "commandes":
        return <MesCommandes profil={profil} />;
      case "parametres":
        return <Parametre profil={profil} />;
      default:
        return <InfoPersonnelles profil={profil} onProfileUpdate={handleProfilUpdate} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF1EB] p-4 md:p-10 font-sans text-[#6D2829]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ── BOUTON RETOUR ── */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/homeClient")}
          className="group flex items-center gap-2 text-[#FF7A30] font-bold transition-all hover:text-[#e66a25]"
        >
          <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-all">
            <FiArrowLeft size={20} />
          </div>
          <span>Retour à l'accueil</span>
        </motion.button>

        {/* ── HEADER PROFIL ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm border border-white"
        >
          <div className="flex items-center gap-5">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FDF1EB]"
              alt="Avatar"
            />
            <div>
              <h1 className="text-2xl font-bold">{profileName}</h1>
      </div>
          </div>
          <button
            className=" cursor-pointer bg-[#FF7A30] hover:bg-[#e66a25] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#FF7A30]/20"
            onClick={() => setPageActive("informations")}
          >
            Modifier profil
          </button>
        </motion.div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard label="Dépenses totales" value="654 DA" icon={LuWallet} iconBg="#FDF1EB" iconColor="#9C6D57" />
          <StatCard label="Articles commandés" value="48" icon={BiBasket} iconBg="#E6FAF5" iconColor="#3CDFB0" />
        </div>

        {/* ── NAVIGATION ET CONTENU ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* MENU GAUCHE */}
          <div className= " w-full lg:w-72 bg-white rounded-[32px] p-5 shadow-sm border border-white">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPageActive(item.id)}
                  className={` cursor-pointer w-full flex justify-between items-center p-4 rounded-2xl transition-all duration-300
                    ${pageActive === item.id 
                      ? "bg-[#FF7A30] text-white shadow-md" 
                      : "hover:bg-[#FFF5F0] text-[#6D2829]"}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`text-xl ${pageActive === item.id ? "text-white" : "text-[#FF7A30]"}`} />
                    <span className="font-semibold text-sm capitalize">{item.label}</span>
                  </div>
                  <FiChevronRight className={`transition-transform ${pageActive === item.id ? "rotate-90" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50">
              <button 
                onClick={handleLogout} // Redirection vers login ou accueil lors de la déconnexion
                className="w-full flex items-center gap-4 p-4 text-[#FF7A30] font-bold hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
              >
                <FiLogOut className="text-xl" />
                <span className=" cursor-pointer text-sm">Se déconnecter</span>
              </button>
            </div>
          </div>

          {/* CONTENU DROITE (Dynamique) */}
          <div className="flex-1 w-full bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-white min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div 
                key={pageActive} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

// Composant StatCard
function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-white flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-400 capitalize">{label}</p>
        <p className="text-3xl font-extrabold text-[#6D2829]">{value}</p>
      </div>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner" style={{ backgroundColor: iconBg, color: iconColor }}>
        <Icon />
      </div>
    </div>
  );
}

export default ProfilPage;