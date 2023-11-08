'use client'
import { useState } from 'react'
import { FunctionComponent } from 'react'

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  const [isMenuOpen, setIsMenuOption] = useState(false)

  return (
    <div>
      {/** Mobile */}
      <div className="sm:hidden flex items-center">menuuuu</div>
    </div>
  )
}
export default Sidebar
