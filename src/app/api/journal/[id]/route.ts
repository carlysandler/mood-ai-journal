import { JournalAPIParams } from '@/types'
import { getUserByClerkId, prisma } from '@/utils'
import { NextResponse } from 'next/server'
// next.js using web request standards

export const PATCH = async (req:Request, { params }: {params:JournalAPIParams}) => {
  // /api/journal/id/patch
  const { content } = await req.json()

  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      content
    }
  })

  return NextResponse.json({ data: updatedEntry})




}