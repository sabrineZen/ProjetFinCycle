import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaBars, FaSpinner } from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  const bg = type === "error" ? "bg-red-500" : type === "warning" ? "bg-orange-500" : "bg-green-500";
  return (
    <div className={`fixed bottom-5 right-5 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl text-white text-sm shadow-lg ${bg}`}>
      {message}
      <button onClick={onClose}><FaTimes size={12} /></button>
    </div>
  );
}

// ── Modal confirmation suppression ─────────────────────────────────────────────
function ModalConfirm({ nom, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-bold text-secondary mb-2">Supprimer la catégorie ?</h2>
        <p className="text-gray-400 text-sm mb-5">
          La catégorie <strong className="text-secondary">« {nom} »</strong> sera définitivement supprimée.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm hover:bg-gray-50 transition">
            Annuler
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 bg-red-500 text-white py-2 rounded-xl text-sm hover:bg-red-600 transition flex items-center justify-center gap-2 disabled:opacity-60">
            {loading ? <FaSpinner className="animate-spin" size={13} /> : <FaTrash size={13} />}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Formulaire avec color picker libre ────────────────────────────────────────
function FormCategorie({ valeurs, onChange }) {
  return (
    <div className="flex flex-col gap-4">

      <div>
        <label className="text-secondary text-sm font-medium">Nom *</label>
        <input
          type="text"
          value={valeurs.nom}
          onChange={e => onChange({ ...valeurs, nom: e.target.value })}
          placeholder="Ex : Mexicain"
          className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond"
        />
      </div>

      <div>
        <label className="text-secondary text-sm font-medium">Description</label>
        <textarea
          value={valeurs.description}
          onChange={e => onChange({ ...valeurs, description: e.target.value })}
          className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond h-20 resize-none"
        />
      </div>

      {/* ── Color picker libre ── */}
      <div>
        <label className="text-secondary text-sm font-medium">Couleur *</label>
        <div className="flex items-center gap-3 mt-2">

          {/* Aperçu cliquable qui ouvre le picker natif */}
          <div
            className="relative w-12 h-12 rounded-xl border-2 border-bordure cursor-pointer overflow-hidden flex-shrink-0"
            style={{ backgroundColor: valeurs.couleur }}
            title="Cliquer pour choisir une couleur"
          >
            <input
              type="color"
              value={valeurs.couleur}
              onChange={e => onChange({ ...valeurs, couleur: e.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          {/* Champ hex manuel */}
          <div className="flex-1">
            <input
              type="text"
              value={valeurs.couleur}
              maxLength={7}
              onChange={e => {
                const val = e.target.value;
                // Accepte uniquement format hex valide
                if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                  onChange({ ...valeurs, couleur: val });
                }
              }}
              placeholder="#FCCEC1"
              className="w-full border border-bordure rounded-xl px-4 py-3 text-secondary text-sm outline-none focus:border-button bg-fond font-mono"
            />
          </div>

          {/* Aperçu avec le nom hex */}
          <div
            className="w-12 h-12 rounded-xl border border-bordure flex-shrink-0"
            style={{ backgroundColor: valeurs.couleur }}
          />
        </div>

        {/* Couleurs rapides suggérées */}
        <div className="mt-3">
          <p className="text-gray-400 text-xs mb-2">Suggestions rapides</p>
          <div className="flex gap-2 flex-wrap">
            {["#FCCEC1","#FF8238","#FFD700","#4CAF50","#2196F3","#9C27B0","#F44336","#00BCD4","#FF5722","#607D8B"].map(c => (
              <div
                key={c}
                onClick={() => onChange({ ...valeurs, couleur: c })}
                title={c}
                className={`w-8 h-8 rounded-lg cursor-pointer border-2 transition-transform hover:scale-110 ${valeurs.couleur === c ? "border-button scale-110" : "border-transparent"}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page principale ────────────────────────────────────────────────────────────
function CategoriesAdminPage() {
  const [categories, setCategories]         = useState([]);
  const [chargement, setChargement]         = useState(true);
  const [erreur, setErreur]                 = useState(null);
  const [toast, setToast]                   = useState(null);
  const [sidebarOuverte, setSidebarOuverte] = useState(false);

  const [modalOuvert, setModalOuvert]       = useState(false);
  const [nouvelle, setNouvelle]             = useState({ nom: "", description: "", couleur: "#FCCEC1" });
  const [ajoutEnCours, setAjoutEnCours]     = useState(false);

  const [modifId, setModifId]               = useState(null);
  const [valeursModif, setValeursModif]     = useState({});
  const [modifEnCours, setModifEnCours]     = useState(false);

  const [aSupprimer, setASupprimer]                 = useState(null);
  const [suppressionEnCours, setSuppressionEnCours] = useState(false);

  const showToast = (message, type = "success") => setToast({ message, type });

  // Chargement initial
  useEffect(() => {
    fetch(`${API}/categories`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => setCategories(data))
      .catch(() => setErreur("Impossible de charger les catégories."))
      .finally(() => setChargement(false));
  }, []);

  // Ajouter
  const ajouterCategorie = async () => {
    if (!nouvelle.nom.trim()) return;
    setAjoutEnCours(true);
    try {
      const r = await fetch(`${API}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouvelle),
      });
      if (!r.ok) { const e = await r.json(); throw new Error(e.message); }
      const creee = await r.json();
      setCategories(prev => [...prev, creee]);
      setNouvelle({ nom: "", description: "", couleur: "#FCCEC1" });
      setModalOuvert(false);
      showToast("Catégorie ajoutée !");
    } catch (e) {
      showToast(e.message || "Erreur lors de l'ajout.", "error");
    } finally {
      setAjoutEnCours(false);
    }
  };

  // Ouvrir modification
  const ouvrirModif = (cat) => {
    setModifId(cat.id);
    setValeursModif({ nom: cat.nom, description: cat.description, couleur: cat.couleur });
  };

  // Sauvegarder modification
  const sauvegarderModif = async (cat) => {
    if (!valeursModif.nom?.trim()) return;
    setModifEnCours(true);
    try {
      const r = await fetch(`${API}/categories/${cat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valeursModif),
      });
      if (!r.ok) { const e = await r.json(); throw new Error(e.message); }
      const maj = await r.json();
      setCategories(prev => prev.map(c => c.id === cat.id ? { ...c, ...maj } : c));
      setModifId(null);
      showToast("Catégorie modifiée !");
    } catch (e) {
      showToast(e.message || "Erreur lors de la modification.", "error");
    } finally {
      setModifEnCours(false);
    }
  };

  // Supprimer
  const supprimerCategorie = async () => {
    setSuppressionEnCours(true);
    try {
      const r = await fetch(`${API}/categories/${aSupprimer.id}`, { method: "DELETE" });
      if (!r.ok) { const e = await r.json(); throw new Error(e.message); }
      setCategories(prev => prev.filter(c => c.id !== aSupprimer.id));
      setASupprimer(null);
      showToast("Catégorie supprimée.");
    } catch (e) {
      showToast(e.message || "Erreur lors de la suppression.", "error");
    } finally {
      setSuppressionEnCours(false);
    }
  };

  return (
    <div className="flex">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {aSupprimer && (
        <ModalConfirm nom={aSupprimer.nom} loading={suppressionEnCours}
          onConfirm={supprimerCategorie} onCancel={() => setASupprimer(null)} />
      )}

      {sidebarOuverte && (
        <div className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOuverte(false)} />
      )}

      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 gap-3 z-30">
        <button onClick={() => setSidebarOuverte(true)} className="text-secondary p-1"><FaBars size={20} /></button>
        <h1 className="font-bold text-secondary flex-1">Catégories</h1>
        <button onClick={() => setModalOuvert(true)}
          className="bg-button text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
          <FaPlus size={10} /> Ajouter
        </button>
      </div>

      {/* Contenu */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        <div className="flex justify-between items-start mb-2 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-secondary">Gestion des catégories</h1>
            <p className="text-gray-400 mt-1 text-sm">{categories.length} catégorie(s)</p>
          </div>
          <button onClick={() => setModalOuvert(true)}
            className="hidden lg:flex bg-button text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-valider transition items-center gap-2">
            <FaPlus /> Ajouter une catégorie
          </button>
        </div>

        {/* Chargement */}
        {chargement && (
          <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
            <FaSpinner className="animate-spin" size={20} />
            <span>Chargement…</span>
          </div>
        )}

        {/* Erreur */}
        {!chargement && erreur && (
          <div className="mt-10 text-center bg-red-50 border border-red-200 rounded-2xl p-6">
            <p className="text-red-600 font-medium">{erreur}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-sm text-red-500 underline">Réessayer</button>
          </div>
        )}

        {/* Grille */}
        {!chargement && !erreur && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
            {categories.map(cat => (
              <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

                <div className="h-28 lg:h-32 flex items-center justify-center transition-colors duration-300" style={{ backgroundColor: cat.couleur }}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white bg-opacity-40 flex items-center justify-center text-3xl lg:text-4xl">
                    🍽️
                  </div>
                </div>

                <div className="p-3 lg:p-4">
                  {modifId === cat.id ? (
                    <div className="flex flex-col gap-3">
                      <FormCategorie valeurs={valeursModif} onChange={setValeursModif} />
                      <div className="flex gap-2 mt-1">
                        <button onClick={() => sauvegarderModif(cat)} disabled={modifEnCours || !valeursModif.nom?.trim()}
                          className="flex-1 bg-button text-white py-2 rounded-xl text-xs font-medium hover:bg-valider transition flex items-center justify-center gap-1 disabled:opacity-60">
                          {modifEnCours && <FaSpinner className="animate-spin" size={11} />}
                          Sauvegarder
                        </button>
                        <button onClick={() => setModifId(null)}
                          className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-xs font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1">
                          <FaTimes /> Annuler
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-bordure flex-shrink-0" style={{ backgroundColor: cat.couleur }} />
                        <h2 className="font-bold text-secondary text-base lg:text-lg">{cat.nom}</h2>
                      </div>
                      <p className="text-gray-400 text-xs lg:text-sm mt-1 line-clamp-2">{cat.description}</p>
                      <div className="flex gap-2 mt-3">
                        <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                          <p className="text-gray-400 text-xs">Restaurants</p>
                          <p className="font-bold text-secondary text-sm">{cat.restaurants ?? 0}</p>
                        </div>
                        <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                          <p className="text-gray-400 text-xs">Plats</p>
                          <p className="font-bold text-secondary text-sm">{cat.plats ?? 0}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => ouvrirModif(cat)}
                          className="flex-1 bg-button text-white py-2 rounded-xl text-xs lg:text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-1">
                          <FaEdit /> Modifier
                        </button>
                        <button onClick={() => setASupprimer(cat)}
                          className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                          <FaTrash size={13} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {categories.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
                <span className="text-4xl">🍽️</span>
                <p className="text-sm">Aucune catégorie pour l'instant.</p>
                <button onClick={() => setModalOuvert(true)} className="text-button text-sm underline">
                  Ajouter la première catégorie
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal ajout */}
        {modalOuvert && (
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 lg:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl lg:text-2xl font-bold text-secondary mb-5">Nouvelle catégorie</h2>
              <FormCategorie valeurs={nouvelle} onChange={setNouvelle} />
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => { setModalOuvert(false); setNouvelle({ nom: "", description: "", couleur: "#FCCEC1" }); }}
                  className="flex-1 bg-secondary text-white py-3 rounded-xl text-sm font-medium hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaTimes /> Annuler
                </button>
                <button onClick={ajouterCategorie} disabled={ajoutEnCours || !nouvelle.nom.trim()}
                  className="flex-1 bg-button text-white py-3 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2 disabled:opacity-60">
                  {ajoutEnCours ? <FaSpinner className="animate-spin" size={14} /> : <FaPlus />}
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriesAdminPage;