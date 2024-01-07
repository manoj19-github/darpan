"use client";
import { CommentWithExtras } from "@/app/interfaces/postSection.interface";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CreateComment } from "@/lib/formSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import Link from "next/link";
import React, { FC, useOptimistic, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CommentsProps {
  postId: string;
  comments: CommentWithExtras[];
  user?: User | null;
}
const Comments: FC<CommentsProps> = ({
  postId,
  comments,
  user,
}): JSX.Element => {
  const [isPending, startTransition] = useTransition();
  const [optimisticComments, setOptimisticComments] = useOptimistic<
    CommentWithExtras[]
  >(
    comments,
    //@ts-ignore
    (state: Comment[], newComment: string) => {
      return [{ body: newComment, userId: user?.id, postId, user }, ...state];
    }
  );
  const formControl = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  const commentBody = formControl.watch("body");
  const commentsCount = optimisticComments.length;
  const submitCommentAction = async (values: any) => {
    const valuesCopy = { ...values };
    formControl.reset();
    startTransition(() => {
      setOptimisticComments(valuesCopy.body);
    });
    // await createCommentAction(valuesCopy);
  };
  return (
    <div className="space-y-0.5 px-3 sm:px-0">
      {commentsCount > 1 ? (
        <Link
          scroll={false}
          href={`/dashboard/p/${postId}`}
          className="text-sm font-medium text-neutral-500"
        >
          View all {commentsCount}{" "}
        </Link>
      ) : (
        <></>
      )}
      {optimisticComments.slice(0, 3).map((self, index) => {
        return (
          <div
            key={index}
            className="text-sm flex items-center space-x-2 font-medium "
          >
            <Link href={`/dashboard/${self.user.username}`}>
              {self.user.username}
            </Link>
            <p>{self.body}</p>
          </div>
        );
      })}

      {/*    add new comment */}
      <Form {...formControl}>
        <form
          className="border-b border-gray-300 dark:border-neutral-300 py-1 flex items-center space-x-2"
          onSubmit={formControl.handleSubmit(submitCommentAction)}
        >
          <FormField
            control={formControl.control}
            name="body"
            render={({ field, fieldState }) => (
              <FormItem className="w-full flex">
                <FormControl>
                  <input
                    type="text"
                    placeholder="Add a comment ..."
                    className="bg-transparent text-sm border-none focus:outline-none flex-1 placeholder-neutral-500 dark:text-white dark:placeholder-neutral-400 font-medium"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          {commentBody.trim().length > 0 ? (
            <button
              type="submit"
              className="text-sky-500 text-sm font-semibold hover:text-white disabled:hover:text-sky-500 disabled:cursor-not-allowed"
            >
              Post
            </button>
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Comments;
