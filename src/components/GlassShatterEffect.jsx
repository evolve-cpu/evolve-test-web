// import React, { useState, useEffect } from 'react';

// interface GlassShatterEffectProps {
//   isActive: boolean;
//   onComplete: () => void;
// }

// const GlassShatterEffect: React.FC<GlassShatterEffectProps> = ({ isActive, onComplete }) => {
//   const [fragments, setFragments] = useState<Array<{ id: number; x: number; y: number; rotation: number; scale: number }>>([]);

//   useEffect(() => {
//     if (isActive) {
//       // Create glass fragments
//       const newFragments = Array.from({ length: 25 }, (_, i) => ({
//         id: i,
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         rotation: Math.random() * 360,
//         scale: 0.5 + Math.random() * 0.5,
//       }));
//       setFragments(newFragments);

//       // Complete animation after delay
//       setTimeout(onComplete, 800);
//     }
//   }, [isActive, onComplete]);

//   if (!isActive) return null;

//   return (
//     <div className="fixed inset-0 z-50 pointer-events-none">
//       {fragments.map((fragment) => (
//         <div
//           key={fragment.id}
//           className="absolute w-8 h-8 bg-gradient-to-br from-white/30 to-transparent border border-white/20 animate-glass-shatter"
//           style={{
//             left: fragment.x,
//             top: fragment.y,
//             transform: `rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
//             animationDelay: `${Math.random() * 0.3}s`,
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default GlassShatterEffect

// import React, { useEffect, useRef, useState } from "react";
// import { TweenMax, TimelineMax, Cubic } from "gsap";
// import { Delaunay } from "delaunay-triangulate"; // install or copy in from original

// const GlassShatterEffect = ({ isActive, onComplete }) => {
//   const containerRef = useRef(null);
//   const clickCount = useRef(0);
//   const fragmentsRef = useRef([]);
//   const dims = useRef({ width: window.innerWidth, height: window.innerHeight });
//   const clickPos = useRef([window.innerWidth / 2, window.innerHeight / 2]);

//   useEffect(() => {
//     if (!isActive) return;

//     TweenMax.set(containerRef.current, { perspective: 500 });

//     const handleClick = (e) => {
//       clickCount.current += 1;
//       const rect = containerRef.current.getBoundingClientRect();
//       clickPos.current = [e.clientX - rect.left, e.clientY - rect.top];
//       shatter(clickCount.current >= 3);

//       if (clickCount.current >= 3) {
//         setTimeout(() => {
//           cleanup();
//           onComplete?.();
//         }, 1200);
//       }
//     };

//     containerRef.current.addEventListener("click", handleClick);
//     return () => {
//       containerRef.current?.removeEventListener("click", handleClick);
//       cleanup();
//     };
//   }, [isActive, onComplete]);

//   const shatter = (isFinal = false) => {
//     const { width, height } = dims.current;
//     const [cx, cy] = clickPos.current;

//     const vertices = [[cx, cy]];
//     const rings = [
//       { r: 50, c: 12 },
//       { r: 150, c: 12 },
//       { r: 300, c: 12 },
//       { r: 1200, c: isFinal ? 24 : 12 }
//     ];

//     rings.forEach(({ r, c }) => {
//       const variance = r * 0.25;
//       for (let i = 0; i < c; i++) {
//         const angle = (i / c) * Math.PI * 2;
//         vertices.push([
//           clamp(
//             Math.cos(angle) * r + cx + randomRange(-variance, variance),
//             0,
//             width
//           ),
//           clamp(
//             Math.sin(angle) * r + cy + randomRange(-variance, variance),
//             0,
//             height
//           )
//         ]);
//       }
//     });

//     const indices = Delaunay.triangulate(vertices);
//     const tl = new TimelineMax({
//       onComplete: () => {
//         fragmentsRef.current.forEach((f) =>
//           containerRef.current.removeChild(f.canvas)
//         );
//         fragmentsRef.current = [];
//       }
//     });

