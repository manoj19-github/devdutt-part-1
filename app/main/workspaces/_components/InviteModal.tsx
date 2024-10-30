"use client";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import useIsMounted from "@/hooks/useIsMounted";
import { Copy, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import toast from "react-hot-toast";

import useNewJoinCode from "@/hooks/useNewJoincode";
import ConfirmDialog from "@/components/ConfirmDialog";

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
  const [confirmModalOpned, setConfirmModalOpened] = useState<boolean>(false);
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useNewJoinCode();
  const copyToClipboard = () => {
    const inviteLink = `${window.location.origin}/join/${workspaceId}`;
    window.navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Copied to clipboard");
    });
  };

  const handleNewCode = async () => {
    if (isPending) return;
    mutate(
      { workspaceId },
      {
        onSuccess() {
          toast.success("New join code generated");

          // setJoinCode(data.joinCode);
        },
        onError(error) {
          toast.error(error.message || "Failed to generate new join code");
        },
        onSetteled() {
          setConfirmModalOpened(false);
        },
      }
    );
  };

  if (!isMounted) return <></>;
  return (
    <Fragment>
      <ConfirmDialog
        isOpen={confirmModalOpned}
        handleIsOpen={() => setConfirmModalOpened(false)}
        title={"Are you absolutely sure"}
        description={"If you change this you can't undo it"}
        cancelAction={() => setConfirmModalOpened(false)}
        confirmAction={handleNewCode}
      />
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
          <div className="flex flex-col gap-4 items-center justify-center py-2">
            <div className="flex flex-col  gap-4 items-center justify-center">
              <p className="font-semibold text-4xl tracking-wider">
                {joinCode}
              </p>
              <Button variant="ghost" className="flex items-center gap-x-2">
                <p className="font-semibold">Copy link</p>
                <Copy
                  className="size-4 cursor-pointer text-black"
                  onClick={copyToClipboard}
                />
              </Button>
            </div>
            <div className="flex items-center justify-center w-full">
              <Button
                onClick={() => setConfirmModalOpened(true)}
                variant="outline"
              >
                New Code
                <RefreshCcw
                  className={`size-4 cursor-pointer ml-2 text-black ${isPending ? `animate-spin` : ``}`}
                />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default InviteModal;
