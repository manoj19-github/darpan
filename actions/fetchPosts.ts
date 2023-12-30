import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/config/PrismaConfig";

export async function fetchPostsAction() {
  noStore();
  try {
    return await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error: any) {
    console.log("error : ", error);
    throw new Error("failed to fetch posts");
  }
}
