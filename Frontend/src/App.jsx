import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './composants/navbar/Sidebar';
import Header from './composants/navbar/Header';
import Dashboard from './pages/restaurateurpage/Dashboard.jsx'; 
import MonRestaurant from './pages/restaurateurpage/MonRestaurant.jsx';
import MesPlats from './pages/restaurateurpage/MesPlats.jsx';
import Commandes from './pages/restaurateurpage/Commandes.jsx';
import MonCompte from './pages/restaurateurpage/MonCompte.jsx';
import Login from "./pages/loginpage/Login";
import Home from './pages/ClientPage/ClientHome.jsx';
import CategoriesPage from './pages/ClientPage/CategoriesPage.jsx';
import ProfilPage from './pages/ClientPage/ProfilPage.jsx'
import AllCategories from './pages/ClientPage/CategoriesAll.jsx';
import './index.css';

// Ce composant contient la mise en page pour la partie Restaurateur
const RestaurateurLayout = () => {
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
        <main className="flex-1 pt-24 lg:pt-32 lg:ml-[340px] px-4 md:px-10 pb-10 transition-all duration-300">
          {activePage === 'dashboard' && <Dashboard estActif={restaurantActif} setEstActif={setRestaurantActif} />}
          {activePage === 'restaurant' && <MonRestaurant estActif={restaurantActif} setEstActif={setRestaurantActif} />}
          {activePage === "plats" && <MesPlats />}
          {activePage === "commandes" && <Commandes />}
          {activePage === "compte" && <MonCompte />}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes Client & Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homeClient" element={<Home />} />
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        <Route path="/CategoriesAll" element={<AllCategories />} />
        <Route path="/profil" element={<ProfilPage />} />
        
        {/* Route pour l'interface Restaurateur */}
        <Route path="/restaurateur" element={<RestaurateurLayout />} />

        {/* Route de Test */}
        <Route path="/test" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
            <h1 className="text-6xl font-bold text-purple-600">Tailwind OK ✅</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;