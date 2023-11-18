import { useCallback } from 'react'

export const tailwindBreakpoints = {
  xs: 475, // Our defined xs breakpoint
  sm: 640, // Tailwind's 'sm' breakpoint
  md: 768, // Tailwind's 'md' breakpoint
  lg: 1024, // Tailwind's 'lg' breakpoint
  xl: 1280, // Tailwind's 'xl' breakpoint
}
export const useResponsiveness = () => {
  const getContainerSize = useCallback((width: number) => {
    if (width >= tailwindBreakpoints.lg) {
      return 'lg'
    } else if (width >= tailwindBreakpoints.md) {
      return 'md'
    } else if (width >= tailwindBreakpoints.sm) {
      return 'sm'
    } else {
      return 'xs'
    }
  }, [])

  const smOrXsContainerSize = useCallback((size: string) => {
    return size === 'sm' || size === 'xs'
  }, [])

  const scrollToBottom = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollTop = element.scrollHeight
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    getContainerSize,
    scrollToBottom,
    smOrXsContainerSize,
  }
}
