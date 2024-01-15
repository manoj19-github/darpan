import React, { FC } from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import UserAvatarSkleton from "./UserAvatarSkleton";

interface SinglePostSkeletonProps {}
const SinglePostSkeleton: FC<SinglePostSkeletonProps> = (): JSX.Element => {
  return (
    <Card>
      <div className="relative overflow-hidden h-[450px] max-w-sm lg:max-w-lg w-full">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex max-w-sm flex-col flex-1">
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
      <div className="px-3 space-y-3 mt-8">
        <UserAvatarSkleton />
        <UserAvatarSkleton />
        <UserAvatarSkleton />
        <UserAvatarSkleton />
      </div>
    </Card>
  );
};

export default SinglePostSkeleton;
