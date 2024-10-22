"use client";
import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Pencil, TrashIcon } from "lucide-react";
import Hint from "@/components/ui/Hint";
import useUpdateWorkspace from "@/hooks/useUpdateWorkSpace";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useIsMounted from "@/hooks/useIsMounted";
type PreferencesModalProps = {
  isOpen: boolean;
  setOpen: (_open: boolean) => void;
  initialValues: string;
};
const PreferencesModal: FC<PreferencesModalProps> = ({
  isOpen,
  setOpen,
  initialValues,
}): JSX.Element => {
  const [value, setValue] = useState(initialValues);
  const [modalState, setModalState] = useState<"edit" | "delete" | "init">(
    "init"
  );
  const { mutate: updateWorkspaceMutate, ispending: updateWorkspacePending } =
    useUpdateWorkspace();
  const { mutate: deleteWorkspaceMutate, ispending: deleteWorkspacePending } =
    useUpdateWorkspace();
  const isMounted = useIsMounted();
  useEffect(() => {
    if (!isOpen) {
      setModalState("init");
    }
  }, [isOpen]);
  if (!isMounted) return <></>;
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        if (modalState !== "init") {
          setModalState("init");
        } else {
          setOpen(false);
        }
      }}
    >
      {modalState === "init" ? (
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-2 border-b bg-white">
            <DialogTitle className="text-lg font-medium">{value}</DialogTitle>
          </DialogHeader>
          <div className="px-3 pb-3 flex flex-col gap-2">
            <div
              className="p-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-200"
              onClick={() => setModalState("edit")}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Workspace Name</p>
                <p className="text-sm text-[#12674A3] hover:underline font-semibold">
                  <Hint label={"Edit"}>
                    <Pencil className="size-5 " />
                  </Hint>
                </p>
              </div>
              <p className="text-sm">{value}</p>
            </div>
            <button
              disabled={false}
              onClick={() => setModalState("delete")}
              className="flex items-center mx-1 mb-2 mt-2 px-4 py-4 hover:bg-gray-50 transition duration-200 text-rose-600  bg-white rounded-lg border cursor-pointer gap-x-2"
            >
              <TrashIcon className="size-4" />
              <p className="text-sm font-semibold"> Delete workspace</p>
            </button>
          </div>

          {/* Preferences content goes here */}
        </DialogContent>
      ) : modalState === "edit" ? (
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-2 border-b bg-white">
            <DialogTitle className="text-lg font-medium">
              Rename this workspace
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4 p-3" onSubmit={() => {}}>
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              disabled={updateWorkspacePending}
              required
              autoFocus
              minLength={3}
              maxLength={70}
              className="w-full focus:outline-none"
              placeholder="Workspace name 'Work', 'Personal', 'Home' "
            />
            <div className="flex flex-row gap-x-2 justify-end items-center">
              <Button
                disabled={updateWorkspacePending}
                onClick={() => setModalState("init")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                disabled={updateWorkspacePending}
                type="submit"
                variant="default"
              >
                Save
              </Button>
            </div>
          </form>

          {/* Preferences content goes here */}
        </DialogContent>
      ) : modalState === "delete" ? (
        <DialogContent className="p-0 bg-gray-50 overflow-hidden">
          <DialogHeader className="p-2 border-b bg-white">
            <DialogTitle className="text-[26px] text-center font-medium">
              Are you sure !!
            </DialogTitle>
          </DialogHeader>
          <div className="px-3  flex flex-col gap-2">
            <div className="pt-2 bg-white">
              <div className="flex items-center justify-center"></div>
            </div>
          </div>
          <div className="flex mb-4 flex-row gap-x-2 justify-between mx-2 items-center">
            <p className=" font-semibold text-[16px]">
              If you delete this you can&apos;t revert this
            </p>
            <div className="flex justify-end gap-x-2 items-center">
              <Button
                disabled={updateWorkspacePending}
                onClick={() => setModalState("init")}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                disabled={updateWorkspacePending}
                onClick={() => setModalState("init")}
                variant="outline"
              >
                Yes delete, it
              </Button>
            </div>
          </div>

          {/* Preferences content goes here */}
        </DialogContent>
      ) : (
        <></>
      )}
    </Dialog>
  );
};

export default PreferencesModal;