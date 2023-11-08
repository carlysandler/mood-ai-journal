import { getUserByClerkId, prisma } from '@/utils'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'


export const POST = async () => {
  // /api/journal/post

  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!'
    }
    
  })

  // whenever a page gets data, the data is going to be cached. We can tell nextjs to revalidate those changes - clean it and go get it again

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })


}