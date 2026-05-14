import { useState, useEffect } from "react";
import { CgMail } from "react-icons/cg";
import { MdOutlinePhone } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import { BsPerson } from "react-icons/bs";

function InfoPersonnelles({ user, setUser }) {
  const [form, setForm]       = useState({ prenom: "", nom: "", email: "", telephone: "", adresse: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Remplir le formulaire dès que user arrive
  useEffect(() => {
    if (user) {
      setForm({
        prenom:    user.prenom    || "",
        nom:       user.nom       || "",
        email:     user.email     || "",
        telephone: user.telephone || "",
        adresse:   user.adresse   || "",
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/auth/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.utilisateur);
        // Mettre à jour localStorage aussi
        localStorage.setItem("nom", `${data.utilisateur.prenom || ""} ${data.utilisateur.nom || ""}`.trim());
        setMessage({ type: "success", text: "Modifications enregistrées !" });
      } else {
        setMessage({ type: "error", text: data.message || "Erreur lors de la mise à jour" });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Erreur serveur" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold" style={{ color: '#8B2A1B' }}>Informations personnelles</h2>

      {message && (
        <div className={`text-sm px-4 py-2 rounded-lg font-medium ${
          message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm text-orange-600">Prénom</label>
          <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1 gap-2">
            <BsPerson className="text-[#FF6900] text-xl shrink-0" />
            <input
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              type="text"
              placeholder="Votre prénom"
              className="outline-none w-full bg-transparent text-sm"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-sm text-orange-600">Nom</label>
          <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1 gap-2">
            <BsPerson className="text-[#FF6900] text-xl shrink-0" />
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              type="text"
              placeholder="Votre nom"
              className="outline-none w-full bg-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Email</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1 gap-2">
          <CgMail className="text-[#FF6900] text-xl shrink-0" />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Votre email"
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Téléphone</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1 gap-2">
          <MdOutlinePhone className="text-[#FF6900] text-xl shrink-0" />
          <input
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            type="text"
            placeholder="Votre téléphone"
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-orange-600">Adresse</label>
        <div className="flex items-center bg-[#FFF0E8] rounded-lg px-3 py-2 mt-1 gap-2">
          <GrLocation className="text-[#FF6900] text-xl shrink-0" />
          <input
            name="adresse"
            value={form.adresse}
            onChange={handleChange}
            type="text"
            placeholder="Votre adresse"
            className="outline-none w-full bg-transparent text-sm"
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full bg-[#FF6900] text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50 font-semibold"
      >
        {loading ? "Enregistrement..." : "Enregistrer modifications"}
      </button>
    </div>
  );
}

export default InfoPersonnelles;