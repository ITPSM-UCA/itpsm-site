import React, { useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import MENU from 'dummy-data/menu'

import SideMenu from './SideMenu/SideMenu'
import ResponsiveSideMenu from './SideMenu/ResponsiveSideMenu'

interface Props {
  children: any
}

const Layout : React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <ResponsiveSideMenu
        menu={MENU}
        showSidebar={sidebarOpen}
        setShowSidebar={setSidebarOpen}
      />
      <SideMenu menu={MENU} />

      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <AiOutlineMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
