// // // PeelScene.jsx
// // import React, { useRef, useEffect } from "react";
// // import { Canvas, useLoader } from "@react-three/fiber";
// // import { TextureLoader } from "three";
// // import { gsap } from "gsap";
// // import { evolveLogo } from "../assets/images";
// // import * as THREE from "three";

// // function PeelPage({ onComplete }) {
// //   const meshRef = useRef();
// //   const texture = useLoader(TextureLoader, evolveLogo);

// //   useEffect(() => {
// //     if (!meshRef.current) return;

// //     const tl = gsap.timeline({
// //       onComplete
// //     });

// //     // Step 1: initial pop-in (slight grow)
// //     tl.fromTo(
// //       meshRef.current.scale,
// //       { x: 0.85, y: 0.85, z: 0.85 },
// //       { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
// //     );

// //     // Step 2: rotate + subtle scale up (cinematic push-out effect)
// //     tl.to(
// //       meshRef.current.rotation,
// //       {
// //         y: Math.PI * 1.2,
// //         duration: 3,
// //         ease: "power2.inOut"
// //       },
// //       "start"
// //     ).to(
// //       meshRef.current.scale,
// //       {
// //         x: 1.1,
// //         y: 1.1,
// //         z: 1.1,
// //         duration: 1.5,
// //         ease: "power1.out"
// //       },
// //       "start+=0.2"
// //     );

// //     // Step 3: lift away
// //     tl.to(
// //       meshRef.current.position,
// //       {
// //         x: -3,
// //         y: 2,
// //         z: -1.5,
// //         duration: 3,
// //         ease: "power2.inOut"
// //       },
// //       "start"
// //     );

// //     // Step 4: fade out near the end
// //     tl.to(
// //       meshRef.current.material,
// //       {
// //         opacity: 0,
// //         duration: 1.2,
// //         ease: "power1.out"
// //       },
// //       "-=0.8"
// //     );
// //   }, [onComplete]);

// //   return (
// //     <mesh ref={meshRef} position={[0, 0, 0]}>
// //       <planeGeometry args={[4, 2.5, 32, 32]} />
// //       <meshStandardMaterial
// //         map={texture}
// //         side={THREE.DoubleSide}
// //         transparent
// //         opacity={1}
// //         color={"#8b5cf6"} // lavender tint under logo
// //       />
// //     </mesh>
// //   );
// // }

// // export default function PeelScene({ onComplete }) {
// //   return (
// //     <Canvas className="w-full h-full bg-black">
// //       <ambientLight intensity={0.8} />
// //       <directionalLight position={[5, 5, 5]} intensity={1.2} />
// //       <PeelPage onComplete={onComplete} />
// //     </Canvas>
// //   );
// // }

// // PeelScene.jsx
// import React, { useRef, useEffect, useState } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import * as THREE from "three";
// import { TextureLoader } from "three";
// import { gsap } from "gsap";
// import { evolveLogo } from "../assets/images";

// function PeelPage({ onComplete }) {
//   const groupRef = useRef();
//   const frontRef = useRef();
//   const backRef = useRef();

//   const texture = useLoader(TextureLoader, evolveLogo);
//   const [planeSize, setPlaneSize] = useState([4, 2.5]); // default before texture loads

//   // match plane to logo aspect
//   useEffect(() => {
//     if (!texture || !texture.image) return;

//     texture.anisotropy = 8;
//     texture.minFilter = THREE.LinearMipmapLinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.generateMipmaps = true;
//     texture.encoding = THREE.sRGBEncoding;

//     const baseWidth = 4; // scene units
//     const aspect = texture.image.width / texture.image.height; // w/h
//     const height = baseWidth / aspect;
//     setPlaneSize([baseWidth, height]);
//   }, [texture]);

//   // flip animation
//   useEffect(() => {
//     if (!groupRef.current) return;

//     const tl = gsap.timeline({ onComplete });

//     // gentle pop
//     tl.fromTo(
//       groupRef.current.scale,
//       { x: 0.85, y: 0.85, z: 0.85 },
//       { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
//     );

//     // give slight tilt for parallax
//     gsap.set(groupRef.current.rotation, { x: 0.15 });

