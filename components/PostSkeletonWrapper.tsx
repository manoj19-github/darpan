import React, { FC, Fragment } from "react";
import PostSkeleton from "./PostSkeleton";

interface PostSkeletonWrapperProps {}
const PostSkeletonWrapper: FC<PostSkeletonWrapperProps> = (): JSX.Element => {
  return (
    <Fragment>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </Fragment>
  );
};

export default PostSkeletonWrapper;
