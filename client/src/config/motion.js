import { useAnimation } from "framer-motion";

export const LogoTextAnimation = () => {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start({
      x: 0, // Final position (no offset)
      opacity: 1, // Fully visible
      transitionDuration: 0.15,
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      x: -15, // Start position (left offset)
      opacity: 0, // Hidden when not hovered
      transitionDuration: 0.15,
    });
  };

  return { controls, handleMouseEnter, handleMouseLeave };
};

export const transition = { type: "spring", duration: 0.8 };

export const slideAnimation = (direction) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

// lower damping value makes the spring animation more bouncy
// stiffness determines how stiff the spring is. Higher the stiffness value lower the bounciness
// restDelta defines the threshold at which the spring animation is considered at rest or o longer moving
// duration sets the duration of the animation => isn't strictly applied for springs as they are dynamic
// delay adds the time before the animation starts
// delayChildren => if there are any child present in the parent element with this animation applied then the child animation is delayed by the mentioned time

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 6,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.3,
    // delay: 0.2,
    // delayChildren: 0.2,
  },
};

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};
