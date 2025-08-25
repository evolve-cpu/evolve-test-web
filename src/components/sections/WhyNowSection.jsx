// import React, { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const WhyNowSection = () => {
//   const rootRef = useRef(null);
//   const pinRef = useRef(null);
//   const whyRef = useRef(null);
//   const midRefs = useRef([]);
//   const lastRef = useRef(null);

//   useLayoutEffect(() => {
//     if (!pinRef.current) return;

//     const ctx = gsap.context(() => {
//       const mids = midRefs.current.filter(Boolean);

//       // initial states
//       gsap.set([whyRef.current, ...mids, lastRef.current], {
//         transformOrigin: "50% 50%",
//         force3D: true,
//         willChange: "transform, opacity"
//       });
//       gsap.set(mids, { yPercent: 120, autoAlpha: 0 });
//       gsap.set(lastRef.current, { yPercent: 120, autoAlpha: 0 });
//       gsap.set(whyRef.current, { yPercent: 0, autoAlpha: 1 });

//       const tl = gsap.timeline({
//         defaults: { ease: "none" },
//         scrollTrigger: {
//           trigger: pinRef.current,
//           start: "top top",
//           end: "+=2600", // scroll distance — tweak if you want longer/shorter
//           scrub: 0.35, // smoothing
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1,
//           fastScrollEnd: true,
//           invalidateOnRefresh: true
//         }
//       });

//       // 1) why now → move up & out
//       tl.to(whyRef.current, { yPercent: -120, autoAlpha: 0, duration: 0.5 });

//       // 2) three lines, one by one (in → hold → out)
//       mids.forEach((el) => {
//         tl.to(el, { yPercent: 0, autoAlpha: 1, duration: 0.6 });
//         tl.to({}, { duration: 0.25 }); // tiny hold
//         tl.to(el, { yPercent: -120, autoAlpha: 0, duration: 0.5 });
//       });

//       // 3) final line → in and hold on center
//       tl.to(lastRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.6 });
//       tl.to({}, { duration: 0.4 }); // optional hold at the end
//     }, rootRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={rootRef}
//       className="bg-black text-white font-bricolage lowercase"
//     >
//       <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
//         {/* centered stage */}
//         <div className="absolute inset-0 flex items-center justify-center px-6">
//           {/* why now (big) */}
//           <div
//             ref={whyRef}
//             className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
//           >
//             <h1 className="text-6xl md:text-9xl font-extrabold text-center leading-none">
//               why now
//             </h1>
//           </div>

//           {/* mid lines (smaller, appear one by one) */}
//           <div
//             ref={(el) => (midRefs.current[0] = el)}
//             className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
//           >
//             <p className="text-2xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
//               ai is rewriting the creative playbook. surface‑level skills won’t
//               hold value for long.
//             </p>
//           </div>

//           <div
//             ref={(el) => (midRefs.current[1] = el)}
//             className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
//           >
//             <p className="text-2xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
//               the earlier you gain clarity, the bigger your long‑term advantage.
//             </p>
//           </div>

//           <div
//             ref={(el) => (midRefs.current[2] = el)}
//             className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
//           >
//             <p className="text-2xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
//               in design, you either evolve… or risk fading out.
//             </p>
//           </div>

//           {/* final line (same size as mid lines) */}
//           <div
//             ref={lastRef}
//             className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
//           >
//             <p className="text-2xl md:text-5xl font-extrabold text-center max-w-5xl leading-snug">
//               …and for that, you need more than one play. you need a toolkit to
//               learn, connect, and grow
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyNowSection;

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhyNowSection = () => {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const whyRef = useRef(null);
  const midsRef = useRef(null);
  const lastRef = useRef(null);

  useLayoutEffect(() => {
    if (!pinRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([whyRef.current, midsRef.current, lastRef.current], {
        transformOrigin: "50% 50%",
        force3D: true,
        willChange: "transform, opacity"
      });

      gsap.set(midsRef.current, { yPercent: 120, autoAlpha: 0 });
      gsap.set(lastRef.current, { yPercent: 120, autoAlpha: 0 });
      gsap.set(whyRef.current, { yPercent: 0, autoAlpha: 1 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "+=2600",
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        }
      });

      // step 1: why now out
      tl.to(whyRef.current, { yPercent: -120, autoAlpha: 0, duration: 0.5 });

      // step 2: mid block fades in & holds
      tl.to(midsRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.8 });
      tl.to({}, { duration: 0.5 }); // hold time
      tl.to(midsRef.current, { yPercent: -120, autoAlpha: 0, duration: 0.5 });

      // step 3: final line in
      tl.to(lastRef.current, { yPercent: 0, autoAlpha: 1, duration: 0.8 });
      tl.to({}, { duration: 0.5 }); // optional hold
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-black text-white font-bricolage lowercase"
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center px-6">
          {/* why now */}
          <div
            ref={whyRef}
            className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold text-center leading-none">
              why now?
            </h1>
          </div>

          {/* mid lines together */}
          <div
            ref={midsRef}
            className="absolute inset-0 flex flex-col items-center justify-center space-y-10 transform-gpu will-change-transform"
          >
            <p className="text-3xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
              ai is rewriting the creative playbook. surface-level skills won’t
              hold value for long.
            </p>
            <p className="text-2xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
              the earlier you gain clarity, the bigger your long-term advantage.
            </p>
            <p className="text-2xl md:text-5xl font-extrabold text-center max-w-4xl leading-snug">
              in design, you either evolve… or risk fading out.
            </p>
          </div>

          {/* final line */}
          <div
            ref={lastRef}
            className="absolute inset-0 flex items-center justify-center transform-gpu will-change-transform"
          >
            <p className="text-2xl md:text-5xl font-extrabold text-center max-w-5xl leading-snug">
              …and for that, you need more than one play. you need a toolkit to
              learn, connect, and grow
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNowSection;
