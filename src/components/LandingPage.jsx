// import React from 'react';
// import { ArrowRight, Zap, Target, Rocket, Users } from 'lucide-react';

// const LandingPage: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-evolve-black text-evolve-white">
//       {/* Header */}
//       <header className="fixed top-0 w-full z-40 bg-evolve-black/80 backdrop-blur-md border-b border-evolve-heliotrope/20">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Zap className="w-8 h-8 text-evolve-heliotrope" />
//             <span className="text-2xl font-bricolage font-bold">EVOLVE</span>
//           </div>

//           <nav className="hidden md:flex items-center space-x-8">
//             <a href="#programs" className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors">Programs</a>
//             <a href="#mentors" className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors">Mentors</a>
//             <a href="#community" className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors">Community</a>
//             <button className="bg-evolve-heliotrope text-white px-6 py-2 rounded-lg hover:bg-evolve-lavender-indigo transition-colors">
//               Get Started
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6 relative overflow-hidden">
//         <div className="absolute inset-0 bg-purple-gradient opacity-20" />
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <h1 className="text-6xl md:text-8xl font-bricolage font-bold mb-8 leading-tight">
//             Transform Your
//             <span className="text-evolve-heliotrope block">Creative Vision</span>
//           </h1>

//           <p className="text-xl md:text-2xl text-evolve-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
//             From concept to creation, from idea to impact. Join thousands of creators, designers,
//             and innovators who've evolved their skills into remarkable careers.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <button className="bg-evolve-heliotrope text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-evolve-lavender-indigo transition-all duration-300 flex items-center space-x-2 shadow-button-popped hover:shadow-button">
//               <span>Start Your Journey</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>

//             <button className="border-2 border-evolve-heliotrope text-evolve-heliotrope px-8 py-4 rounded-xl text-lg font-medium hover:bg-evolve-heliotrope hover:text-white transition-all duration-300">
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* Floating elements */}
//         <div className="absolute top-20 left-10 w-20 h-20 bg-evolve-bright-turquoise/20 rounded-full animate-particle-float" />
//         <div className="absolute bottom-20 right-10 w-16 h-16 bg-evolve-inchworm/20 rounded-full animate-particle-float" style={{ animationDelay: '2s' }} />
//         <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-evolve-flame/20 rounded-full animate-particle-float" style={{ animationDelay: '4s' }} />
//       </section>

//       {/* Features Section */}
//       <section id="programs" className="py-20 px-6 bg-evolve-charleston-green">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bricolage font-bold mb-6">
//               Why Choose <span className="text-evolve-heliotrope">EVOLVE</span>?
//             </h2>
//             <p className="text-xl text-evolve-white/80 max-w-3xl mx-auto">
//               We don't just teach skills. We transform mindsets, build communities, and create remarkable creators.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <Target className="w-8 h-8" />,
//                 title: "Precision Learning",
//                 description: "Targeted skills that matter in today's creative economy",
//                 color: "evolve-heliotrope"
//               },
//               {
//                 icon: <Rocket className="w-8 h-8" />,
//                 title: "Accelerated Growth",
//                 description: "Fast-track your journey from beginner to professional",
//                 color: "evolve-bright-turquoise"
//               },
//               {
//                 icon: <Users className="w-8 h-8" />,
//                 title: "Community Power",
//                 description: "Connect with like-minded creators and industry mentors",
//                 color: "evolve-inchworm"
//               },
//               {
//                 icon: <Zap className="w-8 h-8" />,
//                 title: "Real Impact",
//                 description: "Build projects that showcase your remarkable abilities",
//                 color: "evolve-flame"
//               }
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-evolve-black/50 p-8 rounded-2xl border border-evolve-heliotrope/20 hover:border-evolve-heliotrope/50 transition-all duration-300 hover:transform hover:scale-105"
//               >
//                 <div className={`w-16 h-16 bg-${feature.color}/20 rounded-xl flex items-center justify-center mb-6`}>
//                   <div className={`text-${feature.color}`}>
//                     {feature.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bricolage font-bold mb-4">{feature.title}</h3>
//                 <p className="text-evolve-white/70">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-evolve-heliotrope">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-6xl font-bricolage font-bold mb-6 text-white">
//             Ready to be <span className="text-evolve-inchworm">Remarkable</span>?
//           </h2>
//           <p className="text-xl text-white/90 mb-12">
//             Join thousands of creators who've transformed their passion into purpose.
//           </p>
//           <button className="bg-white text-evolve-heliotrope px-12 py-6 rounded-2xl text-xl font-bold hover:bg-evolve-white/90 transition-all duration-300 shadow-button-popped hover:shadow-button">
//             Start Your Evolution Today
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-6 bg-evolve-black border-t border-evolve-heliotrope/20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="flex items-center justify-center space-x-2 mb-6">
//             <Zap className="w-6 h-6 text-evolve-heliotrope" />
//             <span className="text-xl font-bricolage font-bold">EVOLVE</span>
//           </div>
//           <p className="text-evolve-white/60">© 2025 Evolve. Be Remarkable.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import React from "react";
// import { ArrowRight, Zap, Target, Rocket, Users } from "lucide-react";

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-evolve-black text-evolve-white">
//       {/* Header */}
//       <header className="fixed top-0 w-full z-40 bg-evolve-black/80 backdrop-blur-md border-b border-evolve-heliotrope/20">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Zap className="w-8 h-8 text-evolve-heliotrope" />
//             <span className="text-2xl font-bricolage font-bold">EVOLVE</span>
//           </div>

