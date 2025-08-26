// import React, { useMemo, useRef, useLayoutEffect } from "react";
// import gsap from "gsap";
// import { evolveLogo, cloud, line } from "../../assets/images";

// const FirstPage = () => {
//   const containerRef = useRef(null);
//   const cloudRefs = useRef([]);
//   const dotRefs = useRef([]);

//   // positions for 5 clouds
//   const clouds = useMemo(
//     () => [
//       { style: { top: "8%", left: "6%" }, w: "w-28 md:w-40" },
//       { style: { top: "18%", right: "8%" }, w: "w-24 md:w-36" },
//       { style: { bottom: "12%", left: "10%" }, w: "w-24 md:w-36" },
//       { style: { top: "55%", right: "20%" }, w: "w-20 md:w-28" },
//       { style: { top: "35%", left: "35%" }, w: "w-24 md:w-36" }
//     ],
//     []
//   );

//   // line pairs to sprinkle around
//   const lines = useMemo(
//     () => [
//       { top: "14%", left: "10%" },
//       { top: "28%", right: "12%" },
//       { top: "46%", left: "8%" },
//       { top: "62%", right: "16%" },
//       { top: "78%", left: "18%" }
//     ],
//     []
//   );

//   // blinking dots in evolve-inchworm
//   const dots = useMemo(
//     () =>
//       Array.from({ length: 36 }, () => ({
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: 2 + Math.random() * 2, // px
//         delay: Math.random() * 1.5,
//         dur: 0.9 + Math.random() * 0.9
//       })),
//     []
//   );

//   // gsap animations: cloud drift + dot blinking
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // drift each cloud left->right with tiny vertical wiggle
//       cloudRefs.current.forEach((el, i) => {
//         if (!el) return;
//         gsap.to(el, {
//           x: 24 + Math.random() * 18, // slight horizontal drift
//           y: "+=" + (Math.random() * 10 - 5), // tiny vertical drift
//           duration: 4 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: i * 0.2
//         });
//       });

//       // blinking dots pulse and drift a touch
//       dotRefs.current.forEach((el, i) => {
//         if (!el) return;
//         const d = dots[i];
//         gsap.to(el, {
//           opacity: 1,
//           scale: 1.6,
//           duration: d.dur,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: d.delay
//         });
//         gsap.to(el, {
//           x: "+=" + (Math.random() * 8 - 4),
//           y: "+=" + (Math.random() * 8 - 4),
//           duration: 3 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [dots]);

//   // pointer interactions for clouds
//   const handleEnter = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1.05, duration: 0.2, ease: "power2.out" });
//   };

//   const handleLeave = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
//   };

//   const handleDown = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     // subtle nudge + pop on tap/click
//     gsap.to(el, {
//       x: "+=" + (8 + Math.random() * 18),
//       y: "+=" + (Math.random() * 6 - 3),
//       duration: 0.25,
//       ease: "power2.out",
//       yoyo: true,
//       repeat: 1
//     });
//     gsap.fromTo(
//       el,
//       { scale: 1.05 },
//       { scale: 1, duration: 0.35, ease: "power2.inOut" }
//     );
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen bg-black overflow-hidden"
//     >
//       {/* blinking dots behind everything */}
//       {dots.map((d, i) => (
//         <div
//           key={`dot-${i}`}
//           ref={(el) => (dotRefs.current[i] = el)}
//           className="absolute rounded-full bg-evolve-inchworm opacity-60 pointer-events-none z-10"
//           style={{
//             left: `${d.x}%`,
//             top: `${d.y}%`,
//             width: `${d.size}px`,
//             height: `${d.size}px`,
//             boxShadow: "0 0 8px rgba(194,253,92,0.6)",
//             willChange: "transform, opacity"
//           }}
//         />
//       ))}

//       {/* clouds (interactive) */}
//       {clouds.map((pos, i) => (
//         <img
//           key={`cloud-${i}`}
//           src={cloud}
//           alt="cloud"
//           ref={(el) => (cloudRefs.current[i] = el)}
//           className={`absolute ${pos.w} select-none cursor-pointer z-30`}
//           style={{ ...pos.style, willChange: "transform" }}
//           draggable={false}
//           onPointerEnter={() => handleEnter(i)}
//           onPointerLeave={() => handleLeave(i)}
//           onPointerDown={() => handleDown(i)}
//           onTouchStart={() => handleDown(i)}
//         />
//       ))}