//     for (let i = 0; i < indices.length; i += 3) {
//       const p0 = vertices[indices[i]];
//       const p1 = vertices[indices[i + 1]];
//       const p2 = vertices[indices[i + 2]];
//       const frag = new Fragment(p0, p1, p2, dims.current);
//       fragmentsRef.current.push(frag);
//       containerRef.current.appendChild(frag.canvas);

//       const dx = frag.centroid[0] - cx;
//       const dy = frag.centroid[1] - cy;
//       const d = Math.sqrt(dx * dx + dy * dy);
//       const rx = 30 * Math.sign(dy);
//       const ry = 90 * -Math.sign(dx);
//       const delay = d * 0.003 * randomRange(0.9, 1.1);

//       const t = new TimelineMax();
//       t.to(frag.canvas, 1, {
//         z: -500,
//         rotationX: rx,
//         rotationY: ry,
//         ease: Cubic.easeIn
//       });
//       t.to(frag.canvas, 0.4, { alpha: 0 }, 0.6);
//       tl.insert(t, delay);
//     }
//   };

//   const cleanup = () => {
//     fragmentsRef.current.forEach((f) =>
//       containerRef.current.removeChild(f.canvas)
//     );
//     fragmentsRef.current = [];
//   };

//   if (!isActive) return null;

//   return (
//     <div
//       ref={containerRef}
//       style={{
//         position: "fixed",
//         inset: 0,
//         backgroundColor: "#000",
//         overflow: "hidden",
//         zIndex: 9999
//       }}
//     >
//       {/* This is the "glass" layer — can style with gradients, textures */}
//     </div>
//   );
// };

// // Utility functions
// function randomRange(min, max) {
//   return min + (max - min) * Math.random();
// }
// function clamp(x, min, max) {
//   return x < min ? min : x > max ? max : x;
// }

// // Fragment constructor
// function Fragment(v0, v1, v2, dims) {
//   this.v0 = v0;
//   this.v1 = v1;
//   this.v2 = v2;

//   const xMin = Math.min(v0[0], v1[0], v2[0]);
//   const xMax = Math.max(v0[0], v1[0], v2[0]);
//   const yMin = Math.min(v0[1], v1[1], v2[1]);
//   const yMax = Math.max(v0[1], v1[1], v2[1]);

//   this.box = {
//     x: xMin,
//     y: yMin,
//     w: xMax - xMin,
//     h: yMax - yMin
//   };

//   this.centroid = [(v0[0] + v1[0] + v2[0]) / 3, (v0[1] + v1[1] + v2[1]) / 3];

//   this.canvas = document.createElement("canvas");
//   this.canvas.width = this.box.w;
//   this.canvas.height = this.box.h;
//   this.canvas.style.width = `${this.box.w}px`;
//   this.canvas.style.height = `${this.box.h}px`;
//   this.canvas.style.left = `${this.box.x}px`;
//   this.canvas.style.top = `${this.box.y}px`;
//   this.canvas.style.position = "absolute";

//   const ctx = this.canvas.getContext("2d");
//   ctx.fillStyle = "rgba(255,255,255,0.1)"; // semi-glass look
//   ctx.strokeStyle = "rgba(255,255,255,0.2)";
//   ctx.beginPath();
//   ctx.moveTo(v0[0] - this.box.x, v0[1] - this.box.y);
//   ctx.lineTo(v1[0] - this.box.x, v1[1] - this.box.y);
//   ctx.lineTo(v2[0] - this.box.x, v2[1] - this.box.y);
//   ctx.closePath();
//   ctx.fill();
//   ctx.stroke();
// }

// export default GlassShatterEffect;

// import React, { useState, useEffect } from "react";

// const GlassShatterEffect = ({ isActive, onComplete }) => {
//   const [fragments, setFragments] = useState([]);

//   useEffect(() => {
//     if (isActive) {
//       // Create glass fragments
//       const newFragments = Array.from({ length: 25 }, (_, i) => ({
//         id: i,
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         rotation: Math.random() * 360,
//         scale: 0.5 + Math.random() * 0.5
//       }));
//       setFragments(newFragments);

