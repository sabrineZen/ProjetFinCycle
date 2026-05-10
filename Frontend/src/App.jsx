import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Navbar & Layout Components
import Sidebar from './composants/navbar/Sidebar';
import Header from './composants/navbar/Header';

// --- PAGES ---
// Auth
import Login from "./pages/loginpage/Login";

// Client (Tes pages ajoutées)
import Home from './pages/ClientPage/ClientHome.jsx';
import CategoriesPage from './pages/ClientPage/CategoriesPage.jsx';
import ProfilPage from './pages/ClientPage/ProfilPage.jsx';
import AllCategories from './pages/ClientPage/CategoriesAll.jsx';
import PlatigoPremiumHero from './pages/ClientPage/PlatigoPremiumHero';

// Restaurateur
import Dashboard from './pages/restaurateurpage/Dashboard.jsx'; 
import MonRestaurant from './pages/restaurateurpage/MonRestaurant.jsx';
import MesPlats from './pages/restaurateurpage/MesPlats.jsx';
import Commandes from './pages/restaurateurpage/Commandes.jsx';
import Parametre from './pages/restaurateurpage/Parametre.jsx';

// Admin
import AdminDashboard from './pages/AdminPage/AdminDashboard.jsx';
import ValidationPage from './pages/AdminPage/ValidationPage.jsx';
import UtilisateursPage from './pages/AdminPage/UtilisateursPage.jsx';
import RestaurantsPage from './pages/AdminPage/RestaurantsPage.jsx';
import PlatsPage from './pages/AdminPage/PlatsPage.jsx';
import CategoriesAdminPage from './pages/AdminPage/CategoriesAdminPage.jsx';
import StatistiquesPage from './pages/AdminPage/StatistiquesPage.jsx';

import './index.css';

// --- LAYOUTS ---

/**
 * Layout pour l'interface Restaurateur
 * Gère l'état de la navigation interne (Sidebar)
 */
const RestaurateurLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [restaurantActif, setRestaurantActif] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getTitle = (id) => {
    const titles = {
      'dashboard': 'Tableau de bord',
      'restaurant': 'Mon restaurant',
      'plats': 'Mes plats',
      'commandes': 'Commandes',
      'Parametre': 'Paramètres'
    };
    return titles[id] || 'RestoPro';
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
        <main className="flex-1 pt-24 lg:pt-32 lg:ml-85 px-4 md:px-10 pb-10">
          {activePage === 'dashboard' && <Dashboard estActif={restaurantActif} setEstActif={setRestaurantActif} />}
          {activePage === 'restaurant' && <MonRestaurant estActif={restaurantActif} setEstActif={setRestaurantActif} />}
          {activePage === "plats" && <MesPlats />}
          {activePage === "commandes" && <Commandes />}
          {activePage === "Parametre" && <Parametre />}
        </main>
      </div>
    </div>
  );
};

// --- APP PRINCIPALE ---

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- AUTH --- */}
        <Route path="/login" element={<Login />} />

        {/* --- CLIENT --- */}
        <Route path="/homeClient" element={<Home />} />
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        <Route path="/CategoriesAll" element={<AllCategories />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/hero" element={<PlatigoPremiumHero />} />

        {/* --- RESTAURATEUR --- */}
        <Route path="/restaurateur" element={<RestaurateurLayout />} />

        {/* --- ADMIN --- */}
        <Route path="/admin">
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="validation" element={<ValidationPage />} />
          <Route path="utilisateurs" element={<UtilisateursPage />} />
          <Route path="restaurants" element={<RestaurantsPage />} />
          <Route path="plats" element={<PlatsPage />} />
          <Route path="categories" element={<CategoriesAdminPage />} />
          <Route path="statistiques" element={<StatistiquesPage />} />
        </Route>

        {/* --- GESTION DES ERREURS & REDIRECTIONS --- */}
        {/* Si l'utilisateur arrive sur "/", on le redirige vers le login ou le home */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Redirection pour toute URL inconnue */}
        <Route path="*" element={<Navigate to="/homeClient" replace />} />

        {/* Route de test (optionnel) */}
        <Route path="/test-tailwind" element={
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-green-500">Tailwind OK ✅</h1>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;