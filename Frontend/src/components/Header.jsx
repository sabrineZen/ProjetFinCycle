import React, { useState } from "react";
import DateAujourdhui from "./DateAujourdhui";
import Content from "./Content";
import ModalForm from "./ModalForm";

function Header() {
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
      {/* HEADER */}
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center gap-2">
          <img src="img4.jpg" alt="logo" className="w-10 h-10 rounded-full" />
          <span className="text-xl font-bold text-orange-500">DALIZIO</span>
        </div>

        <div className="text-center">
          <DateAujourdhui />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-6 h-6 bg-gray-200 rounded-full"></div> {/* notification icon */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div> {/* profile image */}
            <span className="font-medium text-gray-700">Ghanou Yns</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="flex items-center justify-between p-4 bg-gray-50 shadow-inner">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
          <span className="font-medium text-gray-700">Restaurant actif</span>
        </div>

        <ul className="flex gap-6">
          {menuItems.map((item) => (
            <li
              key={item.page}
              className={`cursor-pointer font-medium text-gray-700 hover:text-orange-500 ${
                currentPage === item.page ? "text-orange-500 border-b-2 border-orange-500" : ""
              }`}
              onClick={() => setCurrentPage(item.page)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>

      {/* CONTENU PRINCIPAL */}
      <main className="p-4">
        <Content currentPage={currentPage} openModal={() => setModalOpen(true)} />
      </main>

      {/* MODAL */}
      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default Header;