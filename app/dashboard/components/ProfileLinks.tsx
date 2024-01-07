"use client";
import UserAvatar from "@/components/UserAvatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { User } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface ProfileLinksProps {
  user: User;
}
const ProfileLinks: FC<ProfileLinksProps> = ({ user }): JSX.Element => {
  const pathname = usePathname();
  const href = `/dashboard/${user.username}`;
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: isActive ? "secondary" : "ghost",
        className: "navLink !p-0 !m-0 !pl-[16px] !flex !justify-start gap-x-4",
        size: "lg",
      })}
    >
      <UserAvatar
        user={user}
        className={`h-6 w-6 ${isActive ? `border-2 border-white` : ``}`}
      />
      <p
        className={`${cn("hidden lg:block text-center ml-1", {
          "font-extrabold": isActive,
        })}`}
      >
        {!!user && user?.name
          ? `Hello , ${
              user.name.length > 15
                ? user.name?.slice(0, 13) + "..."
                : user.name
            }`
          : `Hello , user`}
      </p>
    </Link>
  );
};

export default ProfileLinks;
