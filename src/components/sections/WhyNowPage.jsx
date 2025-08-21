// // src/components/sections/WhyNowPage.jsx
// import React, { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // tune how long the section stays pinned while animating
// const SCROLL_SPAN_PX = 2600;

// const WhyNowPage = () => {
//   const pinRef = useRef(null);
//   const headingRef = useRef(null);
//   const listRef = useRef(null);

//   const lines = [
//     "ai is rewriting the creative playbook. surface-level skills won’t hold value for long.",
//     "the earlier you gain clarity, the bigger your long-term advantage.",
//     "in design, you either evolve… or risk fading out.",
//     "this course is designed to equip you to thrive in it, with confidence, awareness, and skills you can actually use."
//   ];

//   useLayoutEffect(() => {
//     if (!pinRef.current) return;

//     const ctx = gsap.context(() => {
//       const items = gsap.utils.toArray(".why-item");

//       // initial states
//       gsap.set(items, { opacity: 0, y: 24 });
//       gsap.set(headingRef.current, { opacity: 1, y: 0 });

//       // timeline scrubbed by scroll
//       const tl = gsap.timeline({
//         defaults: { ease: "power2.out" },
//         scrollTrigger: {
//           trigger: pinRef.current,
//           start: "top top",
//           end: `+=${SCROLL_SPAN_PX}`,
//           scrub: 0.35,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1
//         }
//       });

//       // 1) move heading up toward the top as user starts scrolling
//       tl.to(headingRef.current, { y: "-28vh", duration: 0.8 });

//       // 2) reveal bottom lines one-by-one from the bottom slot
//       tl.to(
//         items,
//         {
//           opacity: 1,
//           y: 0,
//           stagger: { each: 0.45, ease: "power1.out" },
//           duration: 0.6
//         },
//         "+=0.1"
//       );
//     }, pinRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="relative w-screen h-screen bg-black text-white font-bricolage lowercase overflow-hidden">
//       <div
//         ref={pinRef}
//         className="relative h-screen w-full max-w-[1200px] mx-auto"
//       >
//         {/* centered heading that slides up */}
//         <div
//           ref={headingRef}
//           className="absolute inset-0 flex items-center justify-center px-6 text-center"
//         >
//           <h1 className="font-extrabold leading-tight text-4xl sm:text-5xl md:text-7xl">
//             why now?
//           </h1>
//         </div>

//         {/* bottom reveal stack */}
//         <div ref={listRef} className="absolute inset-x-0 bottom-6 px-6 md:px-8">
//           <div className="mx-auto max-w-3xl space-y-3 md:space-y-4">
//             {lines.map((t, i) => (
//               <p
//                 key={i}
//                 className="why-item leading-tight text-base sm:text-lg md:text-2xl text-white"
//               >
//                 {t}
//               </p>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyNowPage;

// src/components/sections/WhyNowPage.jsx
import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// tune if needed
const SCROLL_SPAN = 2600;   // total scroll while pinned
const ENTER_DUR   = 0.6;    // each line's rise/fade-in
const FADE_OLD    = 0.3;    // dim previous line after next appears

const WhyNowPage = () => {
  const rootRef = useRef(null);
  const headRef = useRef(null);
  const slotRef = useRef(null);
  const lineRefs = useRef([]);

  const lines = useMemo(
    () => [
      "ai is rewriting the creative playbook. surface-level skills won’t hold value for long.",
      "the earlier you gain clarity, the bigger your long-term advantage.",
      "in design, you either evolve… or risk fading out.",
      "this course is designed to equip you to thrive in it, with confidence, awareness, and skills you can actually use."
    ],
    []
  );

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // starting states
      gsap.set(headRef.current, { yPercent: 0, opacity: 1 });
      gsap.set(lineRefs.current, { y: 36, opacity: 0.12 }); // sit below, dim
      gsap.set(slotRef.current, { opacity: 1 });            // reveal window

      // master timeline
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${SCROLL_SPAN}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
        }
      });

      // move heading up like a title that clears the screen
      tl.to(headRef.current, { yPercent: -40, opacity: 1, duration: 0.7 });

      // credits-style: each line rises from the bottom slot
      lineRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(el, { y: 0, opacity: 1, duration: ENTER_DUR }, "+=0.12");
        // gently dim the previous line after the next one arrives
        if (i > 0) {
          tl.to(lineRefs.current[i - 1], { opacity: 0.35, duration: FADE_OLD }, "<+0.15");
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate w-screen h-screen bg-black text-white font-bricolage lowercase overflow-hidden"
    >
      {/* big centered heading */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1
          ref={headRef}
          className="font-extrabold leading-tight text-5xl sm:text-6xl md:text-8xl text-center"
        >
          why now?
        </h1>
      </div>

      {/* credits window near bottom; lines roll up from here */}
      <div
        ref={slotRef}
        className="absolute inset-x-0 bottom-8 px-6 md:px-10 lg:px-16 overflow-hidden"
      >
        <div className="relative mx-auto w-full max-w-5xl">
          {/* fixed-height viewport so entries look like they're coming from below */}
          <div className="relative h-[32vh] md:h-[30vh]">
            <div className="absolute inset-x-0 bottom-0">
              {lines.map((t, i) => (
                <p
                  key={i}
                  ref={(el) => (lineRefs.current[i] = el)}
                  className="leading-tight text-xl sm:text-2xl md:text-3xl lg:text-3xl"
                  style={{ willChange: "transform, opacity" }}
                >
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNowPage;
