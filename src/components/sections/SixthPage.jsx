// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // import your images (fix paths)
// import {
//   plant_phase_1,
//   plant_phase_2,
//   plant_phase_3,
//   plant // used for phase 4 and 5
// } from "../../assets/images";

// gsap.registerPlugin(ScrollTrigger);

// const SixthPage = () => {
//   const rootRef = useRef(null);
//   const pinRef = useRef(null);

//   const headingRef = useRef(null);
//   const subtextRef = useRef(null);
//   const imageTopRef = useRef(null); // for crossfade stack (new)
//   const imageBottomRef = useRef(null); // current visible

//   // keep current index without re-renders
//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);

//   const phases = [
//     {
//       heading: "see",
//       subtext: "hunt for the details everyone else misses.",
//       img: plant_phase_1
//     },
//     {
//       heading: "think",
//       subtext: "ask the questions no one’s asking.",
//       img: plant_phase_2
//     },
//     {
//       heading: "make",
//       subtext: "design like it matters.",
//       img: plant_phase_3
//     },
//     {
//       heading: "ship",
//       subtext: "send it to the world.",
//       img: plant
//     },
//     {
//       heading: "share",
//       subtext: "tell the story so well they can’t ignore it.",
//       img: plant
//     }
//   ];

//   useEffect(() => {
//     // init content
//     if (headingRef.current) headingRef.current.textContent = phases[0].heading;
//     if (subtextRef.current) subtextRef.current.textContent = phases[0].subtext;
//     if (imageBottomRef.current) imageBottomRef.current.src = phases[0].img;

//     const totalSteps = phases.length;
//     const sectionDuration = Math.max(700, window.innerHeight * 0.8); // px per step
//     const totalScroll = sectionDuration * (totalSteps - 1);

//     const st = ScrollTrigger.create({
//       trigger: pinRef.current,
//       start: "top top",
//       end: `+=${totalScroll}`,
//       pin: true,
//       scrub: true,
//       onUpdate: (self) => {
//         // map progress to index [0..len-1]
//         const idx = Math.min(
//           totalSteps - 1,
//           Math.floor(self.progress * (totalSteps - 0.0001))
//         );
//         if (idx !== currentIndexRef.current && !isAnimatingRef.current) {
//           swapTo(idx);
//         }
//       }
//     });

//     return () => {
//       st && st.kill();
//       ScrollTrigger.refresh();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const swapTo = (nextIndex) => {
//     isAnimatingRef.current = true;

//     const tl = gsap.timeline({
//       defaults: { duration: 0.35, ease: "power2.out" },
//       onComplete: () => {
//         // finalize: bottom img becomes top, top is reset
//         if (imageBottomRef.current && imageTopRef.current) {
//           imageBottomRef.current.src = phases[nextIndex].img;
//           gsap.set(imageBottomRef.current, { opacity: 1, scale: 1 });
//           gsap.set(imageTopRef.current, { opacity: 0, scale: 1 });
//         }
//         currentIndexRef.current = nextIndex;
//         isAnimatingRef.current = false;
//       }
//     });

//     // text crossfade in place
//     tl.to([headingRef.current, subtextRef.current], { opacity: 0, y: 10 }, 0);

//     tl.add(() => {
//       if (headingRef.current)
//         headingRef.current.textContent = phases[nextIndex].heading;
//       if (subtextRef.current)
//         subtextRef.current.textContent = phases[nextIndex].subtext;
//       if (imageTopRef.current) imageTopRef.current.src = phases[nextIndex].img;
//     });

//     tl.fromTo(
//       [headingRef.current, subtextRef.current],
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0 },
//       0.15
//     );

//     // image “form change”: crossfade + slight scale
//     tl.set(imageTopRef.current, { opacity: 0, scale: 0.98 }, 0);
//     tl.to(imageTopRef.current, { opacity: 1, scale: 1.02 }, 0.05);
//     tl.to(imageBottomRef.current, { opacity: 0.0, scale: 1.02 }, 0.05);
//   };

//   return (
//     <section
//       ref={rootRef}
//       className="bg-black text-white font-bricolage lowercase"
//     >
//       {/* pinned viewport */}
//       <div ref={pinRef} className="relative min-h-screen w-full">
//         {/* main heading fixed top-left (always visible) */}
//         <h1 className="absolute top-6 left-4 md:top-10 md:left-10 z-30 font-extrabold text-3xl md:text-6xl">
//           how you will evolve
//         </h1>

