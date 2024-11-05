import { useEffect, useMemo, useState } from 'react'

import Header from '@components/common/Header'
import FolderTab from '@components/folderTab/FolderTab'
import MenuTab from '@components/menuTab/MenuTab'

import { useMenuStore } from '@stores/menuStore'
import { useProjectStore } from '@stores/projectStore'

import { useDnd } from '@hooks/useDnd'

import { useMenuTab } from '@/hooks/useMenuTab'
import {
  castDirectoryService,
  storyDirectoryService,
  universeDirectoryService,
} from '@services/directoryService'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet, useLocation } from 'react-router-dom'

export default function FolderTabLayout() {
  const { activePath } = useMenuStore()
  const { isTabOpen, tabWidth, toggleTab } = useMenuTab()
  const [isFolderTabOpen, setIsFolderTabOpen] = useState(false)
  const { currentProject, setSelectedFolderId, setSelectedFileId } =
    useProjectStore()
  const { setItems } = useDnd()

  const location = useLocation()
  const isNotTabPage =
    location.pathname === '/' || location.pathname === '/main'

  const currentService = useMemo(() => {
    if (location.pathname.includes('/universe')) {
      return universeDirectoryService
    } else if (location.pathname.includes('/cast')) {
      return castDirectoryService
    } else {
      return storyDirectoryService
    }
  }, [location.pathname])

  useEffect(() => {
    if (
      activePath === 'universe' ||
      activePath === 'storyManagement' ||
      activePath === 'cast'
    ) {
      setIsFolderTabOpen(true)
    } else {
      setIsFolderTabOpen(false)
    }
  }, [isTabOpen, activePath])

  const handleMenuItemClick = () => {
    setIsFolderTabOpen(true)
  }

  const handleCloseFolderTab = () => {
    setIsFolderTabOpen(false)
  }

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await currentService.getFolders(
          currentProject.id,
        )
        setItems(fetchedFolders)
        // 첫 번째 폴더를 선택하도록 설정
        if (fetchedFolders.length > 0) {
          setSelectedFolderId(fetchedFolders[0].id)
          if (fetchedFolders[0].files.length > 0) {
            setSelectedFileId(fetchedFolders[0].files[0].id)
          }
        }
      } catch (err) {
        console.error('폴더 목록 조회 실패:', err)
      }
    }

    fetchFolders()
  }, [
    currentService,
    currentProject.id,
    setItems,
    setSelectedFolderId,
    location.pathname,
    setSelectedFileId,
  ])

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
            projectId={currentProject.id}
            isOpen={isFolderTabOpen}
            onClose={handleCloseFolderTab}
            setSelectedFolderId={setSelectedFolderId}
            setSelectedFileId={setSelectedFileId}
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
