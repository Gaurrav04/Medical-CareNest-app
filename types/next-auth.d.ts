import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
    picture?: string | null; 
  }
}

declare module "next-auth" {
  interface User {
    id: UserId;
    role: UserRole;
    picture?: string | null;
  }

  interface AdapterUser {
    id: UserId;
    role: UserRole;
    picture?: string | null; 
  }

  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
      picture?: string | null; 
    };
  }
}
