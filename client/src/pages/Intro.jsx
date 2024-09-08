import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";

import {
  LogoTextAnimation,
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import { CustomButton } from "../components";
import { Link } from "react-router-dom";

const Intro = () => {
  const snap = useSnapshot(state);
  const { controls, handleMouseEnter, handleMouseLeave } = LogoTextAnimation();

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section
          className="w-fit xl:h-full flex flex-col gap-y-6 xl:justify-between justify-start xl:px-36 xl:py-8 sm:p-8 p-6 max-xl:gap-7 absolute z-10"
          {...slideAnimation("left")}
        >
          <motion.header {...slideAnimation("down")}>
            <Link
              to={"/"}
              className="flex items-center gap-x-4 flex-nowrap outline-none w-fit"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src="/icons/logo.png"
                alt="Logo"
                className="w-12 h-12 object-contain rounded-md peer"
              />
              <motion.div
                animate={controls}
                initial={{ x: -40, opacity: 0 }} // Start hidden and slid to the left
                className="text-3xl font-bold font-highrise"
              >
                3D ThreadVerse
              </motion.div>
            </Link>
          </motion.header>

          <motion.div
            className="flex-1 flex flex-col justify-start gap-10"
            {...headContainerAnimation}
          >
            <motion.div {...headTextAnimation}>
              <h1 className="head-text font-highrise">
                LET'S <br /> DO IT
              </h1>
            </motion.div>

            <motion.div
              className="flex flex-col gap-5"
              {...headContentAnimation}
            >
              <p className="max-w-md text-gray-600 font-normal">
                Create your own 3D model with this brand-new 3D customization
                tool.
                <strong
                  style={{
                    "--hover-color": snap.color,
                  }}
                  className="transition-colors duration-300 hover:text-[var(--hover-color)]"
                >
                  Unleash your imagination
                </strong>{" "}
                and define your own style
              </p>
              <CustomButton
                type="filled"
                text="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Intro;
