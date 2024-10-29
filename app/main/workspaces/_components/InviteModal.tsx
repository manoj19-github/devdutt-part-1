"use client";
import React, { Dispatch, FC, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import useIsMounted from "@/hooks/useIsMounted";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import toast from "react-hot-toast";

type InviteModalProps = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  workspaceName: string;
  joinCode: string;
};
const InviteModal: FC<InviteModalProps> = ({
  opened,
  setOpened,
  workspaceName,
  joinCode,
}): JSX.Element => {
  const isMounted = useIsMounted();
  const workspaceId = useWorkspaceId();
  const copyToClipboard = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    window.navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  if (!isMounted) return <></>;
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {workspaceName}</DialogTitle>
          <p className="text-sm">
            Share the code below to invite people to your workspace
          </p>
          <DialogClose />
        </DialogHeader>

        <DialogDescription></DialogDescription>
        <div className="flex flex-col gap-4 items-center justify-center py-8">
          <div className="flex flex-col  gap-4 items-center justify-center">
            <p className="font-semibold text-4xl tracking-wider">{joinCode}</p>
            <Button variant="ghost" className="flex items-center gap-x-2">
              <p className="font-semibold">Copy link</p>
              <Copy
                className="size-4 cursor-pointer text-black"
                onClick={copyToClipboard}
              />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
