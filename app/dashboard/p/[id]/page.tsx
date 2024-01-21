import SinglePostSkeleton from "@/components/SinglePostSkeleton";
import React, { FC, Suspense } from "react";
import SinglePost from "../../components/SinglePost";
interface IParams {
  id: string;
}
interface PostPageProps {
  params: IParams;
}

const PostPage: FC<PostPageProps> = ({ params }): JSX.Element => {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost />
      </Suspense>
    </div>
  );
};

export default PostPage;
