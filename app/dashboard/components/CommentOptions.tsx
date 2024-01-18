import SubmitButton from "@/components/SubmitButton";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import deleteCommentAction from "@/serverActions/deleteComment";
import { Comment } from "@prisma/client";
import { DialogClose, DialogContent } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import React, { FC } from "react";
import toast from "react-hot-toast";

interface CommentOptionsProps {
  comment: Comment;
}

const CommentOptions: FC<CommentOptionsProps> = ({ comment }): JSX.Element => {
  const commentHandler = async (formData) => {
    const { message } = await deleteCommentAction(formData);
    toast.success(message);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-5 w-5 group-hover:inline cursor-pointer dark:text-neutral-400" />
      </DialogTrigger>
      <DialogContent className="dialogContent py-3">
        <form action={commentHandler}>
          <input type="hidden" name="id" value={comment.id} />
          <SubmitButton className="text-red-500 font-bold disabled:cursor-not-allowed w-full pt-3 px-3">
            Delete
          </SubmitButton>
        </form>
        <DialogClose className="postOption boder-0 w-full p-3 mb-3">
          Cancel
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default CommentOptions;
