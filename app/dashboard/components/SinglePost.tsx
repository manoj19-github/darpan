import fetchPostById from "@/actions/fetchPostById";
import { auth } from "@/app/config/authConfig";
import UserAvatar from "@/components/UserAvatar";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { FC, Fragment } from "react";
import PostOptions from "./PostOptions";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import SinglePostComments from "./SinglePostComments";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import PostItem from "./PostItem";
import PostActionWrapper from "./PostActionWrapper";
import SinglePostSkeleton from "@/components/SinglePostSkeleton";

interface SinglePostProps {
  id: string;
}
const SinglePost: FC<SinglePostProps> = async ({
  id,
}): Promise<JSX.Element> => {
  const post = await fetchPostById(id);
  const session = await auth();
  const postUsername = post?.user.username;
  const userId = session?.user.id;
  if (!post) notFound();
  return (
    <div className="mb-[100px] lg:mb-0">
      <Card className="max-w-3xl lg:max-w-4xl md:flex mx-auto">
        <div className="relative overflow-hidden h-[500px]  w-full">
          <Image
            src={post.fileUrl}
            fill
            alt="post image"
            className="md:rounded-md object-cover"
          />
        </div>
        <div className="flex max-w-sm flex-col flex-1">
          <div className="flex items-center justify-between border-b px-5 py-3">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link
                  className="font-semibold text-sm"
                  href={`/dashboard/${postUsername}`}
                >
                  {postUsername}
                </Link>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex items-center space-x-2">
                  <UserAvatar user={post.user} className="h-14 w-14" />
                  <div>
                    <p className="font-bold">{postUsername}</p>
                    <p className="text-sm font-medium dark:text-neutral-400">
                      {post.user.name}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <PostOptions post={post} userId={userId} />
          </div>
          {post.comments.length === 0 ? (
            <div className="flex flex-col items-center gap-1.5 flex-1 justify-center">
              <p className="text-xl lg:text-2xl font-extrabold">
                No comments yet
              </p>
              <p className="text-sm font-medium">Start the coversation</p>
            </div>
          ) : (
            <></>
          )}
          <SinglePostComments post={post} />
          <div className="px-2 hidden md:block mt-auto border-y p-2">
            <PostActions post={post} userId={userId} />
            <time className="text-[11px] uppercase text-zinc-500 font-medium">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm postId={id} className="hidden md:inline-flex" />
        </div>
      </Card>
      <div className="md:hidden">
        <PostActionWrapper
          postDetails={post}
          session={session}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default SinglePost;
