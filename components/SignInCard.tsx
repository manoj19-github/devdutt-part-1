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

type SignInCardProps = {
  setAuthType: React.Dispatch<React.SetStateAction<SignInFlowTypes>>;
};
const SignInCard: FC<SignInCardProps> = ({ setAuthType }): JSX.Element => {
  const appState = useAppState();
  const formControls = useForm<Z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmitHandler = (values: Z.infer<typeof loginSchema>) => {};
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
                    <Input disabled={false} placeholder="Email" {...field} />
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
                      disabled={false}
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={false} className="w-full" size="lg">
              Continue
            </Button>
          </form>
        </Form>
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
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2"
            onClick={() => {}}
            disabled={false}
          >
            Continue with Test 1 User
            <FaUserAlt size={25} />
          </Button>
          <Button
            variant="outline"
            className="flex relative w-full gap-x-2"
            onClick={() => {}}
            disabled={false}
          >
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
