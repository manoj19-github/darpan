import React, { FC } from "react";
import { Avatar } from "@/components/ui/avatar";
import type { AvatarProps } from "@radix-ui/react-avatar";
import type { User } from "next-auth";
import Image from "next/image";

type UserAvatarProps = Partial<AvatarProps> & {
  user: User | undefined;
  isSmall?: boolean;
};
const UserAvatar: FC<UserAvatarProps> = ({
  user,
  isSmall,
  ...avatarProps
}): JSX.Element => {
  return (
    <Avatar
      className={` h-10 w-10  ${isSmall ? `h-8 w-8` : ""}`}
      {...avatarProps}
    >
      <div className="!relative w-full h-full ">
        <Image
          src={
            user?.image
              ? user.image
              : "https://e7.pngegg.com/pngimages/323/705/png-clipart-user-profile-get-em-cardiovascular-disease-zingah-avatar-miscellaneous-white.png"
          }
          fill
          alt={`${user?.name}'s Profile picture`}
          className="rounded-full object-fill"
        />
      </div>
    </Avatar>
  );
};

export default UserAvatar;
