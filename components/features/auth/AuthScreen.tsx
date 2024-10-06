"use client";

import SignInCard from "@/components/SignInCard";
import SignupCard from "@/components/SignupCard";
import { SignInFlowTypes } from "@/types";
import React, { FC, useState } from "react";
type AuthScreenProps = {};
const AuthScreen: FC<AuthScreenProps> = () => {
  const [authType, setAuthType] = useState<SignInFlowTypes>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-appColor">
      <div className="md:h-auto md:w-[520px]">
        {authType === "signIn" ? (
          <SignInCard setAuthType={setAuthType} />
        ) : (
          <SignupCard setAuthType={setAuthType} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
