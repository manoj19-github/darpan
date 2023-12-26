import bcrypt from "bcrypt";
import prisma from "../../config/PrismaConfig";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password, username } = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
      username,
    },
  });
  return NextResponse.json(user);
}
