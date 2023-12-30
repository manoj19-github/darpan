import React, { FC } from "react";
import { PostWithExtras } from "../interfaces/postSection.interface";
import { auth } from "../config/authConfig";
import UserAvatar from "@/components/UserAvatar";
import { LuDot } from "react-icons/lu";
import TimeStamp from "./TimeStamp";
import PostOptions from "./PostOptions";

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
    <div className="flex flex-col space-y-3 my-5">
      <div className="flex items-center  px-3 sm:px-0 justify-between">
        <div className="flex space-x-3 items-center">
          <UserAvatar user={postDetails.user} isSmall />

          <div className="text-sm">
            <p className="space-x-1 flex">
              <span className="font-semibold">{username}</span>
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
    </div>
  );
};

export default PostItem;