//     // full flip, small push and lift
//     tl.to(
//       groupRef.current.rotation,
//       { y: Math.PI * 2, duration: 2.8, ease: "power2.inOut" },
//       "start"
//     )
//       .to(
//         groupRef.current.position,
//         { z: -0.6, y: 0.15, duration: 1.4, ease: "power1.inOut" },
//         "start+=0.1"
//       )
//       .to(
//         groupRef.current.scale,
//         { x: 1.08, y: 1.08, z: 1.08, duration: 1.2, ease: "power1.out" },
//         "start+=0.2"
//       );

//     // fade out near the end
//     tl.to(
//       [frontRef.current.material, backRef.current.material],
//       { opacity: 0, duration: 0.9, ease: "power1.out" },
//       "-=0.6"
//     );
//   }, [onComplete, planeSize]);

//   const [w, h] = planeSize;

//   return (
//     <group ref={groupRef} position={[0, 0, 0]}>
//       {/* front face: normal logo */}
//       <mesh ref={frontRef}>
//         <planeGeometry args={[w, h, 32, 32]} />
//         <meshBasicMaterial
//           map={texture}
//           side={THREE.FrontSide}
//           transparent
//           opacity={1}
//           toneMapped={false}
//         />
//       </mesh>

//       {/* back face: same logo, not mirrored (rotate 180°) */}
//       <mesh ref={backRef} rotation={[0, Math.PI, 0]} position={[0, 0, -0.0005]}>
//         {/* tiny negative z to avoid z-fighting with the front plane */}
//         <planeGeometry args={[w, h, 32, 32]} />
//         <meshBasicMaterial
//           map={texture}
//           side={THREE.FrontSide}
//           transparent
//           opacity={1}
//           toneMapped={false}
//         />
//       </mesh>
//     </group>
//   );
// }

// export default function PeelScene({ onComplete }) {
//   return (
//     <Canvas
//       className="w-full h-full bg-black"
//       camera={{ position: [0, 0, 6], fov: 50 }}
//     >
//       {/* MeshBasicMaterial ignores lights, but keeping them is fine */}
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[5, 5, 5]} intensity={1.2} />
//       <PeelPage onComplete={onComplete} />
//     </Canvas>
//   );
// }

// PeelScene.jsx
// import React, {
//   useRef,
//   useEffect,
//   useState,
//   useLayoutEffect,
//   forwardRef,
//   useImperativeHandle
// } from "react";
// import { Canvas, useLoader, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { TextureLoader } from "three";
// import { gsap } from "gsap";
// import { evolveLogo } from "../assets/images";

// // -------- helpers
// function worldViewportAtZ0(camera, widthPx, heightPx) {
//   // vertical world units visible at z=0
//   const vFov = THREE.MathUtils.degToRad(camera.fov);
//   const dist = camera.position.z; // object at z=0
//   const viewH = 2 * Math.tan(vFov / 2) * dist;
//   const viewW = viewH * (widthPx / heightPx);
//   return { viewW, viewH };
// }
// function pxToWorld(px, axisWorld, axisPx) {
//   return (px / axisPx) * axisWorld;
// }

// // -------- 3D logo
// const PeelPage = forwardRef(function PeelPage(
//   { onReady, onDocked, navWidthPx = 140, marginPx = { x: 20, y: 16 } },
//   ref
// ) {
//   const groupRef = useRef();
//   const frontRef = useRef();
//   const backRef = useRef();
//   const texture = useLoader(TextureLoader, evolveLogo);
//   const [planeSize, setPlaneSize] = useState([4, 2.5]); // default
//   const { camera, size } = useThree();

//   // texture + plane sizing
//   useEffect(() => {
//     if (!texture || !texture.image) return;
//     texture.anisotropy = 8;
//     texture.minFilter = THREE.LinearMipmapLinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.generateMipmaps = true;
//     texture.encoding = THREE.sRGBEncoding;

//     const baseWidth = 4;
//     const aspect = texture.image.width / texture.image.height;
//     setPlaneSize([baseWidth, baseWidth / aspect]);
//   }, [texture]);

