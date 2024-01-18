"use server";
import prisma from "@/app/config/PrismaConfig";
import { DeleteComment } from "@/lib/formSchemas";
import { getUserId } from "@/lib/utils";
import { revalidatePath } from "next/cache";
const deleteCommentAction = async (formData: FormData) => {
  try {
    const userId = await getUserId();
    const { id } = DeleteComment.parse({ id: formData.get("id") });
    const commentExists = await prisma.comment.findUnique({
      where: {
        id,
        userId,
      },
    });
    if (!commentExists) throw new Error("Comment not exists");
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    return { message: "Comment deleted successfully" };
    revalidatePath("/dashboard");
  } catch (error) {
    console.log(error);
    return { message: "Database error" };
  }
};
export default deleteCommentAction;
