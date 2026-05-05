import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/ClientPage/ClientHome'; 
import CategoriesPage from './pages/ClientPage/CategoriesPage';
import ProfilPage from './pages/ClientPage/ProfilPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        
        {/* Redirection automatique vers /home si l'URL est vide ou fausse */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;