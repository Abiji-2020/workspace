"use client";
import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import "../Styles/AuthScreen.css"; // Import the CSS file

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");
  return (
    <div className="auth-screen">
      <div className="auth-card">
        {state === "signIn" ? <SignInCard setState={setState}/>: <SignUpCard setState={setState}/>}

      </div>
    </div>
  );
};
