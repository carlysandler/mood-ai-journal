import React from 'react'
import cn from '@/utils/cn'
interface UtilButtonProps {
  contentEditable: boolean
  title: string
  onClick: () => void
  disabled?: boolean
  tabIndex: number
  children: React.ReactNode
  className?: string
}

const EditorUtilButton: React.FC<UtilButtonProps> = ({
  contentEditable,
  title,
  onClick,
  disabled,
  tabIndex,
  children,
  className,
}) => {
  return (
    <button
      contentEditable={contentEditable}
      title={title}
      onClick={onClick}
      disabled={disabled}
      tabIndex={tabIndex}
      className={cn(
        'rounded-md bg-white px-3 py-1 hover:bg-gray-100 disabled:pointer-events-none disabled:text-gray-300',
        className
      )}
    >
      {children}
    </button>
  )
}

export default EditorUtilButton
