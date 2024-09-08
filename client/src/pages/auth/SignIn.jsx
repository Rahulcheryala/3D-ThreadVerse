import React from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center relative">
      <ClerkSignIn afterSignOutUrl={"/"} />
    </div>
  );
};

export default SignIn;
