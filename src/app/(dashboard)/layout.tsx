'use client'
import { ReactNode, useReducer } from 'react'
import { UserButton } from '@clerk/nextjs'
interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-screen w-screen relative bg-inherit">
      {/* Sidebar Section */}
      <aside className="absolute top-0 left-0 w-64 border-r border-theme h-full overflow-auto">
        Hello
        {/** Sidebar content*/}
        <nav></nav>
      </aside>
      <div className="ml-64 h-full">
        <header className="h-[60px] border-b border-theme">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)] p-0 m-0 text-start">{children}</div>
      </div>
    </div>
  )
}

export default DashboardLayout
