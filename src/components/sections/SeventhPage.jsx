import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SeventhPage = () => {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const itemsRef = useRef([]);

  // texts (use <br/> inside)
  const points = [
    "A portfolio that <br/>feels alive",
    "The creative muscle to <br/>bring great ideas to life",
    "A creative compass you <br/>can use in any career.",
    "People in your corner <br/>for years to come.",
    "A Paid Internship!"
  ];

  useEffect(() => {
    // desktop stagger-in when section enters
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top 70%",
          end: "bottom top",
          once: true
        }
      });

      tl.from(itemsRef.current.filter(Boolean), {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.12
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-black text-white lowercase font-bricolage"
    >
      <div ref={pinRef} className="relative min-h-screen w-full">
        {/* content wrapper */}
        <div className="relative w-full min-h-screen max-w-[1400px] mx-auto px-6 md:px-0 pt-20 md:pt-20 pb-16 md:pb-10 flex flex-col md:flex-row items-start">
          {/* left: heading */}
          <div className="relative z-20 w-full md:w-1/2">
            <h1 className="font-extrabold text-4xl md:text-7xl leading-tight">
              What You <br /> Leave With
            </h1>
          </div>

          {/* right: grid / columns */}
          <div className="relative z-10 w-full md:w-1/2 mt-10 md:mt-[10rem] md:pl-8 flex md:justify-end">
            <div className="w-full max-w-[640px]">
              {/* desktop grid (3 cols), mobile stack */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                {points.map((txt, i) => (
                  <div
                    key={i}
                    ref={(el) => (itemsRef.current[i] = el)}
                    className="text-evolve-inchworm font-extrabold text-xl md:text-3xl leading-tight"
                    dangerouslySetInnerHTML={{ __html: txt }}
                  />
                ))}

                {/* to keep visual balance in 3xN grid on desktop,
                    add empty placeholders if needed */}
                <div className="hidden md:block" />
                <div className="hidden md:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeventhPage;
