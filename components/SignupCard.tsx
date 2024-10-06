import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import AppLogo from "./ui/AppLogo";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { SignInFlowTypes } from "@/types";

type SignupCardProps = {
  setAuthType: React.Dispatch<React.SetStateAction<SignInFlowTypes>>;
};
const SignupCard: FC<SignupCardProps> = ({ setAuthType }): JSX.Element => {
  return (
    <Card className="w-full h-full p-6">
      <div className="flex items-center w-full  justify-center">
        <AppLogo />
      </div>

      <CardHeader className="px-0 pt-0">
        <CardTitle className="mt-5 text-xl">Sign up to continue</CardTitle>

        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0 md:mt-4">
        <form className="space-y-5">
          <Input disabled={false} value="" placeholder="Email" required />
          <Input
            disabled={false}
            type="password"
            value=""
            placeholder="Password"
            required
          />
          <Input
            disabled={false}
            type="password"
            value=""
            placeholder="Confirm Password"
            required
          />
          <Button type="submit" disabled={false} className="w-full" size="lg">
            Continue
          </Button>
        </form>
        <div className="flex justify-between items-center">
          <div className="w-full bg-gray-200 h-[1px]"></div>
          <p className="px-1">OR</p>
          <div className="w-full bg-gray-200 h-[1px]"></div>
        </div>
        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2"
            onClick={() => {}}
            disabled={false}
          >
            Continue with Google
            <FcGoogle size={25} />
          </Button>
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2"
            onClick={() => {}}
            disabled={false}
          >
            Continue with Github
            <FaGithub size={25} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <span
            onClick={() => setAuthType("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
