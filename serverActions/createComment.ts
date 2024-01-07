"use server";
import { CreateComment } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import { z } from "zod";
import prisma from "@/app/config/PrismaConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const createCommentAction = async (values: z.infer<typeof CreateComment>) => {
  try {
    const userId = await getUserId();
    const validatedFields = CreateComment.safeParse(values);
    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing fields : failed to create comment",
      };
    const { postId, body } = validatedFields.data;
    const isPostExists = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!isPostExists)
      return {
        message: "Post not found",
      };
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Comment created successfully" };
  } catch (error: any) {
    console.log(error);
    return { message: "something went wrong" };
  }
};

export default createCommentAction;
