"use client";
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
      TestComponent
      <Button
        onClick={() => {
          signOut();
          router.refresh();
          setTimeout(() => {
            signOut();
            router.refresh();
            router.push("/signin");
          }, 1000);
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default TestComponent;
