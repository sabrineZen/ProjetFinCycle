import React, { useState } from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import ModalForm from "./components/ModalForm";
import Compte from "./components/Compte";
import OptionsPlats from "./components/OptionsPlats";
import RestaurantProfile from "./components/RestaurantProfile";
import RestaurantStatus from "./components/RestaurantStatus";
import RestaurantInfoForm from "./components/RestaurantInfoForm";
import DateAujourdhui from "./components/DateAujourdhui";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      {/* Header avec date et menu */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Contenu principal */}
      <div className="p-4">
        {/* Affiche la page en fonction de currentPage */}
        <Content currentPage={currentPage} openModal={() => setModalOpen(true)} />
      </div>

      {/* Exemple d'affichage direct de certains composants */}
      <div className="p-4">
        <Content currentPage={currentPage} openModal={() => setModalOpen(true)} />
      </div>

      {/* Modal global */}
      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;