import React, { useState, useEffect } from "react";
import "./Styles.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import state from "../store";
import { DisplayWheelImages } from "../config/constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      <div
        className="w-100% min-h-screen grid grid-flow-col grid-cols-[1fr,1fr] overflow-hidden relative"
        style={{
          background: "radial-gradient(circle at left top, #ff930f , #fff95b)",
        }}
      >
        <motion.div
          className="w-fit xl:h-full flex flex-col gap-y-6 xl:justify-between justify-start xl:px-36 xl:py-8 lg:px-24 lg:py-8 sm:p-8 p-6 max-xl:gap-7"
          {...slideAnimation("left")}
        >
          <motion.header {...slideAnimation("down")}>
            <button
              className="flex items-center gap-x-4 flex-nowrap"
              onClick={() => {
                window.location.reload();
              }}
            >
              <img
                src="/icons/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain rounded-md peer"
              />
              <motion.div className="text-3xl font-bold font-highrise">
                3D ThreadVerse
              </motion.div>
            </button>
          </motion.header>

          <motion.div
            className="flex-1 flex flex-col justify-start gap-10"
            {...headContainerAnimation}
          >
            <motion.div {...headTextAnimation}>
              <h1 className="home-text font-highrise">
                CREATE <br /> YOUR <br />
                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center">
                  <span className="text-[2.3em] row-span-2 mt-3">S</span>
                  <span className="self-start">IGNATURE</span>
                  <span className="self-end">TYLE</span>
                </div>
              </h1>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full xl:h-full flex flex-col gap-y-6 xl:justify-between justify-start xl:py-36 xl:pr-[4.5rem] lg:py-28 lg:pr-14 md:py-20 md:pr-10 max-xl:gap-7 "
          {...slideAnimation("up")}
        >
          <motion.div {...headContentAnimation}>
            <p className="max-w-lg text-gray-800 font-normal mx-auto">
              Dive into a world of endless possibilities where you can design
              anything you imagine. From custom apparel to personalized
              accessories, our 3D tools let you craft unique pieces that are all
              about you.{" "}
              <strong className="transition-colors duration-300 hover:text-[#DB2491]">
                Start creating something extraordinary today!
              </strong>
            </p>
          </motion.div>
          <motion.div
            className="flex-1 relative select-none"
            {...headContentAnimation}
          >
            <div
              className="absolute top-[40%] left-1/2 transform-gpu slider"
              style={{
                "--quantity": DisplayWheelImages.length,
                "--width": "100px",
                "--height": "130px",
                width: "var(--width)",
                height: "var(--height)",
                "--perspective": "800px",
                "--viewAngle": "-20deg",
                "--radius": "220px",
                "--time": "30s",
              }}
            >
              {DisplayWheelImages.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0 item cursor-pointer"
                  style={{ "--position": index + 1 }}
                  onClick={() => {
                    state.shirtType = image.name;
                    state.home = false;
                    state.intro = true;
                    navigate("/designSpace");
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-md overflow-hidden"
                  />
                </div>
              ))}
            </div>
            <div
              className={`absolute text-lg italic font-semibold text-[#DB2491] top-full left-[calc(1/3*100%+1.5rem)] transition-all duration-300 ${
                showPopup
                  ? "opacity-100 translate-y-6 animate-pulse"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="relative">
                Click on any image
                <img
                  src="/icons/arrow.svg"
                  alt="arrow"
                  className="absolute left-full -translate-x-3 -top-full w-10 h-10"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Home;
