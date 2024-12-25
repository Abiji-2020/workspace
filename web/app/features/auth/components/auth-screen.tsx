'use client';

import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import "../Styles/AuthScreen.css";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn"); // Keep SignInFlow type here
  return (
    <div className="auth-screen">
      <div className="auth-card">
        {state === "signIn" ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  );
};
