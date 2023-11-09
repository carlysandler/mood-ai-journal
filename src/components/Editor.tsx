'use client'

import { JournalEntry } from '@/types'
import { useState } from 'react'

const Editor = ({ entry }: {entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  return (
    <div className='w-full h-full'>
      <textarea className='w-full h-full p-8 text-xl outline-none bg-primary' value={value} onChange={e => setValue(e.target.value) } />
      </div>
  )
}

export default Editor