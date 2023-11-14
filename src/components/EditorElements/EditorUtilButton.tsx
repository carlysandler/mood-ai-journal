import React from 'react'
import cn from '@/utils/cn'
interface UtilButtonProps {
  children: React.ReactNode
  className?: string
  [key: string]: any
}

const EditorUtilButton: React.FC<UtilButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-md bg-white px-3 py-1 hover:bg-gray-100 disabled:pointer-events-none disabled:text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default EditorUtilButton
