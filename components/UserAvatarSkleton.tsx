import React, { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface UserAvatarSkletonProps {}
const UserAvatarSkleton: FC<UserAvatarSkletonProps> = (): JSX.Element => {
  return (
    <div className="flex items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
};

export default UserAvatarSkleton;
