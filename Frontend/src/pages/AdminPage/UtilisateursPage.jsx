import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEnvelope, FaPhone, FaEye, FaTrash, FaBars } from "react-icons/fa";

function UtilisateursPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [roleFiltre, setRoleFiltre] = useState("Tous les roles");
  const [sidebarOuverte, setSidebarOuverte] = useState(false); // ✅ ajouté

  const utilisateurs = [
    { id: 1, nom: "Sofie Martin", date: "2024-01-15", email: "sofiemartin@gmail.com", tel: "+33 6 12 355", role: "Client", commandes: 23, depenses: "$342.50" },
    { id: 2, nom: "Zofie Martin", date: "2024-01-15", email: "zofiemartin@gmail.com", tel: "+33 6 12 355", role: "Restaurateur", commandes: null, depenses: null },
  ];

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchRecherche =
      u.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      u.email.toLowerCase().includes(recherche.toLowerCase());
    const matchRole =
      roleFiltre === "Tous les roles" || u.role === roleFiltre;
    return matchRecherche && matchRole;
  });

  const ouvrirModal = (utilisateur) => {
    setUtilisateurSelectionne({ ...utilisateur });
    setModalOuvert(true);
  };

  return (
    <div className="flex">

      {/* ✅ Overlay mobile */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* ✅ Sidebar responsive */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* ✅ Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Utilisateurs</h1>
      </div>

      {/* ✅ Contenu */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* Titre desktop */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Gestion des utilisateurs</h1>
          <p className="text-gray-400 mt-1 mb-8">
            {utilisateurs.length} utilisateur(s) trouvés
          </p>
        </div>

        {/* Titre mobile */}
        <p className="text-gray-400 mt-1 mb-4 lg:hidden">
          {utilisateurs.length} utilisateur(s)
        </p>

        {/* Barre recherche */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Recherche par nom ou email"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />
          <select
            value={roleFiltre}
            onChange={(e) => setRoleFiltre(e.target.value)}
            className="border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          >
            <option>Tous les roles</option>
            <option>Client</option>
            <option>Restaurateur</option>
          </select>
        </div>

        {/* ✅ TABLE desktop (inchangé) */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-bordure">
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Utilisateur</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Contact</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Role</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Statistiques</th>
                <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {utilisateursFiltres.map((u) => (
                <tr key={u.id} className="border-b border-bordure hover:bg-orange-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-secondary">{u.nom}</p>
                    <p className="text-gray-400 text-sm">inscrit le {u.date}</p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <FaEnvelope className="text-button" /> {u.email}
                    </div>
                    <div className="flex items-center gap-2 text-secondary text-sm mt-1">
                      <FaPhone className="text-button" /> {u.tel}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.role === "Client" ? "bg-orange-100 text-button" : "bg-button text-white"}`}>
                      {u.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-secondary text-sm">
                    {u.commandes ? (
                      <div>
                        <p>{u.commandes} commandes</p>
                        <p>{u.depenses} dépensés</p>
                      </div>
                    ) : <p className="text-gray-400">N/A</p>}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <button onClick={() => ouvrirModal(u)} className="text-button hover:opacity-70 transition">
                        <FaEye size={18} />
                      </button>
                      <button className="text-button hover:opacity-70 transition">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ CARDS mobile/tablette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
          {utilisateursFiltres.map((u) => (
            <div key={u.id} className="bg-white rounded-2xl shadow-sm border border-bordure p-4">

              <p className="font-semibold text-secondary">{u.nom}</p>
              <p className="text-gray-400 text-sm">inscrit le {u.date}</p>

              <div className="mt-3 text-secondary text-sm">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-button" /> {u.email}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <FaPhone className="text-button" /> {u.tel}
                </div>
              </div>

              <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${u.role === "Client" ? "bg-orange-100 text-button" : "bg-button text-white"}`}>
                {u.role}
              </span>

              <div className="mt-3 text-secondary text-sm">
                {u.commandes ? (
                  <>
                    <p>{u.commandes} commandes</p>
                    <p>{u.depenses} dépensés</p>
                  </>
                ) : <p className="text-gray-400">N/A</p>}
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => ouvrirModal(u)} className="flex-1 bg-button text-white py-2 rounded-xl text-sm">
                  Voir
                </button>
                <button className="bg-button text-white p-2 rounded-xl">
                  <FaTrash />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal inchangé */}
        {modalOuvert && utilisateurSelectionne && (
          <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-125 shadow-xl">
              <h2 className="text-2xl font-bold text-secondary mb-6">Détails utilisateur</h2>
              ...
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default UtilisateursPage;