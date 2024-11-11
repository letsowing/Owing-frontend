import React from 'react'

import Header from '@components/common/Header'
import MenuTab from '@components/menuTab/MenuTab'

import { useMenuTab } from '@hooks/useMenuTab'

import { Outlet, useLocation } from 'react-router-dom'

const HeaderTabLayout: React.FC = () => {
  const { isTabOpen, tabWidth, toggleTab } = useMenuTab()

  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' ||
    location.pathname === '/main' ||
    location.pathname === '/contactUs' ||
    location.pathname === '/login'

  return (
    <div className="flex h-screen">
      {!isNotTabPage && (
        <MenuTab
          style={{ width: `${tabWidth}px` }}
          isTabOpen={isTabOpen}
          onToggle={toggleTab}
        />
      )}
      <div className="flex w-full flex-1 flex-col dark:bg-darkblack dark:text-coldbeige">
        <Header isTabOpen={isTabOpen} />
        <Outlet />
      </div>
    </div>
  )
}

export default HeaderTabLayout
