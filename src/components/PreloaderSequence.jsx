// import React, { useState, useEffect } from 'react';
// import { Zap, Sparkles } from 'lucide-react';
// import  GlassShatterEffect from "./GlassShatterEffect.jsx";
// import ParticleBackground from './ParticleBackground';

// interface PreloaderSequenceProps {
//   onComplete: () => void;
// }

// const PreloaderSequence: React.FC<PreloaderSequenceProps> = ({ onComplete }) => {
//   const [stage, setStage] = useState<'glass' | 'text1' | 'text2' | 'text3' | 'logo' | 'peel' | 'complete'>('glass');
//   const [clickCount, setClickCount] = useState(0);
//   const [showShatter, setShowShatter] = useState(false);
//   const [textVisible, setTextVisible] = useState(false);

//   const handleGlassClick = () => {
//     setClickCount(prev => prev + 1);

//     if (clickCount >= 2) { // After 3 clicks (0, 1, 2)
//       setShowShatter(true);
//     }
//   };

//   const handleShatterComplete = () => {
//     setStage('text1');
//     setTextVisible(true);
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout;

//     if (stage === 'text1' && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage('text2');
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === 'text2' && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage('text3');
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === 'text3' && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage('logo');
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === 'logo' && textVisible) {
//       timer = setTimeout(() => {
//         setStage('peel');
//       }, 4000);
//     } else if (stage === 'peel') {
//       timer = setTimeout(() => {
//         setStage('complete');
//         onComplete();
//       }, 2000);
//     }

//     return () => clearTimeout(timer);
//   }, [stage, textVisible, onComplete]);

//   if (stage === 'complete') return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Glass Breaking Stage */}
//       {stage === 'glass' && (
//         <div
//           className="w-full h-full bg-evolve-black flex items-center justify-center cursor-pointer relative overflow-hidden"
//           onClick={handleGlassClick}
//         >
//           {/* Crack effects */}
//           {clickCount > 0 && (
//             <>
//               {Array.from({ length: clickCount * 8 }, (_, i) => (
//                 <div
//                   key={i}
//                   className="absolute bg-white opacity-30"
//                   style={{
//                     width: '2px',
//                     height: `${50 + Math.random() * 100}px`,
//                     left: `${30 + Math.random() * 40}%`,
//                     top: `${30 + Math.random() * 40}%`,
//                     transform: `rotate(${Math.random() * 360}deg)`,
//                     transformOrigin: 'center',
//                   }}
//                 />
//               ))}
//             </>
//           )}

//           {/* Interaction hint */}
//           <div className="text-center text-evolve-white opacity-70">
//             <div className="text-2xl font-montserrat mb-4">Click to break through</div>
//             <div className="flex justify-center space-x-2">
//               {Array.from({ length: 3 }, (_, i) => (
//                 <div
//                   key={i}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     i < clickCount ? 'bg-evolve-heliotrope' : 'bg-evolve-gray'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           <GlassShatterEffect isActive={showShatter} onComplete={handleShatterComplete} />
//         </div>
//       )}

//       {/* Text Stages with Particle Background */}
//       {(stage === 'text1' || stage === 'text2' || stage === 'text3') && (
//         <div className="w-full h-full bg-purple-gradient relative overflow-hidden flex items-center justify-center">
//           <ParticleBackground />

//           <div className={`text-center z-10 px-8 transition-all duration-1500 ${
//             textVisible ? 'animate-text-reveal' : 'opacity-0'
//           }`}>
//             {stage === 'text1' && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From <span className="text-evolve-bright-turquoise font-medium">scribbles</span> in a notebook
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   screens that <span className="text-evolve-inchworm font-medium">stop you.</span>
//                 </div>
//               </div>
//             )}

//             {stage === 'text2' && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From <span className="text-evolve-flame font-medium">spark</span> in your head
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   fire in <span className="text-evolve-yellow font-medium">their eyes.</span>
//                 </div>
//               </div>
//             )}

//             {stage === 'text3' && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From <span className="text-evolve-jasper font-medium">'that's impossible'</span>
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   <span className="text-evolve-inchworm font-medium">'watch me!'</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Logo Stage */}
//       {stage === 'logo' && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center">
//           <div className={`text-center transition-all duration-1500 ${
//             textVisible ? 'animate-text-reveal' : 'opacity-0'
//           }`}>
//             <div className="flex items-center justify-center mb-8">
//               <div className="relative">
//                 <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//                 <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//               </div>
//             </div>
//             <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//               EVOLVE
//             </div>
//             <div className="text-2xl md:text-3xl font-montserrat text-evolve-white font-light">
//               Be Remarkable.
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page Peel Stage */}
//       {stage === 'peel' && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center animate-page-peel">
//           <div className="flex items-center justify-center mb-8">
//             <div className="relative">
//               <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//               <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//             </div>
//           </div>
//           <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//             EVOLVE
//           </div>
//           <div className="text-2xl md:text-3xl font-montserrat text-evolve-white font-light">
//             Be Remarkable.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreloaderSequence;

