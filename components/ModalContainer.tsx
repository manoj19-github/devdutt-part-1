"use client";
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
    </Fragment>
  );
};

export default ModalContainer;
