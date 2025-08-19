import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// fifthpage: scroll-pinned text reveals
// requirements:
// - bg: bg-evolve-lavender-indigo
// - all text lowercase, text-white, font-bricolage
// - first message large + extrabold, centered
// - on scroll: first moves up & fades, second block appears (small line + big line)
// - on further scroll: second moves up, third message appears (extrabold, medium size)

const FifthPage = () => {
  const sectionRef = useRef(null);
  const firstRef = useRef(null);
  const secondSmallRef = useRef(null);
  const secondBigRef = useRef(null);
  const thirdRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // start states
      gsap.set(
        [secondSmallRef.current, secondBigRef.current, thirdRef.current],
        {
          autoAlpha: 0,
          y: 40
        }
      );

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2800",
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      });

      // 1) first message exits upward
      tl.to(firstRef.current, { y: -160, autoAlpha: 0, duration: 1.2 });

      // 2) second block enters (small then big)
      tl.to(
        [secondSmallRef.current, secondBigRef.current],
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 1.0 },
        ">-0.2"
      );

      // hold for a beat, then move up & fade
      tl.to(
        [secondSmallRef.current, secondBigRef.current],
        { y: -160, autoAlpha: 0, stagger: 0.05, duration: 1.0 },
        "+=0.5"
      );

      // 3) third message enters
      tl.to(thirdRef.current, { autoAlpha: 1, y: 0, duration: 1.0 }, ">-0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-evolve-lavender-indigo text-white font-bricolage"
    >
      {/* centered stage */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        {/* first message */}
        <h1
          ref={firstRef}
          className="text-center font-extrabold leading-tight tracking-tight select-none pointer-events-none text-4xl sm:text-5xl md:text-7xl lg:text-8xl"
        >
          do it while you are fearless
        </h1>

        {/* second block (overlays first) */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <p
              ref={secondSmallRef}
              className="mb-4 text-base sm:text-lg md:text-2xl font-medium leading-snug tracking-tight select-none pointer-events-none"
            >
              if you’re between 16 and 22, you’ve got something most people
              lose:
            </p>
            <h2
              ref={secondBigRef}
              className="font-extrabold leading-tight tracking-tight select-none pointer-events-none text-3xl sm:text-4xl md:text-6xl lg:text-7xl"
            >
              time. nerve.
              <br className="hidden sm:block" />
              freedom to fail loudly.
            </h2>
          </div>
        </div>

        {/* third message (overlays others) */}
        <h3
          ref={thirdRef}
          className="absolute inset-x-0 mx-auto max-w-4xl px-4 text-center font-extrabold leading-tight tracking-tight select-none pointer-events-none text-xl sm:text-2xl md:text-4xl"
        >
          use this platform to try, to break, to build, to surprise yourself.
          <br className="hidden sm:block" />
          because clarity early means confidence for life.
        </h3>
      </div>
    </section>
  );
};

export default FifthPage;
