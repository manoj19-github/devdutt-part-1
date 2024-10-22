import React, { FC, Fragment, ReactNode } from "react";
import ToasterProvider from "./ToasterProvider";
import ConvexProvider from "./ConvexProvider";
import JotaiProvider from "./JotaiProvider";

type ProviderProps = {
  children: ReactNode;
};
const ProviderContainer: FC<ProviderProps> = ({ children }): JSX.Element => {
  return (
    <Fragment>
      <ToasterProvider />
      <ConvexProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </ConvexProvider>
    </Fragment>
  );
};

export default ProviderContainer;
