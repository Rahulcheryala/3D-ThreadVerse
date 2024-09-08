import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import CameraRig from "./CameraRig";
import Backdrop from "./Backdrop";
import { useSnapshot } from "valtio";
import state from "../store";
import Shirt from "./Shirt";
import Shirt2 from "./Shirt2";
import Hoodie from "./Hoodie";
import Hoodie2 from "./Hoodie2";
import ZipHoodie from "./ZipHoodie";

const CanvasModel = () => {
  const snap = useSnapshot(state);

  const renderModel = () => {
    switch (snap.shirtType) {
      case "T-shirt":
        console.log("T-shirt is coming");
        return <Shirt />;
      case "T-shirt2":
        console.log("T-shirt 2 is coming");
        return <Shirt2 />;
      case "Hoodie":
        console.log("Hoodie is coming");
        return <Hoodie />;
      case "Hoodie2":
        console.log("Hoodie 2 is coming");
        return <Hoodie2 />;
      case "ZipHoodie":
        console.log("Zip Hoodie is coming");
        return <ZipHoodie />;
      default:
        return null; // Default to Shirt if none match
    }
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.35} />
      <Environment preset="city" />
      {/* <directionalLight position={[4, 1, 0.5]} intensity={2} castShadow /> */}

      <CameraRig>
        <Backdrop />
        <Center>{renderModel()}</Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
