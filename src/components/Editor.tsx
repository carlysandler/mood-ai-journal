'use client'

import { JournalEntry } from '@/types'
import { updatedEntry } from '@/utils/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
const Editor = ({ entry }: {entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isSaving, setisSaving] = useState(false)

  useAutosave({
    interval: 1900,
    data: value, //watching
    // _value and value are the same but we use _value bc how react handlings rendering and batching
    // _value guarantees this is the latest version of the content value
    onSave: async (_value) => {
      if (_value === entry.content) return
      setisSaving(true)
      console.log('...value?', _value)
      const updated = await updatedEntry(entry.id, { content: _value })
      console.log('updated?', updated)
      setisSaving(false)
    }

  })
  return (
    <div className='w-full h-full'>
      { isSaving && <div>...loading</div>}
      <textarea className='w-full h-full p-8 text-xl outline-none bg-primary' value={value} onChange={e => setValue(e.target.value) } />
      </div>
  )
}

export default Editor