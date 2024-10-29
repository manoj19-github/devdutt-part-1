"use client";
import CreateChannelModal from "@/app/main/workspaces/_components/CreateChannelModal";
import CreateWorkSpaceModal from "@/app/main/workspaces/_components/CreateWorkSpaceModal";
import useIsMounted from "@/hooks/useIsMounted";
import React, { FC, Fragment } from "react";

type ModalContainerProps = {};
const ModalContainer: FC<ModalContainerProps> = () => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <Fragment>
      <CreateWorkSpaceModal />
      <CreateChannelModal />
    </Fragment>
  );
};

export default ModalContainer;
