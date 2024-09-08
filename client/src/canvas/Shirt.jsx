import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal, Gltf } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/glb/shirt_baked.glb"); // Load the shirt model

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set anisotropy directly on the texture objects if they are loaded
  if (logoTexture) logoTexture.anisotropy = 16;
  if (fullTexture) fullTexture.anisotropy = 16;

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      rotation={snap.isFacingBack ? [0, Math.PI, 0] : [0, 0, 0]}
    >
      {snap.isFacingBack && (
        <ambientLight intensity={0.25} position={[0, 0, 0]} color={0xffffff} />
      )}
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            // rotation={[0, 0, 0.25]}
            // rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

// useGLTF.preload("/shirt_baked.glb");

export default Shirt;
