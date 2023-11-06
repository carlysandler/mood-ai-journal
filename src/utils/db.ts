import { PrismaClient } from '@prisma/client'

// fancy way of coercing this to be a specific type
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
/**
 *
 * we want to limit the amount of connection strings generated as much as possible when we initialize a new prisma client
 *
 * We see if we already instantiated prisma by assigning it to the global
 *
 * Node - globalThis => global space were running in. check to see if prisma is there first and if not, create it
 *
 * In development mode - With Next.js, everytime we save we do a hot reload and it will mess  up the db connection
 *
 *
 * With hot module reloading, multiple database connection objects can be created and cause issues in the application. These utility methods check if the connection has already been established and reuse the existing connection.
 */
