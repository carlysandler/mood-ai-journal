import { Editor, Transforms } from 'slate'
import { ReactEditor, RenderElementProps, useSlate } from 'slate-react'
import EditorUtilButton from './EditorUtilButton'

const ElementWrapper = ({ element, children }: RenderElementProps) => {
  const editor = useSlate()
  // Function to add a new element below the current one
  const addElementBelow = () => {
    // Find the path of the current element
    const path = ReactEditor.findPath(editor, element)
    console.log('shape of path', path)
    // insert a new new after the current node
    Transforms.insertNodes(
      editor,
      { type: 'paragraph', children: [{ text: '' }] },
      { at: [path[0] + 1] }
    )
    // focus the editor
    ReactEditor.focus(editor)
    // Set the selection to the new node
    Transforms.select(editor, {
      path: [path[0] + 1],
      offset: 0,
    })
  }

  // Function to focus on the current element
  const focusCurrentElement = () => {
    // find path of current element
    const path = ReactEditor.findPath(editor, element)
    // Set the selection start to the beginning of the element
    // Set the selection end to the end of the element
    Transforms.select(editor, {
      anchor: Editor.start(editor, path),
      focus: Editor.end(editor, path),
    })
    ReactEditor.focus(editor)
  }

  return (
    <div className='group relative pl-12'>
      {children}
      <div className='absolute -left-6 -top-1 inline scale-75 !select-none opacity-0 transition group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100'>
        <EditorUtilButton
          contentEditable={false}
          title='Click to add element below'
          onClick={addElementBelow}
          tabIndex={-1}
        >
          <p
            className='before:content-[attr(data-content)]'
            data-content='+'
          ></p>
        </EditorUtilButton>
        <EditorUtilButton
          contentEditable={false}
          title='Click to add element below'
          onClick={focusCurrentElement}
          tabIndex={-1}
          disabled={Editor.isVoid(editor, element)}
        >
          <p
            className='before:content-[attr(data-content)]'
            data-content='...'
          ></p>
        </EditorUtilButton>
      </div>
    </div>
  )
}

export default ElementWrapper
