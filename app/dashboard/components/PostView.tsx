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
  return (
    <Dialog
      open={isPostModal}
      onOpenChange={(isOpen) => !isOpen && router.back()}
    >
      <DialogContent className="flex gap-0 flex-col md:flex-row items-center p-0 md:max-w-3xl lg:max-w-5xl xl:max-w-6xl h-full max-h-[500px] lg:max-h-[700px] xl:max-h-[800px] border">
        <div className="flex flex-col justify-between md:h-full md:order-2 w-full max-w-md">
          <DialogHeader className="flex border-b space-y-0 space-x-2.5 flex-row items-center py-4 pl-3.5 pr-6">
            <Link href={href}>
              <UserAvatar user={postDetails.user} />
            </Link>
            <Link href={href} className="font-semibold text-sm">
              {username}
            </Link>
          </DialogHeader>
          <ScrollArea className="hidden :md:inline border-b flex-1 py-1.5"></ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostView;
