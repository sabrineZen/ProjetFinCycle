import React, { useState, useRef, useEffect, useCallback } from 'react';

const LuxuryInfiniteCircle = ({ data, renderItem, itemWidth }) => {
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- CONFIGURATION INFINIE ---
  const ITEM_W = itemWidth || (isMobile ? 240 : 300);
  const RADIUS = isMobile ? 450 : 750; 
  const TOTAL_WIDTH = data.length * ITEM_W;

  // Calcul de l'index actif avec modulo pour l'infini
  const getWrappedIndex = useCallback((sx) => {
    const wrappedX = ((-sx % TOTAL_WIDTH) + TOTAL_WIDTH) % TOTAL_WIDTH;
    return Math.round(wrappedX / ITEM_W) % data.length;
  }, [ITEM_W, TOTAL_WIDTH, data.length]);

  const px = (e) => (e.touches ? e.touches[0].pageX : e.pageX);

  const animate = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const loop = () => {
      if (!isDragging.current) {
        vel.current *= 0.92; // Friction plus douce
        scrollXRef.current += vel.current;

        // Aimantation (Snap)
        const snap = Math.round(scrollXRef.current / ITEM_W) * ITEM_W;
        const dist = snap - scrollXRef.current;

        if (Math.abs(vel.current) < 0.5 && Math.abs(dist) > 1) {
          scrollXRef.current += dist * 0.1;
        }
      }

      setScrollX(scrollXRef.current);
      setActiveIndex(getWrappedIndex(scrollXRef.current));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, [ITEM_W, getWrappedIndex]);

  const handleStart = (e) => {
    isDragging.current = true;
    startX.current = px(e);
    lastX.current = px(e);
    lastScrollX.current = scrollXRef.current;
    vel.current = 0;
    lastTime.current = Date.now();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  const handleMove = useCallback((e) => {
    if (!isDragging.current) return;
    const now = Date.now();
    const currentX = px(e);
    const dx = currentX - lastX.current;
    lastDX.current = (dx / (now - lastTime.current || 1)) * 16;
    lastTime.current = now;
    lastX.current = currentX;

    scrollXRef.current = lastScrollX.current + (currentX - startX.current);
    setScrollX(scrollXRef.current);
    setActiveIndex(getWrappedIndex(scrollXRef.current));
  }, [getWrappedIndex]);

  const handleEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    vel.current = lastDX.current * 2;
    animate();
  }, [animate]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    animate(); // Lance la boucle pour l'inertie initiale
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove, handleEnd, animate]);

  return (
    <div className="relative w-full h-[600px] flex flex-col items-center justify-center overflow-hidden group/main select-none">
      
      {/* Navigation */}
      <button 
        onClick={() => { vel.current = 15; if(!rafRef.current) animate(); }}
        className="absolute left-6 z-[250] w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-[#FF6B2B] text-white rounded-full border border-white/30 backdrop-blur-md opacity-0 group-hover/main:opacity-100 transition-all duration-300 shadow-xl"
      >‹</button>
      <button 
        onClick={() => { vel.current = -15; if(!rafRef.current) animate(); }}
        className="absolute right-6 z-[250] w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-[#FF6B2B] text-white rounded-full border border-white/30 backdrop-blur-md opacity-0 group-hover/main:opacity-100 transition-all duration-300 shadow-xl"
      >›</button>

      <div 
        className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ perspective: '1500px' }} 
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        {data.map((item, i) => {
          // --- LOGIQUE DE CERCLE INFINI ---
          const itemOffset = i * ITEM_W;
          let relativeOffset = (itemOffset + scrollX) % TOTAL_WIDTH;
          
          // Recentrer les items pour qu'ils bouclent devant nous
          if (relativeOffset > TOTAL_WIDTH / 2) relativeOffset -= TOTAL_WIDTH;
          if (relativeOffset < -TOTAL_WIDTH / 2) relativeOffset += TOTAL_WIDTH;

          const angle = relativeOffset / RADIUS;
          const opacityRaw = Math.max(0, Math.cos(angle));
          
          // Si l'item est derrière le cercle (angle > 90°), on ne l'affiche pas
          if (Math.abs(angle) > Math.PI / 1.8) return null;

          const tx = RADIUS * Math.sin(angle);
          const tz = RADIUS * (Math.cos(angle) - 1); // TZ négatif pour éloigner les bords (effet convexe/cercle)
          const rotY = angle * (180 / Math.PI); // Rotation face à l'utilisateur
          
          const scale = 0.8 + 0.2 * opacityRaw;
          const isCenter = Math.abs(angle) < 0.2;

          return (
            <div
              key={item.id || i}
              className="absolute"
              style={{
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: opacityRaw,
                zIndex: Math.round(opacityRaw * 100),
                willChange: 'transform, opacity',
              }}
            >
               {renderItem(item, isCenter)}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="absolute bottom-10 flex items-center gap-2">
        {data.map((_, i) => (
          <div 
            key={i} 
            className={`transition-all duration-300 ${
              i === activeIndex ? 'w-8 h-1.5 bg-[#FF6B2B] rounded-full' : 'w-2 h-2 bg-gray-400 rounded-full'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

export default LuxuryInfiniteCircle;