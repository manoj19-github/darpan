"use server";
import { CreatePostSchema } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import { z } from "zod";
import prisma from "@/app/config/PrismaConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPostHandler(
  values: z.infer<typeof CreatePostSchema>
) {
  try {
    const userId = await getUserId();
    const validatedFields = CreatePostSchema.safeParse(values);
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields , failed to create post",
      };
    }
    const { fileURL, caption } = validatedFields.data;
    await prisma.post.create({
      data: {
        caption,
        fileUrl: fileURL,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } catch (error: any) {
    console.log(error);
    return {
      message: "Failed to create post",
    };
  }
  revalidatePath("/");
  redirect("/dashboard");
}
