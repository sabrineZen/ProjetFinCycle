import React from "react";
// INDICE : Importez Search, ShoppingBag, Menu, ArrowRight de 'lucide-react'

const PlatigoPremiumHero = () => {
  return (
    <div className="min-h-screen bg-[#0b0b0c] text-white font-sans relative overflow-hidden selection:bg-[#ff8a00]">
      
      {/* --- BACKGROUND LAYER : EFFETS DE LUMIÈRE --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[5%] right-[0%] w-[600px] h-[600px] bg-red-600/10 blur-[150px] rounded-full" />
      
      {/* --- NAVBAR : ÉLÉGANTE ET DISCRÈTE --- */}
      <header className="relative z-50 flex justify-between items-center px-[6%] py-8">
        <div className="text-2xl font-black tracking-tighter uppercase italic">
          Burger<span className="text-[#ff8a00]">.</span>
        </div>

        <nav className="hidden lg:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
          <a href="#" className="text-white hover:text-[#ff8a00] transition-all">Home</a>
          <a href="#" className="hover:text-white transition-all">About us</a>
          <a href="#" className="hover:text-white transition-all">Menu</a>
          <a href="#" className="hover:text-white transition-all">Contact us</a>
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex gap-4 pr-4 border-r border-white/10">
             {/* INDICE : Icônes Search et ShoppingBag ici */}
          </div>
          <button className="bg-[#ff8a00] text-white px-7 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#ffb800] transition-all shadow-[0_10px_20px_rgba(255,138,0,0.2)]">
            Sign up
          </button>
        </div>
      </header>

      {/* --- MAIN HERO --- */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center px-[8%] pt-4 min-h-[80vh]">
        
        {/* TEXTE : TYPOGRAPHIE MASSIVE */}
        <div className="flex-1 space-y-8 lg:pr-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#ffb800]/10 border border-[#ffb800]/20 text-[#ffb800] text-[10px] font-bold uppercase tracking-widest">
            Affordable and very filling
          </div>

          <h1 className="text-6xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tighter uppercase">
            Hot, fresh <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">🍔</span> <br />
            burgers made <br />
            <span className="text-[#ff8a00]">for any time <br /> cravings</span>
          </h1>

          <p className="text-gray-400 max-w-md text-base leading-relaxed font-medium">
            Découvrez l'excellence culinaire de **PLATIGO**. Nos burgers sont grillés à la perfection, offrant une explosion de saveurs à chaque bouchée.
          </p>

          <div className="flex items-center gap-6 pt-4">
            <button className="group bg-[#ff8a00] text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center gap-3 hover:bg-[#ffb800] transition-all shadow-2xl shadow-[#ff8a00]/30">
              Order now
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
            
            <button className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
              See our menu
              <div className="w-5 h-[2px] bg-white flex flex-col gap-1.5 overflow-visible">
                 <div className="w-full h-full bg-white"></div>
                 <div className="w-2/3 h-full bg-white"></div>
              </div>
            </button>
          </div>

          {/* BADGE SERVICE LIVRAISON */}
          <div className="flex items-center gap-5 pt-8 opacity-80">
             <div className="relative">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl border border-white/10">
                   🚚
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0b0b0c]"></div>
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight text-gray-500">
                We offer 24 hour <br /> <span className="text-white">delivery service</span>
             </p>
          </div>
        </div>

        {/* VISUEL : COMPOSITION DYNAMIQUE */}
        <div className="flex-1 relative w-full h-[600px] lg:h-auto mt-20 lg:mt-0">
          
          {/* ÉLÉMENTS ORGANIQUES FLOTTANTS */}
          <div className="absolute top-0 right-[20%] text-6xl animate-bounce duration-[3000ms] z-30">🌶️</div>
          <div className="absolute bottom-[20%] left-0 text-5xl rotate-[-20deg] z-30 drop-shadow-2xl">🍅</div>
          <div className="absolute top-1/2 right-0 text-4xl opacity-40 blur-[1px] -rotate-12">🍃</div>

          {/* CENTRE : BURGERS EMPILES */}
          <div className="relative z-20 flex flex-col items-center justify-center transform lg:scale-110">
            {/* INDICE : C'est ici que vous placez vos 3 images PNG de burgers superposées */}
            <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              {/* Effet de Halo derrière le produit */}
              <div className="absolute w-[80%] h-[80%] bg-[#ff8a00]/20 rounded-full blur-[80px]" />
              
              <div className="text-center italic text-gray-700 text-xs uppercase tracking-tighter">
                [ Placez vos 3 Burgers PNG ici ] <br />
                [ Superposez-les avec position: absolute ]
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER : SIGNATURE SEDDOUK */}
      <footer className="absolute bottom-6 left-[6%] right-[6%] flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 border-t border-white/5 pt-6">
        <div>PLATIGO © 2026</div>
        <div className="flex gap-6">
           <span className="hover:text-[#ff8a00] cursor-pointer">Instagram</span>
           <span className="hover:text-[#ff8a00] cursor-pointer">Dribbble</span>
        </div>
      </footer>
    </div>
  );
};

export default PlatigoPremiumHero;