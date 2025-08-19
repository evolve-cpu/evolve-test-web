import React from "react";
import { ArrowRight } from "lucide-react"; // install lucide-react if not already

const FooterPage = () => {
  return (
    <div className="bg-evolve-lavender-indigo text-white flex flex-col font-bricolage items-center justify-center min-h-screen text-center px-6 py-12">
      {/* Main Heading */}
      <h1 className="font-extrabold text-3xl md:text-7xl max-w-4xl mb-8 lowercase">
        we are not here just to give you a certificate
      </h1>

      {/* Subtext */}
      <p className="font-medium text-sm md:text-2xl max-w-2xl leading-[1.8] mb-8 lowercase">
        we are here to mess with how you think…
        <br /> until you can’t go back to seeing the world the old way.
      </p>

      {/* Strong Text */}
      <p className="font-extrabold text-base md:text-2xl mb-8 lowercase">
        let’s see what you can do.
      </p>

      {/* Button */}
      <button className="bg-white text-black rounded-xl px-6 py-3 flex items-center gap-2 font-medium lowercase hover:scale-105 transition">
        try again <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FooterPage;