//       {/* line + follower line */}
//       {lines.map((pos, i) => (
//         <div
//           key={`line-${i}`}
//           className="absolute flex items-center pointer-events-none select-none z-20"
//           style={pos}
//         >
//           <img
//             src={line}
//             alt="line"
//             className="h-[2px] md:h-[3px] w-44 md:w-80 opacity-80"
//             draggable={false}
//           />
//           <img
//             src={line}
//             alt="line thin"
//             className="h-[1px] md:h-[2px] w-16 md:w-24 opacity-60 ml-2"
//             draggable={false}
//           />
//         </div>
//       ))}

//       {/* headline */}
//       <div className="absolute inset-0 flex items-center justify-center px-6 z-40">
//         <h1 className="font-bricolage font-extrabold lowercase text-center leading-tight text-white text-3xl sm:text-4xl md:text-6xl">
//           more than just pretty pictures.
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default FirstPage;

// import React, {
//   useMemo,
//   useRef,
//   useLayoutEffect,
//   useState,
//   useEffect
// } from "react";
// import gsap from "gsap";
// import { evolveLogo, cloud, line } from "../../assets/images";

// const FirstPage = () => {
//   const containerRef = useRef(null);
//   const cloudRefs = useRef([]);
//   const dotRefs = useRef([]);

//   const [isDesktop, setIsDesktop] = useState(
//     typeof window !== "undefined" ? window.innerWidth >= 768 : true
//   );
//   useEffect(() => {
//     const onResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // clouds
//   const clouds = useMemo(
//     () => [
//       { style: { top: "8%", left: "6%" }, w: "w-28 md:w-40" },
//       { style: { top: "18%", right: "8%" }, w: "w-24 md:w-36" },
//       { style: { bottom: "12%", left: "10%" }, w: "w-24 md:w-36" },
//       { style: { top: "55%", right: "20%" }, w: "w-20 md:w-28" },
//       { style: { top: "35%", left: "35%" }, w: "w-24 md:w-36" }
//     ],
//     []
//   );

//   // base lines for all screens
//   const baseLines = useMemo(
//     () => [
//       { top: "14%", left: "10%" },
//       { top: "28%", right: "12%" },
//       { top: "46%", left: "8%" },
//       { top: "62%", right: "16%" },
//       { top: "78%", left: "18%" }
//     ],
//     []
//   );

//   // extra lines only on desktop
//   const desktopLines = useMemo(
//     () =>
//       isDesktop
//         ? [
//             { top: "10%", right: "24%" },
//             { top: "20%", left: "28%" },
//             { top: "34%", right: "30%" },
//             { top: "50%", left: "22%" },
//             { top: "58%", right: "10%" },
//             { top: "70%", left: "32%" },
//             { top: "86%", right: "22%" }
//           ]
//         : [],
//     [isDesktop]
//   );

//   // blinking dots in evolve-inchworm
//   const dots = useMemo(
//     () =>
//       Array.from({ length: isDesktop ? 120 : 36 }, () => ({
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: 2 + Math.random() * 2, // px
//         delay: Math.random() * 1.5,
//         dur: 0.9 + Math.random() * 0.9
//       })),
//     []
//   );

//   // gsap animations
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // cloud drift
//       cloudRefs.current.forEach((el, i) => {
//         if (!el) return;
//         gsap.to(el, {
//           x: 24 + Math.random() * 18,
//           y: "+=" + (Math.random() * 10 - 5),
//           duration: 4 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: i * 0.2
//         });
//       });

//       // dots pulse
//       dotRefs.current.forEach((el, i) => {
//         if (!el) return;
//         const d = dots[i];
//         gsap.to(el, {
//           opacity: 1,
//           scale: 1.6,
//           duration: d.dur,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: d.delay
//         });
//         gsap.to(el, {
//           x: "+=" + (Math.random() * 8 - 4),
//           y: "+=" + (Math.random() * 8 - 4),
//           duration: 3 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [dots]);

//   // pointer interactions for clouds (hover + tap)
//   const handleEnter = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1.06, duration: 0.18, ease: "power2.out" });
//   };

//   const handleLeave = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1, duration: 0.18, ease: "power2.out" });
//   };
//   const handlePress = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1.06, duration: 0.15, ease: "power2.out" });
//   };

//   const handleRelease = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
//   };