//   // initial pop and settle (no flip)
//   useLayoutEffect(() => {
//     if (!groupRef.current) return;
//     gsap.set(groupRef.current.rotation, { x: 0.12, y: 0 });
//     gsap.fromTo(
//       groupRef.current.scale,
//       { x: 0.85, y: 0.85, z: 0.85 },
//       { x: 1, y: 1, z: 1, duration: 0.9, ease: "back.out(1.6)" }
//     );
//     gsap.fromTo(
//       groupRef.current.position,
//       { y: -0.1 },
//       { y: 0, duration: 0.8, ease: "power2.out", onComplete: () => onReady?.() }
//     );
//   }, [onReady]);

//   // expose a docking method to parent
//   useImperativeHandle(ref, () => ({
//     dockToNavbar() {
//       if (!groupRef.current) return;

//       const [w, h] = planeSize;

//       // compute viewport in world units
//       const { viewW, viewH } = worldViewportAtZ0(
//         camera,
//         size.width,
//         size.height
//       );

//       // target logo width in pixels -> convert to world units
//       const targetW_world = pxToWorld(navWidthPx, viewW, size.width);
//       const scale = targetW_world / w;

//       const marginX_world = pxToWorld(marginPx.x, viewW, size.width);
//       const marginY_world = pxToWorld(marginPx.y, viewH, size.height);

//       const targetH_world = h * scale;

//       // top-left corner in world at z=0
//       const leftX = -viewW / 2;
//       const topY = viewH / 2;

//       // position plane so it sits with margins and aligns by its center
//       const targetX = leftX + marginX_world + targetW_world / 2;
//       const targetY = topY - marginY_world - targetH_world / 2;

//       const tl = gsap.timeline({
//         defaults: { ease: "power3.inOut" },
//         onComplete: () => onDocked?.()
//       });

//       tl.to(groupRef.current.rotation, { x: 0, y: 0, duration: 0.6 }, 0);
//       tl.to(
//         groupRef.current.position,
//         { x: targetX, y: targetY, z: 0, duration: 1.2 },
//         0
//       );
//       tl.to(
//         groupRef.current.scale,
//         { x: scale, y: scale, z: scale, duration: 1.2 },
//         0
//       );

//       return tl;
//     }
//   }));

//   const [w, h] = planeSize;

//   return (
//     <group ref={groupRef} position={[0, 0, 0]}>
//       <mesh ref={frontRef}>
//         <planeGeometry args={[w, h, 32, 32]} />
//         <meshBasicMaterial
//           map={texture}
//           side={THREE.FrontSide}
//           transparent
//           opacity={1}
//           toneMapped={false}
//         />
//       </mesh>
//       <mesh ref={backRef} rotation={[0, Math.PI, 0]} position={[0, 0, -0.0005]}>
//         <planeGeometry args={[w, h, 32, 32]} />
//         <meshBasicMaterial
//           map={texture}
//           side={THREE.FrontSide}
//           transparent
//           opacity={1}
//           toneMapped={false}
//         />
//       </mesh>
//     </group>
//   );
// });

// // -------- wrapper + arrow + scroll handling
// export default function PeelScene({ onComplete }) {
//   const wrapperRef = useRef(null);
//   const logoRef = useRef(null);
//   const [ready, setReady] = useState(false);
//   const [docked, setDocked] = useState(false);

//   useEffect(() => {
//     if (!ready || docked) return;

//     let fired = false;
//     const startDock = () => {
//       if (fired) return;
//       fired = true;

//       // hide arrow
//       gsap.to(".scroll-arrow", {
//         autoAlpha: 0,
//         y: 10,
//         duration: 0.3,
//         ease: "power2.out"
//       });

//       // fade background to transparent and disable blocking
//       gsap.to(wrapperRef.current, {
//         backgroundColor: "rgba(0,0,0,0)",
//         duration: 1.0,
//         ease: "power2.inOut"
//       });

//       // animate logo into navbar
//       const tl = logoRef.current?.dockToNavbar();
//       tl?.add(() => {
//         setDocked(true);
//         // let underlying page receive events + scroll
//         if (wrapperRef.current) wrapperRef.current.style.pointerEvents = "none";
//         onComplete?.();
//       });
//     };

