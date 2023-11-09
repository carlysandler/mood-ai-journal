import { Editor } from '@/components'
import { getUserByClerkId, prisma } from '@/utils'
interface Params {
  id: string
}

//editor expecting an entry so we will fetch it using this server component
const getEntry = async (id:string) => {
  const user = await getUserByClerkId()
  const entry = await prisma.journalEntry.findUnique({
    where: {
      // virtual field for querying compound index
      userId_id: {
        userId: user.id,
        id
      }
    }

  })
  return entry
}

// You can pass props to a client component from a server component as long as they are serializable
// bc its coming from the db and its safe and crosses the internet (already serializable)
// CARLY TO DO: research the technical implications of this
const EntryPage = async ({ params }: { params: Params }) => {
  const entry = await getEntry(params.id)
  return <div className='h-full w-full'><Editor entry={entry!} /></div>
} 

export default EntryPage