//   const handleDown = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, {
//       x: "+=" + (8 + Math.random() * 18),
//       y: "+=" + (Math.random() * 6 - 3),
//       duration: 0.25,
//       ease: "power2.out",
//       yoyo: true,
//       repeat: 1
//     });
//     gsap.fromTo(
//       el,
//       { scale: 1.06 },
//       { scale: 1, duration: 0.35, ease: "power2.inOut" }
//     );
//   };

//   // config you can tweak
//   const LINE_CFG = {
//     long: { mobile: "w-56", desktop: "md:w-[30rem]" }, // main line width
//     short: { mobile: "w-24", desktop: "md:w-30" }, // follower line width
//     height: { main: "h-[2px] md:h-[3px]", follower: "h-[1px] md:h-[2px]" },
//     opacity: {
//       main: "opacity-80",
//       follower: "opacity-60",
//       faintMain: "opacity-40",
//       faintFollower: "opacity-30"
//     }
//   };

//   // helper to render a line pair with variable lengths
//   //   const LinePair = ({ pos, long = "w-44 md:w-96", short = "w-16 md:w-28" }) => (
//   //     <div
//   //       className="absolute flex items-center pointer-events-none select-none z-20"
//   //       style={pos}
//   //     >
//   //       <img
//   //         src={line}
//   //         alt="line"
//   //         className={`h-[2px] md:h-[3px] ${long} opacity-80`}
//   //         draggable={false}
//   //       />
//   //       <img
//   //         src={line}
//   //         alt="line thin"
//   //         className={`h-[1px] md:h-[2px] ${short} opacity-60 ml-2`}
//   //         draggable={false}
//   //       />
//   //     </div>
//   //   );
//   // helper to render a line pair, supports faint variant
//   const LinePair = ({ pos, variant = "default" }) => {
//     const mainOpacity =
//       variant === "faint" ? LINE_CFG.opacity.faintMain : LINE_CFG.opacity.main;
//     const followerOpacity =
//       variant === "faint"
//         ? LINE_CFG.opacity.faintFollower
//         : LINE_CFG.opacity.follower;

//     return (
//       <div
//         className="absolute flex items-center pointer-events-none select-none z-20"
//         style={pos}
//       >
//         <img
//           src={line}
//           alt="line"
//           className={`${LINE_CFG.height.main} ${LINE_CFG.long.mobile} ${LINE_CFG.long.desktop} ${mainOpacity}`}
//           draggable={false}
//         />
//         <img
//           src={line}
//           alt="line thin"
//           className={`${LINE_CFG.height.follower} ${LINE_CFG.short.mobile} ${LINE_CFG.short.desktop} ${followerOpacity} ml-2`}
//           draggable={false}
//         />
//       </div>
//     );
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen bg-black overflow-hidden"
//     >
//       {/* blinking dots behind everything */}
//       {dots.map((d, i) => (
//         <div
//           key={`dot-${i}`}
//           ref={(el) => (dotRefs.current[i] = el)}
//           className="absolute rounded-full bg-evolve-inchworm opacity-60 pointer-events-none z-10"
//           style={{
//             left: `${d.x}%`,
//             top: `${d.y}%`,
//             width: `${d.size}px`,
//             height: `${d.size}px`,
//             boxShadow: "0 0 8px rgba(194,253,92,0.6)",
//             willChange: "transform, opacity"
//           }}
//         />
//       ))}

//       {/* clouds (interactive) */}
//       {clouds.map((pos, i) => (
//         <img
//           key={`cloud-${i}`}
//           src={cloud}
//           alt="cloud"
//           ref={(el) => (cloudRefs.current[i] = el)}
//           className={`absolute ${pos.w} select-none cursor-pointer z-30`}
//           style={{ ...pos.style, willChange: "transform" }}
//           draggable={false}
//           // use onMouse* for hover on desktop, pointer for cross-input
//           onMouseEnter={() => handleEnter(i)}
//           onMouseLeave={() => handleLeave(i)}
//           onPointerDown={() => {
//             handlePress(i);
//             handleDown(i);
//           }}
//           onPointerUp={() => handleRelease(i)}
//           onTouchStart={() => {
//             handlePress(i);
//             handleDown(i);
//           }}
//           onTouchEnd={() => handleRelease(i)}
//         />
//       ))}

//       {/* base line pairs */}
//       {baseLines.map((pos, i) => (
//         <LinePair key={`base-line-${i}`} pos={pos} />
//       ))}

