import React, { useState } from 'react';
import Sidebar from './components/navbar/Sidebar';
import Header from './components/navbar/Header';
// Importe ton composant Dashboard ici
import Dashboard from './components/pages/Dashboard'; 
import MonRestaurant from './components/pages/MonRestaurant';
import MesPlats from './components/pages/MesPlats';
import Commandes from './components/pages/Commandes';
import MonCompte from './components/pages/MonCompte';

function App() {
  // L'état qui mémorise la page active
  const [activePage, setActivePage] = useState('dashboard');
  const [restaurantActif, setRestaurantActif] = useState(true);
  return (
    <div className="min-h-screen bg-[#FFF8F3] flex">
      {/* 1. La Sidebar (On lui passe activePage et setPage) */}
      <Sidebar currentPage={activePage} setPage={setActivePage} estActif={restaurantActif} />

      <div className="flex-1 flex flex-col">
        {/* 2. Le Header (Il affiche le titre de la page active) */}
        <Header title={activePage === 'dashboard' ? 'Tableau de bord' : activePage} />

        {/* 3. La Zone de Contenu */}
        <main className="pt-32 pl-[380px] pr-10 pb-10">
          
          {/* SI activePage est 'dashboard', on affiche le Dashboard */}
          {activePage === 'dashboard' && <Dashboard estActif={restaurantActif} setEstActif={setRestaurantActif} />}
          
          {activePage === 'restaurant' && (
            <MonRestaurant 
              estActif={restaurantActif} 
              setEstActif={setRestaurantActif} 
            />
          )}

          {/* AJOUTE CECI : Si la page active est plats */}
            {activePage === "plats" && (
              <MesPlats />
            )}

            {/* 2. Ajout du rendu pour la page Commandes */}
          {activePage === "commandes" && (
            <Commandes />
          )}

          {/* 2. Ajout du rendu pour la page Mon Compte */}
            {activePage === "compte" && (
              <MonCompte />
            )}

        </main>
      </div>
    </div>
  );
}

export default App;