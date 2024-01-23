import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import React, { FC, Fragment } from "react";
import Comments from "./Comments";
import PostActions from "./PostActions";
import { Session } from "next-auth";

interface PostActionWrapperProps {
  postDetails: PostWithExtras;
  userId?: string;
  session: Session | null;
}
const PostActionWrapper: FC<PostActionWrapperProps> = ({
  postDetails,
  userId,
  session,
}): JSX.Element => {
  return (
    <Fragment>
      <PostActions
        post={postDetails}
        userId={userId}
        className="px-3 sm:px-0"
      />
      {postDetails.caption ? (
        <div className="text-sm leading-none items-center space-x-2 font-medium px-3 sm:px-0">
          <p>{postDetails.caption}</p>
        </div>
      ) : (
        <></>
      )}
      <Comments
        postId={postDetails.id}
        comments={postDetails.comments}
        user={session?.user}
      />
    </Fragment>
  );
};

export default PostActionWrapper;