//       // Complete animation after delay
//       setTimeout(onComplete, 800);
//     }
//   }, [isActive, onComplete]);

//   if (!isActive) return null;

//   return (
//     <div className="fixed inset-0 z-50 pointer-events-none">
//       {fragments.map((fragment) => (
//         <div
//           key={fragment.id}
//           className="absolute w-8 h-8 bg-gradient-to-br from-white/30 to-transparent border border-white/20 animate-glass-shatter"
//           style={{
//             left: fragment.x,
//             top: fragment.y,
//             transform: `rotate(${fragment.rotation}deg) scale(${fragment.scale})`,
//             animationDelay: `${Math.random() * 0.3}s`
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default GlassShatterEffect;

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// const GlassShatterEffect = ({ clickCount, onComplete }) => {
//   const crackRef = useRef(null);
//   const shardRefs = useRef([]);
//   const dustRefs = useRef([]);
//   const [shards, setShards] = useState([]);
//   const [dust, setDust] = useState([]);

//   const createShards = () => {
//     const w = window.innerWidth;
//     const h = window.innerHeight;

//     return Array.from({ length: 250 }, (_, i) => {
//       let size;
//       const r = Math.random();
//       if (r < 0.1) size = 150 + Math.random() * 300; // Large
//       else if (r < 0.4) size = 80 + Math.random() * 200; // Medium
//       else size = 20 + Math.random() * 90; // Small

//       const points = Array.from(
//         { length: 4 + Math.floor(Math.random() * 7) }, // 4–10 points
//         () => `${Math.random() * 100}% ${Math.random() * 100}%`
//       ).join(",");

//       return {
//         id: i,
//         x: Math.random() * w,
//         y: Math.random() * h,
//         size,
//         rotation: Math.random() * 360,
//         clipPath: `polygon(${points})`
//       };
//     });
//   };

//   const createDust = () => {
//     const w = window.innerWidth;
//     const h = window.innerHeight;

//     return Array.from({ length: 200 }, (_, i) => ({
//       id: i,
//       x: Math.random() * w,
//       y: Math.random() * h,
//       size: 2 + Math.random() * 3,
//       opacity: 0.1 + Math.random() * 0.6
//     }));
//   };

//   // Crack effect
//   useEffect(() => {
//     if (clickCount === 1) {
//       gsap.set(crackRef.current, { opacity: 1 });
//     }

//     if (clickCount === 2) {
//       gsap.to(crackRef.current, {
//         opacity: 0.8,
//         yoyo: true,
//         repeat: 2,
//         duration: 0.1
//       });
//     }

//     if (clickCount === 3) {
//       gsap.to(crackRef.current, {
//         opacity: 0.4,
//         duration: 0.2,
//         onComplete: () => {
//           setShards(createShards());
//           setDust(createDust());
//           gsap.to(crackRef.current, { opacity: 0, duration: 0.3 });
//         }
//       });
//     }
//   }, [clickCount]);

//   // Shard scatter animation
//   useEffect(() => {
//     if (shards.length > 0) {
//       const w = window.innerWidth;
//       const h = window.innerHeight;
//       const centerX = w / 2;
//       const centerY = h / 2;

//       shardRefs.current.forEach((el, i) => {
//         if (!el) return;
//         const dx = (shards[i].x - centerX) * 3 + (Math.random() - 0.5) * 500;
//         const dy = (shards[i].y - centerY) * 3 + (Math.random() - 0.5) * 500;

//         gsap.to(el, {
//           x: dx,
//           y: dy,
//           rotation: "+=" + (Math.random() * 1080 - 540),
//           opacity: 0,
//           duration: 5 + Math.random() * 2.5, // slower
//           ease: "power2.out",
//           onComplete: i === shards.length - 1 ? onComplete : undefined
//         });
//       });
//     }
//   }, [shards, onComplete]);

//   // Dust animation
//   useEffect(() => {
//     if (dust.length > 0) {
//       dustRefs.current.forEach((el, i) => {
//         if (!el) return;
//         gsap.to(el, {
//           x: "+=" + (Math.random() - 0.5) * 200,
//           y: "+=" + (Math.random() * 300 + 100),
//           opacity: 0,
//           duration: 1 + Math.random() * 0.5,
//           ease: "power1.out"
//         });
//       });
//     }
//   }, [dust]);

