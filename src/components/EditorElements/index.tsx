import CodeElement from './CodeElement'
import HeadingElement from './HeadingElement'
import LinkElement from './LinkElement'
import QuoteElement from './QuoteElement'
import ImageElement from './ImageElement'
import DividerElement from './DividerElement'
import TodoElement from './TodoElement'

import { Editor, Transforms } from 'slate'
import { CustomElementStrings } from '@/types/slate'
import { DefaultElement, RenderElementProps } from 'slate-react'

type ElementMetaData = {
  key: string[]
  symbol: string | JSX.Element
  afterClick?: (editor: Editor) => void
  component: (x: RenderElementProps) => React.JSX.Element
}

type ElementMap = Record<CustomElementStrings, ElementMetaData>

const ELEMENT_TAGS: ElementMap = {
  paragraph: {
    key: ['ctrl', 't'],
    symbol: 'p',
    component: DefaultElement,
  },

  h1: {
    key: ['ctrl', '1'],
    symbol: 'H1',
    component: (props: RenderElementProps) => (
      <HeadingElement headingLevel={1} {...props} />
    ),
  },
  h2: {
    key: ['ctrl', '2'],
    symbol: 'H2',
    component: (props: RenderElementProps) => (
      <HeadingElement headingLevel={2} {...props} />
    ),
  },
  h3: {
    key: ['ctrl', '3'],
    symbol: 'H3',
    component: (props: RenderElementProps) => (
      <HeadingElement headingLevel={3} {...props} />
    ),
  },
  link: {
    key: ['ctrl', 'l'],
    symbol: '',
    component: LinkElement,
  },
  image: {
    key: ['ctrl', 'i'],
    symbol: '<img>',
    component: ImageElement,
  },
  'list-item': {
    key: [],
    symbol: '',
    component: DefaultElement,
  },
  'bulleted-list': {
    key: [],
    symbol: '',
    component: DefaultElement,
  },
  'numbered-list': {
    key: [],
    symbol: '',
    component: DefaultElement,
  },
  quote: {
    key: [],
    symbol: '',
    component: QuoteElement,
  },
  code: {
    key: ['ctrl', '/'],
    symbol: <span className='font-mono text-sm'>&lt;/&gt;</span>,
    component: CodeElement,
  },
  divider: {
    key: ['ctrl', 'd'],
    symbol: '-',
    afterClick: (editor: Editor) => {
      if (!editor.selection) return
      const currSelection = Editor.unhangRange(editor, editor.selection)
      Transforms.select(editor, {
        path: [currSelection.anchor.path[0] + 1, 0],
        offset: 0,
      })
    },
    component: DividerElement,
  },
  todo: {
    key: ['ctrl', 't'],
    symbol: '☑',
    component: TodoElement,
  },
}

export default ELEMENT_TAGS
