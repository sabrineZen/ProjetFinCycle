import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { API } from '../../config';
import { FaUsers, FaStore, FaUtensils, FaEuroSign, FaBars } from "react-icons/fa";

function AdminDashboard() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [stats, setStats]                   = useState(null);
  const [enAttente, setEnAttente]           = useState([]);
  const [activites, setActivites]           = useState([]);
  const [chargement, setChargement]         = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTout = async () => {
      try {
        const [statsRes, attenteRes, activitesRes] = await Promise.all([
          fetch(`${API}/admin/stats`),
          fetch(`${API}/admin/en-attente`),
          fetch(`${API}/admin/activites`),
        ]);
        const statsData     = await statsRes.json();
        const attenteData   = await attenteRes.json();
        const activitesData = await activitesRes.json();

        setStats(statsData);
        setEnAttente(Array.isArray(attenteData)   ? attenteData   : []);
        setActivites(Array.isArray(activitesData) ? activitesData : []);
      } catch (e) {
        console.error('Erreur dashboard:', e);
      } finally {
        setChargement(false);
      }
    };
    fetchTout();
  }, []);

  const cartes = stats ? [
    {
      titre: "Utilisateurs totaux",
      valeur: stats.totalUtilisateurs.toLocaleString(),
      icon: <FaUsers />,
    },
    {
      titre: "Restaurants actifs",
      valeur: stats.totalRestaurants.toLocaleString(),
      icon: <FaStore />,
    },
    {
      titre: "Plats disponibles",
      valeur: stats.totalPlats.toLocaleString(),
      icon: <FaUtensils />,
    },
    {
      titre: "Revenus totaux",
      valeur: `€ ${Number(stats.revenus).toLocaleString('fr-FR', { minimumFractionDigits: 2 })}`,
      icon: <FaEuroSign />,
    },
  ] : [];

  const couleurActivite = (type) => {
  if (type === 'validation') return 'bg-green-400';
  if (type === 'refus')      return 'bg-red-400';
  if (type === 'attente')    return 'bg-yellow-400'; 
  return 'bg-button';
};

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,112,49,0.14),_transparent_35%),linear-gradient(135deg,_#fffaf6_0%,_#fff3ea_100%)]">
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur border-b border-[#F5D8C4] flex items-center px-4 z-30 shadow-sm">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-[#951418]" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Dashboard</h1>
      </div>

      <div className="w-full min-h-screen p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        <div className="rounded-[32px] border border-[#F3D8C8] bg-white/80 backdrop-blur p-5 sm:p-7 shadow-[0_20px_60px_rgba(149,20,24,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF7031]">Administration</p>
              <h1 className="text-3xl font-black text-[#951418]">Tableau de bord</h1>
              <p className="text-gray-500 mt-1">
                Vue d'ensemble de votre plateforme e-commerce
              </p>
            </div>
            <div className="rounded-2xl bg-[#FFF0E5] border border-[#F7D9C6] px-4 py-3 text-sm text-[#8E4A2D] shadow-sm">
              Gestion fluide et monitoring en temps réel
            </div>
          </div>

          {chargement ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {[1,2,3,4].map(i => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#F4D8C7] animate-pulse h-28" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {cartes.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-[#F4D8C7] hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <p className="text-secondary text-sm font-medium">{stat.titre}</p>
                    <span className="text-[#FF7031] text-xl bg-[#FFF0E5] p-2 rounded-xl">{stat.icon}</span>
                  </div>
                  <p className="text-3xl font-black text-[#951418] mt-2">{stat.valeur}</p>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F4D8C7]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#951418] font-semibold text-lg">En attente de validation</h2>
                <button onClick={() => navigate('/admin/validation')} className="text-[#FF7031] text-sm font-semibold hover:underline">
                  voir tout
                </button>
              </div>

              {chargement ? (
                <div className="flex flex-col gap-3">
                  {[1,2].map(i => (
                    <div key={i} className="h-16 bg-[#FFF6EE] rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : enAttente.length === 0 ? (
                <p className="text-gray-400 text-sm">Aucun restaurant en attente.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {enAttente.slice(0, 4).map((v, index) => (
                    <div key={v.id} className={`flex justify-between items-center p-3 rounded-xl ${index === 0 ? "border border-[#FF7031] bg-[#FFF5EC]" : "bg-[#FFFDFB] border border-[#F8E0CF]"}`}>
                      <div>
                        <p className="font-semibold text-secondary">{v.nomRestaurant}</p>
                        <p className="text-gray-400 text-sm">{v.email}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">{formatDate(v.createdAt)}</p>
                        <button onClick={() => navigate(`/admin/validation?id=${v.id}`)} className="text-[#FF7031] font-semibold text-sm mt-1 hover:underline">
                          Examiner →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F4D8C7]">
              <h2 className="text-[#951418] font-semibold text-lg mb-4">Activités récentes</h2>

              {chargement ? (
                <div className="flex flex-col gap-4">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-6 bg-[#FFF6EE] rounded animate-pulse" />
                  ))}
                </div>
              ) : activites.length === 0 ? (
                <p className="text-gray-400 text-sm">Aucune activité récente.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {activites.map((a, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-xl bg-[#FFFDFB] p-3 border border-[#F8E0CF]">
                      <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${couleurActivite(a.type)}`} />
                      <div>
                        <p className="text-secondary text-sm">{a.message}</p>
                        {a.date && (
                          <p className="text-gray-400 text-xs mt-0.5">{formatDate(a.date)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;