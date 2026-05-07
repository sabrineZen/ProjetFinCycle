import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEnvelope, FaPhone, FaEye, FaTrash } from "react-icons/fa";

function UtilisateursPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [roleFiltre, setRoleFiltre] = useState("Tous les roles");

  const utilisateurs = [
    { id: 1, nom: "Sofie Martin", date: "2024-01-15", email: "sofiemartin@gmail.com", tel: "+33 6 12 355", role: "Client", commandes: 23, depenses: "$342.50" },
    { id: 2, nom: "Zofie Martin", date: "2024-01-15", email: "zofiemartin@gmail.com", tel: "+33 6 12 355", role: "Restaurateur", commandes: null, depenses: null },
    { id: 3, nom: "Zofie Martin", date: "2024-01-15", email: "zofiemartin@gmail.com", tel: "+33 6 12 355", role: "Restaurateur", commandes: null, depenses: null },
    { id: 4, nom: "Sofie Martin", date: "2024-01-15", email: "sofiemartin@gmail.com", tel: "+33 6 12 355", role: "Client", commandes: 23, depenses: "$342.50" },
  ];

  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchRecherche = u.nom.toLowerCase().includes(recherche.toLowerCase()) || u.email.toLowerCase().includes(recherche.toLowerCase());
    const matchRole = roleFiltre === "Tous les roles" || u.role === roleFiltre;
    return matchRecherche && matchRole;
  });

  const ouvrirModal = (utilisateur) => {
    setUtilisateurSelectionne({ ...utilisateur });
    setModalOuvert(true);
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-56 p-8 w-full min-h-screen bg-fond">

        {/* Titre */}
        <h1 className="text-3xl font-bold text-secondary">Gestion des utilisateurs</h1>
        <p className="text-gray-400 mt-1 mb-8">{utilisateurs.length} utilisateur(s) trouvés</p>

        {/* Barre recherche + filtre */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex gap-4">
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

        {/* Tableau */}
        <div className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">
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

        {/* Modal Modifier */}
{modalOuvert && utilisateurSelectionne && (
  <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl p-8 w-[500px] shadow-xl">
      <h2 className="text-2xl font-bold text-secondary mb-6">Détails utilisateur</h2>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray-400 text-sm">Nom complet</p>
          <p className="text-secondary font-medium">{utilisateurSelectionne.nom}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-secondary font-medium">{utilisateurSelectionne.email}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Téléphone</p>
          <p className="text-secondary font-medium">{utilisateurSelectionne.tel}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Role</p>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${utilisateurSelectionne.role === "Client" ? "bg-orange-100 text-button" : "bg-button text-white"}`}>
            {utilisateurSelectionne.role}
          </span>
        </div>
        <div className="bg-fond rounded-xl px-4 py-3">
          <p className="text-gray-400 text-sm">Date d'inscription</p>
          <p className="text-secondary font-medium">{utilisateurSelectionne.date}</p>
        </div>
      </div>

      <div className="mt-6">
        <button onClick={() => setModalOuvert(false)}
          className="w-full border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
          Fermer
        </button>
      </div>
    </div>
  </div>
)}

 </div>
    </div>
  );
}

export default UtilisateursPage;