import { EntryCard } from '@/components'
import { JournalAPIParams } from '@/types'
import { getUserByClerkId, prisma } from '@/utils'
import { analyzeEntry } from '@/utils/ai'
import { NextResponse } from 'next/server'
// next.js using web request standards

export const PATCH = async (
  req: Request,
  { params }: { params: JournalAPIParams }
) => {
  // /api/journal/id/patch
  const { content } = await req.json()

  const user = await getUserByClerkId()
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })
  const analysis = await analyzeEntry(updatedEntry)
  const savedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    update: { ...analysis },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis!,
    },
  })

  return NextResponse.json({
    data: { ...updatedEntry, analysis: savedAnalysis },
  })
}
