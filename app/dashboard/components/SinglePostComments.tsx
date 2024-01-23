"use client";
import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import { ScrollArea } from "@/components/ui/scroll-area";
import React, { FC, Fragment } from "react";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
interface SinglePostCommentsProps {
  post: PostWithExtras;
}
const SinglePostComments: FC<SinglePostCommentsProps> = ({
  post,
}): JSX.Element => {
  return (
    <Fragment>
      {post.comments.length > 0 ? (
        <ScrollArea className="hidden md:inline py-1.5 flex-1">
          <MiniPost post={post} />
          {post.comments.map((self, index) => (
            <Comment key={self.id} comment={self} />
          ))}
        </ScrollArea>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default SinglePostComments;
