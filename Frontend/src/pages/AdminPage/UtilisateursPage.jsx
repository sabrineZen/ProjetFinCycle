import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEnvelope, FaPhone, FaEye, FaTrash, FaBars, FaTimes } from "react-icons/fa";

function UtilisateursPage() {
  const [modalOuvert, setModalOuvert]                       = useState(false);
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null);
  const [recherche, setRecherche]                           = useState("");
  const [roleFiltre, setRoleFiltre]                         = useState("Tous les roles");
  const [sidebarOuverte, setSidebarOuverte]                 = useState(false);
  const [utilisateurs, setUtilisateurs]                     = useState([]);
  const [chargement, setChargement]                         = useState(true);
  const [erreur, setErreur]                                 = useState(null);

  // ── Chargement ──
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/utilisateurs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement des utilisateurs");
        const data = await res.json();
        setUtilisateurs(data);
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    };
    fetchUtilisateurs();
  }, []);

  // ── Suppression ──
  const supprimerUtilisateur = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/utilisateurs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Suppression échouée");
      setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
      if (utilisateurSelectionne?.id === id) setModalOuvert(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // ── Filtrage ──
  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchRecherche =
      u.nom.toLowerCase().includes(recherche.toLowerCase()) ||
      u.email.toLowerCase().includes(recherche.toLowerCase());
    const matchRole =
      roleFiltre === "Tous les roles" ||
      u.role === roleFiltre.toLowerCase();
    return matchRecherche && matchRole;
  });

  const ouvrirModal = (utilisateur) => {
    setUtilisateurSelectionne({ ...utilisateur });
    setModalOuvert(true);
  };

  // ── Badge rôle ──
  const BadgeRole = ({ role }) => {
    const label = role === "client" ? "Client" : "Restaurateur";
    const style = role === "client"
      ? "bg-orange-100 text-button"
      : "bg-button text-white";
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
        {label}
      </span>
    );
  };

  // ── Badge statut restaurateur ──
  const BadgeStatut = ({ statut }) => {
    if (!statut) return null;
    const config = {
      en_attente: "bg-yellow-100 text-yellow-700",
      approuve:   "bg-green-100 text-green-700",
      refuse:     "bg-red-100 text-red-700",
    };
    const labels = {
      en_attente: "En attente",
      approuve:   "Approuvé",
      refuse:     "Refusé",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config[statut] || ""}`}>
        {labels[statut] || statut}
      </span>
    );
  };

  return (
    <div className="flex">

      {/* Overlay mobile */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* Sidebar */}
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
        <h1 className="ml-4 font-bold text-secondary">Utilisateurs</h1>
      </div>

      {/* Contenu principal */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* Titre desktop */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Gestion des utilisateurs</h1>
          <p className="text-gray-400 mt-1 mb-8">
            {utilisateurs.length} utilisateur(s) trouvés
          </p>
        </div>

        {/* Compteur mobile */}
        <p className="text-gray-400 mt-1 mb-4 lg:hidden">
          {utilisateurs.length} utilisateur(s)
        </p>

        {/* Barre de recherche + filtre */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
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

        {/* État chargement */}
        {chargement && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm">Chargement en cours...</p>
          </div>
        )}

        {/* État erreur */}
        {erreur && (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm">{erreur}</p>
          </div>
        )}

        {/* Aucun résultat */}
        {!chargement && !erreur && utilisateursFiltres.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm">Aucun utilisateur trouvé.</p>
          </div>
        )}

        {/* ── TABLE desktop ── */}
        {!chargement && !erreur && utilisateursFiltres.length > 0 && (
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-bordure bg-gray-50">
                  <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Utilisateur</th>
                  <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Contact</th>
                  <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Rôle</th>
                  <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Statistiques</th>
                  <th className="text-left px-6 py-4 text-secondary text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {utilisateursFiltres.map((u) => (
                  <tr key={u.id} className="border-b border-bordure hover:bg-orange-50 transition">

                    <td className="px-6 py-4">
                      <p className="font-semibold text-secondary">{u.nom}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{u.email}</p>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-secondary text-sm">
                        <FaEnvelope className="text-button shrink-0" />
                        <span className="truncate max-w-[180px]">{u.email}</span>
                      </div>
                      {u.telephone && (
                        <div className="flex items-center gap-2 text-secondary text-sm mt-1">
                          <FaPhone className="text-button shrink-0" />
                          {u.telephone}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <BadgeRole role={u.role} />
                        {u.role === "restaurateur" && <BadgeStatut statut={u.statut} />}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-secondary text-sm">
                      {u.nombreCommandes !== null ? (
                        <div>
                          <p className="font-medium">{u.nombreCommandes} commande(s)</p>
                          <p className="text-gray-400">{u.totalDepenses} dépensés</p>
                        </div>
                      ) : (
                        <p className="text-gray-400">N/A</p>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => ouvrirModal(u)}
                          className="text-button hover:opacity-70 transition"
                          title="Voir les détails"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() => supprimerUtilisateur(u.id)}
                          className="text-red-400 hover:opacity-70 transition"
                          title="Supprimer"
                        >
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── CARDS mobile / tablette ── */}
        {!chargement && !erreur && utilisateursFiltres.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {utilisateursFiltres.map((u) => (
              <div key={u.id} className="bg-white rounded-2xl shadow-sm border border-bordure p-4">

                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-secondary">{u.nom}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{u.email}</p>
                  </div>
                  <BadgeRole role={u.role} />
                </div>

                <div className="mt-3 space-y-1 text-secondary text-sm">
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-button shrink-0" />
                    <span className="truncate">{u.email}</span>
                  </div>
                  {u.telephone && (
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-button shrink-0" />
                      {u.telephone}
                    </div>
                  )}
                </div>

                {u.role === "restaurateur" && (
                  <div className="mt-2">
                    <BadgeStatut statut={u.statut} />
                  </div>
                )}

                <div className="mt-3 text-secondary text-sm">
                  {u.nombreCommandes !== null ? (
                    <>
                      <p className="font-medium">{u.nombreCommandes} commande(s)</p>
                      <p className="text-gray-400">{u.totalDepenses} dépensés</p>
                    </>
                  ) : (
                    <p className="text-gray-400">N/A</p>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => ouvrirModal(u)}
                    className="flex-1 bg-button text-white py-2 rounded-xl text-sm hover:opacity-90 transition"
                  >
                    Voir détails
                  </button>
                  <button
                    onClick={() => supprimerUtilisateur(u.id)}
                    className="bg-red-100 text-red-500 p-2 rounded-xl hover:opacity-80 transition"
                  >
                    <FaTrash />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* ── MODAL détails ── */}
        {modalOuvert && utilisateurSelectionne && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOuvert(false); }}
          >
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">

              {/* Header modal */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-secondary">Détails utilisateur</h2>
                <button
                  onClick={() => setModalOuvert(false)}
                  className="text-gray-400 hover:text-secondary transition"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Contenu */}
              <div className="space-y-3 text-sm text-secondary">

                <div className="flex justify-between items-center border-b border-bordure pb-3">
                  <span className="text-gray-400">Nom</span>
                  <span className="font-medium">{utilisateurSelectionne.nom}</span>
                </div>

                <div className="flex justify-between items-center border-b border-bordure pb-3">
                  <span className="text-gray-400">Email</span>
                  <span className="font-medium truncate ml-4">{utilisateurSelectionne.email}</span>
                </div>

                <div className="flex justify-between items-center border-b border-bordure pb-3">
                  <span className="text-gray-400">Rôle</span>
                  <BadgeRole role={utilisateurSelectionne.role} />
                </div>

                {utilisateurSelectionne.telephone && (
                  <div className="flex justify-between items-center border-b border-bordure pb-3">
                    <span className="text-gray-400">Téléphone</span>
                    <span className="font-medium">{utilisateurSelectionne.telephone}</span>
                  </div>
                )}

                {/* Infos client */}
                {utilisateurSelectionne.role === "client" && (
                  <div className="flex justify-between items-center border-b border-bordure pb-3">
                    <span className="text-gray-400">Commandes</span>
                    <span className="font-medium">
                      {utilisateurSelectionne.nombreCommandes} — {utilisateurSelectionne.totalDepenses}
                    </span>
                  </div>
                )}

                {/* Infos restaurateur */}
                {utilisateurSelectionne.role === "restaurateur" && (
                  <>
                    {utilisateurSelectionne.adresseRestaurant && (
                      <div className="flex justify-between items-center border-b border-bordure pb-3">
                        <span className="text-gray-400">Adresse restaurant</span>
                        <span className="font-medium ml-4 text-right">{utilisateurSelectionne.adresseRestaurant}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-b border-bordure pb-3">
                      <span className="text-gray-400">Statut</span>
                      <BadgeStatut statut={utilisateurSelectionne.statut} />
                    </div>
                  </>
                )}

              </div>

              {/* Actions modal */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModalOuvert(false)}
                  className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm hover:bg-gray-50 transition"
                >
                  Fermer
                </button>
                <button
                  onClick={() => supprimerUtilisateur(utilisateurSelectionne.id)}
                  className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl text-sm hover:opacity-80 transition"
                >
                  Supprimer
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