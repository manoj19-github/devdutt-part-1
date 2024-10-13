"use client";

import SignInCard from "@/components/SignInCard";
import SignupCard from "@/components/SignupCard";
import { useAuthActions } from "@convex-dev/auth/react";
import { SignInFlowTypes } from "@/types";
import React, { FC, useState } from "react";
import Z from "zod";
import { loginSchema, registerSchema } from "@/formSchema/authSchema.schema";
import toast from "react-hot-toast";
type AuthScreenProps = {};
const AuthScreen: FC<AuthScreenProps> = () => {
  const { signIn } = useAuthActions();
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
    signIn("password", { ...values, flow: "signIn" })
      .then(() => {
        successCallback?.();
      })
      .catch((err) => {
        errorCallback?.(err);
      })
      .finally(() => {
        finallyCallback?.();
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
    signIn("password", { ...values, flow: "signUp" })
      .then(() => {
        successCallback?.();
      })
      .catch((err) => {
        console.log("err: ", err);
        errorCallback?.(err);
      })
      .finally(() => {
        finallyCallback?.();
      });
  };
  return (
    <div className="h-full flex items-center justify-center bg-appColor">
      <div className="md:h-auto md:w-[520px]">
        {authType === "signIn" ? (
          <SignInCard
            setAuthType={setAuthType}
            signInFn={signIn}
            onPasswordSignIn={onPasswordSignIn}
          />
        ) : (
          <SignupCard
            setAuthType={setAuthType}
            signInFn={signIn}
            onPasswordSignIn={onPasswordSignUp}
          />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