// import React, { useState, useEffect } from "react";
// import { Zap, Sparkles } from "lucide-react";
// import GlassShatterEffect from "./GlassShatterEffect.jsx";
// import ParticleBackground from "./ParticleBackground.jsx";

// const PreloaderSequence = ({ onComplete }) => {
//   const [stage, setStage] = useState("glass");
//   const [clickCount, setClickCount] = useState(0);
//   const [showShatter, setShowShatter] = useState(false);
//   const [textVisible, setTextVisible] = useState(false);

//   const handleGlassClick = () => {
//     setClickCount((prev) => prev + 1);

//     if (clickCount >= 2) {
//       // After 3 clicks (0, 1, 2)
//       setShowShatter(true);
//     }
//   };

//   const handleShatterComplete = () => {
//     setStage("text1");
//     setTextVisible(true);
//   };

//   useEffect(() => {
//     let timer;

//     if (stage === "text1" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("text2");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "text2" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("text3");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "text3" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("logo");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "logo" && textVisible) {
//       timer = setTimeout(() => {
//         setStage("peel");
//       }, 4000);
//     } else if (stage === "peel") {
//       timer = setTimeout(() => {
//         setStage("complete");
//         onComplete();
//       }, 2000);
//     }

//     return () => clearTimeout(timer);
//   }, [stage, textVisible, onComplete]);

//   if (stage === "complete") return null;

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* Glass Breaking Stage */}
//       {stage === "glass" && (
//         <div
//           className="w-full h-full bg-evolve-black flex items-center justify-center cursor-pointer relative overflow-hidden"
//           onClick={handleGlassClick}
//         >
//           {/* Crack effects */}
//           {clickCount > 0 && (
//             <>
//               {Array.from({ length: clickCount * 8 }, (_, i) => (
//                 <div
//                   key={i}
//                   className="absolute bg-white opacity-30"
//                   style={{
//                     width: "2px",
//                     height: `${50 + Math.random() * 100}px`,
//                     left: `${30 + Math.random() * 40}%`,
//                     top: `${30 + Math.random() * 40}%`,
//                     transform: `rotate(${Math.random() * 360}deg)`,
//                     transformOrigin: "center"
//                   }}
//                 />
//               ))}
//             </>
//           )}

//           {/* Interaction hint */}
//           <div className="text-center text-evolve-white opacity-70">
//             <div className="text-2xl font-montserrat mb-4">
//               Click to break through
//             </div>
//             <div className="flex justify-center space-x-2">
//               {Array.from({ length: 3 }, (_, i) => (
//                 <div
//                   key={i}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     i < clickCount ? "bg-evolve-heliotrope" : "bg-evolve-gray"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           <GlassShatterEffect
//             isActive={showShatter}
//             onComplete={handleShatterComplete}
//           />
//         </div>
//       )}

//       {/* Text Stages with Particle Background */}
//       {(stage === "text1" || stage === "text2" || stage === "text3") && (
//         <div className="w-full h-full bg-purple-gradient relative overflow-hidden flex items-center justify-center">
//           <ParticleBackground />

//           <div
//             className={`text-center z-10 px-8 transition-all duration-1500 ${
//               textVisible ? "animate-text-reveal" : "opacity-0"
//             }`}
//           >
//             {stage === "text1" && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-bright-turquoise font-medium">
//                     scribbles
//                   </span>{" "}
//                   in a notebook
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   screens that{" "}
//                   <span className="text-evolve-inchworm font-medium">
//                     stop you.
//                   </span>
//                 </div>
//               </div>
//             )}

//             {stage === "text2" && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-flame font-medium">spark</span>{" "}
//                   in your head
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   fire in{" "}
//                   <span className="text-evolve-yellow font-medium">
//                     their eyes.
//                   </span>
//                 </div>
//               </div>
//             )}

