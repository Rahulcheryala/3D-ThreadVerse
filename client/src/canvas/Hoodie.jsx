import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import state from "../store";

const Hoodie = (props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/glb/hoodie_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set anisotropy directly on the texture objects if they are loaded
  if (logoTexture) logoTexture.anisotropy = 16;
  if (fullTexture) fullTexture.anisotropy = 16;

  // Apply color to the Shirt2 using smooth animation
  useFrame((state, delta) => {
    easing.dampC(
      materials.Rib_2X2_468gsm_hoodie_end.color,
      snap.color,
      0.25,
      delta
    );
    easing.dampC(
      materials.Sweat_Rib_1X1_319gsm_hoodie.color,
      snap.color,
      0.25,
      delta
    );
    easing.dampC(
      materials.Sweat_hood_Rib_1X1_319gsm_hood.color,
      snap.color,
      0.25,
      delta
    );
  });

  const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      {...props}
      dispose={null}
      rotation={snap.isFacingBack ? [0, Math.PI, 0] : [0, 0, 0]}
      position={[-0.02, -0.015, 0]}
    >
      <group scale={0.01}>
        <group scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_Rib_2X2_468gsm_hoodie_end_0.geometry}
            material={materials.Rib_2X2_468gsm_hoodie_end}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_Sweat_Rib_1X1_319gsm_hoodie_0.geometry}
            material={materials.Sweat_Rib_1X1_319gsm_hoodie}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_Sweat_hood_Rib_1X1_319gsm_hood_0.geometry}
            material={materials.Sweat_hood_Rib_1X1_319gsm_hood}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_1.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_2.geometry}
            material={materials.stitches}
          />
          {/* <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_3.geometry}
            material={materials.stitches}
          /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_4.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_5.geometry}
            material={materials.stitches}
          />
          {/* <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_6.geometry}
            material={materials.stitches}
          /> */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_7.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_8.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_9.geometry}
            material={materials.stitches}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.hoodie_stitches_0_10.geometry}
            material={materials.stitches}
          />
        </group>
      </group>
    </group>
  );
};

// useGLTF.preload("/hoodie_baked.glb");

export default Hoodie;
