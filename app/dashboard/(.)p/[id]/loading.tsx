import ViewPostSkeleton from "@/components/ViewPostSkeleton";
import React, { FC } from "react";

interface PostLoadingProps {}
const PostLoading: FC<PostLoadingProps> = (): JSX.Element => {
  return <ViewPostSkeleton />;
};

export default PostLoading;
