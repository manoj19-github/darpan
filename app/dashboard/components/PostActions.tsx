"use client";
import React, { FC, useOptimistic } from "react";
import { PostWithExtras } from "../../interfaces/postSection.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { MessageCircle } from "lucide-react";
import ActionIcon from "./ActionIcon";
import { Like } from "@prisma/client";
import SharedButton from "./SharedButton";
import BookmarkButton from "./BookmarkButton";

interface PostActionProps {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}
const PostActions: FC<PostActionProps> = ({
  post,
  userId,
  className,
}): JSX.Element => {
  const isAlreadyLiked = (like: Like) =>
    like.userId === userId && like.postId && post.id;
  const [optimisticLikes, setOptimisticLikes] = useOptimistic<Like[]>(
    post.likes,
    // @ts-ignore
    (state: Like[], newLike: Like) =>
      state.some(isAlreadyLiked)
        ? state.filter((like) => like.userId !== userId)
        : [...state, newLike]
  );
  return (
    <div className={cn(`relative flex items-center w-full gap-x-2`, className)}>
      <LikeButton
        post={post}
        userId={userId}
        optimisticLikes={optimisticLikes}
        setOptimisticLikes={setOptimisticLikes}
        isAlreadyLiked={isAlreadyLiked}
      />
      <Link href={`/dashboard/p/${post.id}`}>
        <div className={`${optimisticLikes.length > 0 ? `pb-3` : ""}`}>
          <ActionIcon>
            <MessageCircle className={"h-full w-6"} />
          </ActionIcon>
        </div>
      </Link>
      <div className={`${optimisticLikes.length > 0 ? `pb-3` : ""}`}>
        <SharedButton postId={post.id} />
      </div>
      <div className={`${optimisticLikes.length > 0 ? `pb-3` : ""}`}>
        <BookmarkButton post={post} userId={userId} />
      </div>
    </div>
  );
};

export default PostActions;
