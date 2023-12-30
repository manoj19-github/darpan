import React, { FC } from "react";
import NextTopLoader from "nextjs-toploader";
interface PageLoadingProps {}
const PageLoading: FC<PageLoadingProps> = (): JSX.Element => {
  return (
    <div>
      <NextTopLoader
        color="#2299DD"
        // initialPosition={0.08}
        // crawlSpeed={200}
        height={3}
        // easing="ease"
        speed={200}
        // shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        zIndex={1600}
        showAtBottom={false}
      />
    </div>
  );
};

export default PageLoading;
