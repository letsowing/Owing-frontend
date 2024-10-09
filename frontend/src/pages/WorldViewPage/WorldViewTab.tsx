import { useEffect, useRef, useState } from 'react'

import { useWorldViewStore } from '@stores/worldViewStore'

import WorldViewFolderList from './WorldViewFolderList'

import { CiFolderOn } from 'react-icons/ci'
import { FaPlus } from 'react-icons/fa6'

interface WorldViewTabProps {
  setSelectedFolderId: (folderId: string) => void
  isTabOpen: boolean
  tabHandler: () => void
}

export default function WorldViewTab({
  setSelectedFolderId,
  isTabOpen,
  tabHandler,
}: WorldViewTabProps) {
  const { items, addFolder } = useWorldViewStore()
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const editableRef = useRef<HTMLDivElement>(null) // 포커스 설정용 ref

  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.folderId)
    setActiveFolderId(folder.folderId)
  }

  const handleCreateFolder = () => {
    setIsEditing(true)
  }

  const handleSaveFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName)
    } else {
      handleCancelFolder()
    }
    setNewFolderName('')
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveFolder() // Enter 키로 폴더 저장
    }
  }

  const handleCancelFolder = () => {
    setNewFolderName('')
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing && editableRef.current) {
      editableRef.current.focus() // 커서 깜빡이게 포커스 설정
    }
  }, [isEditing])

  return (
    <div
      className={`h-full bg-beige transition-all duration-300 ease-in-out dark:bg-coldbeige ${
        isTabOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
    >
      <div className="flex justify-between p-4">
        <p className="font-bold">억만장자</p>
        <button onClick={tabHandler} className="text-darkgray">
          닫기
        </button>
      </div>

      <button
        onClick={handleCreateFolder}
        className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid border-[#e8e8e8] bg-white text-sm dark:bg-darkgray"
      >
        <FaPlus className="dark:text-white" size={12} />
        <p className="px-1 dark:text-white">Create Folder</p>
      </button>

      <ul
        className="m-0 p-0"
        style={{ maxHeight: '780px', overflow: 'overlay' }}
      >
        {items.map((folder: any, index: number) => (
          <WorldViewFolderList
            key={folder.folderId}
            folder={folder}
            index={index}
            onSelectFolder={handleSelectFolder}
            isActive={activeFolderId === folder.folderId}
          />
        ))}
        {isEditing && (
          <li className="border-gray-300 text-gray-700 mx-2 mb-4 flex items-center px-2 py-1 text-base dark:text-white">
            <CiFolderOn className="mr-2 h-auto w-[17px]" />
            <div
              ref={editableRef}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) =>
                setNewFolderName((e.target as HTMLDivElement).textContent || '')
              }
              onBlur={handleSaveFolder} // 포커스가 벗어날 때 저장
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
