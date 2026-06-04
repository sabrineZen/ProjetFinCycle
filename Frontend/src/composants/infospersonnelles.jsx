import { useState, useEffect } from "react";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";
import api from "../api";

function InfoPersonnelles({ profil, onProfileUpdate }) {
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    adresse: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
      prenom: profil?.prenom || "",
      nom: profil?.nom || "",
      email: profil?.email || "",
      telephone: profil?.telephone || "",
      adresse: profil?.adresse || "",
    });
  }, [profil]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setStatus("");

    try {
      const res = await api.put("/clients/profil", formData);
      const updatedProfil = { ...profil, ...formData };
      onProfileUpdate?.(updatedProfil);
      setStatus(res.data.message || "Profil mis à jour avec succès");
    } catch (err) {
      setStatus(err.response?.data?.message || "Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Informations personnelles</h2>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-orange-600">Prénom</label>
          <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
            <BsPerson className="text-[#FF6900] text-xl" />
            <input
              name="prenom"
              type="text"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="text-sm text-orange-600">Nom</label>
          <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
            <BsPerson className="text-[#FF6900] text-xl" />
            <input
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
              className="outline-none w-full bg-transparent"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Email</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
          <CgMail className="text-[#FF6900] text-xl" />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="outline-none w-full bg-transparent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Telephone</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
          <MdOutlinePhone className="text-[#FF6900] text-xl" />
          <input
            name="telephone"
            type="text"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
            className="outline-none w-full bg-transparent"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Adresse</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1">
          <GrLocation className="text-[#FF6900] text-xl" />
          <input
            name="adresse"
            type="text"
            value={formData.adresse}
            onChange={handleChange}
            placeholder="Adresse"
            className="outline-none w-full bg-transparent"
          />
        </div>
      </div>

      {status && <p className="text-sm text-[#6D2829]">{status}</p>}
      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-[#FF6900] text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
      >
        {loading ? "Enregistrement..." : "Enregistrer modification"}
      </button>
    </div>
  );
}

export default InfoPersonnelles