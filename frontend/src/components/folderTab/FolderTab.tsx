/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { useWorkStore } from '@stores/workStore'

import { useDnd } from '@hooks/useDnd'

import { generateUUID } from '@utils/uuid'

import FolderList from './FolderList'

import { FolderItem } from '@types'
import { CiFolderOn } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'
import { RiCloseLargeLine } from 'react-icons/ri'
import { useParams } from 'react-router-dom'

interface FolderTabProps {
  isOpen: boolean
  onClose: () => void
  setSelectedFolderId: (folderId: number) => void
  currentService: any
}

const FolderTab: React.FC<FolderTabProps> = ({
  setSelectedFolderId,
  isOpen,
  onClose,
  currentService,
}) => {
  const { items, setItems } = useDnd()
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const { projectId } = useParams()
  const currentWork = useWorkStore((state) => state.currentWork)

  const editableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const folders = await currentService.getFolders(projectId)
        setItems(folders)
      } catch (err) {
        console.error('폴더 목록 조회 실패:', err)
      }
    }

    fetchFolders()
  }, [setItems, currentService, projectId])

  const handleCreateFolder = () => {
    setIsEditing(true)
  }

  const handleSaveFolder = async () => {
    try {
      const folderData = {
        projectId,
        name: newFolderName,
        description: 'This is a folder description',
      }
      const newFolder = await currentService.postFolder(folderData)
      setItems([...items, newFolder])
    } catch (error) {
      console.error('새 폴더 생성 실패:', error)
    }
    setNewFolderName('')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveFolder()
    }
  }

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus()
    }
  }, [isEditing])

  const handleSelectFolder = (folder: FolderItem) => {
    setSelectedFolderId(folder.id)
    setActiveFolderId(folder.id)
  }

  return (
    <div
      className={`h-full bg-beige transition-all duration-300 ease-in-out dark:bg-coldbeige ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
    >
      <div className="flex justify-between p-4">
        <p className="truncate font-bold">{currentWork?.title}</p>
        <button
          onClick={onClose}
          className="mt-1 flex w-8 justify-end text-darkgray"
        >
          <RiCloseLargeLine />
        </button>
      </div>

      <button
        onClick={handleCreateFolder}
        className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid bg-white text-sm dark:bg-darkgray"
        style={{ borderColor: '#e8e8e8' }}
      >
        <FaPlus className="dark:text-white" size={12} />
        <p className="px-1 dark:text-white">Create Folder</p>
      </button>

      <ul
        className="m-0 p-0"
        style={{ maxHeight: '780px', overflow: 'overlay' }}
      >
        {items.map((folder: FolderItem, index: number) => (
          <FolderList
            key={`folder-${generateUUID()}`}
            folder={folder}
            index={index}
            onSelectFolder={handleSelectFolder}
            isActive={activeFolderId === folder.id}
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