//           <nav className="hidden md:flex items-center space-x-8">
//             <a
//               href="#programs"
//               className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors"
//             >
//               Programs
//             </a>
//             <a
//               href="#mentors"
//               className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors"
//             >
//               Mentors
//             </a>
//             <a
//               href="#community"
//               className="text-evolve-white/80 hover:text-evolve-heliotrope transition-colors"
//             >
//               Community
//             </a>
//             <button className="bg-evolve-heliotrope text-white px-6 py-2 rounded-lg hover:bg-evolve-lavender-indigo transition-colors">
//               Get Started
//             </button>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-6 relative overflow-hidden">
//         <div className="absolute inset-0 bg-purple-gradient opacity-20" />
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <h1 className="text-6xl md:text-8xl font-bricolage font-bold mb-8 leading-tight">
//             Transform Your
//             <span className="text-evolve-heliotrope block">
//               Creative Vision
//             </span>
//           </h1>

//           <p className="text-xl md:text-2xl text-evolve-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
//             From concept to creation, from idea to impact. Join thousands of
//             creators, designers, and innovators who've evolved their skills into
//             remarkable careers.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
//             <button className="bg-evolve-heliotrope text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-evolve-lavender-indigo transition-all duration-300 flex items-center space-x-2 shadow-button-popped hover:shadow-button">
//               <span>Start Your Journey</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>

//             <button className="border-2 border-evolve-heliotrope text-evolve-heliotrope px-8 py-4 rounded-xl text-lg font-medium hover:bg-evolve-heliotrope hover:text-white transition-all duration-300">
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* Floating elements */}
//         <div className="absolute top-20 left-10 w-20 h-20 bg-evolve-bright-turquoise/20 rounded-full animate-particle-float" />
//         <div
//           className="absolute bottom-20 right-10 w-16 h-16 bg-evolve-inchworm/20 rounded-full animate-particle-float"
//           style={{ animationDelay: "2s" }}
//         />
//         <div
//           className="absolute top-1/2 left-1/4 w-12 h-12 bg-evolve-flame/20 rounded-full animate-particle-float"
//           style={{ animationDelay: "4s" }}
//         />
//       </section>

