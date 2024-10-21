import React, { FC, ReactNode } from "react";
import Toolbar from "./_components/Toolbar";
import Sidebar from "./_components/Sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import WorkSpaceSidebar from "../_components/WorkSpaceSidebar";

type WorkspaceIdLayoutProps = {
  children: ReactNode;
};
const WorkSpaceIdLayout: FC<WorkspaceIdLayoutProps> = ({ children }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="ca-worspace-layout">
          <ResizablePanel defaultSize={20} minSize={11} className="bg-appColor">
            <WorkSpaceSidebar/>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20}>
            <div>{children}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default WorkSpaceIdLayout;
