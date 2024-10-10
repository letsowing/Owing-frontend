import React, { useEffect, useState } from 'react'

import Header from '@/components/common/Header'
import MenuTab from '@/components/menuTab/MenuTab'
import { Outlet, useLocation } from 'react-router-dom'

const HeaderTabLayout: React.FC = () => {
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [tabWidth, setTabWidth] = useState(256) // 기본 탭 너비
  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' ||
    location.pathname === '/main' ||
    location.pathname === '/contactUs'

  useEffect(() => {
    setTabWidth(isTabOpen ? 256 : 41)
  }, [isTabOpen])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

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
