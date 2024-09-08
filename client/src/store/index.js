import { proxy } from "valtio";

const state = proxy({
  home: true,
  intro: false,
  shirtType: "",
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "/icons/threejs.png",
  fullDecal: "/icons/threejs.png",
  isFacingBack: false,
});

export default state;