//         {/* layout wrapper */}
//         <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between w-full h-screen px-4 md:px-10 pb-6 md:pb-10 pt-24 md:pt-24">
//           {/* left text block — stays in same place */}
//           <div className="relative z-20 w-full md:w-1/2">
//             {/* spacer for mobile so main heading comes first */}
//             <div className="block md:hidden h-12" />
//             <div className="max-w-md md:max-w-lg">
//               <h2
//                 ref={headingRef}
//                 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-2"
//               />
//               <p
//                 ref={subtextRef}
//                 className="text-evolve-inchworm font-medium text-sm md:text-lg leading-snug md:leading-relaxed"
//               />
//             </div>
//           </div>

//           {/* right image block — bottom-right */}
//           <div className="relative z-10 w-full md:w-1/2 h-64 md:h-[70vh] mt-8 md:mt-0">
//             {/* two stacked imgs for smooth crossfade */}
//             <img
//               ref={imageBottomRef}
//               alt="evolution"
//               className="absolute bottom-0 right-0 w-40 md:w-96 object-contain select-none"
//               draggable={false}
//             />
//             <img
//               ref={imageTopRef}
//               alt="evolution transition"
//               className="absolute bottom-0 right-0 w-40 md:w-96 object-contain opacity-0 select-none"
//               draggable={false}
//             />
//           </div>
//         </div>
//       </div>

//       {/* extra scroll space so the last phase can settle a bit */}
//       {/* <div className="h-[40vh]" /> */}
//     </section>
//   );
// };

// export default SixthPage;

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // import your images
// import {
//   plant_phase_1,
//   plant_phase_2,
//   plant_phase_3,
//   plant // used for phase 4 and 5
// } from "../../assets/images";

// gsap.registerPlugin(ScrollTrigger);

// const SixthPage = () => {
//   const rootRef = useRef(null);
//   const pinRef = useRef(null);

//   const headingRef = useRef(null);
//   const subtextRef = useRef(null);
//   const imageTopRef = useRef(null);
//   const imageBottomRef = useRef(null);

//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);

//   const phases = [
//     {
//       heading: "see",
//       subtext: "hunt for the details everyone else misses.",
//       img: plant_phase_1
//     },
//     {
//       heading: "think",
//       subtext: "ask the questions no one’s asking.",
//       img: plant_phase_2
//     },
//     { heading: "make", subtext: "design like it matters.", img: plant_phase_3 },
//     { heading: "ship", subtext: "send it to the world.", img: plant },
//     {
//       heading: "share",
//       subtext: "tell the story so well they can’t ignore it.",
//       img: plant
//     }
//   ];

//   useEffect(() => {
//     if (headingRef.current) headingRef.current.textContent = phases[0].heading;
//     if (subtextRef.current) subtextRef.current.textContent = phases[0].subtext;
//     if (imageBottomRef.current) imageBottomRef.current.src = phases[0].img;

//     const totalSteps = phases.length;
//     const sectionDuration = Math.max(700, window.innerHeight * 0.8);
//     const totalScroll = sectionDuration * (totalSteps - 1);

//     const st = ScrollTrigger.create({
//       trigger: pinRef.current,
//       start: "top top",
//       end: `+=${totalScroll}`,
//       pin: true,
//       scrub: true,
//       onUpdate: (self) => {
//         const idx = Math.min(
//           totalSteps - 1,
//           Math.floor(self.progress * (totalSteps - 0.0001))
//         );
//         if (idx !== currentIndexRef.current && !isAnimatingRef.current) {
//           swapTo(idx);
//         }
//       }
//     });

//     return () => {
//       st && st.kill();
//       ScrollTrigger.refresh();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const swapTo = (nextIndex) => {
//     isAnimatingRef.current = true;
//     const tl = gsap.timeline({
//       defaults: { duration: 0.35, ease: "power2.out" },
//       onComplete: () => {
//         if (imageBottomRef.current && imageTopRef.current) {
//           imageBottomRef.current.src = phases[nextIndex].img;
//           gsap.set(imageBottomRef.current, { opacity: 1, scale: 1 });
//           gsap.set(imageTopRef.current, { opacity: 0, scale: 1 });
//         }
//         currentIndexRef.current = nextIndex;
//         isAnimatingRef.current = false;
//       }
//     });

