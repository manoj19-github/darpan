import React, { FC } from "react";
import { PostWithExtras } from "../interfaces/postSection.interface";
import { auth } from "../config/authConfig";
import UserAvatar from "@/components/UserAvatar";
import { LuDot } from "react-icons/lu";
import TimeStamp from "./TimeStamp";
import PostOptions from "./PostOptions";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import PostActions from "./PostActions";

interface PostItemProps {
  postDetails: PostWithExtras;
}
const PostItem: FC<PostItemProps> = async ({
  postDetails,
}): Promise<JSX.Element> => {
  const session = await auth();

  const userId = session?.user?.id;
  const username = postDetails?.user.name;
  if (!session?.user) return <></>;
  return (
    <div className="flex flex-col space-y-3 my-5 lg:my-8 relative">
      <div className="flex items-center  px-3 sm:px-0 justify-between">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={postDetails.user} isSmall />

          <div className="text-sm">
            <p className="space-x-1 flex">
              <Link href={`/dashboard/${username}`}>
                {" "}
                <span className="font-semibold">{username}</span>
              </Link>
              <span>
                <LuDot
                  className="text-neutral-500 dark:text-neutral-400"
                  size={18}
                />
              </span>
              <TimeStamp createdAt={postDetails.createdAt} />
            </p>
          </div>
        </div>
        <PostOptions post={postDetails} userId={userId} />
      </div>
      <Card className="relative h-[450px] w-full overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={postDetails.fileUrl}
          alt="post Image"
          fill
          className="sm:rounded-md object-cover"
        />
      </Card>

      <PostActions
        post={postDetails}
        userId={userId}
        className="px-3 sm:px-0"
      />
      {postDetails.caption ? (
        <div className="text-sm leading-none items-center space-x-2 font-medium px-3 sm:px-0">
          <p>{postDetails.caption}</p>
        </div>
      ) : (
        <></>
      )}
      {/* <Comments postId={postDetails.id} comments={postDetails.comments} user={session?.user}/> */}
    </div>
  );
};

export default PostItem;
