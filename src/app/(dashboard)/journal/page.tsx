import { getUserByClerkId, prisma } from '@/utils'
import { NewEntryCard, EntryCard } from '@/components'
import { JournalEntry } from '@/types'

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
    <div className="grid grid-cols-3 gap-4">
      <NewEntryCard />
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
export default JournalPage
