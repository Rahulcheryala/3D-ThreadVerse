import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import state from "../store";

const Hoodie2 = (props) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/glb/hoodie_hood_up_baked.glb");

  useFrame((state, delta) => {
    easing.dampC(
      materials["Material238904.005"].color,
      snap.color,
      0.25,
      delta
    );
  });

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} {...props} dispose={null}>
      <group
        // rotation={[Math.PI / 2, Math.PI, Math.PI / 2]}
        rotation={
          snap.isFacingBack
            ? [Math.PI / 2, Math.PI, -Math.PI / 2]
            : [Math.PI / 2, Math.PI, Math.PI / 2]
        }
        scale={0.65}
        position={[0, -8, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials["Material238904.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials["Material238904.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material238904.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials["Material238904.005"]}
        />
      </group>
    </group>
  );
};
// useGLTF.preload("/hoodie_hood_up_baked.glb");

export default Hoodie2;
