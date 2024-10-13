"use client";
import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useWorkSpaceModal } from "@/hooks/useWorkSpaceModal";

type CreateWorkSpaceModalProps = {};
const CreateWorkSpaceModal: FC<CreateWorkSpaceModalProps> = (): JSX.Element => {
  const [workSpaceModalIsOpen, setWorkSpaceModalIsOpen] = useWorkSpaceModal();
  return (
    <Dialog
      open={workSpaceModalIsOpen}
      onOpenChange={() => setWorkSpaceModalIsOpen(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Workspace Name" />
          </div>
          <div className="flex flex-col gap-1"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpaceModal;