//     tl.to([headingRef.current, subtextRef.current], { opacity: 0, y: 10 }, 0);
//     tl.add(() => {
//       if (headingRef.current)
//         headingRef.current.textContent = phases[nextIndex].heading;
//       if (subtextRef.current)
//         subtextRef.current.textContent = phases[nextIndex].subtext;
//       if (imageTopRef.current) imageTopRef.current.src = phases[nextIndex].img;
//     });
//     tl.fromTo(
//       [headingRef.current, subtextRef.current],
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0 },
//       0.15
//     );
//     tl.set(imageTopRef.current, { opacity: 0, scale: 0.98 }, 0);
//     tl.to(imageTopRef.current, { opacity: 1, scale: 1.02 }, 0.05);
//     tl.to(imageBottomRef.current, { opacity: 0.0, scale: 1.02 }, 0.05);
//   };

//   return (
//     <section
//       ref={rootRef}
//       className="bg-black text-white font-bricolage lowercase"
//     >
//       <div ref={pinRef} className="relative min-h-screen w-full">
//         {/* main heading */}
//         <h1 className="absolute top-20 left-6 md:top-20 md:left-20 z-30 font-extrabold text-3xl md:text-6xl">
//           how you will evolve
//         </h1>

//         {/* inner wrapper with centered max-width */}
//         <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between w-full h-screen max-w-[1200px] mx-auto md:pb-20 pb-10 px-6 md:px-0 pt-40 md:pt-32">
//           {/* text */}
//           <div className="relative z-20 w-full md:w-1/2">
//             <div className="block md:hidden h-12" />
//             <div className="max-w-md md:max-w-lg mx-auto md:mx-0">
//               <h2
//                 ref={headingRef}
//                 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-2  md:text-left"
//               />
//               <p
//                 ref={subtextRef}
//                 className="text-evolve-inchworm font-medium text-sm md:text-lg leading-snug md:leading-relaxed md:text-left"
//               />
//             </div>
//           </div>

//           {/* image */}
//           <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end items-end mt-10 md:mt-0">
//             <img
//               ref={imageBottomRef}
//               alt="evolution"
//               className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain select-none"
//               draggable={false}
//             />
//             <img
//               ref={imageTopRef}
//               alt="evolution transition"
//               className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain opacity-0 absolute bottom-0 select-none"
//               draggable={false}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SixthPage;

// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// // import your images
// import {
//   plant_phase_1,
//   plant_phase_2,
//   plant_phase_3,
//   plant // used for phase 4 and 5
// } from "../../assets/images";

// gsap.registerPlugin(ScrollTrigger);

// const SixthPage = () => {
//   const rootRef = useRef(null);
//   const pinRef = useRef(null);

//   const textWrapRef = useRef(null);
//   const imageTopRef = useRef(null);
//   const imageBottomRef = useRef(null);

//   const [phaseIndex, setPhaseIndex] = useState(0);
//   const currentIndexRef = useRef(0);
//   const isAnimatingRef = useRef(false);

//   // allow <br/> in subtext
//   const phases = [
//     {
//       heading: "see",
//       subtext: "hunt for the details<br/>everyone else misses.",
//       img: plant_phase_1
//     },
//     {
//       heading: "think",
//       subtext: "ask the questions<br/>no one’s asking.",
//       img: plant_phase_2
//     },
//     {
//       heading: "make",
//       subtext: "design like it matters.",
//       img: plant_phase_3
//     },
//     {
//       heading: "ship",
//       subtext: "send it to the world.",
//       img: plant
//     },
//     {
//       heading: "share",
//       subtext: "tell the story so well<br/>they can’t ignore it.",
//       img: plant
//     }
//   ];

//   useEffect(() => {
//     if (imageBottomRef.current) imageBottomRef.current.src = phases[0].img;

//     const totalSteps = phases.length;
//     const sectionDuration = Math.max(700, window.innerHeight * 0.8);
//     const totalScroll = sectionDuration * (totalSteps - 1);

//     const st = ScrollTrigger.create({
//       trigger: pinRef.current,
//       start: "top top",
//       end: `+=${totalScroll}`,
//       pin: true,
//       scrub: true,
//       onUpdate: (self) => {
//         const idx = Math.min(
//           totalSteps - 1,
//           Math.floor(self.progress * (totalSteps - 0.0001))
//         );
//         if (idx !== currentIndexRef.current && !isAnimatingRef.current) {
//           swapTo(idx);
//         }
//       }
//     });

