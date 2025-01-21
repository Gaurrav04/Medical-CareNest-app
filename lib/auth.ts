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
          console.log(
            "Authorize function called with credentials:",
            credentials
          );

          // Check if user credentials are provided
          if (!credentials?.email || !credentials?.password) {
            throw new Error("No Inputs Found");
          }

          console.log("Pass 1 checked");

          // Check if user exists
          const existingUser = await prismaClient.user.findUnique({
            where: { email: credentials.email },
          });

          if (!existingUser) {
            console.log("No user found");
            throw new Error("No user found");
          }

          console.log("Pass 2 Checked");
          console.log(existingUser);

          // Check if the password is correct
          const passwordMatch = existingUser.password
            ? await compare(credentials.password, existingUser.password)
            : false;

          if (!passwordMatch) {
            console.log("Password incorrect");
            throw new Error("Password Incorrect");
          }

          console.log("Pass 3 Checked");

          // Return the user object with `id` converted to a string
          const user = {
            id: existingUser.id.toString(), // Convert ID to string
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            picture: existingUser.image,
          };

          console.log("User Compiled");
          console.log(user);
          return user;
        } catch (error) {
          console.log("Authorization failed");
          console.error(error);
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Ensure `id` is string
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.picture = user.picture || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id; // Ensure `id` is string
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture || null;
        session.user.role = token.role;
      }
      return session;
    },
  },
};
