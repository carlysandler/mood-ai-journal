import { Editor, Transforms, Text, Element as SlateElement } from 'slate'
import {
  CustomElementStrings,
  CustomMarkupStrings,
  CustomElementType,
} from '@/types/slate'
import ELEMENT_TAGS from '@/components/EditorElements'

// Block Elements
export const isBlockActive = (
  editor: Editor,
  type: CustomElementStrings
): boolean => {
  if (!editor.selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection),
      // Ensure that the matched node is an Element and matches the specified type
      match: (n) =>
        SlateElement.isElement(n) && (n as CustomElementType).type === type,
    })
  )

  return !!match
}

export const toggleCurrentBlock = (
  editor: Editor,
  type: CustomElementStrings
) => {
  // Only proceed if the type is a valid block type for the editor
  if (!type || !Object.keys(ELEMENT_TAGS).includes(type)) {
    return
  }
  // Set nodes in the editor based on whether the specified block type is active
  Transforms.setNodes(
    editor,
    { type: isBlockActive(editor, type) ? undefined : type },
    {
      at: editor.selection || undefined,
      match: (n) => SlateElement.isElement(n),
      mode: 'highest',
    } // apply only to blocks
  )
}

// Inline Markup Styles
export const isMarkupActive = (editor: Editor, type: CustomMarkupStrings) => {
  const marks = Editor.marks(editor)
  return marks ? marks[type] === true : false
}

export const toggleMarkup = (editor: Editor, type: CustomMarkupStrings) => {
  // Toggle the specified mark on the selected text in the editor
  Transforms.setNodes(
    editor,
    { [type]: isMarkupActive(editor, type) ? false : true }, // If mark is active, remove it, otherwise add it
    { match: (n: any) => Text.isText(n), split: true } // Apply only to text nodes and split if necessary
  )
}
