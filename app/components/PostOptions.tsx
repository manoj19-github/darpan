"use client";
import React, { FC } from "react";
import { PostWithExtras } from "../interfaces/postSection.interface";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";
import { deletePostAction } from "@/serverActions/deletePost";

interface PostOptionsProps {
  post: PostWithExtras;
  userId?: string;
  className?: string;
}
const PostOptions: FC<PostOptionsProps> = ({ post, userId, className }) => {
  const isPostMine = post.userId === userId;
  console.log("postId : ", post.userId);
  console.log("user Id : ", userId);
  const handleDeletePost = async (formData: any) => {
    const { message, status } = await deletePostAction(formData);
    return status ? toast.success(message) : toast.error(message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 cursor-pointer dark:text-neutral-400 ",
            className
          )}
        />
      </DialogTrigger>
      <DialogContent className="dialogContent">
        {isPostMine ? (
          <form action={handleDeletePost} className="postOption">
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full p-3 outline-none focus:outline-none ">
              Delete Post
            </SubmitButton>
          </form>
        ) : (
          <></>
        )}
        {isPostMine ? (
          <Link
            scroll={false}
            href={`/dashboard/p/${post.id}/edit`}
            className="postOption p-3 text-center"
          >
            Edit
          </Link>
        ) : (
          <></>
        )}
        <form action="" className="postOption border-0">
          <button className="w-full p-3">Hide like count</button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostOptions;
