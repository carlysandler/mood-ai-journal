import { ImageElementType } from '@/types/slate'
import {
  RenderElementProps,
  useSelected,
  useFocused,
  ReactEditor,
  useSlateStatic,
} from 'slate-react'
import Image from 'next/image'
import { Transforms } from 'slate'

const ImageElement = (props: RenderElementProps) => {
  const selected = useSelected()
  const focused = useFocused()
  const editor = useSlateStatic()
  const path = ReactEditor.findPath(editor, props.element)

  return (
    <div
      {...props.attributes}
      className='group relative flex max-w-lg flex-col'
    >
      {props.children}
      <Image
        src={(props.element as unknown as ImageElementType).url}
        alt='uploaded image'
        className={`transition duration-150 ease-in-out ${
          selected && focused ? 'group-hover:bg-sky-500' : ''
        }`}
      />
      <button
        onClick={() => Transforms.removeNodes(editor, { at: path })}
        className='absolute top-3 left-3 z-50 hidden text-sm group-hover:block'
      >
        DELETE
      </button>
    </div>
  )
}

export default ImageElement