//       {/* Features Section */}
//       <section id="programs" className="py-20 px-6 bg-evolve-charleston-green">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-6xl font-bricolage font-bold mb-6">
//               Why Choose <span className="text-evolve-heliotrope">EVOLVE</span>?
//             </h2>
//             <p className="text-xl text-evolve-white/80 max-w-3xl mx-auto">
//               We don't just teach skills. We transform mindsets, build
//               communities, and create remarkable creators.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: <Target className="w-8 h-8" />,
//                 title: "Precision Learning",
//                 description:
//                   "Targeted skills that matter in today's creative economy",
//                 color: "evolve-heliotrope"
//               },
//               {
//                 icon: <Rocket className="w-8 h-8" />,
//                 title: "Accelerated Growth",
//                 description:
//                   "Fast-track your journey from beginner to professional",
//                 color: "evolve-bright-turquoise"
//               },
//               {
//                 icon: <Users className="w-8 h-8" />,
//                 title: "Community Power",
//                 description:
//                   "Connect with like-minded creators and industry mentors",
//                 color: "evolve-inchworm"
//               },
//               {
//                 icon: <Zap className="w-8 h-8" />,
//                 title: "Real Impact",
//                 description:
//                   "Build projects that showcase your remarkable abilities",
//                 color: "evolve-flame"
//               }
//             ].map((feature, index) =>
//               <div
//                 key={index}
//                 className="bg-evolve-black/50 p-8 rounded-2xl border border-evolve-heliotrope/20 hover:border-evolve-heliotrope/50 transition-all duration-300 hover:transform hover:scale-105"
//               >
//                 <div
//                   className={`w-16 h-16 bg-${feature.color}/20 rounded-xl flex items-center justify-center mb-6`}
//                 >
//                   <div className={`text-${feature.color}`}>
//                     {feature.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bricolage font-bold mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-evolve-white/70">
//                   {feature.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-evolve-heliotrope">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl md:text-6xl font-bricolage font-bold mb-6 text-white">
//             Ready to be <span className="text-evolve-inchworm">Remarkable</span>
//             ?
//           </h2>
//           <p className="text-xl text-white/90 mb-12">
//             Join thousands of creators who've transformed their passion into
//             purpose.
//           </p>
//           <button className="bg-white text-evolve-heliotrope px-12 py-6 rounded-2xl text-xl font-bold hover:bg-evolve-white/90 transition-all duration-300 shadow-button-popped hover:shadow-button">
//             Start Your Evolution Today
//           </button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 px-6 bg-evolve-black border-t border-evolve-heliotrope/20">
//         <div className="max-w-7xl mx-auto text-center">
//           <div className="flex items-center justify-center space-x-2 mb-6">
//             <Zap className="w-6 h-6 text-evolve-heliotrope" />
//             <span className="text-xl font-bricolage font-bold">EVOLVE</span>
//           </div>
//           <p className="text-evolve-white/60">© 2025 Evolve. Be Remarkable.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;

// import React from "react";
// import FirstPage from "./sections/FirstPage.jsx";
// import SecondPage from "./sections/SecondPage.jsx";
// import ThirdPage from "./sections/ThirdPage.jsx";
// import FourthPage from "./sections/FourthPage.jsx";
// import FifthPage from "./sections/FifthPage.jsx";
// import FooterPage from "./sections/FooterPage.jsx";
// import SixthPage from "./sections/SixthPage.jsx";
// import SeventhPage from "./sections/SeventhPage.jsx";

// const LandingPage = () => {
//   return (
//     <div className="bg-black text-white">
//       <FirstPage />
//       {/* add more pages/sections below as you go */}
//       <SecondPage />
//       <ThirdPage />
//       <FourthPage />
//       <FifthPage />
//       <SixthPage />
//       <SeventhPage />
//       <FooterPage />
//     </div>
//   );
// };

// export default LandingPage;

import React from "react";
import { evolveLogo } from "../assets/images";
import FirstPage from "./sections/FirstPage.jsx";
import SecondPage from "./sections/SecondPage.jsx";
import ThirdPage from "./sections/ThirdPage.jsx";
import FourthPage from "./sections/FourthPage.jsx";
import FifthPage from "./sections/FifthPage.jsx";
import FooterPage from "./sections/FooterPage.jsx";
import SixthPage from "./sections/SixthPage.jsx";
import SeventhPage from "./sections/SeventhPage.jsx";
import ToolkitPage from "./sections/ToolkitPage.jsx";
import WhyNowPage from "./sections/WhyNowPage.jsx";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      {/* matches peel scene docking: margin x=20px, y=18px; width 110px (mobile), 140px (md+) */}
      <header className="fixed top-0 left-0 w-full z-40">
        <div
          className="pointer-events-none"
          style={{ paddingTop: 18, paddingLeft: 20 }}
        >
          <img
            src={evolveLogo}
            alt="evolve"
            className="w-[110px] md:w-[140px] h-auto select-none"
            draggable={false}
          />
        </div>
      </header>

      <FirstPage />
      {/* <SecondPage /> */}
      <ThirdPage />
      <FourthPage />
      <ToolkitPage />
      <FifthPage />
      <SixthPage />
      <SeventhPage />
      {/* <WhyNowPage /> */}
      <FooterPage />
    </div>
  );
};

export default LandingPage;
