import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import type { User } from '@clerk/nextjs/api'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user: User | null = await currentUser()
  if (user) {
    const match = await prisma.user.findUnique({
      where: {
        clerkId: user.id as string,
      },
    })

    if (!match) {
      await prisma.user.create({
        data: {
          clerkId: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      })
    }
    redirect('/journal')
  } else {
    redirect('/sign-up')
  }
}

const NewUser = async () => {
  await createNewUser()
  return <div>Hi</div>
}
export default NewUser
/** When Clerk creates a new user, they are redirected to new-user route where the user data is sent to Prisma. Once Prisma is updated, the user is redirected to the journal page.  */
