'use client'
import { ReactNode, useEffect, useState, useRef } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import cn from '@/utils/cn'
import _ from 'lodash'
import { useResponsiveness } from '@/hooks/responsiveness'
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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMediumScreen, setIsMediumScreen] = useState(false)

  useEffect(() => {
    const handleResize = _.debounce(() => {
      if (dashboardContainerRef.current) {
        const containerWidth = dashboardContainerRef.current.offsetWidth
        setSidebarOpen(!['sm', 'xs'].includes(getContainerSize(containerWidth)))
        setIsMediumScreen(getContainerSize(containerWidth) === 'md')
      }
    }, 500)

    window.addEventListener('reize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [getContainerSize])

  return (
    <div
      ref={dashboardContainerRef}
      className='h-screen w-screen flex bg-inherit'
    >
      {/* Sidebar Section */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 transform bg-inherit border-r border-theme overflow-auto transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className=''
        ></button>
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
      <div className='ml-64 h-full'>
        <header className='h-[60px] border-b border-theme'>
          <div className='h-full w-full px-6 flex items-center justify-end'>
            <UserButton />
          </div>
        </header>
        <div className='h-[calc(100vh-60px)] p-0 m-0 text-start'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
