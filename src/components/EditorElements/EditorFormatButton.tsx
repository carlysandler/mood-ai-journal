import React, { MouseEvent as ReactMouseEvent } from 'react'
import { ReactEditor, useSlateStatic } from 'slate-react'
import cn from '@/utils/cn'
import ELEMENT_TAGS from './index'
import MARKUPS from '../Markups'
import EditorUtilButton from './EditorUtilButton'
import { CustomElementStrings, CustomMarkupStrings } from '@/types/slate'
import {
  toggleCurrentBlock,
  toggleMarkup,
  isBlockActive,
  isMarkupActive,
} from '@/utils/editor'

interface FormatButtonProps {
  symbol: string | React.JSX.Element
  element?: CustomElementStrings
  markup?: CustomMarkupStrings
}

const EditorFormatButton = ({ symbol, element, markup }: FormatButtonProps) => {
  const editor = useSlateStatic()

  // Helper function to handle mouse down event
  const handleMouseDown = (e: ReactMouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // prevent deault to avoid losing focus on the editor
    if (element) {
      toggleCurrentBlock(editor, element)
      const afterClick = ELEMENT_TAGS[element].afterClick
      if (afterClick) {
        afterClick(editor)
      }
    } else if (markup) {
      toggleMarkup(editor, markup)
    }
    ReactEditor.focus(editor) // refocus the editor after toggling format
  }

  const isActive = element
    ? isBlockActive(editor, element)
    : isMarkupActive(editor, markup!)

  const title = element
    ? ELEMENT_TAGS[element].key.join(' + ').toUpperCase()
    : markup
    ? MARKUPS[markup].key.join(' + ').toUpperCase()
    : ''
  const disablePointerEvents =
    element === 'paragraph' && isBlockActive(editor, 'paragraph')

  return (
    <EditorUtilButton
      title={title}
      className={cn(
        isActive ? 'text-blue-600 font-bold' : '',
        disablePointerEvents && 'pointer-events-none'
      )}
      onMouseDown={handleMouseDown}
    >
      {symbol}
    </EditorUtilButton>
  )
}

export default EditorFormatButton
