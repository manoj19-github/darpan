"use server";
import { CreatePostSchema } from "@/lib/formSchemas";
import prisma from "../config/PrismaConfig";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getUserId } from "@/lib/utils";

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
  try {
    const userId = await getUserId();
    const validatedFields = CreatePostSchema.safeParse(values);

    // server side validation
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. failed to create post",
      };
    }

    const { fileURL, caption } = validatedFields.data;
  } catch (error: any) {}
}
