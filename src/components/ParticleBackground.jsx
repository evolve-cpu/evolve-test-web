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

// import React, { useMemo, useEffect, useState } from "react";

// const ParticleBackground = ({ onComplete }) => {
//   const [stage, setStage] = useState(0);
//   const [visible, setVisible] = useState(true);
//   const [mouse, setMouse] = useState({ x: null, y: null });
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== "undefined" ? window.innerWidth <= 768 : false
//   );

//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // particle config: desktop gets more particles and faster twinkle
//   const particleConfig = useMemo(
//     () => ({
//       count: isMobile ? 120 : 240, // desktop only increased
//       twinkleDuration: isMobile ? 2 : 1.2 // desktop only faster blinking
//     }),
//     [isMobile]
//   );

//   const particles = useMemo(
//     () =>
//       Array.from({ length: particleConfig.count }, (_, i) => ({
//         id: i,
//         size: Math.random() * 2 + 1.5,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         animationDelay: Math.random() * 8,
//         animationDuration: 6 + Math.random() * 6,
//         twinkleDelay: Math.random() * 5
//       })),
//     [particleConfig.count]
//   );

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
//       onComplete && onComplete();
//     }
//     return () => clearTimeout(timer);
//   }, [stage, visible, texts.length, onComplete]);

//   useEffect(() => {
//     const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   return (
//     <div className="absolute inset-0 bg-black overflow-hidden flex items-center justify-center">
//       {/* Shiny Particles */}
//       {particles.map((p) => {
//         const leftPx = (p.x / 100) * window.innerWidth;
//         const topPx = (p.y / 100) * window.innerHeight;

//         let translateX = 0;
//         let translateY = 0;
//         if (mouse.x !== null && mouse.y !== null) {
//           const dx = mouse.x - leftPx;
//           const dy = mouse.y - topPx;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 120) {
//             const angle = Math.atan2(dy, dx);
//             const force = (120 - dist) / 120;
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
//                 twinkle ${particleConfig.twinkleDuration}s ease-in-out infinite`,
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
//           {/* smaller on mobile, extra bold everywhere */}
//           <div className="text-2xl md:text-6xl font-extrabold leading-snug lowercase">
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

import React, {
  useMemo,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
  useCallback
} from "react";
import gsap from "gsap";

const ParticleBackground = ({ onComplete }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const tlRef = useRef(null);
  const rafRef = useRef(null);

  const [mouse, setMouse] = useState({ x: null, y: null });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // particle config
  const particleConfig = useMemo(
    () => ({
      count: isMobile ? 120 : 240,
      twinkleDuration: isMobile ? 2 : 1.2
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
    "from 'that's impossible' to\n'watch me!'"
  ];

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return; // Skip if already queued

    rafRef.current = requestAnimationFrame(() => {
      setMouse({ x: e.clientX, y: e.clientY });
      rafRef.current = null;
    });
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const container = containerRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      // Force hardware acceleration and optimize for transforms
      gsap.set(track, {
        force3D: true,
        transformOrigin: "center top"
      });

      const items = gsap.utils.toArray(".credit-item");

      // Cache heights to avoid repeated calculations
      const heights = items.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.height;
      });

      const containerH = container.getBoundingClientRect().height;

      // start near center (slightly low looks nicer while entering)
      const VISUAL_OFFSET = isMobile ? 14 : 18;
      const firstH = heights[0] || 0;
      const startY = containerH / 2 - firstH / 2 + VISUAL_OFFSET;

      // Set initial position without triggering reflow
      gsap.set(track, { y: startY });

      // Slightly faster speed for smoother perception
      const PX_PER_SEC = isMobile ? 42 : 60;

      // Pre-calculate all measurements
      const containerRect = container.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();

      // how far the bottom of the track is from the top of the container
      const distanceFromTopNow = trackRect.bottom - containerRect.top;

      // push it a bit more for safety so it clearly exits
      const EXIT_PAD = isMobile ? 32 : 48;

      // total distance to move upward (negative y)
      const totalDistance = distanceFromTopNow + EXIT_PAD;

      const tl = gsap.timeline({
        defaults: {
          ease: "none",
          force3D: true
        },
        onComplete: () => onComplete && onComplete()
      });

      // Single continuous roll with optimized settings
      tl.to(track, {
        y: `-=${totalDistance}`,
        duration: totalDistance / PX_PER_SEC,
        // Use will-change and force3D for better performance
        transformOrigin: "center top",
        rotationZ: 0.01, // Forces 3D acceleration
        backfaceVisibility: "hidden" // Prevents flickering
      });

      tlRef.current = tl;
    }, containerRef);

    return () => {
      tlRef.current?.kill();
      ctx.revert();
    };
  }, [isMobile, onComplete]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-black overflow-hidden"
      style={{
        // Optimize container for animations
        willChange: "auto",
        backfaceVisibility: "hidden"
      }}
    >
      {/* particles */}
      <div className="absolute inset-0">
        {particles.map((p) => {
          const leftPx =
            typeof window !== "undefined" ? (p.x / 100) * window.innerWidth : 0;
          const topPx =
            typeof window !== "undefined"
              ? (p.y / 100) * window.innerHeight
              : 0;

          let translateX = 0,
            translateY = 0;
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
                transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                animation: `
                  drift ${p.animationDuration}s ease-in-out infinite,
                  twinkle ${particleConfig.twinkleDuration}s ease-in-out infinite`,
                animationDelay: `${p.animationDelay}s, ${p.twinkleDelay}s`,
                boxShadow: "0 0 6px rgba(180,120,255,0.9)",
                // Performance optimizations
                willChange: "transform",
                backfaceVisibility: "hidden"
              }}
            />
          );
        })}
      </div>

      {/* credits track (uses row-gap, not space-y) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col items-center"
          style={{
            rowGap: isMobile ? 48 : 64,
            // Critical performance optimizations for smooth animation
            willChange: "transform",
            backfaceVisibility: "hidden",
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          {texts.map((t, i) => (
            <div
              key={i}
              className="credit-item"
              style={{
                // Optimize each credit item
                willChange: "auto",
                backfaceVisibility: "hidden"
              }}
            >
              <div className="text-center whitespace-pre-line px-4 text-evolve-inchworm font-bricolage">
                <div
                  className="text-2xl md:text-6xl font-extrabold leading-snug lowercase"
                  style={{
                    // Text rendering optimization
                    textRendering: "geometricPrecision",
                    fontSmooth: "always",
                    WebkitFontSmoothing: "antialiased"
                  }}
                >
                  {t}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes drift {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-12px, 10px, 0) scale(1.1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.7;
            transform: scale3d(1, 1, 1);
          }
          50% {
            opacity: 1;
            transform: scale3d(1.6, 1.6, 1);
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;
