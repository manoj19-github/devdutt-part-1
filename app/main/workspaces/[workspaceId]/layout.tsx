import React, { FC, ReactNode } from "react";
import Toolbar from "./_components/Toolbar";
import Sidebar from "./_components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

type WorkspaceIdLayoutProps = {
  children: ReactNode;
};
const WorkSpaceIdLayout: FC<WorkspaceIdLayoutProps> = ({ children }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <div>Channels sidebar</div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <div>{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
