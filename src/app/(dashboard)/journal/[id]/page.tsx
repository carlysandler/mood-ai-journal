import { Editor } from '@/components'
import { getUserByClerkId, prisma } from '@/utils'
import { Analysis, JournalAPIParams, JournalEntry } from '@/types'

//editor expecting an entry so we will fetch it using this server component
const getEntry = async (id: string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      // virtual field for querying compound index
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  })
  return entry as JournalEntry
}

// You can pass props to a client component from a server component as long as they are serializable
// bc its coming from the db and its safe and crosses the internet (already serializable)
// CARLY TO DO: research the technical implications of this
const EntryPage = async ({ params }: { params: JournalAPIParams }) => {
  const entry = await getEntry(params.id)
  let mood,
    summary,
    color,
    subject = ''
  let negative = false

  if (entry.analysis) {
    ;({ mood, summary, color, subject, negative } = entry.analysis)
  }
  const analysisData = [
    { name: 'Summary', value: summary || '' },
    { name: 'Subject', value: subject || '' },
    { name: 'Mood', value: mood || '' },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  return (
    <div className='h-full w-full grid grid-cols-3'>
      <div className='col-span-2'>
        <Editor entry={entry!} />
      </div>
      <div className='border-l border-theme'>
        <header
          className='p-6 h-20 text-center border-b border-theme'
          style={{ backgroundColor: color }}
        >
          <h2 className='text-2xl'>Analysis</h2>
        </header>
        <div>
          <ul>
            {analysisData.map((item: { name: string; value: string }) => (
              <li
                key={item.name}
                className='px-2 py-2 flex items-center justify-between border-b border-theme'
              >
                <span className='text-lg font-semibold'>{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default EntryPage
