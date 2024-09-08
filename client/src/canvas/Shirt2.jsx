import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import state from "../store";
import { AxesHelper } from "three";

const Shirt2 = (props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/glb/tshirt.glb"); // Load the shirt model

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set anisotropy directly on the texture objects if they are loaded
  if (logoTexture) logoTexture.anisotropy = 16;
  if (fullTexture) fullTexture.anisotropy = 16;

  // Apply color to the Shirt2 using smooth animation
  useFrame((state, delta) =>
    easing.dampC(materials.FABRIC_1_FRONT_4193.color, snap.color, 0.25, delta)
  );

  const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      {...props}
      dispose={null}
      position={[0, -3, -0.14]}
    >
      <directionalLight
        position={[2, 2, 2]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      {/* AxesHelper for debugging */}
      <primitive object={new AxesHelper(20)} position={[1, 1, 1]} scale={0.5} />
      {/* Size of the axes is 5 */}
      {/* Main body of the T-shirt */}
      <group
        rotation={
          snap.isFacingBack ? [Math.PI / 2, 0, Math.PI] : [Math.PI / 2, 0, 0]
        }
        scale={0.00095}
        position={[0, 4.0625, 0]}
      >
        {/* Backside */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.FABRIC_1_FRONT_4193}
          material-roughness={1}
          dispose={null}
        />

        {/* Hands and Front Side */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.FABRIC_1_FRONT_4193}
        >
          {snap.isLogoTexture && (
            <Decal
              position={[0, -3, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
              // debug
            />
          )}
          {snap.isFullTexture && (
            <Decal
              position={[0, -3, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )}
          {/* <meshBasicMaterial wireframe color="red" /> */}
        </mesh>

        {/* Other Part of the Front Side */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.FABRIC_1_FRONT_4193}
        >
          {snap.isLogoTexture && (
            <Decal
              position={[0, -3, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              depthTest={false}
              depthWrite={true}
            />
          )}
          {snap.isFullTexture && (
            <Decal
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )}
        </mesh>
      </group>
    </group>
  );
};

export default Shirt2;
