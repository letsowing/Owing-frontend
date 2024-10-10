import { useEffect, useMemo, useState } from 'react'

import Header from '@/components/common/Header'
import FolderTab from '@/components/folderTab/FolderTab'
import MenuTab from '@/components/menuTab/MenuTab'
import useFolderStore from '@/stores/folderStore'
import useMenuStore from '@/stores/menuStore'
import {
  characterDirectoryService,
  scenarioDirectoryService,
  worldViewDirectoryService,
} from '@services/directoryService'
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

  const currentService = useMemo(() => {
    if (location.pathname.includes('/worldview')) {
      return worldViewDirectoryService
    } else if (location.pathname.includes('/character')) {
      return characterDirectoryService
    } else {
      return scenarioDirectoryService
    }
  }, [location.pathname])

  useEffect(() => {
    if (
      activePath === 'worldView' ||
      activePath === 'scenarioManagement' ||
      activePath === 'character'
    ) {
      setIsFolderTabOpen(true)
    } else {
      setIsFolderTabOpen(false)
    }

    setTabWidth(isTabOpen ? 256 : 41)
  }, [isTabOpen, activePath])

  const toggleTab = () => {
    setIsTabOpen(!isTabOpen)
  }

  const handleMenuItemClick = () => {
    setIsFolderTabOpen(true)
  }

  const handleCloseFolderTab = () => {
    setIsFolderTabOpen(false)
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
            isOpen={isFolderTabOpen}
            onClose={handleCloseFolderTab}
            setSelectedFolderId={setSelectedFolderId}
            currentService={currentService}
          />
          <main className="h-full w-full overflow-y-auto dark:bg-darkblack">
            <Header isTabOpen={isTabOpen} />
            <Outlet context={{ currentService }} />
          </main>
        </div>
      </div>
    </DndProvider>
  )
}
