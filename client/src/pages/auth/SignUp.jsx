import React from "react";
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";

const SignUp = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <ClerkSignUp afterSignOutUrl={"/"} />
    </div>
  );
};

export default SignUp;
