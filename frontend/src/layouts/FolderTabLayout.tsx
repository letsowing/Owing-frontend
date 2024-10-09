import { useEffect, useState } from 'react'

import WorldViewTab from '@pages/WorldViewPage/WorldViewTab'

import Header from '@/components/common/Header'
import FolderTab from '@/components/folderTab/FolderTab'
import MenuTab from '@/components/menuTab/MenuTab'
import useFolderStore from '@/stores/folderStore'
import useMenuStore from '@/stores/menuStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet, useLocation } from 'react-router-dom'

export default function FolderTabLayout() {
  const { activePath } = useMenuStore()
  const [isTabOpen, setIsTabOpen] = useState(false)
  const [tabWidth, setTabWidth] = useState(256)

  const [isFolderTabOpen, setIsFolderTabOpen] = useState(false)
  const { setSelectedFolderId } = useFolderStore()

  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' || location.pathname === '/main'

  useEffect(() => {
    if (
      activePath === 'worldView' ||
      (activePath === 'scenarioManagement' && isTabOpen)
    ) {
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

        {location.pathname === '/worldView' ? (
          <div className="flex h-full w-full flex-row">
            <WorldViewTab
              isTabOpen={isFolderTabOpen}
              tabHandler={handleCloseFolderTab}
              setSelectedFolderId={setSelectedFolderId}
            />
            <main className="h-full w-full dark:bg-darkblack">
              <Header isTabOpen={isTabOpen} />
              <Outlet />
            </main>
          </div>
        ) : (
          // 사이드 탭메뉴 컴포넌트를 공통으로 사용하기 위해 추가
          location.pathname === '/scenarioManagement' && (
            <div className="flex h-full w-full flex-row">
              {/* FolderTab 컴포넌트에 props로 넘기는 이름은 그대로 유지하기 위해 기존대로 작성함(넘기는 값, 함수 이름은 다르나 역할은 동일함) */}
              <FolderTab
                isOpen={isFolderTabOpen}
                onClose={handleCloseFolderTab}
                setSelectedFolderId={setSelectedFolderId}
              />
              <main className="h-full w-full dark:bg-darkblack">
                <Header isTabOpen={isTabOpen} />
                <Outlet />
              </main>
            </div>
          )
        )}
      </div>
    </DndProvider>
  )
}
