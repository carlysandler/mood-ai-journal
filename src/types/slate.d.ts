import {
  BaseEditor,
  Descendant,
  Text,
  Editor,
  createEditor,
  Node,
  Range,
  Point,
  Transforms,
} from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'
/** slate editor */

// TypeScript users only add this code

export type ParagraphElementType = {
  type: 'paragraph'
  children: Descendant[]
}

export type H1ElementType = {
  type: 'h1'
  children: Descendant[]
}

export type H2ElementType = {
  type: 'h2'
  children: Descendant[]
}

export type H3ElementType = {
  type: 'h3'
  children: Descendant[]
}

export type CodeElementType = {
  type: 'code'
  children: Descendant[]
}

export type QuoteElementType = {
  type: 'quote'
  children: Descendant[]
}

export type DividerElementType = {
  type: 'divider'
  children: Descendant[]
}

export type TodoElementType = {
  type: 'todo'
  children: Descendant[]
}

export type ImageElementType = {
  type: 'image'
  url: string
  children: Descendant[]
}

export type LinkElementType = {
  type: 'link'
  url: string
  children: Descendant[]
}

export type BulletListElementType = {
  type: 'bulleted-list'
  children: Descendant[]
}

export type NumberedListElementType = {
  type: 'numbered-list'
  children: Descendant[]
}

export type ListItemElementType = {
  type: 'list-item'
  children: Descendant[]
}

export type CustomElementType =
  | ParagraphElementType
  | H1ElementType
  | H2ElementType
  | H3ElementType
  | LinkElementType
  | ImageElementType
  | ListItemElementType
  | BulletListElementType
  | NumberedListElementType
  | CodeElementType
  | QuoteElementType
  | DividerElementType
  | TodoElementType

export type CustomElementStrings = CustomElementType['type']

export type CustomMarkup = {
  bold: boolean
  italic: boolean
  underline: boolean
  strikethrough: boolean
  codesnippet: boolean
}

export type CustomMarkupStrings = keyof CustomMarkup

export type CustomText = Partial<CustomMarkup> & {
  text: string
  placeholder?: boolean
}
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElementType
    Text: CustomText
  }
  export interface BaseElement {
    type: CustomElementStrings
  }
}

export type MarkupMetadata = {
  key: string[]
  symbol: string | React.JSX.Element
  className: string
}
