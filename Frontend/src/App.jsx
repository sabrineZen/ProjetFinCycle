import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from './composants/navbar/Sidebar';
import Header from './composants/navbar/Header';

import Dashboard from './pages/restaurateurpage/Dashboard'; 
import MonRestaurant from './pages/restaurateurpage/MonRestaurant';
import MesPlats from './pages/restaurateurpage/MesPlats';
import Commandes from './pages/restaurateurpage/Commandes';
import MonCompte from './pages/restaurateurpage/Parametres';

import './index.css';

function RestaurateurLayout() {
  const [activePage, setActivePage] = useState('dashboard');
  const [restaurantActif, setRestaurantActif] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getTitle = (id) => {
    switch(id) {
      case 'dashboard': return 'Tableau de bord';
      case 'restaurant': return 'Mon restaurant';
      case 'plats': return 'Mes plats';
      case 'commandes': return 'Commandes';
      case 'compte': return 'Mon compte';
      default: return 'RestoPro';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col">
      <Header 
        title={getTitle(activePage)} 
        onMenuClick={() => setIsMenuOpen(true)} 
      />
      <div className="flex flex-1">
        <Sidebar 
          currentPage={activePage} 
          setPage={setActivePage} 
          estActif={restaurantActif}
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />
        <main className="flex-1 pt-24 lg:pt-32 lg:ml-85 px-4 md:px-10 pb-10 transition-all duration-300">
          {activePage === 'dashboard' && (
            <Dashboard estActif={restaurantActif} setEstActif={setRestaurantActif} />
          )}
          {activePage === 'restaurant' && (
            <MonRestaurant estActif={restaurantActif} setEstActif={setRestaurantActif} />
          )}
          {activePage === "plats" && <MesPlats />}
          {activePage === "commandes" && <Commandes />}
          {activePage === "compte" && <MonCompte />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Interface restaurateur */}
        <Route path="/" element={<RestaurateurLayout />} />
        <Route path="/restaurateur" element={<RestaurateurLayout />} />

        {/* Test Tailwind */}
        <Route path="/test" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
            <h1 className="text-6xl font-bold text-purple-600">Tailwind OK ✅</h1>
            <button className="px-8 py-4 bg-green-500 text-white rounded-xl">Bouton Test</button>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;