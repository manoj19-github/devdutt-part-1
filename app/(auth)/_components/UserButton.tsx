"use client";
import React, { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";

type UserButtonProps = {};
const UserButton: FC<UserButtonProps> = (): JSX.Element => {
  const { data, isLoading } = useCurrentUser();
  console.log("data: ", data);
  const { signOut } = useAuthActions();
  const router = useRouter();

  if (isLoading) {
    return (
      <Loader className="size-4 animate-spin w-4 h-4 text-muted-foreground" />
    );
  }
  if (data === null || !data) {
    return <></>;
  }
  const avatarFallback = data?.name?.split("")[0]?.toUpperCase() || "A";
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar>
          <AvatarImage src={data?.image || ""} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
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
          <LogOut className="mr-2 h-4 w-4 " />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
