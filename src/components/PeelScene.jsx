// // PeelScene.jsx
// import React, { useRef, useEffect } from "react";
// import { Canvas, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import { gsap } from "gsap";
// import { evolveLogo } from "../assets/images";
// import * as THREE from "three";

// function PeelPage({ onComplete }) {
//   const meshRef = useRef();
//   const texture = useLoader(TextureLoader, evolveLogo);

//   useEffect(() => {
//     if (!meshRef.current) return;

//     const tl = gsap.timeline({
//       onComplete
//     });

//     // Step 1: initial pop-in (slight grow)
//     tl.fromTo(
//       meshRef.current.scale,
//       { x: 0.85, y: 0.85, z: 0.85 },
//       { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
//     );

//     // Step 2: rotate + subtle scale up (cinematic push-out effect)
//     tl.to(
//       meshRef.current.rotation,
//       {
//         y: Math.PI * 1.2,
//         duration: 3,
//         ease: "power2.inOut"
//       },
//       "start"
//     ).to(
//       meshRef.current.scale,
//       {
//         x: 1.1,
//         y: 1.1,
//         z: 1.1,
//         duration: 1.5,
//         ease: "power1.out"
//       },
//       "start+=0.2"
//     );

//     // Step 3: lift away
//     tl.to(
//       meshRef.current.position,
//       {
//         x: -3,
//         y: 2,
//         z: -1.5,
//         duration: 3,
//         ease: "power2.inOut"
//       },
//       "start"
//     );

//     // Step 4: fade out near the end
//     tl.to(
//       meshRef.current.material,
//       {
//         opacity: 0,
//         duration: 1.2,
//         ease: "power1.out"
//       },
//       "-=0.8"
//     );
//   }, [onComplete]);

//   return (
//     <mesh ref={meshRef} position={[0, 0, 0]}>
//       <planeGeometry args={[4, 2.5, 32, 32]} />
//       <meshStandardMaterial
//         map={texture}
//         side={THREE.DoubleSide}
//         transparent
//         opacity={1}
//         color={"#8b5cf6"} // lavender tint under logo
//       />
//     </mesh>
//   );
// }

// export default function PeelScene({ onComplete }) {
//   return (
//     <Canvas className="w-full h-full bg-black">
//       <ambientLight intensity={0.8} />
//       <directionalLight position={[5, 5, 5]} intensity={1.2} />
//       <PeelPage onComplete={onComplete} />
//     </Canvas>
//   );
// }

// PeelScene.jsx
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { gsap } from "gsap";
import { evolveLogo } from "../assets/images";

function PeelPage({ onComplete }) {
  const groupRef = useRef();
  const frontRef = useRef();
  const backRef = useRef();

  const texture = useLoader(TextureLoader, evolveLogo);
  const [planeSize, setPlaneSize] = useState([4, 2.5]); // default before texture loads

  // match plane to logo aspect
  useEffect(() => {
    if (!texture || !texture.image) return;

    texture.anisotropy = 8;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.encoding = THREE.sRGBEncoding;

    const baseWidth = 4; // scene units
    const aspect = texture.image.width / texture.image.height; // w/h
    const height = baseWidth / aspect;
    setPlaneSize([baseWidth, height]);
  }, [texture]);

  // flip animation
  useEffect(() => {
    if (!groupRef.current) return;

    const tl = gsap.timeline({ onComplete });

    // gentle pop
    tl.fromTo(
      groupRef.current.scale,
      { x: 0.85, y: 0.85, z: 0.85 },
      { x: 1, y: 1, z: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    // give slight tilt for parallax
    gsap.set(groupRef.current.rotation, { x: 0.15 });

    // full flip, small push and lift
    tl.to(
      groupRef.current.rotation,
      { y: Math.PI * 2, duration: 2.8, ease: "power2.inOut" },
      "start"
    )
      .to(
        groupRef.current.position,
        { z: -0.6, y: 0.15, duration: 1.4, ease: "power1.inOut" },
        "start+=0.1"
      )
      .to(
        groupRef.current.scale,
        { x: 1.08, y: 1.08, z: 1.08, duration: 1.2, ease: "power1.out" },
        "start+=0.2"
      );

    // fade out near the end
    tl.to(
      [frontRef.current.material, backRef.current.material],
      { opacity: 0, duration: 0.9, ease: "power1.out" },
      "-=0.6"
    );
  }, [onComplete, planeSize]);

  const [w, h] = planeSize;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* front face: normal logo */}
      <mesh ref={frontRef}>
        <planeGeometry args={[w, h, 32, 32]} />
        <meshBasicMaterial
          map={texture}
          side={THREE.FrontSide}
          transparent
          opacity={1}
          toneMapped={false}
        />
      </mesh>

      {/* back face: same logo, not mirrored (rotate 180°) */}
      <mesh ref={backRef} rotation={[0, Math.PI, 0]} position={[0, 0, -0.0005]}>
        {/* tiny negative z to avoid z-fighting with the front plane */}
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
}

export default function PeelScene({ onComplete }) {
  return (
    <Canvas
      className="w-full h-full bg-black"
      camera={{ position: [0, 0, 6], fov: 50 }}
    >
      {/* MeshBasicMaterial ignores lights, but keeping them is fine */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <PeelPage onComplete={onComplete} />
    </Canvas>
  );
}
