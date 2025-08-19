// import React, {
//   useMemo,
//   useRef,
//   useLayoutEffect,
//   useState,
//   useEffect
// } from "react";
// import gsap from "gsap";
// import { evolveLogo, cloud, cloud_1, line } from "../../assets/images";

// const ThirdPage = () => {
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
//       className="relative w-screen h-screen bg-evolve-lavender-indigo overflow-hidden"
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
//           src={cloud_1}
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
//           Welcome to Your Creative Home Base
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default ThirdPage;

import React, {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { evolveLogo, cloud, cloud_1, line } from "../../assets/images";

gsap.registerPlugin(ScrollTrigger);

// ---------- tweakables ----------
const HOLD_ON_LOAD_MS = 1100; // time-based scroll freeze (only if at page top, once per session)
const PIN_DISTANCE_DESKTOP = 900; // how long to pin this section on desktop
const PIN_DISTANCE_MOBILE = 600; // how long to pin on mobile
// --------------------------------

const ThirdPage = () => {
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

  // soft time-based hold on first load (only if at the very top, and only once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const alreadyHeld = sessionStorage.getItem("tpHoldDone") === "1";
    const atTop = window.scrollY <= 10;
    if (!atTop || alreadyHeld) return;

    const prevent = (e) => e.preventDefault();
    const keyPrevent = (e) => {
      const keys = [
        "ArrowDown",
        "ArrowUp",
        "PageDown",
        "PageUp",
        "Home",
        "End",
        " "
      ];
      if (keys.includes(e.key)) e.preventDefault();
    };

    const lock = () => {
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      window.addEventListener("wheel", prevent, { passive: false });
      window.addEventListener("touchmove", prevent, { passive: false });
      window.addEventListener("keydown", keyPrevent, { passive: false });
    };
    const unlock = () => {
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
      window.removeEventListener("keydown", keyPrevent);
      sessionStorage.setItem("tpHoldDone", "1");
    };

    lock();
    const t = setTimeout(unlock, HOLD_ON_LOAD_MS);
    return () => {
      clearTimeout(t);
      unlock();
    };
  }, []);

  // clouds
  const clouds = useMemo(
    () => [
      { style: { top: "8%", left: "6%" }, w: "w-28 md:w-40" },
      { style: { top: "18%", right: "8%" }, w: "w-24 md:w-36" },
      { style: { bottom: "12%", left: "10%" }, w: "w-24 md:w-36" },
      { style: { top: "55%", right: "20%" }, w: "w-20 md:w-28" },
      { style: { top: "35%", left: "35%" }, w: "w-24 md:w-36" }
    ],
    []
  );

  // base lines for all screens
  const baseLines = useMemo(
    () => [
      { top: "14%", left: "10%" },
      { top: "28%", right: "12%" },
      { top: "46%", left: "8%" },
      { top: "62%", right: "16%" },
      { top: "78%", left: "18%" }
    ],
    []
  );

  // extra lines only on desktop
  const desktopLines = useMemo(
    () =>
      isDesktop
        ? [
            { top: "10%", right: "24%" },
            { top: "20%", left: "28%" },
            { top: "34%", right: "30%" },
            { top: "50%", left: "22%" },
            { top: "58%", right: "10%" },
            { top: "70%", left: "32%" },
            { top: "86%", right: "22%" }
          ]
        : [],
    [isDesktop]
  );

  // blinking dots in evolve-inchworm
  const dots = useMemo(
    () =>
      Array.from({ length: isDesktop ? 120 : 36 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 2, // px
        delay: Math.random() * 1.5,
        dur: 0.9 + Math.random() * 0.9
      })),
    [isDesktop]
  );

  // gsap animations + pin
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // pin to create scroll dwell
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${isDesktop ? PIN_DISTANCE_DESKTOP : PIN_DISTANCE_MOBILE}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      });

      // cloud drift
      cloudRefs.current.forEach((el, i) => {
        if (!el) return;
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

      // dots pulse
      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = dots[i];
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
  }, [dots, isDesktop]);

  // pointer interactions for clouds (hover + tap)
  const handleEnter = (i) => {
    const el = cloudRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1.06, duration: 0.18, ease: "power2.out" });
  };

  const handleLeave = (i) => {
    const el = cloudRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.18, ease: "power2.out" });
  };
  const handlePress = (i) => {
    const el = cloudRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1.06, duration: 0.15, ease: "power2.out" });
  };

  const handleRelease = (i) => {
    const el = cloudRefs.current[i];
    if (!el) return;
    gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const handleDown = (i) => {
    const el = cloudRefs.current[i];
    if (!el) return;
    gsap.to(el, {
      x: "+=" + (8 + Math.random() * 18),
      y: "+=" + (Math.random() * 6 - 3),
      duration: 0.25,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
    gsap.fromTo(
      el,
      { scale: 1.06 },
      { scale: 1, duration: 0.35, ease: "power2.inOut" }
    );
  };

  // config you can tweak
  const LINE_CFG = {
    long: { mobile: "w-56", desktop: "md:w-[30rem]" }, // main line width
    short: { mobile: "w-24", desktop: "md:w-30" }, // follower line width
    height: { main: "h-[2px] md:h-[3px]", follower: "h-[1px] md:h-[2px]" },
    opacity: {
      main: "opacity-80",
      follower: "opacity-60",
      faintMain: "opacity-40",
      faintFollower: "opacity-30"
    }
  };

  // helper to render a line pair, supports faint variant
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
      className="relative w-screen h-screen bg-evolve-lavender-indigo overflow-hidden"
    >
      {/* blinking dots behind everything */}
      {dots.map((d, i) => (
        <div
          key={`dot-${i}`}
          ref={(el) => (dotRefs.current[i] = el)}
          className="absolute rounded-full bg-evolve-inchworm opacity-60 pointer-events-none z-10"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            boxShadow: "0 0 8px rgba(194,253,92,0.6)",
            willChange: "transform, opacity"
          }}
        />
      ))}

      {/* clouds (interactive) */}
      {clouds.map((pos, i) => (
        <img
          key={`cloud-${i}`}
          src={cloud_1}
          alt="cloud"
          ref={(el) => (cloudRefs.current[i] = el)}
          className={`absolute ${pos.w} select-none cursor-pointer z-30`}
          style={{ ...pos.style, willChange: "transform" }}
          draggable={false}
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={() => handleLeave(i)}
          onPointerDown={() => {
            handlePress(i);
            handleDown(i);
          }}
          onPointerUp={() => handleRelease(i)}
          onTouchStart={() => {
            handlePress(i);
            handleDown(i);
          }}
          onTouchEnd={() => handleRelease(i)}
        />
      ))}

      {/* base line pairs */}
      {baseLines.map((pos, i) => (
        <LinePair key={`base-line-${i}`} pos={pos} />
      ))}

      {/* extra line pairs for desktop (more short + long) */}
      {desktopLines.map((pos, i) => (
        <LinePair key={`desk-line-${i}`} pos={pos} />
      ))}

      {/* headline — allow clicks through so clouds receive hover */}
      <div className="absolute inset-0 flex items-center justify-center px-6 z-40 pointer-events-none">
        <h1 className="font-bricolage font-extrabold lowercase text-center leading-tight text-white text-3xl sm:text-4xl md:text-6xl">
          welcome to your creative home base
        </h1>
      </div>
    </section>
  );
};

export default ThirdPage;
