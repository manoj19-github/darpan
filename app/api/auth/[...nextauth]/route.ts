import { config } from "@/app/config/authConfig";
import NextAuth, { NextAuthOptions } from "next-auth";

const handler = NextAuth(config);
export { handler as GET, handler as POST };
