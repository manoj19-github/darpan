"use server";

import { likePostSchema } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import prisma from "@/app/config/PrismaConfig";
import { revalidatePath } from "next/cache";
const likePostAction = async (value: FormDataEntryValue | null) => {
  try {
    const userId = await getUserId();
    const validatedFields = likePostSchema.safeParse({ postId: value });
    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing fields. failed to like post",
      };
    const { postId } = validatedFields.data;

    const post = await prisma.like.findUnique({ where: { id: postId } });
    if (!post)
      return {
        message: "post not found",
      };
    const likeExists = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    //     update database
    if (likeExists) {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/dashboard");
      return {
        message: "unliked post",
      };
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return {
        message: "Post liked",
      };
    }
  } catch (error) {
    console.log(error);
    return { message: "Database error : Failed to like post" };
  }
};

export default likePostAction;
