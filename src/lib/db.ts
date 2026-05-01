import { PrismaClient } from '@prisma/client'

// Global singleton to prevent multiple instances in development (hot-reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Vercel Postgres uses pgBouncer for connection pooling.
    // These settings optimize Prisma for serverless environments.
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
