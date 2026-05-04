import React, { useState } from 'react';
import { ShieldCheck, Fingerprint, Download } from 'lucide-react';
import api from '../../../api';

const Securite = () => {
  const [passwordData, setPasswordData] = useState({
    motDePasseActuel: '',
    nouveauMotDePasse: '',
    confirmerMotDePasse: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { data } = await api.put('/restaurateurs/change-password', passwordData);
      setMessage(data.message);
      // Vider les champs après succès
      setPasswordData({
        motDePasseActuel: '',
        nouveauMotDePasse: '',
        confirmerMotDePasse: ''
      });
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-5 duration-500">
      
      {/* --- SECTION : CHANGEMENT DE MOT DE PASSE --- */}
      <div className="bg-white p-8 rounded-[20px] shadow-md">
        <div className="flex items-center gap-4 mb-6 pb-5">
          <ShieldCheck className="text-[#951418]" size={35} />
          <h2 className="text-3xl font-regular text-[#951418]">Changer le mot de passe</h2>
        </div>

        <div className="space-y-8 max-w-3xl">

          {/* Mot de passe actuel */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Mot de passe actuel</label>
            <input
              type="password"
              name="motDePasseActuel"
              value={passwordData.motDePasseActuel}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border bg-[#FFF7F4] border-[#C0A0A0] rounded-xl py-3 px-8 font-regular text-[#951418] focus:ring-1 focus:ring-[#FF843D] transition-all outline-none"
            />
          </div>

          {/* Nouveau mot de passe */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Nouveau mot de passe</label>
            <input
              type="password"
              name="nouveauMotDePasse"
              value={passwordData.nouveauMotDePasse}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border bg-[#FFF7F4] border-[#C0A0A0] rounded-xl py-3 px-8 font-regular text-[#951418] focus:ring-1 focus:ring-[#FF843D] transition-all outline-none"
            />
          </div>

          {/* Confirmation */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              name="confirmerMotDePasse"
              value={passwordData.confirmerMotDePasse}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full border bg-[#FFF7F4] border-[#C0A0A0] rounded-xl py-3 px-8 font-regular text-[#951418] focus:ring-1 focus:ring-[#FF843D] transition-all outline-none"
            />
          </div>

          {/* Message succès/erreur */}
          {message && (
            <p className="text-sm font-bold text-center"
              style={{ color: message.includes('✅') ? 'green' : 'red' }}>
              {message}
            </p>
          )}

        </div>
      </div>

      {/* --- SECTION : AUTHENTIFICATION 2FA --- */}
      <div className="bg-white p-8 rounded-[20px] shadow-md flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-[#FF843D] p-4 rounded-2xl shadow-xl shadow-orange-100">
            <Fingerprint size={28} color="white" />
          </div>
          <div>
            <h3 className="text-[#951418] font-regular text-2xl">Authentification à deux facteurs</h3>
            <p className="text-[#951418] text-sm font-regular">Ajouter une couche de sécurité supplémentaire à votre compte</p>
          </div>
        </div>
        <button className="bg-[#FF843D] text-white px-9 py-3 rounded-2xl font-regular text-lg shadow-sm shadow-[#FF843D] hover:scale-105 transition-transform">
          Activé
        </button>
      </div>

      {/* --- BOUTON DE SAUVEGARDE FINAL --- */}
      <div className="flex justify-end mt-1">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#FF843D] text-white px-10 py-4 rounded-2xl font-regular text-xl flex items-center gap-2 shadow-sm shadow-[#FF843D] hover:scale-105 active:scale-95 transition-all"
        >
          <Download size={26} />
          {loading ? 'Chargement...' : 'Sauvegarder les préférences'}
        </button>
      </div>

    </div>
  );
};

export default Securite;