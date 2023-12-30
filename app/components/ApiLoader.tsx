"use client";
import React, { FC } from "react";
import { ThreeDots } from "react-loader-spinner";

interface ApiLoaderProps {
  isLoading: boolean;
}

const ApiLoader: FC<ApiLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return <></>;
  return (
    <div className=" fixed h-[100vh] w-[100vw] top-0 left-0 bg-[rgba(0,0,0,0.8)] !z-[999] flex items-center justify-center">
      <div className="hidden md:flex h-auto flex-col space-y-1 items-center justify-center">
        <ThreeDots
          height="40"
          width="120"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
        <p className="text-gray-200 base-font-regular">Please wait ...</p>
      </div>
      <div className="flex md:hidden">
        <ThreeDots
          height="40"
          width="120"
          radius="9"
          color="gray"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </div>
  );
};

export default ApiLoader;
