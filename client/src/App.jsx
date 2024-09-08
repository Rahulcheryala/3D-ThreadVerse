import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DesignSpace from "./pages/DesignSpace";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/designSpace" element={<DesignSpace />} />
        <Route path={"/signin/*"} element={<SignIn />} />
        <Route path={"/signup/*"} element={<SignUp />} />
        <Route path={"/login/*"} element={<SignIn />} />
        <Route path={"register/*"} element={<SignUp />} />
        <Route />
      </Routes>
    </Router>
  );
};

export default App;