//   return (
//     <div className="absolute inset-0 pointer-events-none z-10">
//       {clickCount > 0 && clickCount < 3 && (
//         <img
//           ref={crackRef}
//           src="https://res.cloudinary.com/dlfbl69bi/image/upload/v1755192265/Group_1_oihd3e.svg"
//           alt="glass crack"
//           className="absolute inset-0 w-full h-full object-cover z-0"
//           style={{ opacity: 0 }}
//         />
//       )}

//       {/* Glass shards */}
//       {clickCount === 3 &&
//         shards.map((shard, i) => (
//           <div
//             key={shard.id}
//             ref={(el) => (shardRefs.current[i] = el)}
//             className="absolute"
//             style={{
//               left: shard.x,
//               top: shard.y,
//               width: shard.size,
//               height: shard.size,
//               transform: `rotate(${shard.rotation}deg)`,
//               clipPath: shard.clipPath,
//               background: `linear-gradient(${
//                 Math.random() * 360
//               }deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))`,
//               boxShadow: "0 0 8px rgba(255,255,255,0.5)",
//               backdropFilter: "blur(2px)"
//             }}
//           />
//         ))}

//       {/* Dust particles */}
//       {clickCount === 3 &&
//         dust.map((d, i) => (
//           <div
//             key={d.id}
//             ref={(el) => (dustRefs.current[i] = el)}
//             className="absolute rounded-full"
//             style={{
//               left: d.x,
//               top: d.y,
//               width: d.size,
//               height: d.size,
//               background: "white",
//               opacity: d.opacity,
//               filter: "blur(1px)"
//             }}
//           />
//         ))}
//     </div>
//   );
// };

