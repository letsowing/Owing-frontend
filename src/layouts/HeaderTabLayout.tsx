import React from 'react'

import Header from '@components/common/Header'
import MenuTab from '@components/menuTab/MenuTab'

import { useMenuTab } from '@hooks/useMenuTab'

import { Outlet, useLocation } from 'react-router-dom'

const HeaderTabLayout: React.FC = () => {
  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' ||
    location.pathname === '/main' ||
    location.pathname === '/contactUs' ||
    location.pathname === '/login'

  const { isTabOpen, tabWidth, toggleTab } = useMenuTab({
    isNotTabPage,
  })

  return (
    <div className="flex h-screen">
      {!isNotTabPage && (
        <MenuTab
          style={{ width: `${tabWidth}px` }}
          isTabOpen={isTabOpen}
          onToggle={toggleTab}
        />
      )}
      <div className="flex w-full flex-1 flex-col dark:bg-verydarkblack dark:text-coldbeige">
        <div className="sticky top-0 z-10">
          <Header isTabOpen={isTabOpen} />
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default HeaderTabLayout
