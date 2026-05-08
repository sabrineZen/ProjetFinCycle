import React from 'react';
import { LayoutDashboard, UtensilsCrossed, Soup, ClipboardList, UserCircle, LogOut, X, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({ currentPage, setPage, estActif, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const handleDeconnexion = () => {
    // Optionnel : vider le localStorage/sessionStorage
    // localStorage.removeItem('token');
    navigate('/login');
  };
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'Tableau de bord' },
    { id: 'restaurant', icon: <UtensilsCrossed size={22} />, label: 'Mon restaurant' },
    { id: 'plats', icon: <Soup size={22} />, label: 'Mes plats' },
    { id: 'commandes', icon: <ClipboardList size={22} />, label: 'Commandes' },
    { id: 'Parametre', icon: <Settings size={22} />, label: 'Paramètres' },
  ];

  return (
    <>
      {/* OVERLAY (Fond flou) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-100 lg:hidden transition-opacity" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* ASIDE (Le menu blanc) */}
      <aside className={`
        fixed z-105 transition-all duration-300 ease-in-out font-sans
        lg:left-8 lg:top-30 lg:w-75 lg:translate-x-0
        max-lg:top-24 max-lg:left-4 max-lg:w-70
        ${isOpen ? 'max-lg:translate-x-0' : 'max-lg:translate-x-[-120%]'}
      `}>
        
        {/* Badge Statut (Desktop) */}
        <div className="mb-5 self-start pl-16 hidden lg:block">
          <div className={`inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border shadow-md ${
              estActif ? 'bg-[#E6F9ED] border-[#D1F2DD]' : 'bg-[#FFF1F1] border-[#FEE2E2]'
          }`}>
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute h-full w-full rounded-full opacity-75 ${estActif ? 'bg-[#10B981]' : 'bg-[#FA0D15]'}`}></span>
                <span className={`relative rounded-full h-3 w-3 ${estActif ? 'bg-[#10B981]' : 'bg-[#FA0D15]'}`}></span>
              </span>
              <span className={`font-semibold text-sm ${estActif ? 'text-[#10B981]' : 'text-[#FA0D15]'}`}>
                {estActif ? 'Restaurant actif' : 'Restaurant inactif'}
              </span>
          </div>
        </div>

        <div className="relative">
          {/* Bouton X de fermeture (Mobile) */}
          {isOpen && (
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden absolute -right--3 -top-3 z-110 p-2 bg-white border border-gray-100 rounded-xl shadow-lg text-[#951418] hover:scale-110 transition-transform"
            >
              <X size={18} />
            </button>
          )}

          {/* Navigation principale */}
          <nav className="w-full bg-white flex flex-col p-6 rounded-4xl shadow-2xl border border-gray-50">
            <div className="flex-1 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setPage(item.id); setIsOpen(false); }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                    ${currentPage === item.id 
                      ? 'bg-[#FF843D] text-white shadow-lg' 
                      : 'text-[#8B2C21] hover:bg-[#FFF5F1]'}`}
                >
                  <span className={currentPage === item.id ? 'text-white' : 'text-[#8B2C21]'}>
                    {item.icon}
                  </span>
                  <span className="font-bold text-sm tracking-wide">{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t border-gray-100 text-[#8B2C21]">
              <button 
                onClick={handleDeconnexion}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 font-bold text-sm transition-colors"
              >
                <LogOut size={22} />
                <span>Déconnexion</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;