//     const onWheel = (e) => {
//       if (e.deltaY > 0) startDock();
//     };
//     const onTouch = (() => {
//       let startY = null;
//       return (e) => {
//         const t = e.touches?.[0];
//         if (startY === null && t) startY = t.clientY;
//         else if (t && startY !== null) {
//           const dy = startY - t.clientY;
//           if (dy > 8) startDock();
//         }
//       };
//     })();
//     const onKey = (e) => {
//       const k = e.key.toLowerCase();
//       if (["arrowdown", " ", "spacebar", "pagedown"].includes(k)) startDock();
//     };

//     window.addEventListener("wheel", onWheel, { passive: true });
//     window.addEventListener("touchstart", onTouch, { passive: true });
//     window.addEventListener("touchmove", onTouch, { passive: true });
//     window.addEventListener("keydown", onKey);

//     return () => {
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouch);
//       window.removeEventListener("touchmove", onTouch);
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [ready, docked, onComplete]);

//   return (
//     <div
//       ref={wrapperRef}
//       className="relative w-full h-screen bg-black overflow-hidden"
//     >
//       <Canvas
//         className="w-full h-full"
//         camera={{ position: [0, 0, 6], fov: 50 }}
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={1.2} />
//         <PeelPage
//           ref={logoRef}
//           onReady={() => setReady(true)}
//           onDocked={() => {}}
//           // tweak navbar size and margin if needed
//           navWidthPx={140} // width of logo when docked (in px relative to viewport)
//           marginPx={{ x: 20, y: 18 }} // distance from top-left edges (px)
//         />
//       </Canvas>

//       {/* down arrow overlay */}
//       {ready && !docked && (
//         <button
//           aria-label="scroll"
//           onClick={() => {
//             // click also docks
//             const evt = new WheelEvent("wheel", { deltaY: 100 });
//             window.dispatchEvent(evt);
//           }}
//           className="scroll-arrow pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center text-white/90"
//         >
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 24 24"
//             className="drop-shadow"
//           >
//             <path
//               d="M12 5v14M5 12l7 7 7-7"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <span className="mt-1 text-xs tracking-wide uppercase">scroll</span>
//         </button>
//       )}

//       {/* arrow bounce anim */}
//       <style jsx>{`
//         .scroll-arrow {
//           opacity: 0;
//           animation: arrowFadeIn 0.5s ease forwards 0.2s,
//             arrowBounce 1.2s ease-in-out infinite 0.7s;
//         }
//         @keyframes arrowFadeIn {
//           from {
//             opacity: 0;
//             transform: translate(-50%, 8px);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, 0);
//           }
//         }
//         @keyframes arrowBounce {
//           0%,
//           100% {
//             transform: translate(-50%, 0);
//           }
//           50% {
//             transform: translate(-50%, 8px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import React, {
//   useRef,
//   useEffect,
//   useState,
//   useLayoutEffect,
//   forwardRef,
//   useImperativeHandle
// } from "react";
// import { Canvas, useLoader, useThree } from "@react-three/fiber";
// import * as THREE from "three";
// import { TextureLoader } from "three";
// import { gsap } from "gsap";
// import { evolveLogo } from "../assets/images";

// // helpers
// function worldViewportAtZ0(camera, widthPx, heightPx) {
//   const vFov = THREE.MathUtils.degToRad(camera.fov);
//   const dist = camera.position.z;
//   const viewH = 2 * Math.tan(vFov / 2) * dist;
//   const viewW = viewH * (widthPx / heightPx);
//   return { viewW, viewH };
// }
// function pxToWorld(px, axisWorld, axisPx) {
//   return (px / axisPx) * axisWorld;
// }

// // 3D logo
// const PeelPage = forwardRef(function PeelPage(
//   { onReady, onDocked, navWidthPx = 140, marginPx = { x: 20, y: 16 } },
//   ref
// ) {
//   const groupRef = useRef();
//   const planeRef = useRef();
//   const texture = useLoader(TextureLoader, evolveLogo);
//   const [planeSize, setPlaneSize] = useState([4, 2.5]);
//   const { camera, size } = useThree();

//   // size plane to texture
//   useEffect(() => {
//     if (!texture || !texture.image) return;
//     texture.anisotropy = 8;
//     texture.minFilter = THREE.LinearMipmapLinearFilter;
//     texture.magFilter = THREE.LinearFilter;
//     texture.generateMipmaps = true;
//     texture.encoding = THREE.sRGBEncoding;

