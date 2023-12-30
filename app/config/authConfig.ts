import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./PrismaConfig";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession, type NextAuthOptions } from "next-auth";
// import bcrypt from "bcrypt";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
export const config = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
    CredentialProvider({
      name: "credential",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // authentication logic
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error(`Invalid Credentials`);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user?.hashedPassword)
          throw new Error(`Invalid Credentials`);
        // const isCorrectPassword = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword
        // );
        // if (!isCorrectPassword) throw new Error(`Invalid credentials`);
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      
      
      if (!!token) {
        session.user.id = token.id;
        session.user.name = token.name ? token.name : "unknown";
        session.user.email = token.email;
        session.user.image = token?.picture
          ? token.picture
          : "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg";
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      
      
      const prismaUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!prismaUser) {
        token.id = user.id;
        return token;
      }
      if (!prismaUser.username) {
        await prisma.user.update({
          where: {
            id: prismaUser.id,
          },
          data: {
            username: prismaUser.name?.split(" ").join("").toUpperCase(),
          },
        });
      }
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image,
      };
    },
  },
} satisfies NextAuthOptions;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config);
}

// export default NextAuth(config);
