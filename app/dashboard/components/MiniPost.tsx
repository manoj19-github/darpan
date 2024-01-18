import { PostWithExtras } from "@/app/interfaces/postSection.interface";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";
import TimeStamp from "./TimeStamp";
import PostOptions from "./PostOptions";

interface MiniPostProps {
  post: PostWithExtras;
}
const MiniPost: FC<MiniPostProps> = ({ post }): JSX.Element => {
  const username = post.user.username;
  const href = `/dashboard/${username}`;
  const { data: session, status } = useSession();
  const userDetails = session?.user;
  if (!userDetails) return <></>;
  return (
    <div className="group p-3 px-3.5 flex items-start space-x-2.5 ">
      <Link href={href} className="font-semibold">
        <UserAvatar user={post.user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href}>{username}</Link>
          <p className="font-medium">{post.caption}</p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <TimeStamp createdAt={post.createdAt} />
          <PostOptions
            post={post}
            userId={userDetails.id}
            className="hidden group-hover:inline"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniPost;
