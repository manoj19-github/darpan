"use client";
import React, { FC, useOptimistic } from "react";
import { PostWithExtras } from "../interfaces/postSection.interface";
import { Like } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import ActionIcon from "./ActionIcon";

interface LikeButtonProps {
  post: PostWithExtras;
  userId?: string;
}

const LikeButton: FC<LikeButtonProps> = ({ post, userId }): JSX.Element => {
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
  const handleLikePost = async (formData: FormData) => {
    const postId = formData.get("postId");
    setOptimisticLikes({ postId, userIds });
    // await likePost(postId);
  };
  return (
    <div className="flex flex-col">
      <form action={handleLikePost}>
        <input type="hidden" name="postId" value={post.id} />
        <ActionIcon>
          <Heart
            className={cn("h-6 w-6", {
              "text-red-500 fill-red-500": optimisticLikes.some(isAlreadyLiked),
            })}
          />
        </ActionIcon>
      </form>
      {optimisticLikes.length > 0 ? (
        <p className="text-sm font-bold dark:text-white">
          {optimisticLikes.length}{" "}
          {optimisticLikes.length === 1 ? "like" : "likes"}
        </p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default LikeButton;