//       {/* extra line pairs for desktop (more short + long) */}
//       {desktopLines.map((pos, i) => (
//         <LinePair
//           key={`desk-line-${i}`}
//           pos={pos}
//           long="w-56 md:w-[28rem]"
//           short="w-20 md:w-32"
//         />
//       ))}

//       {/* headline — allow clicks through so clouds receive hover */}
//       <div className="absolute inset-0 flex items-center justify-center px-6 z-40 pointer-events-none">
//         <h1 className="font-bricolage font-extrabold lowercase text-center leading-tight text-white text-3xl sm:text-4xl md:text-6xl">
//           more than just pretty pictures.
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default FirstPage;

// import React, {
//   useMemo,
//   useRef,
//   useLayoutEffect,
//   useState,
//   useEffect
// } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { evolveLogo, cloud, line } from "../../assets/images";

// gsap.registerPlugin(ScrollTrigger);

// // ---------- tweakables ----------
// const HOLD_ON_LOAD_MS = 1100; // how long to freeze scroll on first visit
// const PIN_DISTANCE_DESKTOP = 900; // how many px of scroll to keep hero pinned
// const PIN_DISTANCE_MOBILE = 600;
// // --------------------------------

// const FirstPage = () => {
//   const containerRef = useRef(null);
//   const cloudRefs = useRef([]);
//   const dotRefs = useRef([]);

//   const [isDesktop, setIsDesktop] = useState(
//     typeof window !== "undefined" ? window.innerWidth >= 768 : true
//   );
//   useEffect(() => {
//     const onResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // soft time-based hold on first load (only if at the very top, and only once per session)
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const alreadyHeld = sessionStorage.getItem("fpHoldDone") === "1";
//     const atTop = window.scrollY <= 10;
//     if (!atTop || alreadyHeld) return;

//     const prevent = (e) => e.preventDefault();
//     const keyPrevent = (e) => {
//       const keys = [
//         "ArrowDown",
//         "ArrowUp",
//         "PageDown",
//         "PageUp",
//         "Home",
//         "End",
//         " "
//       ];
//       if (keys.includes(e.key)) e.preventDefault();
//     };

//     const lock = () => {
//       // keep pointer interactions working, just block scroll
//       document.body.style.overflow = "hidden";
//       document.body.style.overscrollBehavior = "contain";
//       window.addEventListener("wheel", prevent, { passive: false });
//       window.addEventListener("touchmove", prevent, { passive: false });
//       window.addEventListener("keydown", keyPrevent, { passive: false });
//     };
//     const unlock = () => {
//       document.body.style.overflow = "";
//       document.body.style.overscrollBehavior = "";
//       window.removeEventListener("wheel", prevent);
//       window.removeEventListener("touchmove", prevent);
//       window.removeEventListener("keydown", keyPrevent);
//       sessionStorage.setItem("fpHoldDone", "1");
//     };

//     lock();
//     const t = setTimeout(unlock, HOLD_ON_LOAD_MS);
//     return () => {
//       clearTimeout(t);
//       unlock();
//     };
//   }, []);

//   // clouds
//   const clouds = useMemo(
//     () => [
//       { style: { top: "8%", left: "6%" }, w: "w-28 md:w-40" },
//       { style: { top: "18%", right: "8%" }, w: "w-24 md:w-36" },
//       { style: { bottom: "12%", left: "10%" }, w: "w-24 md:w-36" },
//       { style: { top: "55%", right: "20%" }, w: "w-20 md:w-28" },
//       { style: { top: "35%", left: "35%" }, w: "w-24 md:w-36" }
//     ],
//     []
//   );

//   // base lines for all screens
//   const baseLines = useMemo(
//     () => [
//       { top: "14%", left: "10%" },
//       { top: "28%", right: "12%" },
//       { top: "46%", left: "8%" },
//       { top: "62%", right: "16%" },
//       { top: "78%", left: "18%" }
//     ],
//     []
//   );

//   // extra lines only on desktop
//   const desktopLines = useMemo(
//     () =>
//       isDesktop
//         ? [
//             { top: "10%", right: "24%" },
//             { top: "20%", left: "28%" },
//             { top: "34%", right: "30%" },
//             { top: "50%", left: "22%" },
//             { top: "58%", right: "10%" },
//             { top: "70%", left: "32%" },
//             { top: "86%", right: "22%" }
//           ]
//         : [],
//     [isDesktop]
//   );

