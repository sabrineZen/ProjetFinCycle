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
      <header className="bg-[#fff4ec] h-[92px] w-full absolute top-0 left-0 z-10 rounded-xl flex items-center justify-between px-4">
        
        {/* LOGO */}
        <div className="flex items-center w-[200px]">
          <img src="img4.jpg" className="w-[80px] h-[80px] ml-2 rounded-xl" />
          <span className="text-[#951418] ml-2 text-xl font-semibold">
            DALIZIO
          </span>
        </div>

        {/* CENTER */}
        <div className="absolute left-[650px] top-[5px] w-[300px] h-[80px] flex flex-col justify-center">
          <p className="text-[#951418] text-xl"></p>
          <DateAujourdhui />
        </div>

        {/* RIGHT */}
        <div className="absolute right-0 top-[38px] w-[300px] h-[80px] flex items-center">
          
          <div className="bg-[#ff7d31] w-[50px] h-[50px] rounded-full absolute -top-[15px] -left-[60px]"></div>

          <div className="relative flex items-center">
            <span className="bg-[#ff7d31] w-[50px] h-[50px] rounded-full absolute -top-[15px]"></span>
            <span className="text-[#951418] text-xl ml-[70px]">
              Nom Compte
            </span>
          </div>
        </div>
      </header>

      {/* NAV */}
      <nav className="relative top-[100px] left-[20px]">
        
        {/* STATUS */}
        <div className="flex items-center justify-center gap-5 bg-[#d4f5df] w-[212px] h-[62px] rounded-[25px] text-[#2e7d32] mb-5">
          <span className="w-[10px] h-[10px] bg-[#2ecc71] rounded-full shadow-[0_0_8px_#2ecc71]"></span>
          <span>Restaurant actif</span>
        </div>

        {/* MENU */}
        <div className="bg-white w-[246px] rounded-xl p-5">
          <ul className="p-0">
            {menuItems.map((item) => (
              <li
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`cursor-pointer p-2 rounded-md transition ${
                  currentPage === item.page
                    ? "bg-[#ff7d31] text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="absolute top-[100px] left-[300px]">
        <Content
          currentPage={currentPage}
          openModal={() => setModalOpen(true)}
        />
      </div>

      {/* MODAL */}
      <ModalForm
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}

export default Header;