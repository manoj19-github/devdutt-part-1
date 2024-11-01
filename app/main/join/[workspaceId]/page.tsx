"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkSpaceById } from "@/hooks/useGetWorkSpace";
import { useGetWorkspaceInfo } from "@/hooks/useGetWorkspaceInfo";
import useIsMounted from "@/hooks/useIsMounted";
import useJoinWorkspace from "@/hooks/useJoinWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, Fragment, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import VerificationInput from "react-verification-input";
type JoinWorkspacIdPageProps = {};
const JoinWorkspacIdPage: FC<JoinWorkspacIdPageProps> = (): JSX.Element => {
  const isMounted = useIsMounted();
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { data, isLoading } = useGetWorkspaceInfo({ id: workspaceId });
  const isMember = useMemo(() => data?.member, [data?.member]);
  const joinWorkspaceResponse = useJoinWorkspace();
  useEffect(() => {
    if (isMember) router.replace(`/main/workspaces/${workspaceId}`);
  }, [isMember, router, workspaceId]);
  const handleComplete = (value: string) => {
    if (joinWorkspaceResponse.isPending) return;

    joinWorkspaceResponse.mutate(
      { workspaceId, joinCode: value },
      {
        onSuccess: (id: any) => {
          toast.success("Workspace joined successfully");
          router.replace(`/main/workspaces/${id}`);
        },
        onError: (error: any) => {
          toast.error("failed to join workspace");
        },
      }
    );
  };
  if (!isMounted) return <Fragment></Fragment>;
  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-8 animate-spin" />
      </div>
    );
  return (
    <div className="h-full flex flex-col gap-y-8 items-center justify-center bg-white p-8 rounded-lg shadow-sm">
      <Image
        src={"/assets/devdutt_logo.png"}
        alt="logo"
        width={60}
        height={60}
      />
      <div className="flex flex-col gap-y-1 items-center justify-center max-w-md">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-3xl font-semibold">
            Join {data?.workspace?.name}
          </h1>
          <p className="text-md text-muted-foreground">
            Enter the workspace code to join
          </p>
        </div>
        <VerificationInput
          length={6}
          onComplete={handleComplete}
          inputProps={{ disabled: joinWorkspaceResponse.isPending }}
          classNames={{
            container: cn(
              "flex gap-x-2",
              joinWorkspaceResponse.isPending && "opacity-50 cursor-not-allowed"
            ),
            character:
              "uppercase h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-semibold text-gray-500",
            characterInactive: "bg-muted",
            characterSelected: "bg-white text-black",
            characterFilled: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Button size={"lg"} variant={"outline"} asChild>
          <Link href="/main">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default JoinWorkspacIdPage;
