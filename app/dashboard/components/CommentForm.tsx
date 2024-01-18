"use client";
import { Form } from "@/components/ui/form";
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
  const onSubmitAction = async (values) => {
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
      </form>
    </Form>
  );
};

export default CommentForm;
