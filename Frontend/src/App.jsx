import React, { useState } from 'react';
import Sidebar from './composants/navbar/Sidebar';
import Header from './composants/navbar/Header';
import Dashboard from './pages/Dashboard'; 
import MonRestaurant from './pages/MonRestaurant';
import MesPlats from './pages/MesPlats';
import Commandes from './pages/Commandes';
import MonCompte from './pages/MonCompte';

function App() {
  // 1. ÉTAT POUR LA NAVIGATION
  const [activePage, setActivePage] = useState('dashboard');
  const [restaurantActif, setRestaurantActif] = useState(true);

  // 2. ÉTAT POUR LE MENU BURGER (MOBILE/TABLETTE)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour obtenir le titre propre selon l'ID de la page
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
      {/* HEADER : On passe onMenuClick pour ouvrir le burger */}
      <Header 
        title={getTitle(activePage)} 
        onMenuClick={() => setIsMenuOpen(true)} 
      />

      <div className="flex flex-1">
        {/* SIDEBAR : On passe isOpen et setIsOpen pour la gestion mobile */}
        <Sidebar 
          currentPage={activePage} 
          setPage={setActivePage} 
          estActif={restaurantActif}
          isOpen={isMenuOpen}
          setIsOpen={setIsMenuOpen}
        />

        {/* CONTENU PRINCIPAL */}
        {/* Note: ml-0 sur mobile, ml-[340px] sur desktop pour laisser la place à la sidebar fixe */}
        <main className="flex-1 pt-24 lg:pt-32 lg:ml-[340px] px-4 md:px-10 pb-10 transition-all duration-300">
          
          {activePage === 'dashboard' && (
            <Dashboard estActif={restaurantActif} setEstActif={setRestaurantActif} />
          )}
          
          {activePage === 'restaurant' && (
            <MonRestaurant 
              estActif={restaurantActif} 
              setEstActif={setRestaurantActif} 
            />
          )}

          {activePage === "plats" && (
            <MesPlats />
          )}

          {activePage === "commandes" && (
            <Commandes />
          )}

          {activePage === "compte" && (
            <MonCompte />
          )}

        </main>
      </div>
    </div>
  );
}

export default App;