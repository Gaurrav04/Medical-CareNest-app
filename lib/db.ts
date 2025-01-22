import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple PrismaClient instances during hot reload in development
  var prisma: PrismaClient | undefined;
}

export const prismaClient = globalThis.prisma || new PrismaClient({
  log: ["query", "info", "warn", "error"], // Enable logging for easier debugging
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;
