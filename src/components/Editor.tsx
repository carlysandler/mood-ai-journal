'use client'

import { JournalEntry } from '@/types'
import { updatedEntry } from '@/utils/api'
import { useState, useMemo, useCallback } from 'react'
import { useAutosave } from 'react-autosave'

// Import the Slate editor factory.
import { createEditor, Node } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
// TypeScript users only add this code
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [editor] = useState(() => withReact(createEditor()))
  const [value, setValue] = useState(entry.content)
  const [isSaving, setisSaving] = useState(false)
  const [localAnalysis, setLocalAnalysis] = useState(entry.analysis)

  const initialValue: Descendant[] = useMemo(() => {
    return value
      ? [{ type: 'paragraph', children: [{ text: value }] }]
      : [{ type: 'paragraph', children: [{ text: '' }] }]
  }, [value])

  let mood,
    summary,
    color,
    subject = ''
  let negative = false

  if (localAnalysis) {
    ;({ mood, summary, color, subject, negative } = localAnalysis)
  }
  const analysisData = [
    { name: 'Summary', value: summary || '' },
    { name: 'Subject', value: subject || '' },
    { name: 'Mood', value: mood || '' },
    { name: 'Negative', value: negative ? 'True' : 'False' },
  ]

  useAutosave({
    interval: 1900,
    data: value, //watching
    // _value and value are the same but we use _value bc how react handlings rendering and batching
    // _value guarantees this is the latest version of the content value
    onSave: async (_value) => {
      if (_value === entry.content) return
      setisSaving(true)
      const data = await updatedEntry(entry.id, {
        content: _value,
      })
      setLocalAnalysis(data.analysis)
      setisSaving(false)
    },
  })
  return (
    <div className='w-full h-full grid grid-cols-3'>
      <div className='col-span-2'>
        {isSaving && <div>...loading</div>}
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(val: Descendant[]) => setValue(val)}
        >
          <Editable // Define a new handler which prints the key that was pressed.
            onKeyDown={(event) => {
              if (event.key === '&') {
                // Prevent the ampersand character from being inserted.
                event.preventDefault()
                // Execute the `insertText` method when the event occurs.
                editor.insertText('and')
              }
            }}
          />
        </Slate>
        {/* <textarea
          className='w-full h-full p-8 text-xl outline-none bg-primary'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        /> */}
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

export default Editor
