import React, { FC } from "react";
import TestComponent from "./_components/TestComponent";

type MainPageProps = {};
const MainPage: FC<MainPageProps> = (): JSX.Element => {
  return (
    <div>
      <TestComponent />
    </div>
  );
};

export default MainPage;
