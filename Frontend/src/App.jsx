import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// Navbar & Layout Components
import Sidebar from './composants/navbar/Sidebar';
import Header from './composants/navbar/Header';

// --- PAGES ---
import Login from "./pages/loginpage/Login";
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
import ProtectedRoute from './composants/protectedRoutes.jsx';
// --- LAYOUTS ---
const RestaurateurLayout = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [restaurantActif, setRestaurantActif] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //ajoute recemment pour les stats

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
      <Header title={getTitle(activePage)} onMenuClick={() => setIsMenuOpen(true)} />
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
 // ─── 1. ÉTAT GLOBAL DU PANIER ───
  const [panier, setPanier] = useState(() => {
    // On récupère le panier sauvegardé au démarrage
    const localData = localStorage.getItem("platigo_cart");
    return localData ? JSON.parse(localData) : [];
  });

  // ─── 2. PERSISTANCE (LocalStorage) ───
  useEffect(() => {
    localStorage.setItem("platigo_cart", JSON.stringify(panier));
  }, [panier]);

  // ─── 3. LOGIQUE D'AJOUT (Gère les doublons avec quantité) ───
  const ajouterAuPanier = (plat) => {
    const role = localStorage.getItem('role');
    if (role === 'restaurateur') {
      alert("Action interdite : un restaurateur ne peut pas ajouter de plat au panier client.");
      return;
    }

    setPanier((prev) => {
      const existe = prev.find((item) => item.id === plat.id);
      if (existe) {
        return prev.map((item) =>
          item.id === plat.id ? { ...item, quantite: (item.quantite || 1) + 1 } : item
        );
      }
      return [...prev, { ...plat, quantite: 1 }];
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlatigoPremiumHero />} />

        {/* --- AUTH --- */}
        
        <Route path="/login" element={
          
            <Login />
            } />

        {/* --- CLIENT (Passage des données du panier) --- */}
        <Route 
          path="/homeClient" 
          element= { <ProtectedRoute allowedRoles={['client']} >
            <Home panier={panier} setPanier={setPanier} ajouterAuPanier={ajouterAuPanier} />
          </ProtectedRoute> } 
        />
        <Route 
          path="/categoriesPage" 
          element={<ProtectedRoute allowedRoles={['client']} >
            <CategoriesPage panier={panier} setPanier={setPanier} ajouterAuPanier={ajouterAuPanier} />
          </ProtectedRoute>} 
        />
        {/* Autres pages Client */}
        <Route path="/categoriesAll" element={ <ProtectedRoute allowedRoles={['client']} >
          <AllCategories />
        </ProtectedRoute> } />
        <Route path="/profil" element={ <ProtectedRoute allowedRoles={['client']} >
          <ProfilPage />
        </ProtectedRoute> } />
        <Route path="/hero" element={<PlatigoPremiumHero />} />

        {/* --- RESTAURATEUR --- */}
        <Route path="/restaurateur" element={<ProtectedRoute allowedRoles={['restaurateur']} >
          <RestaurateurLayout />
        </ProtectedRoute>} />

        {/* --- ADMIN --- */}
          <Route path="/admin/dashboard" element={ <ProtectedRoute allowedRoles={['admin']} >
              <AdminDashboard />
          </ProtectedRoute> } />
          <Route path="/admin/validation" element={ <ProtectedRoute allowedRoles={['admin']} >
            <ValidationPage />
          </ProtectedRoute> } />
          <Route path="/admin/utilisateurs" element={ <ProtectedRoute allowedRoles={['admin']} >
            <UtilisateursPage />
          </ProtectedRoute> } />
          <Route path="/admin/restaurants" element={ <ProtectedRoute allowedRoles={['admin']} >
            <RestaurantsPage />
          </ProtectedRoute> } />
          <Route path="/admin/plats" element={ <ProtectedRoute allowedRoles={['admin']} >
            <PlatsPage />
          </ProtectedRoute> } />
          <Route path="/admin/categories" element={ <ProtectedRoute allowedRoles={['admin']} >
            <CategoriesAdminPage />
          </ProtectedRoute> } />
          <Route path="admin/statistiques" element={ <ProtectedRoute allowedRoles={['admin']} >
            <StatistiquesPage />
          </ProtectedRoute> } />

        {/* --- REDIRECTIONS --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;