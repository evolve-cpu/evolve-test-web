// import React from 'react';

// const ParticleBackground: React.FC = () => {
//   const particles = Array.from({ length: 30 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 2,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     animationDelay: Math.random() * 6,
//     animationDuration: 4 + Math.random() * 4,
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute rounded-full bg-evolve-heliotrope animate-particle-float animate-particle-glow"
//           style={{
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             animationDelay: `${particle.animationDelay}s`,
//             animationDuration: `${particle.animationDuration}s`,
//           }}
//         />
//       ))}

//       {/* Additional larger glowing orbs */}
//       {Array.from({ length: 8 }, (_, i) => (
//         <div
//           key={`orb-${i}`}
//           className="absolute rounded-full bg-evolve-lavender-indigo opacity-20 animate-particle-float"
//           style={{
//             width: `${20 + Math.random() * 30}px`,
//             height: `${20 + Math.random() * 30}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 8}s`,
//             animationDuration: `${8 + Math.random() * 4}s`,
//             filter: 'blur(2px)',
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default ParticleBackground;

// import React from "react";

// const ParticleBackground = () => {
//   const particles = Array.from({ length: 30 }, (_, i) => ({
//     id: i,
//     size: Math.random() * 4 + 2,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     animationDelay: Math.random() * 6,
//     animationDuration: 4 + Math.random() * 4
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden">
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute rounded-full bg-evolve-heliotrope animate-particle-float animate-particle-glow"
//           style={{
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             animationDelay: `${particle.animationDelay}s`,
//             animationDuration: `${particle.animationDuration}s`
//           }}
//         />
//       ))}

//       {/* Additional larger glowing orbs */}
//       {Array.from({ length: 8 }, (_, i) => (
//         <div
//           key={`orb-${i}`}
//           className="absolute rounded-full bg-evolve-lavender-indigo opacity-20 animate-particle-float"
//           style={{
//             width: `${20 + Math.random() * 30}px`,
//             height: `${20 + Math.random() * 30}px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 8}s`,
//             animationDuration: `${8 + Math.random() * 4}s`,
//             filter: "blur(2px)"
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default ParticleBackground;

// import React, { useMemo, useEffect, useState } from "react";

// const ParticleBackground = ({ onComplete }) => {
//   const [stage, setStage] = useState(0); // which text is visible
//   const [visible, setVisible] = useState(true);

//   // More shiny particles ✨
//   const particles = useMemo(
//     () =>
//       Array.from({ length: 120 }, (_, i) => ({
//         id: i,
//         size: Math.random() * 2 + 1.5,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         animationDelay: Math.random() * 8,
//         animationDuration: 6 + Math.random() * 6,
//         twinkleDelay: Math.random() * 5
//       })),
//     []
//   );

//   // New text sequence (lowercase & merged lines)
//   const texts = [
//     "from scribbles in a notebook to\nscreens that stop you.",
//     "from spark in your head to\nfire in their eyes.",
//     "from ‘that’s impossible’ to\n‘watch me!’"
//   ];

//   useEffect(() => {
//     let timer;
//     if (stage < texts.length) {
//       timer = setTimeout(() => {
//         setVisible(false);
//         setTimeout(() => {
//           setStage((prev) => prev + 1);
//           setVisible(true);
//         }, 800);
//       }, 3500);
//     } else {
//       if (onComplete) onComplete();
//     }
//     return () => clearTimeout(timer);
//   }, [stage, visible, texts.length, onComplete]);

//   return (
//     <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
//       {/* Shiny Particles */}
//       {particles.map((p) => (
//         <div
//           key={p.id}
//           className="absolute rounded-full bg-evolve-heliotrope opacity-80"
//           style={{
//             width: `${p.size}px`,
//             height: `${p.size}px`,
//             left: `${p.x}%`,
//             top: `${p.y}%`,
//             animation: `
//               drift ${p.animationDuration}s ease-in-out infinite,
//               twinkle 2s ease-in-out infinite`,
//             animationDelay: `${p.animationDelay}s, ${p.twinkleDelay}s`,
//             boxShadow: "0 0 6px rgba(180,120,255,0.9)"
//           }}
//         />
//       ))}

