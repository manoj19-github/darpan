import React, { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface PostSkeletonProps {}
const PostSkeleton: FC<PostSkeletonProps> = (): JSX.Element => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12  w-12 rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] rounded-full" />
          <Skeleton className="h-4 w-[250px] rounded-full" />
        </div>
      </div>

      <Skeleton className="h-[450px]" />
    </div>
  );
};

export default PostSkeleton;
