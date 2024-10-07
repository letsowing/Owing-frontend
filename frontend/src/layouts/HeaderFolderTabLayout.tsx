import React, { useEffect, useState } from 'react'

import useFolderStore from '@stores/folderStore'

import Header from '@/components/common/Header'
import FolderTab from '@/components/folderTab/FolderTab'
import MenuTab from '@/components/menuTab/MenuTab'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet, useLocation } from 'react-router-dom'

const HeaderFolderTabLayout: React.FC = () => {
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [tabWidth, setTabWidth] = useState(256) // 기본 탭 너비

  const [isFolderTabOpen, setIsFolderTabOpen] = useState(false) // FolderTab 열림 상태
  const { setSelectedFolderId } = useFolderStore() // zustand의 setSelectedFolderId 함수 사용

  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' || location.pathname === '/main'

  useEffect(() => {
    setTabWidth(isTabOpen ? 256 : 41) // MenuTab이 열릴 때와 닫힐 때 너비 설정
  }, [isTabOpen])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

  const handleMenuItemClick = () => {
    setIsFolderTabOpen(true) // MenuTab에서 항목 클릭 시 FolderTab 열기
  }

  const handleCloseFolderTab = () => {
    setIsFolderTabOpen(false) // FolderTab 닫기
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        {!isNotTabPage && (
          <MenuTab
            style={{ width: `${tabWidth}px` }}
            isTabOpen={isTabOpen}
            onToggle={toggleTab}
            onItemClick={handleMenuItemClick}
          />
        )}

        <div className="flex h-full w-full flex-row">
          <FolderTab
            isOpen={isFolderTabOpen} // FolderTab 열림 상태
            onClose={handleCloseFolderTab} // FolderTab 닫기 핸들러
            setSelectedFolderId={setSelectedFolderId} // FolderTab에서 선택된 폴더 ID 설정
          />
          <main className="h-full w-full dark:bg-darkblack">
            <Header isTabOpen={isTabOpen} />
            <Outlet />
          </main>
        </div>
      </div>
    </DndProvider>
  )
}

export default HeaderFolderTabLayout
