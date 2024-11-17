/* eslint-disable @typescript-eslint/no-explicit-any */
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
    setSelectedFolderId,
    setSelectedFileId,
  } = useProjectStore()

  const editableRef = useRef<HTMLDivElement>(null)

  const handleCreateFolder = () => {
    setIsEditing(true)
  }

  const handleSaveFolder = async () => {
    const trimmedFolderName = newFolderName.trim()
    if (!trimmedFolderName) {
      setIsEditing(false)
      return
    }
    try {
      const folderData = {
        projectId,
        name: newFolderName,
        description: 'This is a folder description',
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
        handleSaveFolder()
      }
    }
  }

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus()
    }
  }, [isEditing])

  const handleSelectFolder = (folder: FolderItem) => {
    setSelectedFolderId(folder.id)
    if (folder.files.length > 0) {
      setSelectedFileId(folder.files[0].id)
    }
  }

  return (
    <div
      className={`relative h-full bg-beige transition-all duration-300 ease-in-out dark:bg-coldbeige ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
    >
      <div className="sticky top-0 z-10 bg-beige dark:bg-coldbeige">
        <div className="flex justify-between p-4">
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
          className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid border-whitegray bg-white text-sm dark:bg-darkgray"
        >
          <FaPlus className="dark:text-white" size={12} />
          <p className="px-1 dark:text-white">Create Folder</p>
        </button>
      </div>
      <ul className="max-h-[780px] overflow-y-auto scrollbar-thin scrollbar-track-beige scrollbar-thumb-lightredorange dark:scrollbar-track-coldbeige dark:scrollbar-thumb-skyblue">
        {items.map((folder: FolderItem, index: number) => (
          <FolderList
            key={folder.id}
            folders={items}
            index={index}
            onSelectFolder={handleSelectFolder}
            onSelectFile={setSelectedFileId}
            isActive={selectedFolderId === folder.id}
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
                setNewFolderName((e.target as HTMLDivElement).textContent || '')
              }
              onBlur={handleSaveFolder}
              onKeyDown={handleKeyDown}
              className="flex-1"
            >
              {/* 폴더 이름 입력 텍스트 */}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default FolderTab
