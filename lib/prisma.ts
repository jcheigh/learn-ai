import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

// prevent hot reloading from creating multiple instances of prisma
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;