//   // blinking dots in evolve-inchworm
//   const dots = useMemo(
//     () =>
//       Array.from({ length: isDesktop ? 120 : 36 }, () => ({
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: 2 + Math.random() * 2, // px
//         delay: Math.random() * 1.5,
//         dur: 0.9 + Math.random() * 0.9
//       })),
//     [isDesktop]
//   );

//   // gsap animations
//   useLayoutEffect(() => {
//     const ctx = gsap.context(() => {
//       // pin the hero for a short scroll distance so users dwell here
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top top",
//         end: `+=${isDesktop ? PIN_DISTANCE_DESKTOP : PIN_DISTANCE_MOBILE}`,
//         pin: true,
//         pinSpacing: true,
//         anticipatePin: 1
//       });

//       // cloud drift
//       cloudRefs.current.forEach((el, i) => {
//         if (!el) return;
//         gsap.to(el, {
//           x: 24 + Math.random() * 18,
//           y: "+=" + (Math.random() * 10 - 5),
//           duration: 4 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: i * 0.2
//         });
//       });

//       // dots pulse
//       dotRefs.current.forEach((el, i) => {
//         if (!el) return;
//         const d = dots[i];
//         gsap.to(el, {
//           opacity: 1,
//           scale: 1.6,
//           duration: d.dur,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1,
//           delay: d.delay
//         });
//         gsap.to(el, {
//           x: "+=" + (Math.random() * 8 - 4),
//           y: "+=" + (Math.random() * 8 - 4),
//           duration: 3 + Math.random() * 2,
//           ease: "sine.inOut",
//           yoyo: true,
//           repeat: -1
//         });
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [dots, isDesktop]);

//   // pointer interactions for clouds (hover + tap)
//   const handleEnter = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1.06, duration: 0.18, ease: "power2.out" });
//   };

//   const handleLeave = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1, duration: 0.18, ease: "power2.out" });
//   };
//   const handlePress = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1.06, duration: 0.15, ease: "power2.out" });
//   };

//   const handleRelease = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
//   };

//   const handleDown = (i) => {
//     const el = cloudRefs.current[i];
//     if (!el) return;
//     gsap.to(el, {
//       x: "+=" + (8 + Math.random() * 18),
//       y: "+=" + (Math.random() * 6 - 3),
//       duration: 0.25,
//       ease: "power2.out",
//       yoyo: true,
//       repeat: 1
//     });
//     gsap.fromTo(
//       el,
//       { scale: 1.06 },
//       { scale: 1, duration: 0.35, ease: "power2.inOut" }
//     );
//   };

//   // config for line pairs
//   const LINE_CFG = {
//     long: { mobile: "w-56", desktop: "md:w-[30rem]" },
//     short: { mobile: "w-24", desktop: "md:w-30" },
//     height: { main: "h-[2px] md:h-[3px]", follower: "h-[1px] md:h-[2px]" },
//     opacity: {
//       main: "opacity-80",
//       follower: "opacity-60",
//       faintMain: "opacity-40",
//       faintFollower: "opacity-30"
//     }
//   };

//   const LinePair = ({ pos, variant = "default" }) => {
//     const mainOpacity =
//       variant === "faint" ? LINE_CFG.opacity.faintMain : LINE_CFG.opacity.main;
//     const followerOpacity =
//       variant === "faint"
//         ? LINE_CFG.opacity.faintFollower
//         : LINE_CFG.opacity.follower;

//     return (
//       <div
//         className="absolute flex items-center pointer-events-none select-none z-20"
//         style={pos}
//       >
//         <img
//           src={line}
//           alt="line"
//           className={`${LINE_CFG.height.main} ${LINE_CFG.long.mobile} ${LINE_CFG.long.desktop} ${mainOpacity}`}
//           draggable={false}
//         />
//         <img
//           src={line}
//           alt="line thin"
//           className={`${LINE_CFG.height.follower} ${LINE_CFG.short.mobile} ${LINE_CFG.short.desktop} ${followerOpacity} ml-2`}
//           draggable={false}
//         />
//       </div>
//     );
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen bg-black overflow-hidden"
//     >
//       {/* blinking dots behind everything */}
//       {dots.map((d, i) => (
//         <div
//           key={`dot-${i}`}
//           ref={(el) => (dotRefs.current[i] = el)}
//           className="absolute rounded-full bg-evolve-inchworm opacity-60 pointer-events-none z-10"
//           style={{
//             left: `${d.x}%`,
//             top: `${d.y}%`,
//             width: `${d.size}px`,
//             height: `${d.size}px`,
//             boxShadow: "0 0 8px rgba(194,253,92,0.6)",
//             willChange: "transform, opacity"
//           }}
//         />
//       ))}

