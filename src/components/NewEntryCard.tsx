'use client'
import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  // an array of routes derived from the browser. just a stack
  const router = useRouter()

  const handleOnClick = async () => {
    console.log('are we clicking')
    const res = await createNewEntry()
    console.log('res', res)
    router.push(`/journal/${res.id}`)
  }
  return (
    <div className='cursor-pointer overflow-hidden rounded-lg card  bg-secondary'>
      <div className='p-4 sm:p-6 text-center' onClick={handleOnClick}>
        <span className='text-3xl text-secondary'>New Entry</span>
      </div>
    </div>
  )
}
export default NewEntryCard
