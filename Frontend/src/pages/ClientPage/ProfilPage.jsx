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
  const navigate = useNavigate(); // Initialisation du hook de navigation
  const [pageActive, setPageActive] = useState("informations");
  const [nomComplet, setNomComplet] = useState("")
   useEffect(() => {
  const token = localStorage.getItem("token")
  fetch("http://localhost:5000/api/utilisateurs/profil", {
    headers: { Authorization: "Bearer " + token }
  })
  .then(res => res.json())
  .then(data => {
    setNomComplet(data.prenom + " " + data.nom)
  })
}, [])
  
const token = localStorage.getItem("token")
const tokenDecode = JSON.parse(atob(token.split('.')[1]))
const userId = tokenDecode.id

const [photo, setPhoto] = useState(localStorage.getItem("photo_" + userId) || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png")

function changerPhoto(e) {
  const fichier = e.target.files[0]
  if (!fichier) return

  const reader = new FileReader()
  reader.onload = () => {
    localStorage.setItem("photo_" + userId, reader.result)
    setPhoto(reader.result)
  }
  reader.readAsDataURL(fichier)
}

  const menuItems = [
    { id: "informations", label: "Informations", icon: FiUser },
    { id: "commandes", label: "Mes commandes", icon: FiShoppingBag },
    { id: "parametres", label: "Paramètres", icon: FiSettings },
  ];

  const renderContent = () => {
    switch (pageActive) {
      case "informations":
        return <InfoPersonnelles />;
      case "commandes":
        return <MesCommandes />;
      case "parametres":
        return <Parametre />;
      default:
        return <InfoPersonnelles />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF1EB] p-4 md:p-10 font-sans text-[#6D2829]">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ── BOUTON RETOUR ── */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/home")}
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
            <label className="cursor-pointer">
                <img 
                   src={photo}
                   className="w-20 h-20 rounded-full object-cover border-2 border-[#FDF1EB]"
                    alt="Avatar"
                 />
                  <input type="file" accept="image/*" className="hidden" onChange={changerPhoto} />
              </label>
            <div>
              <h1 className="text-2xl font-bold">{nomComplet}</h1>
            </div>
          </div>
          <button className="bg-[#FF7A30] hover:bg-[#e66a25] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#FF7A30]/20">
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
          <div className="w-full lg:w-72 bg-white rounded-[32px] p-5 shadow-sm border border-white">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPageActive(item.id)}
                  className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all duration-300
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
                onClick={() => navigate("/")} // Redirection vers login ou accueil lors de la déconnexion
                className="w-full flex items-center gap-4 p-4 text-[#FF7A30] font-bold hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all"
              >
                <FiLogOut className="text-xl" />
                <span className="text-sm">Se déconnecter</span>
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