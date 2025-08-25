// // src/components/sections/ToolkitPage.jsx
// import React, { useLayoutEffect, useMemo, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // tweak these to make the sequence shorter/longer
// const SCROLL_SPAN_PX = 2400; // total scroll distance while pinned
// const REVEAL_DUR = 0.6; // fade-in duration for each item
// const HIDE_DUR = 0.45; // fade-out duration for previous item
// const HOLD_BEAT = 0.25; // tiny pause between swaps (timeline time)

// const ToolkitPage = () => {
//   const rootRef = useRef(null);
//   const pinRef = useRef(null);

//   const items = useMemo(
//     () => [
//       {
//         subheading: "community",
//         subtext: "a safe, active space to connect, share, and grow."
//       },
//       {
//         subheading: "webinars",
//         subtext: "free, forever. learn from diverse experts."
//       },
//       {
//         subheading: "quiz",
//         subtext: "quick, fun, high-learning design prompts."
//       },
//       {
//         subheading: "course",
//         subtext: "trimester-based, hands-on, with a paid internship pathway."
//       }
//     ],
//     []
//   );

//   useLayoutEffect(() => {
//     if (!pinRef.current) return;

//     const ctx = gsap.context(() => {
//       // start state: all hidden, first one visible
//       const selectors = items.map((_, i) => `#tk-item-${i}`);
//       gsap.set(selectors, { autoAlpha: 0, y: 12 });
//       gsap.set("#tk-item-0", { autoAlpha: 1, y: 0 });

//       const tl = gsap.timeline({
//         defaults: { ease: "power2.out" },
//         scrollTrigger: {
//           trigger: pinRef.current,
//           start: "top top",
//           end: `+=${SCROLL_SPAN_PX}`,
//           scrub: true, // one continuous scrub reveals all
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1
//         }
//       });

//       // build the sequence: 0->1->2->3
//       items.forEach((_, i) => {
//         if (i === 0) return;
//         tl.to(
//           `#tk-item-${i - 1}`,
//           { autoAlpha: 0, y: -12, duration: HIDE_DUR },
//           `+=${HOLD_BEAT}`
//         ).to(
//           `#tk-item-${i}`,
//           { autoAlpha: 1, y: 0, duration: REVEAL_DUR },
//           "<"
//         );
//       });
//     }, pinRef);

//     return () => ctx.revert();
//   }, [items]);

//   return (
//     <section
//       ref={rootRef}
//       className="bg-black text-white font-bricolage lowercase"
//     >
//       <div ref={pinRef} className="relative min-h-screen w-full">
//         <div className="relative w-full h-screen max-w-[1400px] mx-auto px-6 md:px-0 pt-20 md:pt-24 flex flex-col md:flex-row justify-between items-start">
//           {/* left: big heading stays fixed during the whole sequence */}
//           <div className="relative z-20 w-full md:w-1/2 flex flex-col">
//             <h1 className="font-extrabold text-4xl md:text-7xl leading-tight mb-10 md:mb-24">
//               the evolve
//               <br />
//               toolkit
//             </h1>
//           </div>

//           {/* right: single slot where items swap in/out */}
//           <div className="relative z-10 w-full md:w-1/2 flex justify-start md:justify-end items-start mt-2 md:mt-4">
//             <div className="relative w-full max-w-xl min-h-[180px] md:min-h-[220px]">
//               {items.map((it, i) => (
//                 <div
//                   key={it.subheading}
//                   id={`tk-item-${i}`}
//                   className="absolute inset-0"
//                   style={{ pointerEvents: "none" }}
//                 >
//                   <h2 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-3">
//                     {it.subheading}
//                   </h2>
//                   <p className="text-evolve-inchworm font-medium text-base md:text-2xl leading-snug md:leading-relaxed">
//                     {it.subtext}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ToolkitPage;

// src/components/sections/ToolkitPage.jsx
// import React, { useLayoutEffect, useMemo, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // tuning
// const SCROLL_SPAN_PX = 2400;
// const REVEAL_DUR = 0.6;
// const HIDE_DUR = 0.45;
// const HOLD_BEAT = 0.25;

// const ToolkitPage = () => {
//   const pinRef = useRef(null);

//   const items = useMemo(
//     () => [
//       {
//         subheading: "community",
//         subtext: "a safe, active space to connect, share, and grow."
//       },
//       {
//         subheading: "webinars",
//         subtext: "free, forever. learn from diverse experts."
//       },
//       {
//         subheading: "quiz",
//         subtext: "quick, fun, high-learning design prompts."
//       },
//       {
//         subheading: "course",
//         subtext: "trimester-based, hands-on, with a paid internship pathway."
//       }
//     ],
//     []
//   );

//   useLayoutEffect(() => {
//     if (!pinRef.current) return;

//     const ctx = gsap.context(() => {
//       const selectors = items.map((_, i) => `#tk-item-${i}`);
//       gsap.set(selectors, { autoAlpha: 0, y: 12 });
//       gsap.set("#tk-item-0", { autoAlpha: 1, y: 0 });