//             {stage === "text3" && (
//               <div className="text-evolve-white font-montserrat">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-jasper font-medium">
//                     'that's impossible'
//                   </span>
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   <span className="text-evolve-inchworm font-medium">
//                     'watch me!'
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Logo Stage */}
//       {stage === "logo" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center">
//           <div
//             className={`text-center transition-all duration-1500 ${
//               textVisible ? "animate-text-reveal" : "opacity-0"
//             }`}
//           >
//             <div className="flex items-center justify-center mb-8">
//               <div className="relative">
//                 <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//                 <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//               </div>
//             </div>
//             <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//               EVOLVE
//             </div>
//             <div className="text-2xl md:text-3xl font-montserrat text-evolve-white font-light">
//               Be Remarkable.
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page Peel Stage */}
//       {stage === "peel" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center animate-page-peel">
//           <div className="flex items-center justify-center mb-8">
//             <div className="relative">
//               <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//               <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//             </div>
//           </div>
//           <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//             EVOLVE
//           </div>
//           <div className="text-2xl md:text-3xl font-montserrat text-evolve-white font-light">
//             Be Remarkable.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreloaderSequence;

// import React, { useState, useEffect } from "react";
// import { Zap, Sparkles } from "lucide-react";
// import GlassShatterEffect from "./GlassShatterEffect.jsx";
// import ParticleBackground from "./ParticleBackground.jsx";

// const PreloaderSequence = ({ onComplete }) => {
//   const [stage, setStage] = useState("glass");
//   const [clickCount, setClickCount] = useState(0);
//   const [textVisible, setTextVisible] = useState(false);

//   const handleGlassClick = () => {
//     setClickCount((prev) => Math.min(prev + 1, 3)); // max 3 clicks
//   };

//   const handleShatterComplete = () => {
//     setStage("text1");
//     setTextVisible(true);
//   };

//   useEffect(() => {
//     let timer;

//     if (stage === "text1" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("text2");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "text2" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("text3");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "text3" && textVisible) {
//       timer = setTimeout(() => {
//         setTextVisible(false);
//         setTimeout(() => {
//           setStage("logo");
//           setTextVisible(true);
//         }, 500);
//       }, 3000);
//     } else if (stage === "logo" && textVisible) {
//       timer = setTimeout(() => {
//         setStage("peel");
//       }, 4000);
//     } else if (stage === "peel") {
//       timer = setTimeout(() => {
//         setStage("complete");
//         onComplete();
//       }, 2000);
//     }

//     return () => clearTimeout(timer);
//   }, [stage, textVisible, onComplete]);

//   if (stage === "complete") return null;

//   return (
//     <div className="fixed inset-0 z-50 font-bricolage">
//       {/* Glass Breaking Stage */}
//       {stage === "glass" && (
//         <div
//           className="w-full h-full bg-evolve-black flex items-center justify-center cursor-pointer relative overflow-hidden"
//           onClick={handleGlassClick}
//         >
//           {/* Glass Effect behind text */}
//           <GlassShatterEffect
//             clickCount={clickCount}
//             onComplete={handleShatterComplete}
//           />

//           {/* Interaction hint (always above glass) */}
//           <div className="absolute text-center text-evolve-white opacity-70 z-20">
//             <div className="text-2xl font-bricolage mb-4 ">
//               Click to break through
//             </div>
//             <div className="flex justify-center space-x-2">
//               {Array.from({ length: 3 }, (_, i) => (
//                 <div
//                   key={i}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     i < clickCount ? "bg-evolve-heliotrope" : "bg-evolve-gray"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Text Stages with Particle Background */}
//       {(stage === "text1" || stage === "text2" || stage === "text3") && (
//         <div className="w-full h-full bg-purple-gradient relative overflow-hidden flex items-center justify-center">
//           <ParticleBackground />

//           <div
//             className={`text-center z-10 px-8 transition-all duration-1500 ${
//               textVisible ? "animate-text-reveal" : "opacity-0"
//             }`}
//           >
//             {stage === "text1" && (
//               <div className="text-evolve-white font-bricolage">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-bright-turquoise font-medium">
//                     scribbles
//                   </span>{" "}
//                   in a notebook
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   screens that{" "}
//                   <span className="text-evolve-inchworm font-medium">
//                     stop you.
//                   </span>
//                 </div>
//               </div>
//             )}

