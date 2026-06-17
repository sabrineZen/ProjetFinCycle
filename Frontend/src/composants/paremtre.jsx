import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoLockClosed } from "react-icons/io5";

function Parametre({ profil }) {
    const navigate = useNavigate();

    // 🔐 STATES mot de passe
    const [ancienMotDePasse, setAncienMotDePasse] = useState("");
    const [nouveauMotDePasse, setNouveauMotDePasse] = useState("");
    const [message, setMessage] = useState("");

    const handleChangePassword = async () => {
        try {
            await api.put("/clients/mot-de-passe", {
                ancienMotDePasse,
                nouveauMotDePasse
            });

            setMessage("Mot de passe mis à jour avec succès ");
            setAncienMotDePasse("");
            setNouveauMotDePasse("");
        } catch (err) {
            console.error(err);
            setMessage(
                err.response?.data?.message ||
                "Erreur lors de la modification du mot de passe"
            );
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = window.confirm(
            "Voulez-vous vraiment supprimer votre compte ? Cette action est irréversible."
        );

        if (!confirmation) return;

        try {
            await api.delete("/clients/mon-compte", {
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

            {/* 🔐 MODIFIER MOT DE PASSE */}
            <div className="bg-[#FFF0E8] rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <IoLockClosed className="text-[#FF6900] text-xl" />
                    <p className="font-bold" style={{ color: "#8B2A1B" }}>
                        Modifier mot de passe
                    </p>
                </div>

                <input
                    type="password"
                    placeholder="Ancien mot de passe"
                    value={ancienMotDePasse}
                    onChange={(e) => setAncienMotDePasse(e.target.value)}
                    className="w-full p-2 rounded-lg outline-none"
                />

                <input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={nouveauMotDePasse}
                    onChange={(e) => setNouveauMotDePasse(e.target.value)}
                    className="w-full p-2 rounded-lg outline-none"
                />

                <button
                    onClick={handleChangePassword}
                    className="cursor-pointer bg-[#FF6900] text-white px-4 py-2 rounded-lg"
                >
                    Mettre à jour
                </button>

                {message && (
                    <p className="text-sm text-gray-600">{message}</p>
                )}
            </div>

            {/* 🗑 COMPTE */}
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
                        <p>Email : {profil?.email}</p>
                        <p>Adresse : {profil?.adresse}</p>
                    </div>

                    <button
                        onClick={handleDeleteAccount}
                        className="cursor-pointer mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Supprimer le Compte
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Parametre;