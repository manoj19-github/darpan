import React, { FC } from "react";
import { PostWithExtras } from "../interfaces/postSection.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { MessageCircle } from "lucide-react";
import ActionIcon from "./ActionIcon";

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
  return (
    <div className={cn(`relative flex items-center w-full gap-x-2`, className)}>
      <LikeButton post={post} userId={userId} />
      <Link href={`/dashboard/p/${post.id}`}>
        <ActionIcon>
          <MessageCircle className={"h-6 w-6"} />
        </ActionIcon>
      </Link>
      {/* <SharedButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} /> */}
    </div>
  );
};

export default PostActions;