//       {/* Text */}
//       {stage < texts.length && (
//         <div
//           className={`text-center whitespace-pre-line px-4 text-evolve-inchworm font-bricolage transition-opacity duration-1000 ${
//             visible ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="text-3xl md:text-5xl font-light leading-snug lowercase">
//             {texts[stage]}
//           </div>
//         </div>
//       )}

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes drift {
//           0% {
//             transform: translate(0, 0) scale(1);
//           }
//           50% {
//             transform: translate(-12px, 10px) scale(1.1);
//           }
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//         }
//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.7;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.6);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ParticleBackground;

// import React, { useMemo, useEffect, useState } from "react";

// const ParticleBackground = ({ onComplete }) => {
//   const [stage, setStage] = useState(0); // which text is visible
//   const [visible, setVisible] = useState(true);
//   const [mouse, setMouse] = useState({ x: null, y: null });

//   // More shiny particles ✨
//   const particles = useMemo(
//     () =>
//       Array.from({ length: 120 }, (_, i) => ({
//         id: i,
//         size: Math.random() * 2 + 1.5,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         animationDelay: Math.random() * 8,
//         animationDuration: 6 + Math.random() * 6,
//         twinkleDelay: Math.random() * 5
//       })),
//     []
//   );

//   // New text sequence (lowercase & merged lines)
//   const texts = [
//     "from scribbles in a notebook to\nscreens that stop you.",
//     "from spark in your head to\nfire in their eyes.",
//     "from ‘that’s impossible’ to\n‘watch me!’"
//   ];

//   // text sequence control
//   useEffect(() => {
//     let timer;
//     if (stage < texts.length) {
//       timer = setTimeout(() => {
//         setVisible(false);
//         setTimeout(() => {
//           setStage((prev) => prev + 1);
//           setVisible(true);
//         }, 800);
//       }, 3500);
//     } else {
//       if (onComplete) onComplete();
//     }
//     return () => clearTimeout(timer);
//   }, [stage, visible, texts.length, onComplete]);

//   // Track mouse position
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMouse({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
//       {/* Shiny Particles */}
//       {particles.map((p) => {
//         // convert percent → px
//         const leftPx = (p.x / 100) * window.innerWidth;
//         const topPx = (p.y / 100) * window.innerHeight;

//         // hover repel effect
//         let translateX = 0;
//         let translateY = 0;
//         if (mouse.x !== null && mouse.y !== null) {
//           const dx = mouse.x - leftPx;
//           const dy = mouse.y - topPx;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 120) {
//             const angle = Math.atan2(dy, dx);
//             const force = (120 - dist) / 120; // strength
//             translateX = -Math.cos(angle) * force * 25;
//             translateY = -Math.sin(angle) * force * 25;
//           }
//         }

//         return (
//           <div
//             key={p.id}
//             className="absolute rounded-full bg-evolve-heliotrope opacity-80"
//             style={{
//               width: `${p.size}px`,
//               height: `${p.size}px`,
//               left: `${p.x}%`,
//               top: `${p.y}%`,
//               transform: `translate(${translateX}px, ${translateY}px)`,
//               animation: `
//                 drift ${p.animationDuration}s ease-in-out infinite,
//                 twinkle 2s ease-in-out infinite`,
//               animationDelay: `${p.animationDelay}s, ${p.twinkleDelay}s`,
//               boxShadow: "0 0 6px rgba(180,120,255,0.9)"
//             }}
//           />
//         );
//       })}

//       {/* Text */}
//       {stage < texts.length && (
//         <div
//           className={`text-center whitespace-pre-line px-4 text-evolve-inchworm font-bricolage transition-opacity duration-1000 ${
//             visible ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="text-3xl md:text-5xl font-light leading-snug lowercase">
//             {texts[stage]}
//           </div>
//         </div>
//       )}

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes drift {
//           0% {
//             transform: translate(0, 0) scale(1);
//           }
//           50% {
//             transform: translate(-12px, 10px) scale(1.1);
//           }
//           100% {
//             transform: translate(0, 0) scale(1);
//           }
//         }
//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.7;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.6);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ParticleBackground;

import React, { useMemo, useEffect, useState } from "react";

const ParticleBackground = ({ onComplete }) => {
  const [stage, setStage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mouse, setMouse] = useState({ x: null, y: null });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // particle config: desktop gets more particles and faster twinkle
  const particleConfig = useMemo(
    () => ({
      count: isMobile ? 120 : 240, // desktop only increased
      twinkleDuration: isMobile ? 2 : 1.2 // desktop only faster blinking
    }),
    [isMobile]
  );

  const particles = useMemo(
    () =>
      Array.from({ length: particleConfig.count }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 1.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        animationDelay: Math.random() * 8,
        animationDuration: 6 + Math.random() * 6,
        twinkleDelay: Math.random() * 5
      })),
    [particleConfig.count]
  );

  const texts = [
    "from scribbles in a notebook to\nscreens that stop you.",
    "from spark in your head to\nfire in their eyes.",
    "from ‘that’s impossible’ to\n‘watch me!’"
  ];

  useEffect(() => {
    let timer;
    if (stage < texts.length) {
      timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          setStage((prev) => prev + 1);
          setVisible(true);
        }, 800);
      }, 3500);
    } else {
      onComplete && onComplete();
    }
    return () => clearTimeout(timer);
  }, [stage, visible, texts.length, onComplete]);

  useEffect(() => {
    const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
      {/* Shiny Particles */}
      {particles.map((p) => {
        const leftPx = (p.x / 100) * window.innerWidth;
        const topPx = (p.y / 100) * window.innerHeight;

        let translateX = 0;
        let translateY = 0;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - leftPx;
          const dy = mouse.y - topPx;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const angle = Math.atan2(dy, dx);
            const force = (120 - dist) / 120;
            translateX = -Math.cos(angle) * force * 25;
            translateY = -Math.sin(angle) * force * 25;
          }
        }

        return (
          <div
            key={p.id}
            className="absolute rounded-full bg-evolve-heliotrope opacity-80"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: `translate(${translateX}px, ${translateY}px)`,
              animation: `
                drift ${p.animationDuration}s ease-in-out infinite,
                twinkle ${particleConfig.twinkleDuration}s ease-in-out infinite`,
              animationDelay: `${p.animationDelay}s, ${p.twinkleDelay}s`,
              boxShadow: "0 0 6px rgba(180,120,255,0.9)"
            }}
          />
        );
      })}

      {/* Text */}
      {stage < texts.length && (
        <div
          className={`text-center whitespace-pre-line px-4 text-evolve-inchworm font-bricolage transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* smaller on mobile, extra bold everywhere */}
          <div className="text-2xl md:text-6xl font-extrabold leading-snug lowercase">
            {texts[stage]}
          </div>
        </div>
      )}

      {/* Animations */}
      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-12px, 10px) scale(1.1);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.6);
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;