//     const baseWidth = 4;
//     const aspect = texture.image.width / texture.image.height;
//     setPlaneSize([baseWidth, baseWidth / aspect]);
//   }, [texture]);

//   // avoid double intro (Strict Mode dev)
//   const introPlayed = useRef(false);

//   // add near the top of PeelPage (we already have camera & size from useThree)
//   const isMobile = size.width <= 768;

//   // --- replace your current intro pop useLayoutEffect with this:
//   useLayoutEffect(() => {
//     if (!groupRef.current || !planeRef.current || introPlayed.current) return;
//     introPlayed.current = true;

//     // desired intro width in *pixels* (smaller on mobile)
//     const centerWidthPx = isMobile ? 200 : 320; // ← tweak these numbers

//     // convert desired px width to world units and compute scale
//     const { viewW } = worldViewportAtZ0(camera, size.width, size.height);
//     const [w] = planeSize; // plane's native world width
//     const targetW_world = pxToWorld(centerWidthPx, viewW, size.width);
//     const centerScale = targetW_world / w;

//     gsap.set(groupRef.current.rotation, { x: 0.12, y: 0 });
//     gsap.set(planeRef.current.material, { opacity: 0 });

//     const tl = gsap.timeline({ onComplete: () => onReady?.() });

//     // start slightly smaller, grow to target
//     tl.fromTo(
//       groupRef.current.scale,
//       { x: centerScale * 0.85, y: centerScale * 0.85, z: centerScale * 0.85 },
//       {
//         x: centerScale,
//         y: centerScale,
//         z: centerScale,
//         duration: 0.9,
//         ease: "back.out(1.6)"
//       }
//     )
//       .fromTo(
//         groupRef.current.position,
//         { y: -0.1 },
//         { y: 0, duration: 0.8, ease: "power2.out" },
//         "<"
//       )
//       .to(
//         planeRef.current.material,
//         { opacity: 1, duration: 0.3, ease: "power1.out" },
//         "<0.15"
//       );
//   }, [camera, size, planeSize, isMobile, onReady]);

//   // expose docking
//   useImperativeHandle(ref, () => ({
//     dockToNavbar() {
//       if (!groupRef.current) return;

//       const [w, h] = planeSize;
//       const { viewW, viewH } = worldViewportAtZ0(
//         camera,
//         size.width,
//         size.height
//       );

//       const targetW_world = pxToWorld(navWidthPx, viewW, size.width);
//       const scale = targetW_world / w;

//       const marginX_world = pxToWorld(marginPx.x, viewW, size.width);
//       const marginY_world = pxToWorld(marginPx.y, viewH, size.height);

//       const targetH_world = h * scale;
//       const leftX = -viewW / 2;
//       const topY = viewH / 2;

//       const targetX = leftX + marginX_world + targetW_world / 2;
//       const targetY = topY - marginY_world - targetH_world / 2;

//       const tl = gsap.timeline({
//         defaults: { ease: "power3.inOut" },
//         onComplete: () => onDocked?.()
//       });

//       tl.to(groupRef.current.rotation, { x: 0, y: 0, duration: 0.6 }, 0)
//         .to(
//           groupRef.current.position,
//           { x: targetX, y: targetY, z: 0, duration: 1.2 },
//           0
//         )
//         .to(
//           groupRef.current.scale,
//           { x: scale, y: scale, z: scale, duration: 1.2 },
//           0
//         );

//       return tl;
//     }
//   }));

//   const [w, h] = planeSize;

//   return (
//     <group ref={groupRef} position={[0, 0, 0]}>
//       <mesh ref={planeRef}>
//         <planeGeometry args={[w, h, 32, 32]} />
//         <meshBasicMaterial
//           map={texture}
//           side={THREE.FrontSide}
//           transparent
//           opacity={1}
//           toneMapped={false}
//         />
//       </mesh>
//     </group>
//   );
// });

// // wrapper + arrow + scroll handling
// export default function PeelScene({ onComplete }) {
//   const wrapperRef = useRef(null);
//   const logoRef = useRef(null);
//   const [ready, setReady] = useState(false);
//   const [docked, setDocked] = useState(false);

