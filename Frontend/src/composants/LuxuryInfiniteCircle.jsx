import React, { useState, useRef, useEffect, useCallback } from 'react';

const HorizontalWheelScroller = ({ data, renderItem, navigate, itemWidth }) => {
  const [scrollX, setScrollX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const lastScrollX = useRef(0);
  const vel = useRef(0);
  const lastDX = useRef(0);
  const lastTime = useRef(0);
  const rafRef = useRef(null);
  const scrollXRef = useRef(0);

 // --- RÉINITIALISATION SUR RECHERCHE ---
useEffect(() => {
  // Quand les données changent (recherche), on revient à la première carte
  scrollXRef.current = 0;
  setScrollX(0);
  setActiveIndex(0);
  vel.current = 0; // On arrête tout mouvement en cours
  
  // On annule l'animation en cours pour éviter les sauts
  if (rafRef.current) {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }
}, [data]); // S'exécute chaque fois que 'data' (le résultat de la recherche) change

  // Adaptabilité des dimensions
  const ITEM_W = itemWidth || (isMobile ? 240 : 280);
  const RADIUS = isMobile ? 480 : 700;

  const getNearestIndex = useCallback((sx = scrollXRef.current) => {
    return Math.max(0, Math.min(Math.round(-sx / ITEM_W), data.length - 1));
  }, [ITEM_W, data.length]);

  const px = (e) => e.touches ? e.touches[0].pageX : e.pageX;

  const animate = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      if (!isDragging.current) {
        vel.current *= 0.86;
        scrollXRef.current += vel.current;

        const snap = -getNearestIndex() * ITEM_W;
        const dist = snap - scrollXRef.current;

        if (Math.abs(vel.current) < 0.4 && Math.abs(dist) > 1) {
          scrollXRef.current += dist * 0.12;
        }
        if (Math.abs(vel.current) < 0.05 && Math.abs(dist) < 0.5) {
          scrollXRef.current = snap;
          setScrollX(snap);
          setActiveIndex(getNearestIndex());
          rafRef.current = null;
          return;
        }
      }
      setScrollX(scrollXRef.current);
      setActiveIndex(getNearestIndex());
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [ITEM_W, getNearestIndex]);

  const snapTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, data.length - 1));
    vel.current = 0;
    scrollXRef.current = -clamped * ITEM_W;
    setScrollX(-clamped * ITEM_W);
    setActiveIndex(clamped);
    if (!rafRef.current) animate();
  }, [data.length, ITEM_W, animate]);

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = px(e);
    lastX.current = px(e);
    lastScrollX.current = scrollXRef.current;
    vel.current = 0;
    lastTime.current = Date.now();
    lastDX.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleMove = useCallback((e) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const currentX = px(e);
    const dx = currentX - lastX.current;
    lastDX.current = dx / ((now - lastTime.current) || 1) * 16;
    lastTime.current = now;
    lastX.current = currentX;
    
    const newX = lastScrollX.current + (currentX - startX.current) * 1.05;
    scrollXRef.current = newX;
    setScrollX(newX);
    setActiveIndex(getNearestIndex(newX));
  }, [getNearestIndex]);

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    vel.current = lastDX.current * 2.5;
    animate();
  }, [animate]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
    };
  }, [handleMove, handleEnd]);

  return (
    <div className="relative w-full h-[550px] flex items-center justify-center overflow-hidden group/main select-none">
      
      {/* Flèches stylisées Orange au Hover */}
      <button onClick={() => snapTo(activeIndex - 1)} className="absolute left-6 z-[250] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#FF4500] text-white rounded-full border border-white/20 backdrop-blur-md opacity-0 group-hover/main:opacity-100 transition-all duration-300 text-2xl shadow-xl active:scale-90">‹</button>
      <button onClick={() => snapTo(activeIndex + 1)} className="absolute right-6 z-[250] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#FF4500] text-white rounded-full border border-white/20 backdrop-blur-md opacity-0 group-hover/main:opacity-100 transition-all duration-300 text-2xl shadow-xl active:scale-90">›</button>

      <div 
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: '1400px' }}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {data.map((item, i) => {
          const offset = i * ITEM_W + scrollX;
          const angle = offset / RADIUS;
          const opacityRaw = Math.cos(angle);
          if (opacityRaw < 0.15) return null;

          const tx = RADIUS * Math.sin(angle);
          const tz = RADIUS * (Math.cos(angle) - 1);
          const rotY = angle * (180 / Math.PI);
          const scale = 0.82 + 0.18 * opacityRaw;
          const isCenter = Math.abs(angle) < 0.22;

          return (
            <div
              key={item.id || i}
              className="absolute"
              style={{
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: opacityRaw,
                zIndex: Math.round(opacityRaw * 100),
                willChange: 'transform',
              }}
            >
               {/* Ici on appelle la fonction renderItem passée en paramètre */}
               {renderItem(item, isCenter)}
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 flex gap-2">
        {data.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#FF4500]' : 'w-2 bg-gray-300'}`} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalWheelScroller;