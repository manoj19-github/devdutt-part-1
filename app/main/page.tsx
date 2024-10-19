"use client";

import { useWorkSpaces } from "@/hooks/useGetWorkSpaces";
import { useWorkSpaceModal } from "@/hooks/useWorkSpaceModal";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useMemo } from "react";
// import TestComponent from "./_components/TestComponent";

type MainPageProps = {};
const MainPage: FC<MainPageProps> = (): JSX.Element => {
  const { data, isLoading } = useWorkSpaces();
  const router = useRouter();

  const [workSpaceModalIsOpen, setWorkSpaceModalIsOpen] = useWorkSpaceModal();
  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);
  useEffect(() => {
    if (isLoading) return;
    if (workSpaceId) {
      console.log("Redirected to workspace");
      router.replace(`/main/workspaces/${workSpaceId}`);
    } else if (!workSpaceModalIsOpen) {
      console.log("Open creation modal");
      setWorkSpaceModalIsOpen(true);
    }
  }, [workSpaceId, isLoading, workSpaceModalIsOpen, setWorkSpaceModalIsOpen]);

  return <div>{/* <TestComponent /> */}</div>;
};

export default MainPage;
