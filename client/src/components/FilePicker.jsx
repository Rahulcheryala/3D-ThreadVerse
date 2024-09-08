import React, { useRef, useEffect } from "react";
import CustomButton from "./CustomButton";
import { AnimatePresence, motion } from "framer-motion";
import { slideAnimation } from "../config/motion";

const FilePicker = ({
  file,
  setFile,
  readFile,
  noFileError,
  setActiveEditorTab,
}) => {
  const filePickerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      filePickerRef.current &&
      !filePickerRef.current.contains(event.target)
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
        className="filePicker-container"
        ref={filePickerRef}
        {...slideAnimation("left")}
      >
        <div className="flex-1 flex flex-col">
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-20"
          />
          <label htmlFor="file-upload" className="filePicker-label">
            Upload File
          </label>

          <p className="mt-2.5 text-gray-700 text-xs truncate">
            {file === "" ? "No file selected" : file.name}
          </p>
        </div>

        <p
          className={`text-red-500 text-xs mx-auto transition-transform duration-300 ${
            noFileError.status ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {noFileError.message}
        </p>

        <div className="mt-2 mx-auto flex flex-wrap gap-3">
          <CustomButton
            type="outline"
            text="Logo"
            handleClick={() => readFile("logo")}
            customStyles="text-xs font-semibold"
          />
          <CustomButton
            type="filled"
            text="Full Body"
            handleClick={() => readFile("full")}
            customStyles="text-xs font-semibold"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FilePicker;
