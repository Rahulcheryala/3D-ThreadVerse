import React, { useEffect } from "react";
import Intro from "./Intro";
import CanvasModel from "../canvas/CanvasModel";
import Customizer from "./Customizer";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import state from "../store";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const IntroLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const cursor = document.querySelector(".cursor");
    const mainDiv = document.querySelector("main");

    const updateCursorPosition = (e) => {
      const { left, top } = mainDiv.getBoundingClientRect();
      cursor.style.left = e.pageX - left + 3 + "px";
      cursor.style.top = e.pageY - top + 4 + "px";
    };

    document.addEventListener("mousemove", updateCursorPosition);

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // This triggers the default browser alert

      // Save necessary state to sessionStorage
      sessionStorage.setItem("shirtType", state.shirtType);
      sessionStorage.setItem("intro", state.intro);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // On component mount (after reload), restore the state
    const shirtType = sessionStorage.getItem("shirtType");
    const intro = sessionStorage.getItem("intro");

    if (shirtType || intro) {
      state.shirtType = shirtType || "";
      state.intro = intro;

      // Optionally, clear the session storage after restoring state
      sessionStorage.clear();
    }

    if (state.shirtType === "") navigate("/");
  }, []);
  return (
    <main
      className="relative w-full h-screen overflow-hidden transition-all ease-in select-none"
      style={{
        cursor: 'url("/icons/custom-cursor_2.png"), auto',
      }}
    >
      <header className="fixed top-8 right-16 z-20 h-fit bg-transparent peer">
        <SignedOut>
          <div className="py-1.5 outline-none border-2 border-gray-700 rounded-lg font-semibold text-lg shadow-sm hover:shadow-lg cursor-pointer focus-within:shadow-lg">
            <Link to="/signin" className="outline-none py-2 px-4 ">
              Sign In
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      {/* Custom cursor */}
      <div className="cursor fixed z-10 w-10 h-10 border-2 border-gray-700 rounded-full -left-1 -top-1 -translate-x-1/2 -translate-y-1/2 peer-hover:hidden"></div>

      <Intro />
      <CanvasModel />
      <Customizer />
    </main>
  );
};

export default IntroLayout;
