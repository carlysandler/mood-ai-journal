import { JournalEntry } from '@/types'
import { FunctionComponent } from 'react'

interface EntryCardProps {
  entry: JournalEntry
}

const EntryCard: FunctionComponent<EntryCardProps> = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()

  return (
    <div className="divide-y divide-gray-200 overflow-hidden bg-secondary shadow-soft-lg rounded-lg hover:cursor-default"
    >
      <div className='px-4 py-5 sm:px-6'>{date}</div>
      <div className='px-4 py-5 sm:p-6 hover:cursor-pointer hover:bg-gray-700'>{entry.analysis?.summary || 'summary'}</div>
      <div className='px-4 py-5 sm:px-6'>{entry.analysis?.mood || 'mood'}</div>
      </div>)
}
export default EntryCard
