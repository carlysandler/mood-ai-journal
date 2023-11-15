import { useRef, useEffect, useState } from 'react'
import { Editor, Range } from 'slate'
import { useFocused, useSlate, useSlateSelection } from 'slate-react'
import cn from '@/utils/cn'
import { CustomElementStrings, CustomMarkupStrings } from '@/types/slate'
import ELEMENT_TAGS from './index'
import MARKUPS from '../Markups'
import EditorFormatButton from './EditorFormatButton'

interface ToolbarState {
  isShown: boolean
  setShowToolbar: (shown: boolean) => void
}
const EditorFormatToolbar = () => {
  const [showToolbar, setShowToolbar] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const editor = useSlate()
  const selection = useSlateSelection()
  const isFocused = useFocused()

  useEffect(() => {
    const toolbar = toolbarRef.current
    if (!toolbar) return

    if (
      !selection ||
      !isFocused ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setShowToolbar(false)
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection) {
      setShowToolbar(false)
      return
    }

    const domRange = domSelection.getRangeAt(0)
    const clientRect = domRange.getClientRects()
    if (!clientRect[0]) return

    toolbar.style.top = `${Math.max(
      10,
      clientRect[0].top + window.pageYOffset - 48
    )}px`
    toolbar.style.left = `${Math.max(
      96,
      clientRect[0].top + window.scrollX - 96
    )}px`
    setShowToolbar(true)
  }, [editor, selection, isFocused, setShowToolbar])

  return (
    <aside
      ref={toolbarRef}
      className={cn(
        'absolute z-50 flex items-center space-x-1 rounded-lg border border-theme bg-primary px-3 py-1 shadow-[0_0_30px_0px_rgba(0,0,0,0.3)] transition-opacity duration-300',
        showToolbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onMouseDown={(e) => e.preventDefault()}
    >
      {Object.entries(MARKUPS).map(([key, val]) => {
        return (
          <EditorFormatButton
            key={key}
            symbol={val.symbol}
            markup={key as CustomMarkupStrings}
          />
        )
      })}
      {Object.entries(ELEMENT_TAGS)
        .filter(([key]) => key !== 'paragraph')
        .map(([key, val]) => {
          return (
            <EditorFormatButton
              key={key}
              symbol={val.symbol}
              element={key as CustomElementStrings}
            />
          )
        })}
    </aside>
  )
}

export default EditorFormatToolbar
