import React from "react";
import state from "../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../config/helpers";

const CustomButton = ({ type, text, customStyles, handleClick }) => {
  const snap = useSnapshot(state);

  const generateStyles = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    } else if (type === "outline") {
      return {
        backgroundColor: "transparent",
        color: snap.color,
        border: `2px solid ${snap.color}`,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 rounded-md outline-none focus:ring-2 ${customStyles}`}
      style={generateStyles(type)}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CustomButton;
