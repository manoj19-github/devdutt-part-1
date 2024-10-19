"use client";
import { Button } from "@/components/ui/button";
import { useGetWorkSpaceById } from "@/hooks/useGetWorkSpace";
import { useWorkspaceId } from "@/hooks/useWorkspaceId";
import { Info, Search } from "lucide-react";
import React, { FC } from "react";

type ToolbarProps = {};
const Toolbar: FC<ToolbarProps> = (): JSX.Element => {
  const workspace = useWorkspaceId();
  const { data } = useGetWorkSpaceById({ id: workspace });
  return (
    <div className="bg-appColor flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[270px] max-[642px] grow-[2] shrink  flex items-center">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2"
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-sm">Search {data?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Toolbar;