//             {stage === "text2" && (
//               <div className="text-evolve-white font-bricolage">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-flame font-medium">spark</span>{" "}
//                   in your head
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   fire in{" "}
//                   <span className="text-evolve-yellow font-medium">
//                     their eyes.
//                   </span>
//                 </div>
//               </div>
//             )}

//             {stage === "text3" && (
//               <div className="text-evolve-white font-bricolage">
//                 <div className="text-4xl md:text-6xl font-light leading-tight">
//                   From{" "}
//                   <span className="text-evolve-jasper font-medium">
//                     'that's impossible'
//                   </span>
//                 </div>
//                 <div className="text-3xl md:text-5xl font-light mt-4">
//                   <span className="text-evolve-heliotrope font-medium">TO</span>
//                 </div>
//                 <div className="text-4xl md:text-6xl font-light mt-4">
//                   <span className="text-evolve-inchworm font-medium">
//                     'watch me!'
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Logo Stage */}
//       {stage === "logo" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center">
//           <div
//             className={`text-center transition-all duration-1500 ${
//               textVisible ? "animate-text-reveal" : "opacity-0"
//             }`}
//           >
//             <div className="flex items-center justify-center mb-8">
//               <div className="relative">
//                 <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//                 <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//               </div>
//             </div>
//             <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//               EVOLVE
//             </div>
//             <div className="text-2xl md:text-3xl font-bricolage text-evolve-white font-light">
//               Be Remarkable.
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page Peel Stage */}
//       {stage === "peel" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center animate-page-peel">
//           <div className="flex items-center justify-center mb-8">
//             <div className="relative">
//               <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//               <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//             </div>
//           </div>
//           <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//             EVOLVE
//           </div>
//           <div className="text-2xl md:text-3xl font-bricolage text-evolve-white font-light">
//             Be Remarkable.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreloaderSequence;

// import React, { useState, useEffect } from "react";
// import { Zap, Sparkles } from "lucide-react";
// import GlassShatterEffect from "./GlassShatterEffect.jsx";
// import ParticleBackground from "./ParticleBackground.jsx";

// const PreloaderSequence = ({ onComplete }) => {
//   const [stage, setStage] = useState("glass");
//   const [clickCount, setClickCount] = useState(0);
//   const [textVisible, setTextVisible] = useState(false);

//   const handleGlassClick = () => {
//     setClickCount((prev) => Math.min(prev + 1, 3)); // max 3 clicks
//   };

//   const handleShatterComplete = () => {
//     setStage("particles");
//   };

//   const handleParticlesComplete = () => {
//     setStage("logo");
//     setTextVisible(true);
//   };

//   useEffect(() => {
//     let timer;

//     if (stage === "logo" && textVisible) {
//       timer = setTimeout(() => {
//         setStage("peel");
//       }, 4000);
//     } else if (stage === "peel") {
//       timer = setTimeout(() => {
//         setStage("complete");
//         onComplete();
//       }, 2000);
//     }

//     return () => clearTimeout(timer);
//   }, [stage, textVisible, onComplete]);

//   if (stage === "complete") return null;

//   return (
//     <div className="fixed inset-0 z-50 font-bricolage">
//       {/* Glass Breaking Stage */}
//       {stage === "glass" && (
//         <div
//           className="w-full h-full bg-evolve-black flex items-center justify-center cursor-pointer relative overflow-hidden"
//           onClick={handleGlassClick}
//         >
//           <GlassShatterEffect
//             clickCount={clickCount}
//             onComplete={handleShatterComplete}
//           />

//           {/* Interaction hint */}
//           <div className="absolute text-center text-evolve-white opacity-70 z-20">
//             <div className="text-2xl font-bricolage mb-4 ">
//               Click to break through
//             </div>
//             <div className="flex justify-center space-x-2">
//               {Array.from({ length: 3 }, (_, i) => (
//                 <div
//                   key={i}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     i < clickCount ? "bg-evolve-heliotrope" : "bg-evolve-gray"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Particle Background + Text Sequence */}
//       {stage === "particles" && (
//         <ParticleBackground onComplete={handleParticlesComplete} />
//       )}

