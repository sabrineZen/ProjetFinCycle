import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaUsers, FaStore, FaUtensils, FaEuroSign, FaBars } from "react-icons/fa";

function AdminDashboard() {
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [data, setData] = useState(null);
  const [chargement, setChargement] = useState(true);

  // ── Récupération des statistiques depuis le Backend ──
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats-dashboard", {
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });
        if (!res.ok) throw new Error("Erreur lors de la récupération des stats");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Erreur dashboard:", err);
      } finally {
        setChargement(false);
      }
    };
    fetchStats();
  }, []);

  // ── Configuration des cartes de statistiques ──
  const statsAffichees = [
    { 
      titre: "Utilisateurs totaux", 
      valeur: data?.utilisateurs || 0, 
      evolution: "+12.5%", 
      icon: <FaUsers /> 
    },
    { 
      titre: "Restaurants actifs", 
      valeur: data?.restaurants || 0, 
      evolution: "+8.2%", 
      icon: <FaStore /> 
    },
    { 
      titre: "Plats disponibles", 
      valeur: data?.plats || 0, 
      evolution: "+24.5%", 
      icon: <FaUtensils /> 
    },
    { 
      titre: "Revenus ce mois", 
      valeur: `${data?.revenus || 0} DA`, 
      evolution: "+12.5%", 
      icon: <FaEuroSign /> 
    },
  ];

  // ── Données pour la section validation ──
  const validations = data?.enAttente || [];

  const activites = [
    "Nouvel utilisateur inscrit : ahmed yahiaoui",
    "Restaurant \"ghano food\" a été validé",
  ];

  return (
    <div className="flex">
      {/* Overlay mobile */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* Sidebar responsive */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Dashboard</h1>
      </div>

      {/* Content */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        
        {/* Titre desktop */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Tableau de bord</h1>
          <p className="text-gray-400 mt-1 mb-8">
            Vue d'ensemble de votre plateforme e-commerce
          </p>
        </div>

        {chargement ? (
          <p className="text-center py-10 text-gray-400">Chargement des statistiques...</p>
        ) : (
          <>
            {/* 📊 STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {statsAffichees.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-bordure">
                  <div className="flex justify-between items-start">
                    <p className="text-secondary text-sm font-medium">{stat.titre}</p>
                    <span className="text-secondary text-xl">{stat.icon}</span>
                  </div>
                  <p className="text-3xl font-bold text-secondary mt-2">{stat.valeur}</p>
                  <p className="text-green-500 text-sm mt-1">{stat.evolution}</p>
                </div>
              ))}
            </div>

            {/* BAS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Section Validation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-secondary font-semibold text-lg">
                    En attente de validation
                  </h2>
                  <button className="text-button text-sm">voir tout</button>
                </div>

                <div className="flex flex-col gap-3">
                  {validations.length > 0 ? (
                    validations.map((v, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 rounded-xl border border-bordure hover:bg-orange-50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold text-secondary">{v.nom}</p>
                          <p className="text-gray-400 text-sm">{v.proprio}</p>
                          <p className="text-gray-400 text-sm">{v.pays}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">{v.date}</p>
                          <button className="text-button font-semibold text-sm mt-1">
                            Examiner →
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">Aucun restaurant en attente.</p>
                  )}
                </div>
              </div>

              {/* Section Activités */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
                <h2 className="text-secondary font-semibold text-lg mb-4">
                  Activités récentes
                </h2>
                <div className="flex flex-col gap-4">
                  {activites.map((a, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-3 h-3 rounded-full bg-button mt-1 shrink-0"></div>
                      <p className="text-secondary text-sm">{a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;