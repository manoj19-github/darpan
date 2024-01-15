import React, { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { AspectRatio } from "./ui/aspect-ratio";
import { Skeleton } from "./ui/skeleton";
interface EditPostSkeletonProps {}
const EditPostSkeleton: FC<EditPostSkeletonProps> = (): JSX.Element => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Info</DialogTitle>
        </DialogHeader>
        <AspectRatio ratio={1 / 1} className="relative h-full">
          <Skeleton className="h-full w-full" />
        </AspectRatio>
        <Skeleton className="h-10 w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default EditPostSkeleton;
