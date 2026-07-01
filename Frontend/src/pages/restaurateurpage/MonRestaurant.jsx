import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, Phone, Info, Save, Mail } from 'lucide-react';
import api from '../../api';

const MonRestaurant = ({ estActif, setEstActif }) => {
  const [profil, setProfil] = useState({
    nomRestaurant: '',
    numeroRegistre: '',
    adresseRestaurant: '',
    telephone: '',
    email: '',
    documentOfficiel: null
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState(
    localStorage.getItem('photo_profil') || "https://cdn.mos.cms.futurecdn.net/HNnPBHRgfDcRwMyPAbGoDR.jpg"
  );
  const fileInputRef = useRef(null);

  // ── Récupérer le profil au chargement ──
  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.get('/restaurateurs/profil', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfil(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfil();
  }, []);

  // ── Changer la photo ──
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPhotoUrl(base64);
      localStorage.setItem('photo_profil', base64);
    };
    reader.readAsDataURL(file);
  };

  // ── Sauvegarder les modifications ──
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.put('/restaurateurs/profil', profil, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Profil mis à jour avec succès');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Erreur lors de la mise à jour');
    }
  };

  if (loading) return <p className="text-center text-[#951418] font-medium">Chargement...</p>;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,112,49,0.14),_transparent_35%),linear-gradient(135deg,_#fffaf6_0%,_#fff3ea_100%)] px-3 py-4 sm:px-5 lg:px-6 pb-20">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[#F3D8C8] bg-white/80 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-[0_20px_60px_rgba(149,20,24,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FF7031]">Restaurateur</p>
            <h2 className="text-3xl font-black text-[#951418]">Mon restaurant</h2>
            <p className="text-gray-500 mt-1">Gérez votre identité, vos informations et votre visibilité.</p>
          </div>
          <div className="rounded-2xl bg-[#FFF0E5] border border-[#F7D9C6] px-4 py-3 text-sm text-[#8E4A2D] shadow-sm">
            Panel de gestion premium
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[340px] space-y-6">
            <div className="bg-white rounded-[24px] border border-[#F4D8C7] p-6 shadow-sm text-center">
              <div className="relative mx-auto w-28 h-28">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                <img
                  src={photoUrl}
                  alt="Logo"
                  className="w-28 h-28 rounded-2xl object-cover border-4 border-[#FFF0E5] shadow-sm"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute -bottom-2 -right-2 bg-[#FF7031] p-2 rounded-xl text-white shadow-lg hover:scale-110 transition-all"
                >
                  <Camera size={18} />
                </button>
              </div>

              <h3 className="mt-4 text-2xl font-black text-[#951418]">{profil.nomRestaurant}</h3>
              <p className="text-[#8E4A2D] text-sm mt-1">{profil.numeroRegistre}</p>

              <div className={`mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 border ${
                estActif ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}>
                <span className={`w-2.5 h-2.5 rounded-full ${estActif ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                <span className="text-sm font-semibold">{estActif ? 'Restaurant actif' : 'Restaurant inactif'}</span>
              </div>

              <button
                type="button"
                onClick={() => setEstActif(!estActif)}
                className={`mt-5 w-full py-3 rounded-2xl font-semibold text-white text-sm transition-all shadow-md ${
                  estActif ? 'bg-[#FF7031] hover:bg-[#e65f25]' : 'bg-[#16a34a] hover:bg-[#15803d]'
                }`}
              >
                {estActif ? 'Désactiver le restaurant' : 'Activer le restaurant'}
              </button>
            </div>

            <div className="bg-white rounded-[24px] border border-[#F4D8C7] p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-[#951418] mb-4">Informations rapides</h4>
              <div className="space-y-4 text-sm text-[#7A4C35]">
                <div className="flex items-start gap-3 rounded-xl bg-[#FFF7F1] p-3 border border-[#F6DFCE]">
                  <MapPin className="text-[#FF7031] mt-0.5" size={18} />
                  <span>{profil.adresseRestaurant}</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#FFF7F1] p-3 border border-[#F6DFCE]">
                  <Phone className="text-[#FF7031] mt-0.5" size={18} />
                  <span>{profil.telephone}</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl bg-[#FFF7F1] p-3 border border-[#F6DFCE]">
                  <Mail className="text-[#FF7031] mt-0.5" size={18} />
                  <span>{profil.email}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-[24px] border border-[#F4D8C7] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-[#FFF0E5] p-2.5 rounded-2xl text-[#FF7031]">
                  <Info size={20} />
                </div>
                <h4 className="text-2xl font-semibold text-[#951418]">Informations générales</h4>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#951418]">Nom du restaurant</label>
                  <input
                    type="text"
                    value={profil.nomRestaurant}
                    onChange={(e) => setProfil({ ...profil, nomRestaurant: e.target.value })}
                    className="w-full bg-[#FFF8F2] border border-[#F3D4BE] rounded-2xl p-3 focus:ring-2 focus:ring-[#FFD7BF] focus:border-[#FF7031] transition-all outline-none"
                  />
                </div>

                <div className="w-full relative">
                  <input type="file" id="file-upload-mobile" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                  <label htmlFor="file-upload-mobile" className="text-[#951418] block p-3 border border-[#F3D4BE] rounded-2xl bg-[#FFF8F2] text-center cursor-pointer text-sm font-medium">
                    Télécharger document officiel
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#951418]">Numéro registre de commerce</label>
                    <input
                      type="text"
                      value={profil.numeroRegistre}
                      onChange={(e) => setProfil({ ...profil, numeroRegistre: e.target.value })}
                      className="w-full bg-[#FFF8F2] border border-[#F3D4BE] rounded-2xl p-3 focus:ring-2 focus:ring-[#FFD7BF] focus:border-[#FF7031] transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#951418]">Email</label>
                    <input
                      type="email"
                      value={profil.email}
                      onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                      className="w-full bg-[#FFF8F2] border border-[#F3D4BE] rounded-2xl p-3 focus:ring-2 focus:ring-[#FFD7BF] focus:border-[#FF7031] transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#951418]">Téléphone</label>
                    <input
                      type="tel"
                      value={profil.telephone}
                      onChange={(e) => setProfil({ ...profil, telephone: e.target.value })}
                      className="w-full bg-[#FFF8F2] border border-[#F3D4BE] rounded-2xl p-3 focus:ring-2 focus:ring-[#FFD7BF] focus:border-[#FF7031] transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#951418]">Adresse</label>
                    <input
                      type="text"
                      value={profil.adresseRestaurant}
                      onChange={(e) => setProfil({ ...profil, adresseRestaurant: e.target.value })}
                      className="w-full bg-[#FFF8F2] border border-[#F3D4BE] rounded-2xl p-3 focus:ring-2 focus:ring-[#FFD7BF] focus:border-[#FF7031] transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {message && (
              <p className="text-center font-semibold text-sm" style={{ color: message.includes('✅') ? 'green' : 'red' }}>
                {message}
              </p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#FF7031] text-white px-8 py-4 rounded-2xl font-semibold shadow-md hover:bg-[#e65f25] transition-all flex items-center gap-3"
              >
                <Save size={20} /> Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonRestaurant;