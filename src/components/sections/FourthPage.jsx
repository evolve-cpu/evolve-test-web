// import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const FourthPage = () => {
//   const containerRef = useRef(null);
//   const [step, setStep] = useState(0);
//   const stepRef = useRef(0);
//   stepRef.current = step;

//   // texts (will be forced lowercase via class)
//   const texts = useMemo(
//     () => [
//       "We are a playground, a dojo, a launchpad.",
//       "Built by designers who have fought the blank page and lived to tell the tale.",
//       "The kind of work that earns double-takes.",
//       "The kind of thinking that travels with you, even if you never touch Figma again."
//     ],
//     []
//   );

//   useLayoutEffect(() => {
//     if (!containerRef.current) return;

//     const totalSteps = Math.max(1, texts.length - 1); // show current + next
//     const ctx = gsap.context(() => {
//       ScrollTrigger.create({
//         trigger: containerRef.current,
//         start: "top top",
//         end: `+=${totalSteps * 100}%`,
//         pin: true,
//         scrub: 0.25,
//         snap: {
//           snapTo: (value) => {
//             const v = value * totalSteps;
//             return Math.round(v) / totalSteps;
//           },
//           duration: 0.25,
//           ease: "power1.out"
//         },
//         onUpdate: (self) => {
//           const i = Math.min(
//             totalSteps,
//             Math.max(0, Math.round(self.progress * totalSteps))
//           );
//           if (i !== stepRef.current) setStep(i);
//         }
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [texts]);

//   const current = texts[step];
//   const next = texts[step + 1];

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen bg-evolve-lavender-indigo text-white overflow-hidden"
//     >
//       {/* layout: desktop split, mobile stacked */}
//       <div className="mx-auto h-full grid grid-cols-1 md:grid-cols-2">
//         {/* left side reserved (keep empty or add visuals later) */}
//         <div className="hidden md:block" />

//         {/* right side / main text area */}
//         <div className="flex flex-col items-start justify-center px-6 md:px-10 lg:px-16 gap-6 md:gap-10">
//           {/* current line (white) */}
//           <p
//             key={`current-${step}`}
//             className="font-bricolage font-extrabold lowercase leading-tight
//                        text-2xl sm:text-3xl md:text-5xl lg:text-5xl transition-opacity duration-300"
//           >
//             {current}
//           </p>

//           {/* next line (reduced opacity). hide if last */}
//           {next && (
//             <p
//               key={`next-${step + 1}`}
//               className="font-bricolage font-extrabold lowercase leading-tight
//                          text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-white opacity-15 transition-opacity duration-300"
//             >
//               {next}
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FourthPage;

// src/components/sections/FourthPage.jsx
// import React, {
//   useMemo,
//   useRef,
//   useLayoutEffect,
//   useState,
//   useEffect
// } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const FourthPage = () => {
//   const containerRef = useRef(null);
//   const [isDesktop, setIsDesktop] = useState(
//     typeof window !== "undefined" ? window.innerWidth >= 768 : true
//   );

//   // your lines (kept as-is; forced to lowercase in UI)
//   const texts = useMemo(
//     () => [
//       "We are a playground, a dojo, a launchpad.",
//       "Built by designers who have fought the blank page and lived to tell the tale.",
//       "The kind of work that earns double-takes.",
//       "The kind of thinking that travels with you, even if you never touch Figma again."
//     ],
//     []
//   );

//   // refs to all words [lineIndex][wordIndex] = <span>
//   const wordRefs = useRef([]);

