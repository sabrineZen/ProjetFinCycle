import React from "react";
import { motion } from "framer-motion";
import ChuteDuCiel from "./ChuteDuCiel";

const Hero = ({ videoLuxe, parallax, handleMouseMoveParallax }) => {
  return (
    <section
      onMouseMove={handleMouseMoveParallax}
      className="relative w-full h-[100svh] overflow-hidden bg-black"
    >
      {/* VIDÉO */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110"
        style={{ opacity: 0.62 }}
      >
        <source src={videoLuxe} type="video/webm" />
      </video>

      {/* DÉGRADÉ BAS DE PAGE pour transition douce vers le cream */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #000000)" }}
      />

      {/* CONTENU */}
      <div
        className="relative z-30 h-full flex flex-col justify-center px-8 md:px-24 text-white"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        <div className="flex flex-col items-start w-full">

          {/* TITRE */}
          <ChuteDuCiel delay={0}>
            <h1
              className="font-black leading-[0.85] uppercase tracking-tighter"
              style={{ fontSize: "clamp(72px, 11vw, 160px)" }}
            >
              PLATI
              <span
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px rgba(255,255,255,0.75)",
                }}
              >
                GO
              </span>
            </h1>
          </ChuteDuCiel>

          {/* LIGNE ORANGE */}
          <ChuteDuCiel delay={0.2}>
            <div
              className="my-7 md:my-9"
              style={{
                height: "2px",
                width: "clamp(80px, 10vw, 160px)",
                background: "#FF6B2B",
                boxShadow: "0 0 24px rgba(255,107,43,0.7)",
                borderRadius: "2px",
              }}
            />
          </ChuteDuCiel>

          {/* SOUS-TITRE */}
          <ChuteDuCiel delay={0.4}>
            <p
              className="font-extralight italic leading-relaxed mb-12"
              style={{
                fontSize: "clamp(16px, 2.2vw, 30px)",
                maxWidth: "min(600px, 85vw)",
                color: "rgba(255,255,255,0.88)",
                letterSpacing: "0.08em",
              }}
            >
              L'excellence culinaire{" "}
              <span
                style={{
                  fontWeight: 700,
                  fontStyle: "normal",
                  borderBottom: "2px solid #FF6B2B",
                }}
              >
                livrée
              </span>{" "}
              avec élégance.
            </p>
          </ChuteDuCiel>

          {/* BOUTON */}
          <ChuteDuCiel delay={0.6}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative overflow-hidden rounded-full font-black uppercase text-white"
              style={{
                padding: "18px 40px",
                background: "#FF6B2B",
                letterSpacing: "0.15em",
                fontSize: "11px",
                boxShadow: "0 20px 50px rgba(255,107,43,0.35)",
              }}
            >
              <span className="relative z-10">Commander maintenant</span>

              {/* SHINE — version CSS pure, pas besoin de config Tailwind */}
              <span
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "-100% 0",
                  animation: "shine 2.4s ease-in-out infinite",
                }}
              />
            </motion.button>
          </ChuteDuCiel>

        </div>
      </div>

      {/* KEYFRAME SHINE global */}
      <style>{`
        @keyframes shine {
          0%   { background-position: -100% 0; }
          40%  { background-position: 200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  );
};

export default Hero;