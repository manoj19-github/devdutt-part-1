"use client";
import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Z from "zod";
import AppLogo from "../../../components/ui/AppLogo";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaUserAlt } from "react-icons/fa";
import { SignInFlowTypes } from "@/types";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { loginSchema, registerSchema } from "@/formSchema/authSchema.schema";
import { signIn } from "@/convex/auth";
import useAppState from "@/stores/useAppState";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type SignupCardProps = {
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
    values: Z.infer<typeof registerSchema>;
  }) => void;
};
const SignupCard: FC<SignupCardProps> = ({
  setAuthType,
  signInFn,
  onPasswordSignIn,
}): JSX.Element => {
  const router = useRouter();
  const appState = useAppState();
  const formControls = useForm<Z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmitHandler = (values: Z.infer<typeof registerSchema>) => {
    onPasswordSignIn({
      values,
      successCallback: () => {
        toast.success("Login Successful");
        router.push("/main");
      },
      errorCallback: () => {
        toast.error("login failed, please provide a strong password");
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
        <CardTitle className="mt-5 text-xl">Sign up to continue</CardTitle>

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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={appState.isLoading}
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <FormField
              control={formControls.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={appState.isLoading}
                      type="password"
                      placeholder="Confirm Password"
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
            onClick={() => {
              signInFn("google");
            }}
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
            onClick={() => {
              signInFn("github");
            }}
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
