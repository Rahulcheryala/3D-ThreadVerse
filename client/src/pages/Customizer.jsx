import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  ShirtModels,
} from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import config from "../config/config";
import {
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
  CustomButton,
} from "../components";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [noFileError, setNoFileError] = useState({
    status: false,
    message: "",
  });
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // show tab content based on active tab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorPicker":
        return <ColorPicker setActiveEditorTab={setActiveEditorTab} />;
      case "filePicker":
        return (
          <FilePicker
            setActiveEditorTab={setActiveEditorTab}
            file={file}
            setFile={setFile}
            readFile={readFile}
            noFileError={noFileError}
          />
        );
      default:
        return null;
    }
  };

  const toggleActiveEditorTab = (tab) => {
    if (activeEditorTab === tab) {
      setActiveEditorTab("");
    } else {
      setActiveEditorTab(tab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !state.isLogoTexture;
        state.isFullTexture = false;
        break;
      case "stylishShirt":
        state.isLogoTexture = false;
        state.isFullTexture = !state.isFullTexture;
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      const isCurrentlyActive = prevState[tabName];

      return {
        logoShirt: tabName === "logoShirt" ? !isCurrentlyActive : false,
        stylishShirt: tabName === "stylishShirt" ? !isCurrentlyActive : false,
      };
    });
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const readFile = (type) => {
    if (!file) {
      setNoFileError({
        status: true,
        message: "Please select a file first",
      });
      return;
    }
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  // console.log(snap.isFacingBack);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="absolute z-20 top-8 left-16"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              text="Go Back"
              handleClick={() => {
                setActiveEditorTab("");
                setActiveFilterTab({
                  logoShirt: true,
                  stylishShirt: false,
                });
                state.intro = true;
              }}
              customStyles="w-fit px-4 py-1.5 font-semibold text-lg shadow-sm hover:shadow-lg"
            />
          </motion.div>

          <motion.div
            key="custom"
            className="absolute left-0 top-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editorTabs-container">
                {EditorTabs.map((tab) => (
                  <Tab
                    type="EditorTab"
                    key={tab.name}
                    tab={tab}
                    handleClick={() => toggleActiveEditorTab(tab.name)}
                    active={snap.activeTab === tab.id}
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-fit absolute z-10 bottom-24 left-1/2 translate-x-44 bg-transparent cursor-pointer"
            {...fadeAnimation}
          >
            <button
              onClick={() => (state.isFacingBack = !snap.isFacingBack)}
              className="flex items-center justify-center cursor-pointer glassmorphism rounded-full p-2 outline-none focus-visible:ring-2"
            >
              <img
                src={"/icons/turn-around.png"}
                alt=""
                className="w-8 h-8 object-contain"
              />
            </button>
          </motion.div>

          <motion.div
            className="absolute z-10 bottom-5 right-0 left-0 w-full"
            {...slideAnimation("up")}
          >
            <div className="filterTabs-container">
              {FilterTabs.map((tab) => (
                <Tab
                  type="FilterTab"
                  key={tab.name}
                  tab={tab}
                  isActiveTab={activeFilterTab[tab.name]}
                  handleClick={() => handleActiveFilterTab(tab.name)}
                />
              ))}
            </div>
          </motion.div>

          {/* <motion.div
            className="absolute right-0 top-0 z-10"
            {...slideAnimation("right")}
          >
            <div className="flex items-center min-h-screen">
              <div className="modelTabs-container">
                {ShirtModels.map((shirt) => (
                  <Tab
                    type="ModelTab"
                    key={shirt.name}
                    tab={shirt}
                    handleClick={() => (state.shirtType = shirt.name)}
                  />
                ))}
              </div>
            </div>
          </motion.div> */}
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
