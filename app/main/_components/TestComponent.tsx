"use client";
import UserButton from "@/components/features/auth/UserButton";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type TestComponentProps = {};
const TestComponent: FC<TestComponentProps> = (): JSX.Element => {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default TestComponent;
