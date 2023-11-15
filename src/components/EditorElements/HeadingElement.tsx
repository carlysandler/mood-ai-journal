import { RenderElementProps } from 'slate-react'
import cn from '@/utils/cn'

const HeadingElement = (
  props: RenderElementProps & { headingLevel: 1 | 2 | 3; className?: string }
) => {
  const CustomTag = `h${props.headingLevel}` as 'h1' | 'h2' | 'h3'
  const stylesByHeadingLevel = {
    1: 'text-3xl !mt6',
    2: 'text-2xl !mt5',
    3: 'text-xl !mt4',
  }
  return (
    <div
      className={cn(
        'font-bold',
        stylesByHeadingLevel[props.headingLevel],
        props.className
      )}
    >
      <CustomTag>{props.children}</CustomTag>
    </div>
  )
}

export default HeadingElement