//     return () => {
//       st && st.kill();
//       ScrollTrigger.refresh();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const swapTo = (nextIndex) => {
//     isAnimatingRef.current = true;

//     const tl = gsap.timeline({
//       defaults: { duration: 0.35, ease: "power2.out" },
//       onComplete: () => {
//         // finalize image stack
//         if (imageBottomRef.current && imageTopRef.current) {
//           imageBottomRef.current.src = phases[nextIndex].img;
//           gsap.set(imageBottomRef.current, { opacity: 1, scale: 1 });
//           gsap.set(imageTopRef.current, { opacity: 0, scale: 1 });
//         }
//         currentIndexRef.current = nextIndex;
//         isAnimatingRef.current = false;
//       }
//     });

//     // text out
//     tl.to(textWrapRef.current, { opacity: 0, y: 10 }, 0);

//     // switch content (react state) + prep top image
//     tl.add(() => {
//       setPhaseIndex(nextIndex);
//       if (imageTopRef.current) imageTopRef.current.src = phases[nextIndex].img;
//     });

//     // text in
//     tl.fromTo(
//       textWrapRef.current,
//       { opacity: 0, y: 10 },
//       { opacity: 1, y: 0 },
//       0.15
//     );

//     // image crossfade with slight scale
//     tl.set(imageTopRef.current, { opacity: 0, scale: 0.98 }, 0);
//     tl.to(imageTopRef.current, { opacity: 1, scale: 1.02 }, 0.05);
//     tl.to(imageBottomRef.current, { opacity: 0.0, scale: 1.02 }, 0.05);
//   };

//   return (
//     <section
//       ref={rootRef}
//       className="bg-black text-white font-bricolage lowercase"
//     >
//       <div ref={pinRef} className="relative min-h-screen w-full">
//         {/* main content wrapper with shared margins */}
//         <div className="relative w-full h-screen max-w-[1400px] mx-auto px-6 md:px-0 pt-20 md:pt-20 flex flex-col md:flex-row justify-between items-start md:pb-10 pb-10">
//           {/* left column */}
//           <div className="relative z-20 w-full md:w-1/2 flex flex-col">
//             {/* main heading — bigger gap below */}
//             <h1 className="font-extrabold text-4xl md:text-7xl mb-8 md:mb-[15rem]">
//               how you <br />
//               will evolve
//             </h1>

//             {/* phase text */}
//             <div ref={textWrapRef} className="max-w-md md:max-w-lg">
//               <h2 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-2 md:text-left">
//                 {phases[phaseIndex].heading}
//               </h2>
//               <p
//                 className="text-evolve-inchworm font-medium text-sm md:text-2xl leading-snug md:leading-relaxed md:text-left"
//                 dangerouslySetInnerHTML={{ __html: phases[phaseIndex].subtext }}
//               />
//             </div>
//           </div>

//           {/* right column (image) — align top with phase text */}
//           <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end items-start mt-10 md:mt-[20rem]">
//             {/* bottom image (current) */}
//             <img
//               ref={imageBottomRef}
//               alt="evolution"
//               className="w-full max-w-[520px] sm:max-w-[580px] md:max-w-[560px] lg:max-w-[640px] object-contain select-none"
//               draggable={false}
//             />
//             {/* top image (incoming) overlays the bottom one */}
//             <img
//               ref={imageTopRef}
//               alt="evolution transition"
//               className="w-full max-w-[520px] sm:max-w-[580px] md:max-w-[560px] lg:max-w-[640px] object-contain opacity-0 absolute inset-0 select-none"
//               draggable={false}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SixthPage;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// images
import {
  plant_phase_1,
  plant_phase_2,
  plant_phase_3,
  plant // used for phase 4 and 5
} from "../../assets/images";

gsap.registerPlugin(ScrollTrigger);

