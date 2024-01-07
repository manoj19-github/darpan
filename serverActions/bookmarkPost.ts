"use server";
import prisma from "@/app/config/PrismaConfig";
import { bookmarkPostSchema } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const bookmarkPostAction = async (value: FormDataEntryValue | null) => {
  try {
    console.log("bookmark action : value : ", value);
    const userId = await getUserId();
    const validatedFields = bookmarkPostSchema.safeParse({ postId: value });
    if (!validatedFields.success)
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to bookmark post",
      };
    const { postId } = validatedFields.data;
    const isPostExist = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!isPostExist)
      return {
        message: "Post not found",
      };
    const isAlreadyBookMarked = await prisma.savedPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });
    if (isAlreadyBookMarked) {
      console.log("delete hit");
      await prisma.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Unbookmarked post" };
    } else {
      console.log("create hit");
      await prisma.savedPost.create({
        data: {
          postId,
          userId,
        },
      });
      revalidatePath("/dashboard");
      return { message: "Bookmarked post" };
    }
  } catch (error: any) {
    console.log(error);
    return { message: "Failed to Bookmarked: Database error " };
  }
};

export default bookmarkPostAction;
