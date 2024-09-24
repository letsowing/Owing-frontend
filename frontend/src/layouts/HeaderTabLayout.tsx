import React, { useEffect, useState } from 'react'

import Header from '@/components/common/Header'
import MenuTab from '@/components/menuTab/MenuTab'
import { Outlet, useLocation } from 'react-router-dom'

const HeaderTabLayout: React.FC = () => {
  const [isTabOpen, setIsTabOpen] = useState(true)
  const [tabWidth, setTabWidth] = useState(256) // 기본 탭 너비
  const location = useLocation()
  const isMainPage = location.pathname === '/'

  useEffect(() => {
    setTabWidth(isTabOpen ? 256 : 41)
  }, [isTabOpen])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

  return (
    <div className="flex h-screen">
      {!isMainPage && (
        <MenuTab
          style={{ width: `${tabWidth}px` }}
          isTabOpen={isTabOpen}
          onToggle={toggleTab}
        />
      )}
      <div
        className="flex flex-1 flex-col"
        style={{ width: `calc(100% - ${isMainPage ? 0 : tabWidth}px)` }}
      >
        <Header isTabOpen={isTabOpen} />
        <main className={`flex-1 overflow-auto ${isMainPage ? 'p-0' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default HeaderTabLayout
