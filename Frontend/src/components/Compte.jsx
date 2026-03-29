import React, { useState } from "react";
import "./style.css";

function Compte() {
  const [activeTab, setActiveTab] = useState("Profil");

  const renderContent = () => {
    switch (activeTab) {
      case "Profil":
        return (
          <>
            <div className="infos-pers">
              <p className="info-personnelles">informations personnelles</p>

              <form className="form-2">
                <div className="rows">
                  <div className="ligne-1">
                    <label className="l">Prénom</label><br />
                    <input type="text" className="inputz" /><br />

                    <label className="l">Telephone</label><br />
                    <input type="tel" className="inputz" /><br />

                    <label className="l">Ville</label><br />
                    <input type="text" className="inputz" /><br />
                  </div>

                  <div className="ligne-2">
                    <label className="l">Nom</label><br />
                    <input type="text" className="inputz" /><br />

                    <label className="l">Email</label><br />
                    <input type="email" className="inputz" /><br />

                    <label className="l">RIB bancaire</label><br />
                    <input type="text" className="inputz" />
                  </div>
                </div>
              </form>
            </div>

            <button className="sauv-2">sauvegarder</button>
          </>
        );

      case "Sécurité":
        return (
          <>
            <div className="change-mpd">
              <p className="chng-mdp">Changer le mot de passe</p>

              <form className="form-3">
                <label>Mot de passe</label><br />
                <input type="text" className="inpt" /><br />

                <label>Nouveau mot de passe</label><br />
                <input type="password" className="inpt" /><br />

                <label>Confirmer le nouveau mot de passe</label><br />
                <input type="password" className="inpt" />
              </form>
            </div>

            <div className="auth">
              <div className="auth-adf">
                <p className="title-auth">Authentification à deux facteurs</p>
                <p className="description-auth">
                  Ajouter une couche de sécurité supplémentaire à votre compte
                </p>
              </div>

              <button className="actv">active</button>
            </div>

            <button className="sauv-prf">sauvegarder les préférences</button>
          </>
        );

      case "Notification":
        return <p>Notifications</p>;

      case "Abonnement":
        return <h2>Abonnement</h2>;

      default:
        return null;
    }
  };

  return (
    <div className="compte-page">
      {/* PROFIL */}
      <div className="profil-2">
        <div className="img-2">
          <div className="ph-2"></div>
          <div className="add-2"></div>
        </div>

        <p className="nom-profil-2">Ghanou yns</p>
        <p className="email-profil-2">younsighanou43@gmail.com</p>

        <div className="compte-v">Compte verifié</div>

        <div className="part">
          <div className="part1">
            <p className="nbr-restaurant">1</p>
            <span className="rest">restaurant</span>
          </div>

          <div className="part2">
            <p className="nbr-commande">154</p>
            <span className="cmd">commandes</span>
          </div>
        </div>
      </div>

      {/* MENU */}
      <div className="menu-2">
        <ul>
          {["Profil", "Sécurité", "Notification", "Abonnement"].map(item => (
            <li
              key={item}
              className={`item-2 ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* CONTENU DYNAMIQUE */}
      <div id="content-2">
        {renderContent()}
      </div>
    </div>
  );
}

export default Compte;