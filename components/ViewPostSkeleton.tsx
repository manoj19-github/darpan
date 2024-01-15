import React, { FC } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Skeleton } from "./ui/skeleton";

interface ViewPostSkeletonProps {}
const ViewPostSkeleton: FC<ViewPostSkeletonProps> = (): JSX.Element => {
  return (
    <Dialog open>
      <DialogContent className="flex gap-0 flex-col md:flex-row items-center p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px] ">
        <Skeleton className="relative overflow-hidden h-96 md:h-[500px] lg:h-[700px] xl:h-[800px] max-w-3xl w-full rounded-r-none" />
        <div className="flex flex-col h-full py-4 pl-3.5 pr-6 flex-1 ">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <Skeleton className="h-4 w-[250px]" />
          <div className="flex items-center w-full space-x-4">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full flex-1" />
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[300px]" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewPostSkeleton;
