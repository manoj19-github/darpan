"use client";
import React, { FC, useOptimistic } from "react";
import { PostWithExtras } from "../../interfaces/postSection.interface";
import { Like } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import ActionIcon from "./ActionIcon";
import likePostAction from "@/serverActions/likePost";

interface LikeButtonProps {
  post: PostWithExtras;
  userId?: string;
  optimisticLikes: Like[];
  setOptimisticLikes: any;
  isAlreadyLiked: any;
}

const LikeButton: FC<LikeButtonProps> = ({
  post,
  userId,
  setOptimisticLikes,
  optimisticLikes,
  isAlreadyLiked,
}): JSX.Element => {
  const handleLikePost = async (formData: FormData) => {
    console.log("action hit");
    const postId = formData.get("postId");
    setOptimisticLikes({ postId, userId });
    // await likePost(postId);
    const res = await likePostAction(postId);
    console.log("res: ", res);
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
