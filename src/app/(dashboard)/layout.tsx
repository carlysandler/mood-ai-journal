'use client'
import { ReactNode } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
interface DashboardLayoutProps {
  children: ReactNode
}

const links = [
  { name: 'Journals', href: '/journal' },
  { name: 'Home', href: '/' },
]

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='h-screen w-screen relative bg-inherit'>
      {/* Sidebar Section */}
      <aside className='absolute top-0 left-0 w-64 border-r border-theme h-full overflow-auto'>
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
