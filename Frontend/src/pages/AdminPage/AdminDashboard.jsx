import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaUsers, FaStore, FaUtensils, FaEuroSign } from "react-icons/fa";

function AdminDashboard() {
  const stats = [
    { titre: "Utilisateurs totaux", valeur: "2,847", evolution: "+12.5%", icon: <FaUsers /> },
    { titre: "Restaurants actifs", valeur: "142", evolution: "+8.2%", icon: <FaStore /> },
    { titre: "Plats disponibles", valeur: "3,847", evolution: "+24.5%", icon: <FaUtensils /> },
    { titre: "Revenus ce mois", valeur: "€ 22,847", evolution: "+12.5%", icon: <FaEuroSign /> },
  ];

  const validations = [
    { nom: "ghano food", proprio: "ghano younsi", pays: "francais", date: "12-03-2026" },
    { nom: "Ahmed food", proprio: "YAHIAOUI Ahmed", pays: "francais", date: "05-05-2026" },
    { nom: "Wassim food", proprio: "YAHIA Wassim", pays: "francais", date: "20-10-2026" },
    { nom: "elden ring", proprio: "fromsoftware", pays: "japanese", date: "20-10-2026" },
  ];

  const activites = [
    "Nouvel utilisateur inscrit : ahmed yahiaoui",
    "Restaurant \"ghano food\" a été validé",
    "3 nouveaux plats ajouter par \"wassim food\"",
    "Commande #1234 complétée avec succes",
    "Nouvel utilisateur inscrit : arthur morgan",
    "Restaurant \"elden ring\" a été validé",
  ];

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-56 p-8 w-full min-h-screen bg-fond">

        {/* Titre */}
        <h1 className="text-3xl font-bold text-secondary">Tableau de bord</h1>
        <p className="text-gray-400 mt-1 mb-8">Vue d'ensemble de votre platforme e-commerce</p>

        {/* Cards statistiques */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
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

        {/* Bas du dashboard */}
        <div className="grid grid-cols-2 gap-6">

          {/* En attente de validation */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-secondary font-semibold text-lg">En attente de validation</h2>
              <span className="text-button text-sm cursor-pointer">voir tout</span>
            </div>
            <div className="flex flex-col gap-3">
              {validations.map((v, index) => (
                <div key={index} className={`flex justify-between items-center p-3 rounded-xl ${index === 0 ? "border border-button bg-orange-50" : ""}`}>
                  <div>
                    <p className="font-semibold text-secondary">{v.nom}</p>
                    <p className="text-gray-400 text-sm">{v.proprio}</p>
                    <p className="text-gray-400 text-sm">{v.pays}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm">{v.date}</p>
                    <p className="text-button font-semibold text-sm mt-1 cursor-pointer">Examiner →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activités récentes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
            <h2 className="text-secondary font-semibold text-lg mb-4">Activités réecentes</h2>
            <div className="flex flex-col gap-4">
              {activites.map((activite, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-button mt-1 flex-shrink-0"></div>
                  <p className="text-secondary text-sm">{activite}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;