//       {/* clouds (interactive) */}
//       {clouds.map((pos, i) => (
//         <img
//           key={`cloud-${i}`}
//           src={cloud}
//           alt="cloud"
//           ref={(el) => (cloudRefs.current[i] = el)}
//           className={`absolute ${pos.w} select-none cursor-pointer z-30`}
//           style={{ ...pos.style, willChange: "transform" }}
//           draggable={false}
//           onMouseEnter={() => handleEnter(i)}
//           onMouseLeave={() => handleLeave(i)}
//           onPointerDown={() => {
//             handlePress(i);
//             handleDown(i);
//           }}
//           onPointerUp={() => handleRelease(i)}
//           onTouchStart={() => {
//             handlePress(i);
//             handleDown(i);
//           }}
//           onTouchEnd={() => handleRelease(i)}
//         />
//       ))}

//       {/* base line pairs */}
//       {baseLines.map((pos, i) => (
//         <LinePair key={`base-line-${i}`} pos={pos} />
//       ))}

//       {/* extra line pairs for desktop */}
//       {desktopLines.map((pos, i) => (
//         <LinePair key={`desk-line-${i}`} pos={pos} />
//       ))}

//       {/* headline — allow clicks through so clouds receive hover */}
//       <div className="absolute inset-0 flex items-center justify-center px-6 z-40 pointer-events-none">
//         <h1 className="font-bricolage font-extrabold lowercase text-center leading-tight text-white text-3xl sm:text-4xl md:text-6xl">
//           more than just pretty pictures.
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default FirstPage;

// src/components/sections/FirstPage.jsx
import React, {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cloud, line } from "../../assets/images";

gsap.registerPlugin(ScrollTrigger);

// how long the section stays pinned (must be long enough for 2 swaps)
const TEXT_SCROLL_SPAN = 3200;

