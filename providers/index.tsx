import React, { FC, Fragment, ReactNode } from "react";
import ToasterProvider from "./ToasterProvider";
import ConvexProvider from "./ConvexProvider";

type ProviderProps = {
  children: ReactNode;
};
const ProviderContainer: FC<ProviderProps> = ({ children }): JSX.Element => {
  return (
    <Fragment>
      <ToasterProvider />
      <ConvexProvider>{children}</ConvexProvider>
    </Fragment>
  );
};

export default ProviderContainer;