//       const tl = gsap.timeline({
//         defaults: { ease: "power2.out" },
//         scrollTrigger: {
//           trigger: pinRef.current,
//           start: "top top",
//           end: `+=${SCROLL_SPAN_PX}`,
//           scrub: true,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1
//         }
//       });

//       items.forEach((_, i) => {
//         if (i === 0) return;
//         tl.to(
//           `#tk-item-${i - 1}`,
//           { autoAlpha: 0, y: -12, duration: HIDE_DUR },
//           `+=${HOLD_BEAT}`
//         ).to(
//           `#tk-item-${i}`,
//           { autoAlpha: 1, y: 0, duration: REVEAL_DUR },
//           "<"
//         );
//       });
//     }, pinRef);

//     return () => ctx.revert();
//   }, [items]);

//   return (
//     <section className="bg-black text-white font-bricolage lowercase">
//       <div ref={pinRef} className="relative min-h-screen w-full">
//         <div className="relative w-full h-screen max-w-[1100px] mx-auto">
//           {/* heading near top */}
//           <div className="px-6 md:px-8 pt-20 md:pt-24">
//             <h1 className="font-extrabold text-4xl md:text-7xl leading-tight">
//               the evolve
//               <br />
//               toolkit
//             </h1>
//           </div>

//           {/* swap slot anchored near bottom */}
//           <div className="absolute inset-x-0 bottom-6 px-6 md:px-8">
//             <div className="relative w-full max-w-3xl">
//               <div className="relative min-h-[160px] md:min-h-[200px]">
//                 {items.map((it, i) => (
//                   <div
//                     key={it.subheading}
//                     id={`tk-item-${i}`}
//                     className="absolute inset-0"
//                     style={{ pointerEvents: "none" }}
//                   >
//                     <h2 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-3">
//                       {it.subheading}
//                     </h2>
//                     <p className="text-evolve-inchworm font-medium text-base md:text-2xl leading-snug md:leading-relaxed">
//                       {it.subtext}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ToolkitPage;

import React, { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// tuning
const SCROLL_SPAN_PX = 2400;
const REVEAL_DUR = 0.6;
const HIDE_DUR = 0.45;
const HOLD_BEAT = 0.25;

const ToolkitPage = () => {
  const pinRef = useRef(null);

  const items = useMemo(
    () => [
      {
        subheading: "community",
        subtext:
          "Connect with fellow creators. Share work, \nget feedback, grow together."
      },
      {
        subheading: "webinars",
        subtext: "Free sessions, real pros, insights that stick."
      },
      {
        subheading: "quiz",
        subtext: "Quick challenges that help you \nsee how remarkable you are."
      },
      {
        subheading: "course",
        subtext: "trimester-based, hands-on, \nwith a paid internship pathway."
      }
    ],
    []
  );

  useLayoutEffect(() => {
    if (!pinRef.current) return;

    const ctx = gsap.context(() => {
      const selectors = items.map((_, i) => `#tk-item-${i}`);
      const els = selectors.map((sel) => document.querySelector(sel));

      // initial state + gpu/compositing hints
      gsap.set(els, {
        autoAlpha: 0,
        yPercent: 6,
        willChange: "transform, opacity",
        force3D: true
      });
      if (els[0]) gsap.set(els[0], { autoAlpha: 1, yPercent: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" }, // smoother with scrub
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${SCROLL_SPAN_PX}`,
          scrub: 0.35, // slight smoothing
          pin: true,
          pinSpacing: true,
          pinReparent: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true
        }
      });

      items.forEach((_, i) => {
        if (i === 0) return;

        tl.to(
          els[i - 1],
          { autoAlpha: 0, yPercent: -6, duration: HIDE_DUR },
          `+=${HOLD_BEAT}`
        ).to(els[i], { autoAlpha: 1, yPercent: 0, duration: REVEAL_DUR }, "<");
      });
    }, pinRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section className="bg-black text-white font-bricolage lowercase">
      <div ref={pinRef} className="relative min-h-screen w-full">
        <div className="relative w-full h-screen max-w-[1100px] mx-auto">
          {/* heading near top */}
          <div className="px-6 md:px-8 pt-20 md:pt-24">
            <h1 className="font-extrabold text-4xl md:text-7xl leading-tight">
              the evolve
              <br />
              toolkit
            </h1>
          </div>

          {/* swap slot anchored near bottom */}
          <div className="absolute inset-x-0 bottom-6 px-6 md:px-8">
            <div className="relative w-full max-w-3xl">
              <div className="relative min-h-[160px] md:min-h-[200px]">
                {items.map((it, i) => (
                  <div
                    key={it.subheading}
                    id={`tk-item-${i}`}
                    className="absolute inset-0 transform-gpu will-change-transform"
                    style={{ pointerEvents: "none" }}
                  >
                    <h2 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-3">
                      {it.subheading}
                    </h2>
                    <p className="text-evolve-inchworm font-medium text-base md:text-2xl leading-snug whitespace-pre-line">
                      {it.subtext}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolkitPage;
