import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/ClientPage/ClientHome.jsx';
import CategoriesPage from './pages/ClientPage/CategoriesPage.jsx';
import ProfilPage from './pages/ClientPage/ProfilPage.jsx'
import AllCategories from './pages/ClientPage/CategoriesAll.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/homeClient" element={<Home />} />
        {/*le route en bas avec l element categoriespage il va servir comme page des catégories */}
        {/*donc navigate je dis bon tu vas dans cette adresse et route verfiei dans cette adresse queceuqe il ya et il affiche le contenue */}
        <Route path="/categoriesPage" element={<CategoriesPage />} />
        {/*la page pour afficher toutes les categories */}
        <Route path="/CategoriesAll" element={<AllCategories />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/" element={
      <><div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6">
              <h1 className="text-6xl font-bold text-purple-600 drop-shadow-lg">
                Tailwind OK ✅
              </h1>
              <p className="text-xl text-gray-700">
                Si ce texte est stylé, Tailwind fonctionne !
              </p>
              <button className="px-8 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition duration-300 shadow-lg">
                Bouton Test
              </button>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-red-500 rounded-lg"></div>
                <div className="h-24 bg-blue-500 rounded-lg"></div>
                <div className="h-24 bg-yellow-400 rounded-lg"></div>
              </div>
            </div><div className="flex flex-col md:flex-row gap-4">
                <div className="bg-red-500 p-4 text-white">Box 1</div>
                <div className="bg-blue-500 p-4 text-white">Box 2</div>
              </div><div className="bg-test">
                Test Tailwind
              </div><div className="bg-red-500 text-white p-8 rounded-lg shadow-xl">
                Test Tailwind
              </div></>
        }/>
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
