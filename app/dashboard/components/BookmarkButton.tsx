"use client";
import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import { SavedPost } from "@prisma/client";
import React, { FC, useOptimistic } from "react";
import ActionIcon from "./ActionIcon";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import bookmarkPostAction from "@/serverActions/bookmarkPost";

interface BookmarkButtonProps {
  post: PostWithExtras;
  userId?: string;
  optimisticBookmarks: SavedPost[];
  isAlreadyBookmarked: any;
  setOptimisticBookmarks: any;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({
  post,
  userId,
  optimisticBookmarks,
  isAlreadyBookmarked,
  setOptimisticBookmarks,
}): JSX.Element => {
  const handleBookMarkAction = async (formData: FormData) => {
    const postId = formData.get("postId");
    setOptimisticBookmarks({ postId, userId });
    // await bookMarkPostAction(postId);
    const res = await bookmarkPostAction(postId);
    console.log("res: ", res);
  };

  return (
    <form action={handleBookMarkAction} className="ml-auto">
      <input type="hidden" name="postId" value={post.id} />
      <ActionIcon>
        <Bookmark
          className={cn("h-6 w-6", {
            "dark:fill-white fill-black":
              optimisticBookmarks.some(isAlreadyBookmarked),
          })}
        />
      </ActionIcon>
    </form>
  );
};

export default BookmarkButton;
