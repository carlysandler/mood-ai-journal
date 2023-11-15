import { LinkElementType } from '@/types/slate'
import { RenderElementProps } from 'slate-react'

const LinkElement = (props: RenderElementProps) => {
  return (
    <a
      href={(props.element as unknown as LinkElementType).url}
      {...props.attributes}
    >
      {props.children}
    </a>
  )
}

export default LinkElement
