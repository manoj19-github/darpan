import SinglePostSkeleton from "@/components/SinglePostSkeleton";
import React, { FC, Suspense } from "react";
import SinglePost from "../../components/SinglePost";
import { Separator } from "@/components/ui/separator";
import MorePosts from "../../components/MorePosts";
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
        <SinglePost id={params.id} />
      </Suspense>
      {/* <Separator className="my-12 max-w-3xl lg:max-w-4xl mx-auto" /> */}
      {/* <Suspense>
        <MorePosts postId={id}/>
      </Suspense> */}
    </div>
  );
};

export default PostPage;
