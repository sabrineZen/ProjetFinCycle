import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTh, FaClock, FaUser, FaStore, FaUtensils, FaTags, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

function SidebarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDeconnexion = () => {
    // Optionnel : vider le stockage
    // localStorage.removeItem('token');
     localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
  localStorage.removeItem("nom");
    navigate('/login');
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: <FaTh />, label: "Tableau de bord" },
    { path: "/admin/validation", icon: <FaClock />, label: "Validation en attente" },
    { path: "/admin/utilisateurs", icon: <FaUser />, label: "Utilisateurs" },
    { path: "/admin/restaurants", icon: <FaStore />, label: "Restaurants" },
    { path: "/admin/plats", icon: <FaUtensils />, label: "Plats" },
    { path: "/admin/categories", icon: <FaTags />, label: "Catégories" },
    { path: "/admin/statistiques", icon: <FaChartBar />, label: "Statistiques" },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-56 bg-[#FFF7F1] border-r border-[#F5D8C4] shadow-[12px_0_40px_rgba(149,20,24,0.08)] flex flex-col justify-between py-6 px-4">
      <div>
        <div className="rounded-2xl bg-gradient-to-br from-[#FFF0E5] to-[#FFE4D1] p-3 mb-6 shadow-sm border border-[#F8D8C7]">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-lg font-black text-secondary">Plati<span className="text-button">Go</span></h1>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#9B5A3D]">Administration</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${location.pathname === item.path
                ? "bg-[#FF7031] text-white shadow-md"
                : "text-secondary hover:bg-[#FFE2D3] hover:text-[#951418]"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={handleDeconnexion}
        className="flex items-center gap-3 px-4 py-3 text-secondary font-medium rounded-xl hover:bg-[#FFE2D3] hover:text-[#951418] transition"
      >
        <FaSignOutAlt />
        Déconnexion
      </button>
    </div>
  );
}

export default SidebarAdmin;