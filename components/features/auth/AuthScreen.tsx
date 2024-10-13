"use client";

import SignInCard from "@/components/SignInCard";
import SignupCard from "@/components/SignupCard";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignInFlowTypes } from "@/types";
import React, { FC, useState } from "react";
import Z from "zod";
import { loginSchema, registerSchema } from "@/formSchema/authSchema.schema";
import toast from "react-hot-toast";
import useAppState from "@/stores/useAppState";
type AuthScreenProps = {};
const AuthScreen: FC<AuthScreenProps> = () => {
  const { signIn } = useAuthActions();
  const appState = useAppState();
  const [authType, setAuthType] = useState<SignInFlowTypes>("signIn");
  const onPasswordSignIn = ({
    successCallback,
    finallyCallback,
    errorCallback,
    values,
  }: {
    successCallback?: (args?: any) => void;
    errorCallback?: (args?: any) => void;
    finallyCallback?: (args?: any) => void;
    values: Z.infer<typeof loginSchema>;
  }) => {
    appState.setLoadingType("password");
    signIn("password", { ...values, flow: "signIn" })
      .then(() => {
        successCallback?.();
      })
      .catch((err) => {
        errorCallback?.(err);
      })
      .finally(() => {
        appState.setLoadingType("");
        finallyCallback?.();
      });
  };
  const onProviderSignIn = (type: "google" | "github") => {
    appState.setLoadingType(type);
    signIn(type).finally(() => {
      appState.setLoadingType("");
    });
  };

  const onPasswordSignUp = ({
    successCallback,
    finallyCallback,
    errorCallback,
    values,
  }: {
    successCallback?: (args?: any) => void;
    errorCallback?: (args?: any) => void;
    finallyCallback?: (args?: any) => void;
    values: Z.infer<typeof registerSchema>;
  }) => {
    if (values.password.trim() !== values.confirmPassword.trim()) {
      return toast.error("Password and confirm password do not match");
    }
    appState.setLoadingType("password");
    signIn("password", { ...values, flow: "signUp" })
      .then(() => {
        successCallback?.();
      })
      .catch((err) => {
        console.log("err: ", err);
        errorCallback?.(err);
      })
      .finally(() => {
        appState.setLoadingType("");
        finallyCallback?.();
      });
  };
  return (
    <div className="h-full max-h-screen overflow-auto flex items-center justify-center bg-appColor">
      <div className="md:h-auto md:w-[520px]">
        {authType === "signIn" ? (
          <SignInCard
            setAuthType={setAuthType}
            signInFn={onProviderSignIn}
            onPasswordSignIn={onPasswordSignIn}
          />
        ) : (
          <SignupCard
            setAuthType={setAuthType}
            signInFn={onProviderSignIn}
            onPasswordSignIn={onPasswordSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
