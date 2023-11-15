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
        'rounded-md bg-primary px-3 py-1 hover:bg-gray-500 disabled:pointer-events-none disabled:text-gray-600',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default EditorUtilButton
