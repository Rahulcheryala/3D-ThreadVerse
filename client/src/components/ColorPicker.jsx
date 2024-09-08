import React, { useRef, useEffect } from "react";
import ReactColorPicker from "react-pick-color";
import state from "../store";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../config/motion";

const ColorPicker = ({ setActiveEditorTab }) => {
  const snap = useSnapshot(state);

  const colorPickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target)
    ) {
      setActiveEditorTab("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        ref={colorPickerRef}
        className="absolute left-full top-0 ml-3 cursor-default max-[400px]:w-3/4 w-full"
        {...slideAnimation("left")}
      >
        <ReactColorPicker
          color={snap.color}
          theme={{
            background: "rgba(208, 208, 208)",
            boxShadow: "0 2px 30px 0 rgba(31, 38, 135, 0.07)",
            inputBackground: "lightgrey",
            borderColor: "#DADADA",
            border: "1px solid rgba(255, 255, 255)",
            borderRadius: "0.5rem",
            color: "black",
            width: "10rem",
          }}
          onChange={(color) => (state.color = color.hex)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ColorPicker;
