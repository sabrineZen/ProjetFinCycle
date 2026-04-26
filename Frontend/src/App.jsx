import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/loginpage/Login";

import './index.css';
import Home from './pages/ClientPage/ClientHome.jsx';
import CategoriesPage from './pages/ClientPage/CategoriesPage.jsx';
import ProfilPage from './pages/ClientPage/ProfilPage.jsx'
import AllCategories from './pages/ClientPage/CategoriesAll.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        {/* Route principale : affiche le Login */}
        <Route path="/" element={<Login />} />
        
        {/* Route secondaire : affiche aussi le Login si on tape /login */}
        <Route path="/login" element={<Login />} />
        
        {/* Autres pages */}
        <Route path="/homeClient" element={<Home />} />
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        <Route path="/CategoriesAll" element={<AllCategories />} />
        <Route path="/profil" element={<ProfilPage />} />
        
        {/* On met le test Tailwind sur une route séparée pour qu'il ne gêne pas */}
        <Route path="/test" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
            <h1 className="text-6xl font-bold text-purple-600">Tailwind OK ✅</h1>
            <button className="px-8 py-4 bg-green-500 text-white rounded-xl">Bouton Test</button>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;