//   // mobile-specific size for docked logo
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== "undefined" ? window.innerWidth <= 768 : false
//   );
//   useEffect(() => {
//     const onR = () => setIsMobile(window.innerWidth <= 768);
//     window.addEventListener("resize", onR);
//     return () => window.removeEventListener("resize", onR);
//   }, []);

//   useEffect(() => {
//     if (!ready || docked) return;

//     let fired = false;
//     const startDock = () => {
//       if (fired) return;
//       fired = true;

//       gsap.to(".scroll-arrow", {
//         autoAlpha: 0,
//         y: 10,
//         duration: 0.3,
//         ease: "power2.out"
//       });
//       gsap.to(wrapperRef.current, {
//         backgroundColor: "rgba(0,0,0,0)",
//         duration: 1.0,
//         ease: "power2.inOut"
//       });

//       // pass mobile-specific width
//       const tl = logoRef.current?.dockToNavbar?.();
//       tl?.add(() => {
//         setDocked(true);
//         if (wrapperRef.current) wrapperRef.current.style.pointerEvents = "none";
//         onComplete?.();
//       });
//     };

//     const onWheel = (e) => {
//       if (e.deltaY > 0) startDock();
//     };
//     const onTouch = (() => {
//       let startY = null;
//       return (e) => {
//         const t = e.touches?.[0];
//         if (startY === null && t) startY = t.clientY;
//         else if (t && startY !== null) {
//           const dy = startY - t.clientY;
//           if (dy > 8) startDock();
//         }
//       };
//     })();
//     const onKey = (e) => {
//       const k = e.key.toLowerCase();
//       if (["arrowdown", " ", "spacebar", "pagedown"].includes(k)) startDock();
//     };

//     window.addEventListener("wheel", onWheel, { passive: true });
//     window.addEventListener("touchstart", onTouch, { passive: true });
//     window.addEventListener("touchmove", onTouch, { passive: true });
//     window.addEventListener("keydown", onKey);

//     return () => {
//       window.removeEventListener("wheel", onWheel);
//       window.removeEventListener("touchstart", onTouch);
//       window.removeEventListener("touchmove", onTouch);
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [ready, docked, onComplete]);

//   return (
//     <div
//       ref={wrapperRef}
//       className="relative w-full h-screen bg-black overflow-hidden"
//     >
//       <Canvas
//         className="w-full h-full"
//         camera={{ position: [0, 0, 6], fov: 50 }}
//       >
//         <ambientLight intensity={0.8} />
//         <directionalLight position={[5, 5, 5]} intensity={1.2} />
//         <PeelPage
//           ref={logoRef}
//           onReady={() => setReady(true)}
//           onDocked={() => {}}
//           // mobile smaller width when docked
//           navWidthPx={isMobile ? 110 : 140}
//           marginPx={{ x: 20, y: 18 }}
//         />
//       </Canvas>

//       {/* down arrow overlay */}
//       {ready && !docked && (
//         <button
//           aria-label="scroll"
//           onClick={() => {
//             const evt = new WheelEvent("wheel", { deltaY: 100 });
//             window.dispatchEvent(evt);
//           }}
//           className="scroll-arrow font-bricolage lowercase pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center text-white/90"
//         >
//           <svg
//             width="28"
//             height="28"
//             viewBox="0 0 24 24"
//             className="drop-shadow"
//           >
//             <path
//               d="M12 5v14M5 12l7 7 7-7"
//               stroke="currentColor"
//               strokeWidth="2"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//           <span className="mt-1 text-md tracking-wide lowercase font-bricolage">scroll</span>
//         </button>
//       )}

