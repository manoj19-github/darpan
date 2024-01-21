/* eslint-disable react/jsx-no-undef */
"use client";
import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import UserAvatar from "@/components/UserAvatar";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMount from "@/hooks/useMount";
import { DialogContent } from "@radix-ui/react-dialog";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useRef } from "react";
import MiniPost from "./MiniPost";
import Comment from "./Comment";
import ViewPost from "./ViewPost";
import PostActions from "./PostActions";
import CommentForm from "./CommentForm";
import Image from "next/image";

interface PostViewProps {
  id: string;
  postDetails: PostWithExtras;
}

const PostView: FC<PostViewProps> = ({ id, postDetails }): JSX.Element => {
  const pathname = usePathname();
  const isPostModal = pathname === `/dashboard/p/${id}`;
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;
  const inputRef = useRef<HTMLInputElement>(null);
  const username = postDetails.user.username;
  const href = `/dashboard/${username}`;
  const isMount = useMount();
  if (!isMount) return <></>;
  console.log("postDetails.comments", postDetails.comments);
  return (
    <Dialog
      open={isPostModal}
      onOpenChange={(isOpen) => !isOpen && router.back()}
    >
      <DialogContent className="flex gap-0 flex-col md:flex-row  p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px]  border ">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full  max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6 max-w-md    w-full">
            <Link href={href}>
              <UserAvatar user={postDetails.user} />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>
          <ScrollArea className="hidden md:flex flex-col border-b flex-1 py-1.5   ">
            <MiniPost post={postDetails} />
            {postDetails.comments.length > 0 ? (
              <>
                {postDetails.comments.map((self, index) => (
                  <Comment key={index} comment={self} inputRef={inputRef} />
                ))}
              </>
            ) : (
              <></>
            )}
          </ScrollArea>
          <ViewPost className="hidden md:flex  border-b" />
          <div className="px-2 hidden md:block mt-auto border-b p-2.5 ">
            <PostActions post={postDetails} userId={user?.id} />
            <time className="text-[11px] uppercase text-zinc-500 font-medium">
              {new Date(postDetails.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <CommentForm
            postId={id}
            className="hidden md:inline-flex"
            inputRef={inputRef}
          />
        </div>
        <div className="relative overflow-hidden h-full lg:h-full max-w-3xl w-full    ">
          <Image
            src={postDetails.fileUrl}
            fill
            alt="post image"
            objectFit="fill"
            className="md:rounded-l-md object-fill "
          />
        </div>
        <PostActions
          post={postDetails}
          userId={user?.id}
          className="md:hidden border-b p-2.5"
        />
        <CommentForm postId={id} className="md:hidden" inputRef={inputRef} />
        <ViewPost className="md:hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default PostView;
