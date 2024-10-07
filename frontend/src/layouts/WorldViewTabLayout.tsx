import { useEffect, useState } from 'react'

import Header from '@/components/common/Header'
import MenuTab from '@/components/menuTab/MenuTab'
import WorldViewTab from '@/components/worldView/WorldViewTab'
import useFolderStore from '@/stores/folderStore'
import useMenuStore from '@/stores/menuStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet, useLocation } from 'react-router-dom'

export default function WorldViewTabLayout() {
  const { activePath } = useMenuStore()
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [tabWidth, setTabWidth] = useState(256)

  const [isFolderTabOpen, setIsFolderTabOpen] = useState(false)
  const { setSelectedFolderId } = useFolderStore()

  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' || location.pathname === '/main'

  useEffect(() => {
    if (activePath === 'worldView' && isTabOpen) {
      setIsFolderTabOpen(true)
    } else {
      setIsFolderTabOpen(false)
    }

    setTabWidth(isTabOpen ? 256 : 41) // MenuTab이 열릴 때와 닫힐 때 너비 설정
  }, [isTabOpen, activePath])

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

        {/* '/worldView' 페이지에서만 나올 수 있도록... */}
        {location.pathname === '/worldView' && (
          <div className="flex h-full w-full flex-row">
            {/* <DndProvider backend={HTML5Backend}> */}
            <WorldViewTab
              isTabOpen={isFolderTabOpen}
              tabHandler={handleCloseFolderTab}
              setSelectedFolderId={setSelectedFolderId}
            />
            {/* </DndProvider> */}
            <main className="h-full w-full dark:bg-darkblack">
              <Header isTabOpen={isTabOpen} />
              <Outlet />
            </main>
          </div>
        )}
      </div>
    </DndProvider>
  )
}