//       <style jsx>{`
//         .scroll-arrow {
//           opacity: 0;
//           animation: arrowFadeIn 0.5s ease forwards 0.2s,
//             arrowBounce 1.2s ease-in-out infinite 0.7s;
//         }
//         @keyframes arrowFadeIn {
//           from {
//             opacity: 0;
//             transform: translate(-50%, 8px);
//           }
//           to {
//             opacity: 1;
//             transform: translate(-50%, 0);
//           }
//         }
//         @keyframes arrowBounce {
//           0%,
//           100% {
//             transform: translate(-50%, 0);
//           }
//           50% {
//             transform: translate(-50%, 8px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// PeelScene.jsx
import React, {
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { gsap } from "gsap";
import { evolveLogo } from "../assets/images";

// helpers
function worldViewportAtZ0(camera, widthPx, heightPx) {
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const dist = camera.position.z;
  const viewH = 2 * Math.tan(vFov / 2) * dist;
  const viewW = viewH * (widthPx / heightPx);
  return { viewW, viewH };
}
function pxToWorld(px, axisWorld, axisPx) {
  return (px / axisPx) * axisWorld;
}

// 3D logo plane
const PeelPage = forwardRef(function PeelPage(
  {
    onReady,
    onDocked,
    onSubtextCue,
    navWidthPx = 140,
    marginPx = { x: 20, y: 16 }
  },
  ref
) {
  const groupRef = useRef();
  const planeRef = useRef();
  const texture = useLoader(TextureLoader, evolveLogo);
  const [planeSize, setPlaneSize] = useState([4, 2.5]);
  const { camera, size } = useThree();

  useEffect(() => {
    if (!texture || !texture.image) return;
    texture.anisotropy = 8;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.encoding = THREE.sRGBEncoding;

    const baseWidth = 4;
    const aspect = texture.image.width / texture.image.height;
    setPlaneSize([baseWidth, baseWidth / aspect]);
  }, [texture]);

  const introPlayed = useRef(false);
  const isMobile = size.width <= 768;

  useLayoutEffect(() => {
    if (!groupRef.current || !planeRef.current || introPlayed.current) return;
    introPlayed.current = true;

    const centerWidthPx = isMobile ? 200 : 320;
    const { viewW } = worldViewportAtZ0(camera, size.width, size.height);
    const [w] = planeSize;
    const targetW_world = pxToWorld(centerWidthPx, viewW, size.width);
    const centerScale = targetW_world / w;

    gsap.set(groupRef.current.rotation, { x: 0.12, y: 0 });
    gsap.set(planeRef.current.material, { opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => onReady?.() });
    tl.fromTo(
      groupRef.current.scale,
      { x: centerScale * 0.85, y: centerScale * 0.85, z: centerScale * 0.85 },
      {
        x: centerScale,
        y: centerScale,
        z: centerScale,
        duration: 0.9,
        ease: "back.out(1.6)"
      }
    )
      .fromTo(
        groupRef.current.position,
        { y: -0.1 },
        { y: 0, duration: 0.8, ease: "power2.out" },
        "<"
      )
      .to(
        planeRef.current.material,
        { opacity: 1, duration: 0.3, ease: "power1.out" },
        "<0.15"
      )
      // cue subtext slightly before intro ends
      .call(() => onSubtextCue?.(), [], "-=0.2");
  }, [camera, size, planeSize, isMobile, onReady, onSubtextCue]);

  useImperativeHandle(ref, () => ({
    dockToNavbar() {
      if (!groupRef.current) return;

      const [w, h] = planeSize;
      const { viewW, viewH } = worldViewportAtZ0(
        camera,
        size.width,
        size.height
      );

      const targetW_world = pxToWorld(navWidthPx, viewW, size.width);
      const scale = targetW_world / w;

      const marginX_world = pxToWorld(marginPx.x, viewW, size.width);
      const marginY_world = pxToWorld(marginPx.y, viewH, size.height);

      const targetH_world = h * scale;
      const leftX = -viewW / 2;
      const topY = viewH / 2;

      const targetX = leftX + marginX_world + targetW_world / 2;
      const targetY = topY - marginY_world - targetH_world / 2;

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => onDocked?.()
      });

      tl.to(groupRef.current.rotation, { x: 0, y: 0, duration: 0.6 }, 0)
        .to(
          groupRef.current.position,
          { x: targetX, y: targetY, z: 0, duration: 1.0 },
          0
        )
        .to(
          groupRef.current.scale,
          { x: scale, y: scale, z: scale, duration: 1.0 },
          0
        );

      return tl;
    }
  }));

  const [w, h] = planeSize;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh ref={planeRef}>
        <planeGeometry args={[w, h, 32, 32]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.FrontSide}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
});

