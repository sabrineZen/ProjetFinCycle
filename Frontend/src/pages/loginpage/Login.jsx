import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/img8.jpg";
import img9 from "../../assets/img9.jpg";
import img10 from "../../assets/img10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function Login() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [showInscription, setShowInscription] = useState(false);
  const [role, setRole] = useState("client");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = useCallback(() => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 10000);
    return () => clearInterval(interval);
  }, [nextImage, index]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFormData({ ...formData, documentOfficiel: e.target.files[0] });
  };

  // ── CONNEXION ──
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("nom", res.data.nom); // ✅ nom ajouté

      if (res.data.role === "client") navigate("/homeClient");
      else if (res.data.role === "restaurateur") navigate("/restaurateur");
      else if (res.data.role === "admin") navigate("/admin/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion ❌");
    } finally {
      setLoading(false);
    }
  };

  // ── INSCRIPTION CLIENT ──
  const handleRegisterClient = async () => {
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register/client", formData);
      setShowInscription(false);
      setFormData({});
      alert("Compte créé avec succès ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription ❌");
    } finally {
      setLoading(false);
    }
  };

  // ── INSCRIPTION RESTAURATEUR ──
  const handleRegisterRestaurateur = async () => {
    setError("");
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      await api.post("/auth/register/restaurateur", data);
      setShowInscription(false);
      setFormData({});
      alert("Restaurant créé avec succès ✅");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur d'inscription ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!showInscription) handleLogin();
    else if (role === "client") handleRegisterClient();
    else handleRegisterRestaurateur();
  };

  const slowTransition = { type: "tween", duration: 1.1, ease: "easeInOut" };
  const delayedTransition = { ...slowTransition, delay: 0.2 };

  const getClipPath = () => {
    if (isMobile) return "none";
    return showInscription
      ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(0 0, 100% 0, 90% 100%, 0 100%)";
  };

  const inputClass = "w-full bg-[#FFF7F4] border border-[#BD897D] p-3 rounded-xl outline-none text-sm focus:ring-1 focus:ring-[#FF843D] transition-all";
  const inputClassDesktop = "w-[85%] bg-[#FFF7F4] border border-[#BD897D] p-2 rounded-xl outline-none focus:ring-1 focus:ring-[#FF843D] transition-all";

  if (isMobile) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[#FDE9DC] relative">
        <div className="w-full relative" style={{ height: "45vh" }}>
          <motion.img key={index} initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} src={images[index]} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition" onClick={prevImage}>
              <FaChevronLeft size={18} />
            </div>
            <div className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition" onClick={nextImage}>
              <FaChevronRight size={18} />
            </div>
          </div>
        </div>

        <div className="w-full bg-[#FFF7F1] flex flex-col items-center pt-6 pb-10 px-6 shadow-2xl flex-1"
          style={{ borderRadius: "36px 36px 0 0", marginTop: "-32px", zIndex: 10, position: "relative", overflowY: "auto" }}>

          <div className="w-full flex flex-col items-center gap-3 mb-4">
            <div className="text-[#951418] font-bold cursor-pointer text-lg" onClick={() => setShowInscription(false)}>
              <span>P</span>Latigo
            </div>
            {showInscription && (
              <div className="flex bg-[#FFE2D3] rounded-full p-1 shadow-md">
                <button type="button" onClick={() => setRole("client")}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "client" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>
                  Client
                </button>
                <button type="button" onClick={() => setRole("restaurateur")}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "restaurateur" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>
                  Restaurateur
                </button>
              </div>
            )}
          </div>

          <p className="text-[#951418] text-3xl font-semibold mb-5 w-full text-center">
            {showInscription ? (role === "client" ? "Inscription Client" : "Inscription Restaurateur") : "Connexion"}
          </p>

          <div className="w-full flex flex-col gap-3 mb-3">
            {showInscription ? (
              role === "client" ? (
                <>
                  <input type="text" name="nom" placeholder="Nom" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="tel" name="telephone" placeholder="Numéro de tél." onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} autoComplete="off" className={inputClass} />
                </>
              ) : (
                <>
                  <input type="text" name="nomRestaurant" placeholder="Nom du Restaurant" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="text" name="adresseRestaurant" placeholder="Adresse du restaurant" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="email" name="email" placeholder="Email pro" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="tel" name="telephone" placeholder="Téléphone du restaurant" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <input type="text" name="numeroRegistre" placeholder="Numéro de Registre du commerce" onChange={handleChange} autoComplete="off" className={inputClass} />
                  <div className="w-full relative">
                    <input type="file" id="file-upload-mobile" onChange={handleFile} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                    <label htmlFor="file-upload-mobile" className="text-[#951418] block p-3 border border-[#BD897D] rounded-xl bg-[#FFF7F4] text-center cursor-pointer text-sm">
                      Télécharger document officiel
                    </label>
                  </div>
                </>
              )
            ) : (
              <>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" className={inputClass} />
                <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClass} />
              </>
            )}
          </div>

          {!showInscription && (
            <div className="w-full mb-5">
              <a href="#" className="text-xs text-gray-700">Mot de passe oublié ?</a>
            </div>
          )}

          {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

          <div className="flex w-full gap-3 mb-4">
            <button onClick={() => { setShowInscription(!showInscription); setError(""); setFormData({}); }}
              className="flex-1 bg-[#951418] p-2 rounded-xl text-white font-bold hover:bg-[#7a1012] transition duration-100 shadow-md text-sm">
              {showInscription ? "Annuler" : "Inscrire"}
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 bg-[#FF7031] p-2 rounded-xl text-white font-bold hover:bg-[#e65f25] transition duration-100 shadow-md text-sm">
              {loading ? "..." : showInscription ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          <footer className="text-[10px] text-gray-500 text-center">
            En continuant, vous acceptez nos{" "}
            <span className="text-[#8b2323] font-bold">condition d'utilisation</span>, et notre{" "}
            <span className="text-[#8b2323] font-bold">politique de confidentialité</span>.
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center font-sans relative bg-[#FDE9DC] overflow-hidden">

      <motion.div layout transition={delayedTransition}
        className={`absolute inset-y-0 w-[60%] z-0 ${showInscription ? "right-0" : "left-0"}`}
        style={{
          backgroundImage: `url(${images[index]})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          clipPath: showInscription ? "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
        }}
      />

      <motion.div layout transition={delayedTransition}
        className={`absolute inset-y-0 w-[35%] bg-[#FDE9DC] z-0 ${showInscription ? "left-0" : "right-0"}`}
      />

      <motion.div layout transition={slowTransition}
        className={`relative z-10 bg-[#FFF7F1] w-[950px] h-[580px] rounded-[45px] flex p-2 shadow-2xl ${showInscription ? "flex-row-reverse" : "flex-row"}`}>

        <motion.div layout transition={slowTransition} style={{ zIndex: 20 }} className="flex-[1.2] relative rounded-[40px] overflow-hidden">
          <motion.img key={index} initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            src={images[index]} alt="Hero" className="w-full h-full object-cover" style={{ clipPath: getClipPath() }} />
          <div className={`absolute bottom-8 flex gap-3 ${showInscription ? "left-12" : "right-12"}`}>
            <div className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition" onClick={prevImage}>
              <FaChevronLeft size={18} />
            </div>
            <div className="bg-[#ff7c48]/60 text-white w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-orange-600 shadow-md transition" onClick={nextImage}>
              <FaChevronRight size={18} />
            </div>
          </div>
        </motion.div>

        <motion.div layout transition={slowTransition} style={{ zIndex: 10 }} className="flex-1 p-8 flex flex-col items-center">

          <div className="w-full flex justify-between items-center mb-1">
            <div className="text-[#951418] font-bold ml-2 cursor-pointer" onClick={() => setShowInscription(false)}>
              <span>P</span>Latigo
            </div>
            {showInscription && (
              <div className="flex bg-[#FFE2D3] rounded-full p-1 shadow-md">
                <button type="button" onClick={() => setRole("client")}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "client" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>
                  Client
                </button>
                <button type="button" onClick={() => setRole("restaurateur")}
                  className={`px-4 py-1 text-sm font-medium rounded-full transition ${role === "restaurateur" ? "bg-[#FF7031] text-white" : "bg-transparent text-[#951418]"}`}>
                  Restaurateur
                </button>
              </div>
            )}
          </div>

          {showInscription ? (
            <h1 className="text-[#951418] text-4xl mb-2 font-semibold mt-0">
              {role === "client" ? "Client" : "Restaurateur"}
            </h1>
          ) : (
            <h1 className="text-[#951418] text-6xl mb-12 font-semibold mt-4">Welcome</h1>
          )}

          <div className="w-full flex flex-col items-center gap-4 mb-2">
            {showInscription ? (
              <div className="w-full flex flex-col items-center gap-2">
                {role === "client" ? (
                  <>
                    <input type="text" name="nom" placeholder="Nom" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="tel" name="telephone" placeholder="Numéro de tél." onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                  </>
                ) : (
                  <>
                    <input type="text" name="nomRestaurant" placeholder="Nom du Restaurant" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="text" name="adresseRestaurant" placeholder="Adresse du restaurant" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="email" name="email" placeholder="Email pro" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="tel" name="telephone" placeholder="Téléphone du restaurant" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <input type="text" name="numeroRegistre" placeholder="Numéro de Registre du commerce" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                    <div className="w-[85%] relative">
                      <input type="file" id="file-upload" onChange={handleFile} className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                      <label htmlFor="file-upload" className="text-[#951418] block p-2 border border-[#BD897D] rounded-xl bg-[#FFF7F4] text-center cursor-pointer">
                        Télécharger document officiel
                      </label>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
                <input type="password" name="motDePasse" placeholder="Mot de passe" onChange={handleChange} autoComplete="off" className={inputClassDesktop} />
              </>
            )}
          </div>

          {!showInscription && (
            <div className="w-[82%] mb-8">
              <a href="#" className="text-xs text-gray-700">Mot de passe oublié ?</a>
            </div>
          )}

          {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

          <div className="flex w-[88%] gap-6 mb-3 mt-1">
            <button onClick={() => { setShowInscription(!showInscription); setError(""); setFormData({}); }}
              className="flex-1 bg-[#951418] p-2 rounded-xl text-white font-bold hover:bg-[#7a1012] transition duration-100 shadow-md">
              {showInscription ? "Annuler" : "S'inscrire"}
            </button>
            <button onClick={handleSubmit} disabled={loading}
              className="flex-1 bg-[#FF7031] p-2 rounded-xl text-white font-bold hover:bg-[#e65f25] transition duration-100 shadow-md">
              {loading ? "Chargement..." : showInscription ? "S'inscrire" : "Se connecter"}
            </button>
          </div>

          <footer className="text-[10px] text-gray-500 text-center px-4">
            En continuant, vous acceptez nos{" "}
            <span className="text-[#8b2323] font-bold">condition d'utilisation</span>, et notre{" "}
            <span className="text-[#8b2323] font-bold">politique de confidentialité</span>.
          </footer>
        </motion.div>
      </motion.div>
    </div>
  );
}