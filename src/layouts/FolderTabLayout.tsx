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
  const {
    currentProject,
    setSelectedFolderId,
    setSelectedFileId,
    selectedFolderId,
    selectedFileId,
  } = useProjectStore()
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

  const selectedFolder = useMemo(() => {
    return items.find((folder) => folder.id === selectedFolderId)
  }, [items, selectedFolderId])

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
  }, [
    currentProject.id,
    currentService,
    location.pathname,
    setItems,
    setSelectedFileId,
    setSelectedFolderId,
  ])

  useEffect(() => {
    if (items.length > 0 && selectedFolderId) {
      // 1. 선택된 폴더가 존재하는지 확인
      const folderExists = items.some(
        (folder) => folder.id === selectedFolderId,
      )

      if (!folderExists) {
        // 폴더가 삭제된 경우 첫 번째 폴더로 이동
        setSelectedFolderId(items[0].id)
        if (items[0].files?.length > 0) {
          setSelectedFileId(items[0].files[0].id)
        } else {
          setSelectedFileId(null)
        }
        return
      }

      // 2. 선택된 파일이 존재하는지 확인
      if (selectedFileId && selectedFolder) {
        const fileExists = selectedFolder.files.some(
          (file) => file.id === selectedFileId,
        )

        if (!fileExists) {
          // 파일이 삭제된 경우 동일 폴더의 첫 번째 파일로 이동
          if (selectedFolder.files.length > 0) {
            setSelectedFileId(selectedFolder.files[0].id)
          } else {
            // 폴더에 파일이 없는 경우
            setSelectedFileId(null)
          }
        }
      }
    }
  }, [
    items,
    selectedFolderId,
    selectedFileId,
    selectedFolder,
    setSelectedFolderId,
    setSelectedFileId,
  ])

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