const FirstPage = () => {
  const containerRef = useRef(null);
  const cloudRefs = useRef([]);
  const dotRefs = useRef([]);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // clouds positioned to avoid text overlap
  const clouds = useMemo(
    () => [
      { style: { top: "5%", left: "3%" }, w: "w-28 md:w-40" },
      { style: { top: "10%", right: "5%" }, w: "w-24 md:w-36" },
      { style: { bottom: "8%", left: "6%" }, w: "w-24 md:w-36" },
      { style: { bottom: "12%", right: "8%" }, w: "w-20 md:w-28" },
      { style: { top: "6%", left: "45%" }, w: "w-16 md:w-24" }
    ],
    []
  );

  // lines positioned to avoid text areas
  const baseLines = useMemo(
    () => [
      { top: "8%", left: "5%" },
      { top: "18%", right: "8%" },
      { top: "82%", left: "12%" },
      { top: "88%", right: "15%" },
      { top: "92%", left: "25%" }
    ],
    []
  );
  const desktopLines = useMemo(
    () =>
      isDesktop
        ? [
            { top: "6%", right: "20%" },
            { top: "12%", left: "3%" },
            { top: "15%", right: "5%" },
            { top: "85%", left: "8%" },
            { top: "90%", right: "3%" },
            { top: "94%", left: "35%" },
            { top: "96%", right: "18%" }
          ]
        : [],
    [isDesktop]
  );

  // dots with safe zones to avoid text areas
  const dots = useMemo(() => {
    const dots = [];
    const textSafeZones = [
      // Main text area (center)
      { x: 20, y: 30, width: 60, height: 40 },
      // Additional padding around center
      { x: 15, y: 25, width: 70, height: 50 }
    ];

    const isInSafeZone = (x, y) => {
      return textSafeZones.some(
        (zone) =>
          x >= zone.x &&
          x <= zone.x + zone.width &&
          y >= zone.y &&
          y <= zone.y + zone.height
      );
    };

    for (let i = 0; i < (isDesktop ? 120 : 36); i++) {
      let x, y;
      let attempts = 0;
      do {
        x = Math.random() * 100;
        y = Math.random() * 100;
        attempts++;
      } while (isInSafeZone(x, y) && attempts < 10);

      dots.push({
        x,
        y,
        size: 2 + Math.random() * 2,
        delay: Math.random() * 1.5,
        dur: 0.9 + Math.random() * 0.9
      });
    }
    return dots;
  }, [isDesktop]);

  // ambient motion with transform3d for better performance
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial transform to prevent layout shifts
      cloudRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          transformOrigin: "center center",
          force3D: true
        });
        gsap.to(el, {
          x: 24 + Math.random() * 18,
          y: "+=" + (Math.random() * 10 - 5),
          duration: 4 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.2
        });
      });

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = dots[i];
        gsap.set(el, {
          transformOrigin: "center center",
          force3D: true
        });
        gsap.to(el, {
          opacity: 1,
          scale: 1.6,
          duration: d.dur,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: d.delay
        });
        gsap.to(el, {
          x: "+=" + (Math.random() * 8 - 4),
          y: "+=" + (Math.random() * 8 - 4),
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [dots]);

  // TEXT TIMELINE (single pin, long end)
  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const q = gsap.utils.selector(containerRef);

  //     // visibility
  //     gsap.set(q("#g1"), { autoAlpha: 1 });
  //     gsap.set([q("#g2"), q("#g3")], { autoAlpha: 0 });

  //     // intro pop (no scroll needed)
  //     gsap.from([q("#t1"), q("#t2"), q("#t3")], {
  //       y: 28,
  //       autoAlpha: 0,
  //       duration: 0.6,
  //       stagger: 0.14,
  //       ease: "power2.out"
  //     });

  //     // single ScrollTrigger that keeps this page pinned
  //     const tl = gsap.timeline({
  //       defaults: { ease: "power2.out" },
  //       scrollTrigger: {
  //         trigger: containerRef.current,
  //         start: "top top",
  //         end: `+=${TEXT_SCROLL_SPAN}`, // <- long pin so next page doesn't appear yet
  //         scrub: true,
  //         pin: true,
  //         pinSpacing: true, // <- spacer keeps next section from sliding up
  //         anticipatePin: 1
  //       }
  //     });

  //     // segment A (first scroll chunk): t3 -> t4 (same spot)
  //     tl.to(q("#t3"), { autoAlpha: 0, y: -14, duration: 0.5 }, "+=0.25").to(
  //       q("#g2"),
  //       { autoAlpha: 1, duration: 0.6 },
  //       "<"
  //     );

  //     // segment B (second scroll chunk): hide g1+g2, show g3 centered
  //     tl.to([q("#g1"), q("#g2")], { autoAlpha: 0, duration: 0.6 }, "+=0.6").to(
  //       q("#g3"),
  //       { autoAlpha: 1, duration: 0.9 },
  //       "<"
  //     );
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  // TEXT TIMELINE (single pin, long end)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(containerRef);

      // visibility - set initial states more explicitly
      gsap.set(q("#g1"), { autoAlpha: 1 });
      gsap.set([q("#g2"), q("#g3")], { autoAlpha: 0 });
      // Explicitly set t3 initial state
      gsap.set(q("#t3"), { autoAlpha: 1, y: 0 });

      // intro pop (no scroll needed)
      gsap.from([q("#t1"), q("#t2"), q("#t3")], {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.14,
        ease: "power2.out"
      });

      // single ScrollTrigger that keeps this page pinned
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${TEXT_SCROLL_SPAN}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          // Add refresh on resize to recalculate positions
          invalidateOnRefresh: true
        }
      });

      // segment A (first scroll chunk): t3 -> t4 (same spot)
      // Add explicit from state for t3 to ensure proper reverse animation
      tl.fromTo(
        q("#t3"),
        { autoAlpha: 1, y: 0 }, // from state
        { autoAlpha: 0, y: -14, duration: 0.5 },
        "+=0.25"
      ).to(q("#g2"), { autoAlpha: 1, duration: 0.6 }, "<");

      // segment B (second scroll chunk): hide g1+g2, show g3 centered
      tl.to([q("#g1"), q("#g2")], { autoAlpha: 0, duration: 0.6 }, "+=0.6").to(
        q("#g3"),
        { autoAlpha: 1, duration: 0.9 },
        "<"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // line pair
  const LINE_CFG = {
    long: { mobile: "w-56", desktop: "md:w-[30rem]" },
    short: { mobile: "w-24", desktop: "md:w-30" },
    height: { main: "h-[2px] md:h-[3px]", follower: "h-[1px] md:h-[2px]" },
    opacity: {
      main: "opacity-80",
      follower: "opacity-60",
      faintMain: "opacity-40",
      faintFollower: "opacity-30"
    }
  };
  const LinePair = ({ pos, variant = "default" }) => {
    const mainOpacity =
      variant === "faint" ? LINE_CFG.opacity.faintMain : LINE_CFG.opacity.main;
    const followerOpacity =
      variant === "faint"
        ? LINE_CFG.opacity.faintFollower
        : LINE_CFG.opacity.follower;
    return (
      <div
        className="absolute flex items-center pointer-events-none select-none z-20"
        style={pos}
      >
        <img
          src={line}
          alt="line"
          className={`${LINE_CFG.height.main} ${LINE_CFG.long.mobile} ${LINE_CFG.long.desktop} ${mainOpacity}`}
          draggable={false}
        />
        <img
          src={line}
          alt="line thin"
          className={`${LINE_CFG.height.follower} ${LINE_CFG.short.mobile} ${LINE_CFG.short.desktop} ${followerOpacity} ml-2`}
          draggable={false}
        />
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden"
      style={{ willChange: "auto" }}
    >
      {/* STATIC BACKGROUND LAYER - Fixed positioning to prevent shifts */}
      <div className="fixed inset-0 z-0" style={{ willChange: "auto" }}>
        {/* dots with safe positioning */}
        {dots.map((d, i) => (
          <div
            key={`dot-${i}`}
            ref={(el) => (dotRefs.current[i] = el)}
            className="absolute rounded-full bg-evolve-inchworm opacity-40 pointer-events-none"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.size}px`,
              height: `${d.size}px`,
              boxShadow: "0 0 6px rgba(194,253,92,0.4)",
              transform: "translate3d(0,0,0)"
            }}
          />
        ))}

        {/* lines */}
        {baseLines.map((pos, i) => (
          <LinePair key={`base-line-${i}`} pos={pos} />
        ))}
        {desktopLines.map((pos, i) => (
          <LinePair key={`desk-line-${i}`} pos={pos} />
        ))}
      </div>

      {/* clouds */}
      {clouds.map((pos, i) => (
        <img
          key={`cloud-${i}`}
          src={cloud}
          alt="cloud"
          ref={(el) => (cloudRefs.current[i] = el)}
          className={`absolute ${pos.w} select-none cursor-pointer z-30`}
          style={{ ...pos.style, willChange: "transform" }}
          draggable={false}
          onMouseEnter={() =>
            gsap.to(cloudRefs.current[i], { scale: 1.06, duration: 0.18 })
          }
        />
      ))}

      {/* TEXTS - Fixed positioning structure */}
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          {/* Group 1: First three texts with fixed layout */}
          <div id="g1" className="relative">
            <h1
              id="t1"
              className="font-bricolage font-extrabold text-white text-4xl sm:text-5xl md:text-7xl leading-tight lowercase"
            >
              more than just pretty pictures.
            </h1>
            <p
              id="t2"
              className="font-bricolage font-bold text-evolve-inchworm text-2xl sm:text-3xl md:text-4xl mt-5 lowercase"
            >
              design isn't just about creating pretty things.
            </p>
            <p
              id="t3"
              className="font-bricolage text-evolve-inchworm text-lg sm:text-xl md:text-2xl mt-5 lowercase"
            >
              it's how cities breathe, brands speak, revolutions succeed, and
              ideas move...
            </p>
          </div>

          {/* Group 2: Text 4 positioned absolutely to replace text 3 exactly */}
          <div
            id="g2"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              {/* Invisible spacer to match t1 + t2 + margins exactly */}
              <div className="invisible">
                <h1 className="font-bricolage font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight lowercase">
                  more than just pretty pictures.
                </h1>
                <p className="font-bricolage font-bold text-2xl sm:text-3xl md:text-4xl mt-5 lowercase">
                  design isn't just about creating pretty things.
                </p>
              </div>
              {/* Text 4 positioned exactly where text 3 would be */}
              <p
                id="t4"
                className="font-bricolage font-bold text-evolve-inchworm text-lg sm:text-xl md:text-2xl mt-5 lowercase"
              >
                it's the difference between noise and a note you can't forget.
              </p>
            </div>
          </div>

          {/* Group 3: Final centered text */}
          <div
            id="g3"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-center lowercase">
              <h2 className="font-bricolage font-extrabold text-white text-4xl sm:text-5xl md:text-7xl leading-tight">
                learn it young…
              </h2>
              <p className="font-bricolage font-extrabold text-evolve-inchworm text-lg sm:text-xl md:text-2xl mt-3">
                and the world can't unsee you
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstPage;