//       {/* Logo Stage */}
//       {stage === "logo" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center">
//           <div
//             className={`text-center transition-all duration-1500 ${
//               textVisible ? "animate-text-reveal" : "opacity-0"
//             }`}
//           >
//             <div className="flex items-center justify-center mb-8">
//               <div className="relative">
//                 <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//                 <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//               </div>
//             </div>
//             <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//               EVOLVE
//             </div>
//             <div className="text-2xl md:text-3xl font-bricolage text-evolve-white font-light">
//               Be Remarkable.
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page Peel Stage */}
//       {stage === "peel" && (
//         <div className="w-full h-full bg-evolve-heliotrope flex flex-col items-center justify-center animate-page-peel">
//           <div className="flex items-center justify-center mb-8">
//             <div className="relative">
//               <Zap className="w-24 h-24 text-evolve-white animate-logo-shine" />
//               <Sparkles className="w-8 h-8 text-evolve-bright-turquoise absolute -top-2 -right-2 animate-pulse" />
//             </div>
//           </div>
//           <div className="text-6xl md:text-8xl font-bricolage font-bold text-evolve-white mb-4 animate-logo-shine">
//             EVOLVE
//           </div>
//           <div className="text-2xl md:text-3xl font-bricolage text-evolve-white font-light">
//             Be Remarkable.
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PreloaderSequence;

import React, { useState, useEffect } from "react";
import { evolveLogo } from "../assets/images"; // ✅ imported evolve logo
import GlassShatterEffect from "./GlassShatterEffect.jsx";
import ParticleBackground from "./ParticleBackground.jsx";
import PeelScene from "./PeelScene.jsx";

const PreloaderSequence = ({ onComplete }) => {
  const [stage, setStage] = useState("glass");
  const [clickCount, setClickCount] = useState(0);
  const [textVisible, setTextVisible] = useState(false);

  const handleGlassClick = () => {
    setClickCount((prev) => Math.min(prev + 1, 3));
  };

  const handleShatterComplete = () => {
    setStage("particles");
  };

  const handleParticlesComplete = () => {
    setStage("logo");
    setTextVisible(true);
  };

  // useEffect(() => {
  //   let timer;

  //   if (stage === "logo" && textVisible) {
  //     timer = setTimeout(() => {
  //       setStage("peel");
  //     }, 4000);
  //   } else if (stage === "peel") {
  //     timer = setTimeout(() => {
  //       setStage("complete");
  //       onComplete();
  //     }, 2500); // slight increase for cinematic feel
  //   }

  // return () => clearTimeout(timer);
  // }, [stage, textVisible, onComplete]);

  // PreloaderSequence.jsx (fix)
  useEffect(() => {
    let timer;

    if (stage === "logo" && textVisible) {
      timer = setTimeout(() => {
        setStage("peel");
      }, 4000);
    }

    return () => clearTimeout(timer);
  }, [stage, textVisible, onComplete]);

  if (stage === "complete") return null;

  return (
    <div className="fixed inset-0 z-50 font-bricolage">
      {/* Glass Breaking Stage */}
      {stage === "glass" && (
        <div
          className="w-full h-full bg-evolve-black flex items-center justify-center cursor-pointer relative overflow-hidden"
          onClick={handleGlassClick}
        >
          <GlassShatterEffect
            clickCount={clickCount}
            onComplete={handleShatterComplete}
          />

          {stage === "glass" && (
            <div className="absolute text-center text-evolve-white opacity-70 z-20">
              {clickCount < 3 && (
                <div className="text-4xl font-extrabold lowercase font-bricolage mb-4">
                  Break the Template
                </div>
              )}
              <div className="flex justify-center space-x-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < clickCount ? "bg-evolve-heliotrope" : "bg-evolve-gray"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Particle Background + Text Sequence */}
      {stage === "particles" && (
        <ParticleBackground onComplete={handleParticlesComplete} />
      )}

      {/* Logo Stage */}
      {stage === "logo" && (
        <div className="w-full h-full bg-evolve-lavender-indigo flex flex-col items-center justify-center">
          <div
            className={`text-center transition-all duration-1500 ${
              textVisible ? "animate-text-reveal" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-center mb-5">
              <img
                src={evolveLogo}
                alt="Evolve Logo"
                className="w-[15rem] h-auto animate-logo-shine"
              />
            </div>
            <div className="text-2xl md:text-4xl font-bricolage text-evolve-white font-bold lowercase">
              be remarkable.
            </div>
          </div>
        </div>
      )}

      {/* Page Peel Stage */}
      {/* Page Peel Stage */}
      {/* Page Peel Stage */}
      {stage === "peel" && (
        <div className="w-full h-full bg-black">
          <PeelScene
            onComplete={() => {
              setStage("complete");
              onComplete();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PreloaderSequence;
