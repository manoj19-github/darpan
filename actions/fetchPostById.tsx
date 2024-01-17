import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/app/config/PrismaConfig";
const fetchPostById = async (id: string) => {
  noStore();
  try {
    return await prisma.post.findUnique({
      where: {
        id,
      },
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
    });
  } catch (error) {
    console.log("error : ", error);
    throw new Error(`Failed to fetch post `);
  }
};

export default fetchPostById;
