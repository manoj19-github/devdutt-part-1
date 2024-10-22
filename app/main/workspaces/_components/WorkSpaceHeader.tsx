"use client";
import React, { FC, Fragment, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { ChevronDown, ListFilter, SquarePen } from "lucide-react";
import Hint from "@/components/ui/Hint";
import PreferencesModal from "./PreferencesModal";
type WorkSpaceHeaderProp = {
  workspace: Doc<"workspaces">;
  isAdmin?: boolean;
};
const WorkSpaceHeader: FC<WorkSpaceHeaderProp> = ({
  workspace,
  isAdmin,
}): JSX.Element => {
  const [openPreferenceModal, setOpenPreferenceModal] =
    useState<boolean>(false);
  return (
    <Fragment>
      <PreferencesModal
        isOpen={openPreferenceModal}
        setOpen={() => setOpenPreferenceModal(false)}
        initialValues={workspace.name}
      />
      <div className="flex items-center justify-between px-4 h-[49px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"transparent"}
              className=" text-sm w-auto p-1.5 overflow-hidden"
              size="sm"
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDown className="size-4 ml-1 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" align="start" side="bottom">
            <DropdownMenuItem
              key={workspace?._id}
              className="cursor-pointer capitalize"
            >
              <div className="size-5 relative overflow-hidden bg-[#616061] text-white font-semibold text-sm rounded-md flex items-center justify-center mr-1">
                {workspace?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex flex-col items-start ">
                <p className="font-bold"> {workspace.name}</p>
                <p className="text-xs text-muted-foreground">
                  {" "}
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>
            {isAdmin ? (
              <Fragment>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer" onClick={() => {}}>
                  Invite people to {workspace?.name}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setOpenPreferenceModal(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </Fragment>
            ) : (
              <></>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex items-center gap-0.5">
          <Hint label="Filter conversations" side="bottom">
            <Button variant="transparent" size="iconSm">
              <ListFilter className="size-4" />
            </Button>
          </Hint>
          <Hint label="New message" side="bottom">
            <Button variant="transparent" size="iconSm">
              <SquarePen className="size-4" />
            </Button>
          </Hint>
        </div>
      </div>
    </Fragment>
  );
};

export default WorkSpaceHeader;
