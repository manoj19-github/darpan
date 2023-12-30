"use server";
import prisma from "@/app/config/PrismaConfig";
import { DeletePostSchema } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deletePostAction(formData: FormData) {
  try {
    const userId = await getUserId();
    const { id } = DeletePostSchema.parse({ id: formData.get("id") });
    const isPostExists = await prisma.post.findFirst({
      where: {
        id,
        userId,
      },
    });
    if (!isPostExists) return { message: "Post not found", status: false };
    await prisma.post.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
    return { message: "Post deleted successfully", status: true };
  } catch (error: any) {
    console.log("error : ", error);
    return { message: "Post deletion faled", status: false };
  }
}
