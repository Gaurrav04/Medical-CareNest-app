import { AuthOptions, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/db";

import type { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Authorize function called with credentials:", credentials);

          // Check if user credentials are provided
          if (!credentials?.email || !credentials?.password) {
            console.log("Error: No inputs provided");
            throw new Error("No Inputs Found");
          }

          console.log("Step 1: Credentials provided");

          // Check if user exists
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            console.log("Error: No user found with email:", credentials.email);
            throw new Error("No user found");
          }

          console.log("Step 2: User found", existingUser);

          // Check if the password is correct
          const passwordMatch = existingUser.password
            ? await compare(credentials.password, existingUser.password)
            : false;

          if (!passwordMatch) {
            console.log("Error: Password mismatch for email:", credentials.email);
            throw new Error("Password Incorrect");
          }

          console.log("Step 3: Password matched");

          // Return the user object
          const user = {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            picture: existingUser.image,
          };

          console.log("Step 4: User authorized successfully", user);
          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback - token before update:", token, "user:", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.picture || null;
      }
      console.log("JWT Callback - token after update:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - session before update:", session);
      console.log("Session Callback - token:", token);
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || null;
        session.user.role = token.role;
      }
      console.log("Session Callback - session after update:", session);
      return session;
    },
  },
};
