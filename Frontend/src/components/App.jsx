import React, { useState } from "react";
import './style.css';
import DateAujourdhui from "./Date";
import Content from "./Content";
import OptionsPlats from "./OptionsPlats";
import ModalForm from "./ModalForm";
function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const menuItems = [
    { name: "Tableau de bord", page: "dashboard" },
    { name: "Mon restaurant", page: "restaurant" },
    { name: "Mes plats", page: "plats" },
    { name: "Commandes", page: "commandes" },
    { name: "Mon compte", page: "compte" },
    { name: "Déconnexion", page: "deconnection" },
  ];
  return (
      <>
        <header className="header">
          <div className="logo">
            <img src="img4.jpg" className="ph" />
            <span className="nom-site">DALIZIO</span>
          </div>
          <div className="center">
            <p className="nom-page" />
            <DateAujourdhui />
          </div>
          <div className="part-droit">
            <div className="notification" />
            <div className="comp">
              <span className="img-comp" />
              <span className="nom-comp" />
            </div>
          </div>
        </header>
        <nav className="nav">
          <div className="status-box">
            <span className="led" />
            <span className="text">Restaurant actif</span>
          </div>
          <div className="menu">
            <ul>
              {menuItems.map(item => (
                <li
                  key={item.page}
                  className={`item ${currentPage === item.page ? "active" : ""}`}
                  onClick={() => setCurrentPage(item.page)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div id="content">
          <Content
            currentPage={currentPage}
            openModal={() => setModalOpen(true)}
          />
        </div>

        <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;