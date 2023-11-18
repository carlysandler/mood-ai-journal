'use client'
import { ReactNode, useEffect, useState, useRef } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import cn from '@/utils/cn'
import _ from 'lodash'
import { useResponsiveness } from '@/hooks/responsiveness'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid'
interface DashboardLayoutProps {
  children: ReactNode
}

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'Home', href: '/' },
]

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { getContainerSize } = useResponsiveness()
  const dashboardContainerRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMediumScreen, setIsMediumScreen] = useState(false)
  const [isSmallOrXsScreen, setIsSmallOrXsScreen] = useState(false)
  const [buttonLeft, setButtonLeft] = useState<string>('0px')
  const [showLeftIcon, setShowLeftIcon] = useState(false)

  // Function to toggle sidebar and delay icon change
  const toggleSidebar = (state: boolean) => {
    setShowLeftIcon((prevState) => !prevState)
    setTimeout(() => {
      setSidebarOpen(state)
    }, 100)
  }

  // UseEffect for resize observer
  useEffect(() => {
    const handleResize = _.debounce(() => {
      if (dashboardContainerRef.current) {
        const containerWidth = dashboardContainerRef.current.offsetWidth
        const containerSize = getContainerSize(containerWidth)
        const isSmOrXs = ['sm', 'xs'].includes(containerSize)
        setIsSmallOrXsScreen(isSmOrXs)
        toggleSidebar(!isSmOrXs)
        setIsMediumScreen(containerSize === 'md')
      }
    }, 300)
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
      handleResize.cancel()
    }
  }, [getContainerSize])

  // UseEffect for button positioning
  useEffect(() => {
    // Delay the measurement to ensure the sidebar has finished transitioning
    const timeoutId = setTimeout(() => {
      if (sidebarRef.current) {
        const sidebarWidth = sidebarRef.current.offsetWidth
        setButtonLeft(sidebarOpen ? `${sidebarWidth}px` : '0px')
      }
    }, 200) // Assuming the sidebar transition duration is 300ms

    return () => clearTimeout(timeoutId)
  }, [sidebarOpen, isMediumScreen])
  return (
    <div
      ref={dashboardContainerRef}
      className='h-full w-full flex relative z-0 overflow-hidden bg-inherit'
    >
      {/* Sidebar Section */}
      <aside
        ref={sidebarRef}
        className={cn(
          'flex-shrink-0 overflow-x-hidden inset-y-0 left-0 z-30 transform bg-inherit border-r border-theme transition-width transition-transform duration-300 ease-in-out',
          sidebarOpen
            ? isMediumScreen
              ? 'w-32 ease-in'
              : 'w-64 ease-out'
            : '-translate-x-full border-none w-0'
        )}
      >
        <div className='px-4 my-4'>
          <span className='text-3xl'>MOOD</span>
        </div>
        {/** Sidebar content*/}
        <nav className='m-0 p-0'>
          <ul className='px-4'>
            {links.map((link) => (
              <li key={link.name} className='text-xl my-4'>
                <Link href={link.href}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content Section */}

      <div className='flex h-full max-w-full flex-1 flex-col overflow-hidden'>
        <main className='h-full w-full flex-1 overflow-auto transition-width'>
          <div className='group relative'>
            {!isSmallOrXsScreen && (
              <div
                className={cn(
                  'fixed top-1/2 z-40 -translate-y-1/2 p-2 shadow-lg rounded-lg bg-slate-700 focus:outline-none focus:ring transform flex items-center justify-center hover:bg-blue-700 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out',
                  sidebarOpen
                    ? `translate-x-[calc(100%-4rem)]`
                    : 'translate-x-[2px]'
                )}
                style={{
                  left: buttonLeft,
                }}
              >
                {/* Sidebar Toggle Button */}
                <button
                  style={{
                    transition: 'left 0.3 ease, transform 0.3 ease',
                  }}
                  onClick={() => toggleSidebar(!sidebarOpen)}
                >
                  <span
                    style={{
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    {showLeftIcon ? (
                      <ChevronDoubleLeftIcon className='h-4 w-4' />
                    ) : (
                      <ChevronDoubleRightIcon className='h-4 w-4' />
                    )}
                  </span>
                </button>
                {/* Tooltip */}
                <span className='absolute text-sm text-center left-full ml-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-md broder-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
                  {sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
                </span>
              </div>
            )}
          </div>
          {/* Header */}
          <header className='h-[60px] border-b border-theme flex items-center justify-between px-6 w-full'>
            {isSmallOrXsScreen && (
              <button onClick={() => toggleSidebar(!sidebarOpen)}>
                <Bars3Icon className='h-6 w-6' />
              </button>
            )}
            <div className='flex-1 flex items-center justify-end'>
              <UserButton />
            </div>
          </header>
          <div className='h-[calc(100vh-60px)] p-0 m-0 text-start -z-40 flex-1 overflow-auto'>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
