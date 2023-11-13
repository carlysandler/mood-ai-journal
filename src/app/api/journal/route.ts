import { getUserByClerkId, prisma } from '@/utils'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async (req: Request) => {
  // /api/journal/post
  const data = await req.json()

  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: data.content,
      analysis: {
        create: {
          mood: 'Neutral',
          subject: 'None',
          negative: false,
          summary: 'None',
          color: '#0101fe',
          userId: user.id,
        },
      },
    },
  })

  // whenever a page gets data, the data is going to be cached. We can tell nextjs to revalidate those changes - clean it and go get it again

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}
