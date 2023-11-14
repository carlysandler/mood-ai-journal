import {
  CustomMarkupStrings,
  CustomMarkup,
  MarkupMetadata,
} from '@/types/slate'

type MarkupMap = Record<CustomMarkupStrings, MarkupMetadata>

const MARKUPS: MarkupMap = {
  bold: {
    key: ['ctrl', 'b'],
    symbol: 'B',
    className: 'font-bold',
  },
  italic: {
    key: ['ctrl', 'i'],
    symbol: <span className='italic'>I</span>,
    className: 'italic',
  },
  underline: {
    key: ['ctrl', 'u'],
    symbol: <span className='underline'>U</span>,
    className: 'underline',
  },
  strikethrough: {
    key: ['ctrl', 's'],
    symbol: <span className='line-through'>S</span>,
    className: 'line-through',
  },
  codesnippet: {
    key: ['ctrl', '`'],
    symbol: <span className='font-mono text-sm'>&lt;&gt;</span>,
    className:
      'font-mono text-red-500 text-sm, py-1 px-1.5 mx-0.5 bg-gray-100 rounded',
  },
}

export default MARKUPS
