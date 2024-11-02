"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChannelId } from "@/hooks/useChannelId";
import { useCurrentMember } from "@/hooks/useCurrentMember";
import useDeleteChannel from "@/hooks/useDeleteChannel";
import useIsMounted from "@/hooks/useIsMounted";
import useUpdateChannel from "@/hooks/useUpdateChannel";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaChevronDown } from "react-icons/fa";

type HeaderProps = {
  name: string;
};
const Header: FC<HeaderProps> = ({ name }): JSX.Element => {
  const isMounted = useIsMounted();
  const channelId = useChannelId();
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const currentMemberResponse = useCurrentMember({ workspaceId });
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const updateChannelMutation = useUpdateChannel();
  const deleteChannelMutation = useDeleteChannel();
  const [editableChannelText, setEditableChannelText] = useState<string>("");
  const handleChannelNameUpdate = () => {
    if (updateChannelMutation.isPending) return;
    if (!editableChannelText || editableChannelText.trim().length === 0)
      return toast.error("Channel name cannot be empty");
    updateChannelMutation.mutate(
      {
        channelId,
        name: editableChannelText.trim(),
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setDeleteOpen(false);
          setEditableChannelText("");
          toast.success("Channel name updated successfully");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update channel name");
        },
      }
    );
  };
  const handleChannelNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setEditableChannelText(value);
  };
  const handleChannelDelete = () => {
    if (deleteChannelMutation.isPending) return;
    deleteChannelMutation.mutate(
      {
        channelId,
      },
      {
        onSuccess: () => {
          setEditOpen(false);
          setDeleteOpen(false);
          toast.success("Channel deleted successfully");
          router.replace(`/main/workspaces/${workspaceId}`);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete channel name");
        },
      }
    );
  };
  useEffect(() => {
    if (!!editOpen) {
      setEditableChannelText(name);
    } else {
      setEditableChannelText("");
    }
  }, [editOpen]);
  if (!isMounted) return <></>;
  return (
    <header className="bg-white border-b h-[50px] flex items-center px-4  overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="text-lg font-semibold px-2 overflow-hidden w-auto"
            size="sm"
          >
            <span># {name}</span>
            <FaChevronDown className="size-2.5 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          {/* <div className="flex flex-col gap-2 p-4"> */}
          <DialogHeader className="p-4 border-b bg-white">
            <DialogTitle>
              {editOpen ? `Rename ` : deleteOpen ? `Delete ` : ``}# {name}
            </DialogTitle>
          </DialogHeader>
          {!editOpen && !deleteOpen ? (
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Channel name</p>
                  {currentMemberResponse?.data?.role === "admin" ? (
                    <p
                      onClick={() => (setEditOpen(true), setDeleteOpen(false))}
                      className="text-sm text-[#1265s3] hover:underline font-semibold text-[#1264a3] text-sm"
                    >
                      Edit
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <p className="text-sm">{name}</p>
              </div>
              {currentMemberResponse?.data?.role === "admin" ? (
                <button
                  onClick={() => (setEditOpen(false), setDeleteOpen(true))}
                  className="flex items-center gap-x-2 px-4 py-3 bg-white rounded-lg cursor-pointer border hover:bg-gray-100 duration-300 ease-in-out text-rose-600"
                >
                  <TrashIcon className="size-5" />
                  <p className="text-sm font-semibold">Delete Channel</p>
                </button>
              ) : (
                <></>
              )}
            </div>
          ) : editOpen && !deleteOpen ? (
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                <div className="grid w-full items-center gap-1.5 ">
                  <Label htmlFor="channelname">Channel Name</Label>
                  <Input
                    type="text"
                    id="channelname"
                    placeholder="Channel Name"
                    autoFocus
                    className="w-full"
                    disabled={updateChannelMutation.isPending}
                    value={editableChannelText}
                    onChange={handleChannelNameChange}
                  />
                </div>
              </div>
              <div className="w-full flex justify-end gap-x-3 items-center py-2">
                <Button
                  variant={"outline"}
                  disabled={updateChannelMutation.isPending}
                  onClick={() => (setEditOpen(false), setDeleteOpen(false))}
                >
                  Cancel
                </Button>
                <Button
                  disabled={updateChannelMutation.isPending}
                  onClick={handleChannelNameUpdate}
                >
                  Update
                </Button>
              </div>
            </div>
          ) : !editOpen && deleteOpen ? (
            <div className="px-4 pb-4 flex flex-col gap-y-2">
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                <div className="flex items-center w-full justify-center">
                  <p className="text-sm font-semibold text-center text-rose-600">
                    Are you sure, you want to delete this channel{" "}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-end gap-x-3 items-center py-2">
                <Button
                  variant={"outline"}
                  disabled={deleteChannelMutation.isPending}
                  onClick={() => (setEditOpen(false), setDeleteOpen(false))}
                >
                  Cancel
                </Button>
                <Button
                  disabled={deleteChannelMutation.isPending}
                  className="bg-rose-600 text-white"
                  onClick={handleChannelDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
