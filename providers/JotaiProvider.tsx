"use client";
import { Provider } from "jotai";
import { FC, ReactNode } from "react";

type JotaiProviderProps = {
  children: ReactNode;
};

const JotaiProvider: FC<JotaiProviderProps> = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
