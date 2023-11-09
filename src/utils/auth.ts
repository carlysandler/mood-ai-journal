import { User } from '@/types'
import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export const getUserByClerkId = async (select = { id: true }): Promise<User> => {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId!
    },
    select,
  })
  return user as User
}
