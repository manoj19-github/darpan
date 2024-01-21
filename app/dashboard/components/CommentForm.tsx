"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import useMount from "@/hooks/useMount";
import { CreateComment } from "@/lib/formSchemas";
import { cn } from "@/lib/utils";
import createCommentAction from "@/serverActions/createComment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { FC, Ref } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CommentFormProps {
  postId: string;
  className?: string;
  inputRef?: Ref<HTMLInputElement>;
}
const CommentForm: FC<CommentFormProps> = ({
  postId,
  inputRef,
  className,
}): JSX.Element => {
  const isMount = useMount();
  const formController = useForm<z.infer<typeof CreateComment>>({
    resolver: zodResolver(CreateComment),
    defaultValues: {
      body: "",
      postId,
    },
  });
  const watchFormBody = formController.watch("body");
  const isFormSubmitting = formController.formState.isSubmitting;
  const onSubmitAction = async (values: any) => {
    await createCommentAction(values);
    formController.reset();
  };
  if (!isMount) return <></>;

  return (
    <Form {...formController}>
      <form
        onSubmit={formController.handleSubmit(onSubmitAction)}
        className={cn(
          "border-b relative border-gray-200 dark:border-neutal-800 py-3 flex items-center space-x-2 w-full px-3",
          className
        )}
      >
        {isFormSubmitting ? (
          <div className="flex justify-center items-center w-full absolute">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <></>
        )}
        <FormField
          control={formController.control}
          name="body"
          render={({ field }) => {
            return (
              <FormItem className="w-full flex">
                <FormControl>
                  <input
                    disabled={formController.formState.isSubmitting}
                    type="text"
                    placeholder="Add a comment..."
                    className="bg-transparent text-sm border-none focus:outline-none flex-1 dark:text-neutral-400 placeholder-neutral-400 font-medium disabled:opacity-30"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <button
          disabled={
            !watchFormBody.trim().length ||
            formController.formState.isSubmitting
          }
          type="submit"
          className="text-sky-500 text-sm font-semibold  hover:text-sky-700 dark:hover:text-white disabled:cursor-not-allowed dark:disabled:text-slate-500 disabled:text-sky-500/40 disabled:hover:text-sky-500/40 dark:disabled:hover:text-slate-500"
        >
          Post
        </button>
      </form>
    </Form>
  );
};

export default CommentForm;