//   useEffect(() => {
//     const onResize = () => setIsDesktop(window.innerWidth >= 768);
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   useLayoutEffect(() => {
//     if (!containerRef.current) return;

//     // compute scroll length based on total words (feels natural across viewports)
//     const totalWords = texts
//       .map((t) => t.trim().split(/\s+/).length)
//       .reduce((a, b) => a + b, 0);

//     const SCROLL_PER_WORD = isDesktop ? 65 : 55; // px per word
//     const LINE_GAP_SCROLL = isDesktop ? 220 : 180; // px pause between lines
//     const endPx =
//       totalWords * SCROLL_PER_WORD + (texts.length - 1) * LINE_GAP_SCROLL + 200;

//     const ctx = gsap.context(() => {
//       // flatten all word nodes for initial state
//       const allWords = wordRefs.current.flat().filter(Boolean);
//       gsap.set(allWords, { opacity: 0.18 });

//       // master timeline scrubbed by scroll
//       const tl = gsap.timeline({
//         defaults: { ease: "none" }, // precise with scrub
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: `+=${endPx}`,
//           scrub: 0.35,
//           pin: true,
//           pinSpacing: true,
//           anticipatePin: 1
//           // optional snap per line (uncomment if you want it):
//           // snap: {
//           //   snapTo: (p) => {
//           //     const segments = texts.length;
//           //     return Math.round(p * segments) / segments;
//           //   },
//           //   duration: 0.18
//           // }
//         }
//       });

//       // build per-line word reveals
//       texts.forEach((_, lineIdx) => {
//         const words = (wordRefs.current[lineIdx] || []).filter(Boolean);
//         if (!words.length) return;

//         // reveal words in this line one-by-one
//         tl.to(words, {
//           opacity: 1,
//           stagger: {
//             each: 0.2, // spacing between word reveals along the timeline
//             ease: "none"
//           },
//           duration: words.length * 0.2 // keep proportional to word count
//         });

//         // tiny pause between lines (so you feel a beat)
//         if (lineIdx < texts.length - 1) {
//           tl.to({}, { duration: LINE_GAP_SCROLL / 300 }); // translate px -> time-ish
//         }
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, [texts, isDesktop]);

//   // helper to attach refs cleanly
//   const setWordRef = (lineIdx, wordIdx) => (el) => {
//     if (!wordRefs.current[lineIdx]) wordRefs.current[lineIdx] = [];
//     wordRefs.current[lineIdx][wordIdx] = el;
//   };

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-screen h-screen bg-evolve-lavender-indigo text-white overflow-hidden"
//     >
//       <div className="mx-auto h-full grid grid-cols-1 md:grid-cols-2">
//         {/* left visual column (reserved) */}
//         <div className="hidden md:block" />

//         {/* right: word-by-word area */}
//         <div className="flex flex-col items-start justify-center px-6 md:px-10 lg:px-16 gap-6 md:gap-10">
//           {texts.map((line, li) => {
//             const words = line.trim().split(/\s+/);
//             return (
//               <p
//                 key={`line-${li}`}
//                 className="font-bricolage font-extrabold lowercase leading-tight
//                            text-2xl sm:text-3xl md:text-5xl lg:text-5xl"
//               >
//                 {words.map((w, wi) => (
//                   <span
//                     key={`w-${li}-${wi}`}
//                     ref={setWordRef(li, wi)}
//                     className="inline-block align-baseline will-change-[opacity,transform]"
//                     style={{ opacity: 0.18 }}
//                   >
//                     {w}
//                     {/* keep native spacing */}
//                     {wi < words.length - 1 ? "\u00A0" : ""}
//                   </span>
//                 ))}
//               </p>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FourthPage;

// src/components/sections/FourthPage.jsx
import React, {
  useMemo,
  useRef,
  useLayoutEffect,
  useState,
  useEffect
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FourthPage = () => {
  const containerRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );

  // your lines (rendered lowercase in UI)
  const texts = useMemo(
    () => [
      "We are a playground, a dojo, a launchpad.",
      "Guided by designers who know how to turn blank into bold.",
      "Here, you will find mentors, misfits, and midnight breakthroughs.",
      "the kind of work that earns double-takes.",
      "and the ideas stay with you long after you’ve walked away."
      //   "And this is the last one."
    ],
    []
  );

  // groups: [2 lines], [2 lines], [remaining (1+)]
  const groups = useMemo(() => {
    const g1 = texts.slice(0, 2);
    const g2 = texts.slice(2, 4);
    const g3 = texts.slice(4); // may be [] if only 4 lines
    return [g1, g2, g3].filter((g) => g.length > 0);
  }, [texts]);

  // refs to words per group -> per line -> per word
  const wordRefs = useRef([]); // wordRefs.current[g][l][w] = span

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // pin long enough for 3 segments (adjust if you want slower/faster)
    const SCROLL_SPAN = isDesktop ? 3400 : 2800;

    const ctx = gsap.context(() => {
      // set initial visibilities
      groups.forEach((_, gi) => {
        const groupEl = containerRef.current.querySelector(`#group-${gi}`);
        gsap.set(groupEl, { autoAlpha: gi === 0 ? 1 : 0 });
        // set all words low opacity
        const words = (wordRefs.current[gi] || []).flat().filter(Boolean);
        gsap.set(words, { opacity: 0.18 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" }, // tight scroll control
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${SCROLL_SPAN}`,
          scrub: 0.35,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1
          // optional per-segment snap:
          // snap: { snapTo: (p) => {
          //   const segs = groups.length;
          //   return Math.round(p * segs) / segs;
          // }, duration: 0.2 }
        }
      });

      // build the 3-stage reveal
      groups.forEach((_, gi) => {
        const groupEl = containerRef.current.querySelector(`#group-${gi}`);
        const words = (wordRefs.current[gi] || []).flat().filter(Boolean);

        // if not the first group, crossfade from previous group
        if (gi > 0) {
          const prevEl = containerRef.current.querySelector(`#group-${gi - 1}`);
          tl.to(prevEl, { autoAlpha: 0, duration: 0.35 }).to(
            groupEl,
            { autoAlpha: 1, duration: 0.35 },
            "<"
          );
          // ensure this group's words start dim before revealing
          tl.set(words, { opacity: 0.18 }, "<");
        }

        // word-by-word to full opacity
        if (words.length) {
          tl.to(words, {
            opacity: 1,
            stagger: { each: 0.2, ease: "none" },
            duration: words.length * 0.2
          });
        }

        // small breathing beat between groups
        if (gi < groups.length - 1) {
          tl.to({}, { duration: 0.4 }); // just a spacer in timeline units
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [groups, isDesktop]);

  // helper to attach word refs
  const setWordRef = (gi, li, wi) => (el) => {
    if (!wordRefs.current[gi]) wordRefs.current[gi] = [];
    if (!wordRefs.current[gi][li]) wordRefs.current[gi][li] = [];
    wordRefs.current[gi][li][wi] = el;
  };

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen bg-evolve-lavender-indigo text-white overflow-hidden"
    >
      <div className="mx-auto h-full grid grid-cols-1 md:grid-cols-2">
        {/* left column reserved */}
        <div className="hidden md:block" />

        {/* right: chunked groups */}
        <div className="relative flex items-center justify-center px-6 md:px-10 lg:px-16">
          {/* stack all groups; gsap toggles their opacity */}
          <div className="relative w-full">
            {groups.map((lines, gi) => (
              <div
                key={`group-${gi}`}
                id={`group-${gi}`}
                className="absolute inset-0 flex flex-col items-start justify-center gap-6 md:gap-10"
                style={{ pointerEvents: "none" }}
              >
                {lines.map((line, li) => {
                  const words = line.trim().split(/\s+/);
                  return (
                    <p
                      key={`line-${gi}-${li}`}
                      className="font-bricolage font-extrabold lowercase leading-tight
                                 text-2xl sm:text-3xl md:text-5xl lg:text-5xl"
                    >
                      {words.map((w, wi) => (
                        <span
                          key={`w-${gi}-${li}-${wi}`}
                          ref={setWordRef(gi, li, wi)}
                          className="inline-block align-baseline will-change-[opacity]"
                          style={{ opacity: 0.18 }}
                        >
                          {w}
                          {wi < words.length - 1 ? "\u00A0" : ""}
                        </span>
                      ))}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthPage;
