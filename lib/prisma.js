// import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { minLength } from "zod";

/**
 * @type {import("@prisma/client").PrismaClient}
 */
export const prisma = globalThis.prisma ?? new PrismaClient({
  log : process.env.NODE_ENV === 'development'? ['query','error','warn'] : ['error']
}).$extends(withAccelerate());


if (process.env.NODE_ENV !== "production" && !globalThis.prisma) {
  globalThis.prisma = prisma;
}
