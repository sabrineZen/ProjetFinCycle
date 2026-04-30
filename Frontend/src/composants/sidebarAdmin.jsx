import { Link, useLocation } from "react-router-dom";
import { FaTh, FaClock, FaUser, FaStore, FaUtensils, FaTags, FaChartBar, FaSignOutAlt } from "react-icons/fa";

function SidebarAdmin() {
  const location = useLocation();

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
    <div className="fixed top-0 left-0 h-screen w-56 bg-fond border-r border-tri flex flex-col justify-between py-6 px-4">
      <div>
        <h1 className="text-2xl font-bold text-secondary mb-8 px-2">Admin Panel</h1>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition
                ${location.pathname === item.path
                  ? "bg-button text-white"
                  : "text-secondary hover:bg-accent hover:text-white"
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <button className="flex items-center gap-3 px-4 py-3 text-secondary font-medium hover:text-button transition">
        <FaSignOutAlt />
        Déconnexion
      </button>
    </div>
  );
}

export default SidebarAdmin;