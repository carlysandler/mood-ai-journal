import { Editor, Transforms, Text } from 'slate'
import {
  CustomElementStrings,
  CustomMarkupStrings,
  CustomElementType,
} from '@/types/slate'
import ELEMENT_TAGS from '@/components/EditorElements'

// Block Elements

export const isBlockActive = (editor: Editor, type: CustomElementStrings) => {
  console.log('shape of editor', editor)
  if (!editor.selection) return false
  // Find nodes in the editor that match the specified type
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, editor.selection), // Specify the range as the current selection
      // Match function to determine if the node is of the specified block type
      match: (n: any) => {
        // First, ensure that the node is a element and not a Text node or the Editor itself
        if (!Editor.isBlock(editor, n)) return false
        // safetly typecase the node to the CustomElement type
        const element = n as CustomElementType

        return element.type === type
      },
    })
  )

  // Return true if there is a match, false othere towise
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
    { match: (n: any) => Editor.isBlock(editor, n) } // apply only to blocks
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
