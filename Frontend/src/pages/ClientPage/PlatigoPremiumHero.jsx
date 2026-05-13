import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../../assets/Design-logo .png';

// ===================== ICÔNES SVG INLINE =====================
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7"/>
    <path d="M7 7h10v10"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const FlameIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ===================== DONNÉES =====================
const foodImages = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
];

const menuItems = [
  { id: 1, name: "Lava Burger", desc: "Double steak, cheddar fondu, sauce lava épicée", price: "500", rating: 4.9, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop", tag: "Best Seller" },
  { id: 2, name: "Pizza Lava", desc: "Pâte fine, fromage coulant, pepperoni & piments", price: "320", rating: 4.8, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop", tag: "Nouveau" },
  { id: 3, name: "Pâtes Arrabiata", desc: "Sauce tomate piquante, basilic frais, parmesan", price: "600", rating: 4.7, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=300&fit=crop", tag: "Populaire" },
  { id: 4, name: "Tacos Lava", desc: "Tortilla maïs, poulet grillé, guacamole, salsa", price: "250", rating: 4.6, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop", tag: "" },
  { id: 5, name: "Salade César", desc: "Poulet rôti, croûtons, parmesan, sauce César", price: "400", rating: 4.5, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop", tag: "Léger" },
  { id: 6, name: "Donuts Lava", desc: "Donuts fourré chocolat chaud, glaçage orange", price: "150", rating: 4.9, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&h=300&fit=crop", tag: "Dessert" },
];

const stats = [
  { icon: <FlameIcon />, value: "50K+", label: "Commandes Livrées" },
  { icon: <StarIcon />, value: "4.9", label: "Note Moyenne reviews sur le site" },
  { icon: <TruckIcon />, value: "25min", label: "Livraison Moyenne" },
];

// Liens sociaux (remplace par tes vrais profils)
const socialLinks = {
  instagram: "https://www.instagram.com/platigo.dz",
  twitter: "https://x.com/PlatigoDz",
  telegram: "https://t.me/platigobot"
};

// ===================== COMPOSANT PRINCIPAL =====================
const PlatigoPremiumHero = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">

      {/* ===================== NAVBAR ===================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={logoImage} alt="Platigo Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">
                <span className="text-gray-900">PLATI</span>
                <span className="text-orange-500">GO</span>
              </span>
            </div>

            {/* Desktop: Social + Order */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-3">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-orange-50">
                  <InstagramIcon />
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-orange-50">
                  <TwitterIcon />
                </a>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 transition-colors p-2 rounded-full hover:bg-orange-50">
                  <SendIcon />
                </a>
              </div>
              <button 
                onClick={goToLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2 text-sm"
              >
                Order Now
                <ArrowUpRightIcon />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollTo('menu')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-orange-50 text-gray-700 font-medium transition-colors">
                Notre Menu
              </button>
              <button onClick={() => scrollTo('about')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-orange-50 text-gray-700 font-medium transition-colors">
                À Propos
              </button>
              <button onClick={() => scrollTo('contact')} className="w-full text-left py-3 px-4 rounded-xl hover:bg-orange-50 text-gray-700 font-medium transition-colors">
                Contact
              </button>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 p-2"><InstagramIcon /></a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 p-2"><TwitterIcon /></a>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-500 p-2"><SendIcon /></a>
              </div>
              <button 
                onClick={goToLogin}
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-full mt-2"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ===================== HERO SECTION ===================== */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-6">
                <FlameIcon />
                <span className="text-orange-600 text-sm font-semibold">le meilleur des plats</span>
                <ChevronRightIcon />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                La <span className="text-orange-500">Meilleure</span> Food
                <br />
                <span className="text-gray-900">Livrée Chez Vous</span>
              </h1>

              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                Découvrez nos plats préparés avec passion par les meilleurs chefs. 
                Livraison express en moins de 25 minutes, chaud et délicieux.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <button 
                  onClick={goToLogin}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/30 flex items-center gap-2 text-lg"
                >
                  Order Now
                  <ArrowUpRightIcon />
                </button>
                <button 
                  onClick={goToLogin}
                  className="border-2 border-gray-200 hover:border-orange-500 text-gray-700 hover:text-orange-500 font-semibold px-8 py-4 rounded-full transition-all duration-300 flex items-center gap-2"
                >
                  <ArrowUpRightIcon />
                  S'inscrire
                </button>
              </div>

              <div className="flex flex-wrap gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-bold text-xl text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Food Images Cascade */}
            <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] hidden md:block">
              <div className="absolute top-8 right-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={foodImages[0]} alt="Burger" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <PlayIcon />
                  </div>
                  <span className="text-xs font-semibold text-gray-800">Burger</span>
                </div>
              </div>

              <div className="absolute top-0 right-48 w-48 h-36 rounded-2xl overflow-hidden shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src={foodImages[1]} alt="Pizza" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="absolute top-48 right-56 w-44 h-56 rounded-2xl overflow-hidden shadow-xl transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <img src={foodImages[2]} alt="Tacos" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-2 left-2 bg-white/90 rounded-full px-2 py-1">
                  <span className="text-xs font-semibold text-orange-500">400 DA</span>
                </div>
              </div>

              <div className="absolute bottom-20 right-8 w-52 h-40 rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={foodImages[3]} alt="Grill" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 right-52 w-40 h-52 rounded-2xl overflow-hidden shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <img src={foodImages[4]} alt="Salade" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FEATURES BAR ===================== */}
      <section className="bg-orange-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center text-white group">
              <div className="mb-4 p-4 bg-orange-400/50 rounded-full transition-all group-hover:bg-white group-hover:text-orange-500">
                <TruckIcon className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-1">Livraison Gratuite</h3>
              <p className="text-orange-100 text-sm">Sur toutes vos commandes sans minimum</p>
            </div>

            <div className="flex flex-col items-center text-center text-white group">
              <div className="mb-4 p-4 bg-orange-400/50 rounded-full transition-all group-hover:bg-white group-hover:text-orange-500">
                <HeartIcon className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-1">Ingrédients Frais</h3>
              <p className="text-orange-100 text-sm">Sélectionnés chaque matin avec amour</p>
            </div>

            <div className="flex flex-col items-center text-center text-white group">
              <div className="mb-4 p-4 bg-orange-400/50 rounded-full transition-all group-hover:bg-white group-hover:text-orange-500">
                <StarIcon className="w-10 h-10" />
              </div>
              <h3 className="font-bold text-xl mb-1">Avis Clients</h3>
              <p className="text-orange-100 text-sm">4.8/5 basé sur plus de 2000 retours</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MENU SECTION ===================== */}
      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
              <FlameIcon className="w-4 h-4 text-orange-600" />
              <span className="text-orange-600 text-sm font-semibold">Notre Menu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Nos Plats <span className="text-orange-500">Populaires</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Découvrez notre sélection de plats préparés avec amour.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {item.tag && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {item.tag}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{item.desc}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-orange-500">
                      {item.price} <span className="text-lg">DA</span>
                    </div>
                    <button 
                      onClick={goToLogin}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full text-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 flex items-center gap-2"
                    >
                      Commander
                      <ChevronRightIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={goToLogin}
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold px-8 py-3 rounded-full transition-all duration-300 inline-flex items-center gap-2"
            >
              Voir Tout le Menu
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===================== ABOUT SECTION ===================== */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                    <img src={foodImages[5]} alt="Food" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                    <img src={foodImages[0]} alt="Burger" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                    <img src={foodImages[4]} alt="Salad" className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                    <img src={foodImages[3]} alt="Grill" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-4 border border-gray-100">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                  <FlameIcon />
                </div>
                <div>
                  <div className="font-bold text-gray-900">+50 000</div>
                  <div className="text-sm text-gray-500">Clients satisfaits</div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
                <FlameIcon />
                <span className="text-orange-600 text-sm font-semibold">À Propos de Nous</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                La Qualité Avant <span className="text-orange-500">Tout</span>
              </h2>
              <p className="text-gray-500 text-lg mb-6 leading-relaxed">
                Chez LavaFood, nous croyons que chaque repas doit être une expérience. 
                Nos chefs utilisent uniquement des ingrédients frais et locaux pour créer 
                des plats qui réveillent vos papilles.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Ingrédients 100% frais et locaux",
                  "Chefs expérimentés et passionnés",
                  "Emballages éco-responsables",
                  "Service client 24h/24 7j/7"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 flex-shrink-0">
                      <ChevronRightIcon />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={goToLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 inline-flex items-center gap-2"
              >
                Commander Maintenant
                <ArrowUpRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== CTA SECTION ===================== */}
      <section className="py-20 bg-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Faim ? Commandez Maintenant !
          </h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez une communauté de 50 000 passionnés. Vos mets favoris, confectionnés au cœur de l'excellence par l'élite de nos partenaires.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={goToLogin}
              className="bg-white text-orange-500 hover:bg-gray-100 font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-xl inline-flex items-center gap-2 text-lg"
            >
              Order Now
              <ArrowUpRightIcon />
            </button>
            <button 
              onClick={goToLogin}
              className="border-2 border-white/50 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center gap-2"
            >
              <SendIcon />
              S'inscrire
            </button>
          </div>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer id="contact" className="bg-[#8B2A1B] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg overflow-hidden">
                  <img src={logoImage} alt="Platigo Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold tracking-wider">
                  <span className="text-white">PLATI</span>
                  <span className="text-orange-400">GO</span>
                </span>
              </div>
              <p className="text-orange-100/80 text-sm mb-4 leading-relaxed">
                L'excellence culinaire à votre portée. Des produits frais, 
                confectionnés avec passion par nos meilleurs partenaires.
              </p>
              <div className="flex items-center gap-3">
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8B2A1B] transition-all">
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8B2A1B] transition-all">
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#8B2A1B] transition-all">
                  <SendIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Menu</h4>
              <ul className="space-y-3 text-orange-100/70 text-sm">
                <li><button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors">Burgers Gourmet</button></li>
                <li><button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors">Pizzas Artisanales</button></li>
                <li><button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors">Pâtes Fraîches</button></li>
                <li><button onClick={() => scrollTo('menu')} className="hover:text-white transition-colors">Desserts Maison</button></li>
              </ul>
            </div>

            {/* Entreprise */}
            <div>
              <h4 className="font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Entreprise</h4>
              <ul className="space-y-3 text-orange-100/70 text-sm">
                <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">À Propos</button></li>
                <li><a href="#" className="hover:text-white transition-colors">Nos Partenaires</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-6 text-white border-b border-white/20 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 text-orange-100/70 text-sm">
                <li className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>Algérie, Béjaïa</span>
                </li>
                <li className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-orange-400 shrink-0" />
                  <span>24h/24 7j/7</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-orange-400">@</span>
                  </div>
                  <a href="mailto:contact@platigo.dz" className="hover:text-white transition-colors">contact@platigo.dz</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-orange-100/50 text-xs">© 2026 PLATIGO. Tous droits réservés.</p>
            <div className="flex items-center gap-6 text-xs text-orange-100/50">
              <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-white transition-colors">Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlatigoPremiumHero;