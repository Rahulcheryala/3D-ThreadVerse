import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import * as THREE from "three"; // Import THREE module
import state from "../store";

const ZipHoodie = (props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/glb/zip_hoodie.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set anisotropy directly on the texture objects if they are loaded
  if (logoTexture) logoTexture.anisotropy = 16;
  if (fullTexture) fullTexture.anisotropy = 16;

  // Smoothly animate the material color change
  useFrame((state, delta) => {
    easing.dampC(materials.Default_OBJ.color, snap.color, 0.25, delta);
    easing.dampC(materials["Default_OBJ.001"].color, snap.color, 0.25, delta);
    easing.dampC(materials["Default_OBJ.002"].color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} {...props} dispose={null}>
      <directionalLight
        position={[2, 2, 2]}
        intensity={7}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <group
        scale={0.0065}
        position={[0, -2, -0.1]}
        rotation={snap.isFacingBack ? [0, Math.PI, 0] : [0, 0, 0]}
      >
        <group scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ002_0.geometry}
            material={materials["Default_OBJ.002"]}
          >
            {/* <meshStandardMaterial
              emissive={new THREE.Color(0x1f1f1f)} // Black emissive color
              // emissiveIntensity={0} // Strong emissive effect
            /> */}
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ_0.geometry}
            material={materials.Default_OBJ}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ_0_1.geometry}
            material={materials.Default_OBJ}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ_0_2.geometry}
            material={materials.Default_OBJ}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ_0_3.geometry}
            material={materials.Default_OBJ}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ_0_4.geometry}
            material={materials.Default_OBJ}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.nike_tech_Default_OBJ001_0.geometry}
            material={materials["Default_OBJ.001"]}
          />
        </group>
      </group>
    </group>
  );
};

// useGLTF.preload("/zip_hoodie.glb");

export default ZipHoodie;
