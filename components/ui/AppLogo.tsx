import React, { FC } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
type AppLogoProps = {
  className?: string;
  titleClassName?: string;
  titleRequired?: boolean;
};
const AppLogo: FC<AppLogoProps> = ({
  className,
  titleClassName,
  titleRequired = true,
}) => {
  return (
    <div className="relative flex items-center gap-x-4">
      <div className={twMerge("relative h-[60px] w-[60px]", className)}>
        <Image
          src={"/assets/devdutt_logo.png"}
          alt="devdutt"
          fill
          objectFit="cover"
        />
      </div>
      {titleRequired ? (
        <h2 className={twMerge("text-3xl font-semibold", titleClassName)}>
          Devdutt
        </h2>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AppLogo;
