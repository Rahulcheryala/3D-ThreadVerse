import React from "react";
import { useSnapshot } from "valtio";

import state from "../store";

const Tab = ({ tab, type, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles =
    type === "FilterTab" && isActiveTab
      ? { backgroundColor: snap.color, opacity: 0.5 }
      : { backgroundColor: "transparent", opacity: 1 };

  return (
    <div
      key={tab.name}
      className={`tab-btn ${
        type === "FilterTab" ? "rounded-full glassmorphism" : "rounded"
      }`}
      onClick={handleClick}
      style={activeStyles}
    >
      <img
        src={tab.icon}
        alt={tab.name}
        className={`${
          type === "FilterTab"
            ? "w-2/3 h-2/3"
            : "w-11/12 h-11/12 object-contain"
        } ${type === "ModelTab" ? "rounded object-contain px-1.5" : ""}`}
      />
    </div>
  );
};

export default Tab;
