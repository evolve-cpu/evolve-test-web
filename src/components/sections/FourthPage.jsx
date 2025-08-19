import React, { useMemo, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FourthPage = () => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  stepRef.current = step;

  // texts (will be forced lowercase via class)
  const texts = useMemo(
    () => [
      "We are a playground, a dojo, a launchpad.",
      "Built by designers who have fought the blank page and lived to tell the tale.",
      "The kind of work that earns double-takes.",
      "The kind of thinking that travels with you, even if you never touch Figma again."
    ],
    []
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const totalSteps = Math.max(1, texts.length - 1); // show current + next
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${totalSteps * 100}%`,
        pin: true,
        scrub: 0.25,
        snap: {
          snapTo: (value) => {
            const v = value * totalSteps;
            return Math.round(v) / totalSteps;
          },
          duration: 0.25,
          ease: "power1.out"
        },
        onUpdate: (self) => {
          const i = Math.min(
            totalSteps,
            Math.max(0, Math.round(self.progress * totalSteps))
          );
          if (i !== stepRef.current) setStep(i);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [texts]);

  const current = texts[step];
  const next = texts[step + 1];

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-screen bg-evolve-lavender-indigo text-white overflow-hidden"
    >
      {/* layout: desktop split, mobile stacked */}
      <div className="mx-auto h-full grid grid-cols-1 md:grid-cols-2">
        {/* left side reserved (keep empty or add visuals later) */}
        <div className="hidden md:block" />

        {/* right side / main text area */}
        <div className="flex flex-col items-start justify-center px-6 md:px-10 lg:px-16 gap-6 md:gap-10">
          {/* current line (white) */}
          <p
            key={`current-${step}`}
            className="font-bricolage font-extrabold lowercase leading-tight
                       text-2xl sm:text-3xl md:text-5xl lg:text-5xl transition-opacity duration-300"
          >
            {current}
          </p>

          {/* next line (reduced opacity). hide if last */}
          {next && (
            <p
              key={`next-${step + 1}`}
              className="font-bricolage font-extrabold lowercase leading-tight
                         text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-white opacity-15 transition-opacity duration-300"
            >
              {next}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FourthPage;