// export default GlassShatterEffect;

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GlassShatterEffect = ({ clickCount, onComplete }) => {
  const crackRef = useRef(null);
  const shardRefs = useRef([]);
  const dustRefs = useRef([]);
  const [shards, setShards] = useState([]);
  const [dust, setDust] = useState([]);
  const [textShards, setTextShards] = useState([]);

  // Generate random glass shards
  const createShards = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;

    return Array.from({ length: 200 }, (_, i) => {
      let size;
      const r = Math.random();
      if (r < 0.1) size = 150 + Math.random() * 300;
      else if (r < 0.4) size = 80 + Math.random() * 200;
      else size = 20 + Math.random() * 90;

      const points = Array.from(
        { length: 4 + Math.floor(Math.random() * 7) },
        () => `${Math.random() * 100}% ${Math.random() * 100}%`
      ).join(",");

      return {
        id: "g" + i,
        x: Math.random() * w,
        y: Math.random() * h,
        size,
        rotation: Math.random() * 360,
        clipPath: `polygon(${points})`,
        type: "glass"
      };
    });
  };

  // Break the "Click to break through" text into rectangular shards
  const createTextShards = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const text = "break the template";
    return Array.from(text).map((char, i) => ({
      id: "t" + i,
      char,
      x: centerX - text.length * 10 + i * 20,
      y: centerY,
      size: 120,
      rotation: Math.random() * 60 - 30,
      type: "text"
    }));
  };

  const createDust = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    return Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * h,
      size: 2 + Math.random() * 3,
      opacity: 0.1 + Math.random() * 0.6
    }));
  };

  // Crack stages
  useEffect(() => {
    if (clickCount === 1) {
      gsap.set(crackRef.current, { opacity: 1 });
    }

    if (clickCount === 2) {
      gsap.to(crackRef.current, {
        opacity: 0.8,
        yoyo: true,
        repeat: 2,
        duration: 0.1
      });
    }

    if (clickCount === 3) {
      gsap.to(crackRef.current, {
        opacity: 0.4,
        duration: 0.2,
        onComplete: () => {
          setShards(createShards());
          setTextShards(createTextShards());
          setDust(createDust());
          gsap.to(crackRef.current, { opacity: 0, duration: 0.3 });
        }
      });
    }
  }, [clickCount]);

  // Shard + text scatter
  useEffect(() => {
    if (shards.length > 0 || textShards.length > 0) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const allShards = [...shards, ...textShards];

      shardRefs.current.forEach((el, i) => {
        if (!el || !allShards[i]) return;
        const dx = (allShards[i].x - centerX) * 3 + (Math.random() - 0.5) * 500;
        const dy = (allShards[i].y - centerY) * 3 + (Math.random() - 0.5) * 500;

        gsap.to(el, {
          x: dx,
          y: dy,
          rotation: "+=" + (Math.random() * 1080 - 540),
          opacity: 0,
          duration: 5 + Math.random() * 2.5,
          ease: "power2.out",
          onComplete: i === allShards.length - 1 ? onComplete : undefined
        });
      });
    }
  }, [shards, textShards, onComplete]);

  // Dust animation
  useEffect(() => {
    if (dust.length > 0) {
      dustRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          x: "+=" + (Math.random() - 0.5) * 200,
          y: "+=" + (Math.random() * 300 + 100),
          opacity: 0,
          duration: 1 + Math.random() * 0.5,
          ease: "power1.out"
        });
      });
    }
  }, [dust]);

  // Mouse push-away interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      shardRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const shardX = rect.left + rect.width / 2;
        const shardY = rect.top + rect.height / 2;

        const dx = shardX - e.clientX;
        const dy = shardY - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          gsap.to(el, {
            x: "+=" + dx * 0.2,
            y: "+=" + dy * 0.2,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Crack image */}
      {/* {clickCount > 0 && clickCount < 3 && (
        <img
          ref={crackRef}
          src="https://res.cloudinary.com/dlfbl69bi/image/upload/v1755192265/Group_1_oihd3e.svg"
          alt="glass crack"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0 }}
        />
      )} */}
      {clickCount === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {/* <div className="text-white text-2xl font-bold animate-pulse">
            click to break
          </div> */}
        </div>
      )}

      {/* Crack image stages */}
      {clickCount === 1 && (
        <img
          ref={crackRef}
          src="https://res.cloudinary.com/dlfbl69bi/image/upload/v1755592601/2_c36rln.svg"
          alt="glass crack stage 1"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0 }}
        />
      )}

      {clickCount === 2 && (
        <img
          ref={crackRef}
          src="https://res.cloudinary.com/dlfbl69bi/image/upload/v1755192265/Group_1_oihd3e.svg"
          alt="glass crack stage 2"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0 }}
        />
      )}

      {/* Glass shards + Text shards */}
      {clickCount === 3 &&
        [...shards, ...textShards].map((shard, i) => (
          <div
            key={shard.id}
            ref={(el) => (shardRefs.current[i] = el)}
            className="absolute flex items-center justify-center text-white font-bold"
            style={{
              left: shard.x,
              top: shard.y,
              width: shard.size,
              height: shard.size,
              transform: `rotate(${shard.rotation}deg)`,
              clipPath: shard.type === "glass" ? shard.clipPath : "none",
              background:
                shard.type === "glass"
                  ? `linear-gradient(${
                      Math.random() * 360
                    }deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))`
                  : "transparent",
              fontSize: shard.type === "text" ? "28px" : "inherit",
              color: "white",
              textShadow:
                shard.type === "text"
                  ? "0 0 10px rgba(255,255,255,0.9)"
                  : "none"
            }}
          >
            {shard.type === "text" ? shard.char : ""}
          </div>
        ))}

      {/* Dust */}
      {clickCount === 3 &&
        dust.map((d, i) => (
          <div
            key={d.id}
            ref={(el) => (dustRefs.current[i] = el)}
            className="absolute rounded-full"
            style={{
              left: d.x,
              top: d.y,
              width: d.size,
              height: d.size,
              background: "white",
              opacity: d.opacity,
              filter: "blur(1px)"
            }}
          />
        ))}
    </div>
  );
};

export default GlassShatterEffect;
