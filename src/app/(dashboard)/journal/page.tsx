import { getUserByClerkId, prisma } from '@/utils'
import { analyzeEntry } from '@/utils/ai'
import { NewEntryCard, EntryCard } from '@/components'
import { JournalEntry } from '@/types'
import Link from 'next/link'

const getEntries = async () => {
  const user = await getUserByClerkId()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries: JournalEntry[] = await getEntries()
  return (
    <div className='p-8'>
      <h2 className='text-3xl mb-8'>Journal</h2>

      <div className='grid grid-cols-3 gap-4'>
        <NewEntryCard />
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default JournalPage
