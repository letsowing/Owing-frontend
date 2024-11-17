import { useEffect, useMemo, useState } from 'react'

import Header from '@components/common/Header'
import FolderTab from '@components/folderTab/FolderTab'
import MenuTab from '@components/menuTab/MenuTab'

import { useProjectStore } from '@stores/projectStore'

import { useDnd } from '@hooks/useDnd'
import { useMenuTab } from '@hooks/useMenuTab'

import {
  castDirectoryService,
  storyDirectoryService,
  universeDirectoryService,
} from '@services/directoryService'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Outlet, useLocation } from 'react-router-dom'

export default function FolderTabLayout() {
  const { isTabOpen, tabWidth, toggleTab } = useMenuTab()
  const [isFolderTabOpen, setIsFolderTabOpen] = useState(true)
  const { currentProject, setSelectedFolderId, setSelectedFileId } =
    useProjectStore()
  const { items, setItems } = useDnd()

  const location = useLocation()
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
    const fetchFolders = async () => {
      try {
        const fetchedFolders = await currentService.getFolders(
          currentProject.id,
        )
        setItems(fetchedFolders)
      } catch (err) {
        console.error('폴더 목록 조회 실패:', err)
      }
    }

    fetchFolders()
  }, [currentProject.id, currentService, location.pathname, setItems])

  useEffect(() => {
    setSelectedFolderId(items?.length > 0 ? items[0].id : null)
    setSelectedFileId(
      items?.length > 0
        ? items[0].files?.length > 0
          ? items[0].files[0].id
          : null
        : null,
    )
  }, [items, setSelectedFileId, setSelectedFolderId])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen">
        <MenuTab
          style={{ width: `${tabWidth}px` }}
          isTabOpen={isTabOpen}
          onToggle={toggleTab}
          onItemClick={() => setIsFolderTabOpen(true)}
        />

        <div className="flex h-full w-full flex-row">
          <FolderTab
            projectId={currentProject.id}
            isOpen={isFolderTabOpen}
            onClose={() => setIsFolderTabOpen(false)}
            currentService={currentService}
          />
          <main className="h-full w-full overflow-y-auto dark:bg-darkblack">
            <div className="sticky top-0 z-10">
              <Header isTabOpen={isTabOpen} />
            </div>
            <Outlet context={{ currentService }} />
          </main>
        </div>
      </div>
    </DndProvider>
  )
}