const SixthPage = () => {
  const rootRef = useRef(null);
  const pinRef = useRef(null);

  const textWrapRef = useRef(null);
  const imageTopRef = useRef(null);
  const imageBottomRef = useRef(null);

  const [phaseIndex, setPhaseIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const phases = [
    {
      heading: "see",
      subtext: "hunt for the details<br/>everyone else misses.",
      img: plant_phase_1
    },
    {
      heading: "think",
      subtext: "ask the questions<br/>no one’s asking.",
      img: plant_phase_2
    },
    {
      heading: "make",
      subtext: "design like it matters.",
      img: plant_phase_3
    },
    {
      heading: "ship",
      subtext: "send it to the world.",
      img: plant
    },
    {
      heading: "share",
      subtext: "tell the story so well<br/>they can’t ignore it.",
      img: plant
    }
  ];

  useEffect(() => {
    if (imageBottomRef.current) imageBottomRef.current.src = phases[0].img;

    const totalSteps = phases.length;
    const sectionDuration = Math.max(700, window.innerHeight * 0.8);
    const totalScroll = sectionDuration * (totalSteps - 1);

    const st = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${totalScroll}`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(
          totalSteps - 1,
          Math.floor(self.progress * (totalSteps - 0.0001))
        );
        if (idx !== currentIndexRef.current && !isAnimatingRef.current) {
          swapTo(idx);
        }
      }
    });

    return () => {
      st && st.kill();
      ScrollTrigger.refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const swapTo = (nextIndex) => {
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      defaults: { duration: 0.35, ease: "power2.out" },
      onComplete: () => {
        if (imageBottomRef.current && imageTopRef.current) {
          imageBottomRef.current.src = phases[nextIndex].img;
          gsap.set(imageBottomRef.current, { opacity: 1, scale: 1 });
          gsap.set(imageTopRef.current, { opacity: 0, scale: 1 });
        }
        currentIndexRef.current = nextIndex;
        isAnimatingRef.current = false;
      }
    });

    // scale from center to avoid drift
    gsap.set([imageTopRef.current, imageBottomRef.current], {
      transformOrigin: "50% 50%"
    });

    // text out
    tl.to(textWrapRef.current, { opacity: 0, y: 10 }, 0);

    // switch content and prep top image
    tl.add(() => {
      setPhaseIndex(nextIndex);
      if (imageTopRef.current) imageTopRef.current.src = phases[nextIndex].img;
    });

    // text in
    tl.fromTo(
      textWrapRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0 },
      0.15
    );

    // image crossfade with slight scale
    tl.set(imageTopRef.current, { opacity: 0, scale: 0.98 }, 0);
    tl.to(imageTopRef.current, { opacity: 1, scale: 1.02 }, 0.05);
    tl.to(imageBottomRef.current, { opacity: 0, scale: 1.02 }, 0.05);
  };

  return (
    <section
      ref={rootRef}
      className="bg-black text-white font-bricolage lowercase"
    >
      <div ref={pinRef} className="relative min-h-screen w-full">
        {/* main content wrapper */}
        <div className="relative w-full h-screen max-w-[1400px] mx-auto px-6 md:px-0 pt-20 md:pt-20 flex flex-col md:flex-row justify-between items-start md:pb-10 pb-10">
          {/* left column */}
          <div className="relative z-20 w-full md:w-1/2 flex flex-col">
            <h1 className="font-extrabold text-4xl md:text-7xl mb-8 md:mb-[15rem]">
              how you <br />
              will evolve
            </h1>

            {/* phase text */}
            <div ref={textWrapRef} className="max-w-md md:max-w-lg">
              <h2 className="text-evolve-inchworm font-extrabold text-3xl md:text-5xl mb-2 md:text-left">
                {phases[phaseIndex].heading}
              </h2>
              <p
                className="text-evolve-inchworm font-medium text-sm md:text-2xl leading-snug md:leading-relaxed md:text-left"
                dangerouslySetInnerHTML={{ __html: phases[phaseIndex].subtext }}
              />
            </div>
          </div>

          {/* right column with fixed-size wrapper so image position never shifts */}
          <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end items-start mt-10 md:mt-[1rem]">
            <div className="relative w-full max-w-[640px] md:max-w-[560px] lg:max-w-[640px] aspect-[3/4] min-h-[300px]">
              {/* bottom image (current) */}
              <img
                ref={imageBottomRef}
                alt="evolution"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-contain select-none block"
                draggable={false}
              />
              {/* top image (incoming) */}
              <img
                ref={imageTopRef}
                alt="evolution transition"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full object-contain opacity-0 select-none block"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixthPage;
