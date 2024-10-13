"use client";
import React, { FC } from "react";
import Z from "zod";
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
import { zodResolver } from "@hookform/resolvers/zod";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaUserAlt } from "react-icons/fa";
import { SignInFlowTypes } from "@/types";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/formSchema/authSchema.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import useAppState from "@/stores/useAppState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type SignInCardProps = {
  setAuthType: React.Dispatch<React.SetStateAction<SignInFlowTypes>>;
  signInFn: any;
  onPasswordSignIn: ({
    successCallback,
    finallyCallback,
    errorCallback,
    values,
  }: {
    successCallback?: (args?: any) => void;
    errorCallback?: (args?: any) => void;
    finallyCallback?: (args?: any) => void;
    values: Z.infer<typeof loginSchema>;
  }) => void;
};
const SignInCard: FC<SignInCardProps> = ({
  setAuthType,
  signInFn,
  onPasswordSignIn,
}): JSX.Element => {
  const appState = useAppState();
  const router = useRouter();
  const formControls = useForm<Z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = (values: Z.infer<typeof loginSchema>) => {
    appState.setIsLoading(true);
    onPasswordSignIn({
      values,
      successCallback: () => {
        router.push("/main");
        toast.success("Login Successful");
      },
      errorCallback: () => {
        toast.error("Login Failed");
      },
      finallyCallback: () => {
        appState.setIsLoading(false);
      },
    });
  };
  return (
    <Card className="w-full h-full p-6">
      <div className="flex items-center w-full  justify-center">
        <AppLogo />
      </div>

      <CardHeader className="px-0 pt-0">
        <CardTitle className="mt-5 text-xl">Login to continue</CardTitle>

        <CardDescription>
          use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0 md:mt-4">
        <Form {...formControls}>
          <form
            className="space-y-5"
            onSubmit={formControls.handleSubmit(onSubmitHandler)}
          >
            <FormField
              control={formControls.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={appState.isLoading}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formControls.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={appState.isLoading}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={appState.isLoading}
              className="w-full gap-x-2"
              size="lg"
            >
              Continue
              {appState.loadingType === "password" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <></>
              )}
            </Button>
          </form>
        </Form>
        <div className="flex justify-between items-center">
          <div className="w-full bg-gray-200 h-[1px]"></div>
          <p className="px-1">OR</p>
          <div className="w-full bg-gray-200 h-[1px]"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2 col-span-1"
            onClick={() => signInFn("google")}
            disabled={appState.isLoading}
          >
            {appState.loadingType === "google" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Continue with Google
            <FcGoogle size={25} />
          </Button>
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2 col-span-1"
            onClick={() => signInFn("github")}
            disabled={appState.isLoading}
          >
            {appState.loadingType === "github" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Continue with Github
            <FaGithub size={25} />
          </Button>
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2 col-span-1"
            onClick={() => {}}
            disabled={appState.isLoading}
          >
            {appState.loadingType === "test1" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Continue with Test 1 User
            <FaUserAlt size={25} />
          </Button>
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2 col-span-1"
            onClick={() => {}}
            disabled={appState.isLoading}
          >
            {appState.loadingType === "test2" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Continue with Test 2 User
            <FaUserAlt size={25} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setAuthType("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInCard;
