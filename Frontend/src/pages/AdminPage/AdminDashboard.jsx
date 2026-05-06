import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../../composants/sidebarAdmin";
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
          fetch('/api/admin/stats'),
          fetch('/api/admin/en-attente'),
          fetch('/api/admin/activites'),
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
  if (type === 'attente')    return 'bg-yellow-400'; // ← ajoute ça
  return 'bg-button';
};

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  return (
    <div className="flex">

      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Dashboard</h1>
      </div>

      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Tableau de bord</h1>
          <p className="text-gray-400 mt-1 mb-8">
            Vue d'ensemble de votre plateforme e-commerce
          </p>
        </div>
        <p className="text-gray-400 mb-4 lg:hidden">Vue d'ensemble du dashboard</p>

        {/* Stats */}
        {chargement ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-bordure animate-pulse h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {cartes.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-bordure">
                <div className="flex justify-between items-start">
                  <p className="text-secondary text-sm font-medium">{stat.titre}</p>
                  <span className="text-secondary text-xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold text-secondary mt-2">{stat.valeur}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* En attente de validation */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-secondary font-semibold text-lg">
                En attente de validation
              </h2>
              <button
                onClick={() => navigate('/admin/validation')}
                className="text-button text-sm hover:underline"
              >
                voir tout
              </button>
            </div>

            {chargement ? (
              <div className="flex flex-col gap-3">
                {[1,2].map(i => (
                  <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : enAttente.length === 0 ? (
              <p className="text-gray-400 text-sm">Aucun restaurant en attente.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {enAttente.slice(0, 4).map((v, index) => (
                  <div
                    key={v.id}
                    className={`flex justify-between items-center p-3 rounded-xl ${
                      index === 0 ? "border border-button bg-orange-50" : ""
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-secondary">{v.nomRestaurant}</p>
                      <p className="text-gray-400 text-sm">{v.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{formatDate(v.createdAt)}</p>
                      <button
                        onClick={() => navigate(`/admin/validation?id=${v.id}`)}
                        className="text-button font-semibold text-sm mt-1 hover:underline"
                      >
                        Examiner →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activités récentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold text-lg mb-4">
              Activités récentes
            </h2>

            {chargement ? (
              <div className="flex flex-col gap-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-6 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            ) : activites.length === 0 ? (
              <p className="text-gray-400 text-sm">Aucune activité récente.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {activites.map((a, index) => (
                  <div key={index} className="flex items-start gap-3">
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
  );
}

export default AdminDashboard;