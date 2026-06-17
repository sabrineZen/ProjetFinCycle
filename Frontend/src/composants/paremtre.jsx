import { useNavigate } from "react-router-dom";
import api from "../api";
import { RiDeleteBinLine } from "react-icons/ri";

function Parametre({ profil }) {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible."
        );

        if (!confirmation) return;

        try {
            await api.delete("/utilisateurs/mon-compte", {
                data: {
                    id: profil.id
                }
            });

            localStorage.removeItem("token");

            alert("Compte supprimé avec succès");

            navigate("/login");
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la suppression du compte");
        }
    };

    return (
        <div className="space-y-6">
            {/* ... ton code existant ... */}

            <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                    <RiDeleteBinLine className="text-red-500 text-xl" />
                    <p
                        className="font-bold"
                        style={{ color: "#8B2A1B" }}
                    >
                        Compte
                    </p>
                </div>

                <div className="bg-red-50 rounded-xl p-4 space-y-3">
                    <div>
                        <p className="font-semibold text-red-500">
                            Supprimer Mon compte
                        </p>

                        <p className="text-red-400 text-sm mt-1">
                            Cette action est irréversible. Toutes vos données
                            seront définitivement supprimées.
                        </p>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>
                            Email : {profil?.email || "Non renseigné"}
                        </p>

                        <p>
                            Adresse : {profil?.adresse || "Non renseignée"}
                        </p>
                    </div>

                    <button
                        onClick={handleDeleteAccount}
                        className=" cursor-pointer mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Supprimer le Compte
                    </button>
                </div>
            </div>

            <button className="w-full bg-[#FF6900] text-white py-3 rounded-xl font-bold">
                Enregistrer tous les changements
            </button>
        </div>
    );
}

export default Parametre;