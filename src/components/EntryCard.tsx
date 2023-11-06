import { JournalEntry } from '@/types'
import { FunctionComponent } from 'react'

interface EntryCardProps {
  entry: JournalEntry
}

const EntryCard: FunctionComponent<EntryCardProps> = ({ entry }) => {
  return <div>{entry.id}</div>
}
export default EntryCard