// wrapper + "be remarkable." + arrow + scroll handling
export default function PeelScene({ onComplete }) {
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);

  const [ready, setReady] = useState(false);
  const [docked, setDocked] = useState(false);
  const [arrowEnabled, setArrowEnabled] = useState(false);

  const remarkRef = useRef(null);
  const arrowRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  useEffect(() => {
    const onR = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  // subtext starts hidden
  useLayoutEffect(() => {
    if (!remarkRef.current) return;
    gsap.set(remarkRef.current, { autoAlpha: 0, y: 6 });
  }, []);

  // show arrow immediately after intro completes (which is just after subtext cue)
  useEffect(() => {
    if (!ready) return;
    setArrowEnabled(true);
  }, [ready]);

  // subtext cue handler from the logo intro
  const handleSubtextCue = () => {
    const el = remarkRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  };

  useEffect(() => {
    if (!ready || docked) return;

    let fired = false;
    const startDock = () => {
      if (fired) return;
      fired = true;

      // hide arrow
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          autoAlpha: 0,
          y: 10,
          duration: 0.25,
          ease: "power2.out"
        });
      }
      // hide "be remarkable."
      if (remarkRef.current) {
        gsap.to(remarkRef.current, {
          autoAlpha: 0,
          y: -12,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      // fade the scene bg to transparent so page shows through
      if (wrapperRef.current) {
        gsap.to(wrapperRef.current, {
          backgroundColor: "rgba(0,0,0,0)",
          duration: 0.6,
          ease: "power2.inOut"
        });
      }

      // dock the 3d logo to header
      const tl = logoRef.current?.dockToNavbar?.();
      tl?.add(() => {
        setDocked(true);
        if (wrapperRef.current) wrapperRef.current.style.pointerEvents = "none";
        onComplete?.();
      });
    };

    const onWheel = (e) => {
      if (e.deltaY > 0) startDock();
    };
    const onTouch = (() => {
      let startY = null;
      return (e) => {
        const t = e.touches?.[0];
        if (startY === null && t) startY = t.clientY;
        else if (t && startY !== null) {
          const dy = startY - t.clientY;
          if (dy > 8) startDock();
        }
      };
    })();
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (["arrowdown", " ", "spacebar", "pagedown"].includes(k)) startDock();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onKey);
    };
  }, [ready, docked, onComplete]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-screen bg-black overflow-hidden font-bricolage lowercase"
    >
      <Canvas
        className="w-full h-full"
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <PeelPage
          ref={logoRef}
          onReady={() => setReady(true)}
          onDocked={() => {}}
          onSubtextCue={handleSubtextCue}
          navWidthPx={isMobile ? 110 : 140}
          marginPx={{ x: 20, y: 18 }}
        />
      </Canvas>

      {/* centered overlay for "be remarkable." — placed below the logo */}
      {!docked && (
        <div
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-center z-20"
          style={{
            top: `calc(50% + ${isMobile ? 40 : 60}px)`
          }}
        >
          <div
            ref={remarkRef}
            className="text-2xl md:text-4xl font-bold text-white"
            style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.35))" }}
          >
            be remarkable.
          </div>
        </div>
      )}

      {/* scroll arrow overlay */}
      {ready && !docked && arrowEnabled && (
        <button
          ref={arrowRef}
          aria-label="scroll"
          onClick={() => {
            const evt = new WheelEvent("wheel", { deltaY: 100 });
            window.dispatchEvent(evt);
          }}
          className="scroll-arrow font-bricolage lowercase pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center text-white/90"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            className="drop-shadow"
          >
            <path
              d="M12 5v14M5 12l7 7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-1 text-md tracking-wide">scroll</span>
        </button>
      )}

      <style jsx>{`
        .scroll-arrow {
          opacity: 0;
          animation: arrowFadeIn 0.5s ease forwards,
            arrowBounce 1.2s ease-in-out infinite;
        }
        @keyframes arrowFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, 8px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes arrowBounce {
          0%,
          100% {
            transform: translate(-50%, 0);
          }
          50% {
            transform: translate(-50%, 8px);
          }
        }
      `}</style>
    </div>
  );
}
