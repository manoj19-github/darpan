import { CommentWithExtras } from "@/app/interfaces/postSection.interface";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC, RefObject } from "react";
import TimeStamp from "./TimeStamp";
import CommentOptions from "./CommentOptions";

interface CommentProps {
  comment: CommentWithExtras;
  inputRef?: RefObject<HTMLInputElement>;
}

const Comment: FC<CommentProps> = ({ comment, inputRef }): JSX.Element => {
  const { data: session } = useSession();
  const username = comment.user.username;
  const href = `/dashboard/${username}`;
  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar user={comment.user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-2 leading-none">
          <Link href={href} className="font-semibold">
            {username}
          </Link>
          <p className="font-medium ">{comment.body}</p>
        </div>
        <div className="flex h-5 items-center space-x-2">
          <TimeStamp createdAt={comment.createdAt} />
          <button
            className="text-sm font-semibold text-neutral-500"
            onClick={() => inputRef?.current?.focus()}
          >
            Reply
          </button>
          {comment.userId === session?.user?.id ? (
            <CommentOptions comment={comment} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
