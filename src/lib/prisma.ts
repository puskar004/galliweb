import { PrismaClient } from "@prisma/client";

// Next.js dev mode reloads modules often. Without this guard, every
// reload would open a brand-new database connection and eventually
// exhaust Neon's free-tier connection limit. We stash one instance
// on the global object and reuse it.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
