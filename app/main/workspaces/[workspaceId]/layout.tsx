import React, { FC, ReactNode } from "react";
import Toolbar from "./_components/Toolbar";

type WorkspaceIdLayoutProps = {
  children: ReactNode;
};
const WorkSpaceIdLayout: FC<WorkspaceIdLayoutProps> = ({ children }) => {
  return (
    <div className="h-full ">
      <Toolbar />
      {children}
    </div>
  );
};

export default WorkSpaceIdLayout;
