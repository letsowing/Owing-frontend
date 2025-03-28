import React, { useEffect, useRef, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useDnd } from '@hooks/useDnd'

import FolderList from './FolderList'

import { FolderItem } from '@types'
import { CiFolderOn } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { RiCloseLargeLine } from 'react-icons/ri'

interface FolderTabProps {
  projectId: number
  isOpen: boolean
  onClose: () => void
  currentService: any
}

const FolderTab: React.FC<FolderTabProps> = ({
  projectId,
  isOpen,
  onClose,
  currentService,
}) => {
  const { items, setItems } = useDnd()
  const [isEditing, setIsEditing] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const {
    currentProject,
    selectedFolderId,
    selectedFileId,
    setSelectedFolderId,
    setSelectedFileId,
  } = useProjectStore()

  const editableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus()
    }
  }, [isEditing])

  const handleCreateFolder = () => {
    setIsEditing(true)
  }

  const handleSaveFolder = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedFolderName = newFolderName.trim()
    if (!trimmedFolderName) {
      setIsEditing(false)
      return
    }
    try {
      const folderData = {
        projectId,
        name: newFolderName,
      }
      const newFolder = await currentService.postFolder(folderData)
      newFolder.files = []
      setItems([...items, newFolder])
    } catch (error) {
      console.error('새 폴더 생성 실패:', error)
    }
    setNewFolderName('')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing === false) {
        e.preventDefault()
        handleSaveFolder(e)
      }
    }
  }

  const handleSelectFolder = (folder: FolderItem) => {
    setSelectedFolderId(folder.id)
    if (folder.files.length > 0) {
      setSelectedFileId(folder.files[0].id)
    }
  }

  return (
    <div
      className={`flex h-full flex-col bg-beige transition-all duration-300 ease-in-out dark:bg-coldbeige ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
    >
      <div className="flex-none bg-beige px-4 pt-4 dark:bg-coldbeige">
        <div className="flex justify-between">
          <p className="truncate font-bold">{currentProject.title}</p>
          <button
            onClick={onClose}
            className="mt-1 flex w-8 justify-end text-darkgray"
          >
            <RiCloseLargeLine />
          </button>
        </div>

        <button
          onClick={handleCreateFolder}
          className="my-4 flex h-10 w-full items-center justify-center rounded-md border border-solid border-lightgray bg-white text-sm dark:bg-darkgray"
        >
          <FaPlus className="dark:text-white" size={12} />
          <p className="px-1 dark:text-white">폴더 생성</p>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-beige scrollbar-thumb-lightredorange dark:scrollbar-track-coldbeige dark:scrollbar-thumb-skyblue">
        <ul>
          {items.map((folder: FolderItem, index: number) => (
            <FolderList
              key={folder.id}
              folders={items}
              index={index}
              isActive={selectedFolderId === folder.id}
              selectedFileId={selectedFileId}
              onSelectFolder={handleSelectFolder}
              onSelectFile={setSelectedFileId}
              currentService={currentService}
            />
          ))}
          {isEditing && (
            <li className="mx-2 mb-4 flex items-center border-gray px-2 py-1 text-base text-gray">
              <CiFolderOn className="mr-2 h-auto w-[17px]" />
              <div
                ref={editableRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) =>
                  setNewFolderName(
                    (e.target as HTMLDivElement).textContent || '',
                  )
                }
                onBlur={handleSaveFolder}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FolderTab
