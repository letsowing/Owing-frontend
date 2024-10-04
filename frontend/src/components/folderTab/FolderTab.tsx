// FolderTab.tsx
import React, { useState } from 'react'

import { useDnd } from '@hooks/useDnd'

import FolderList from './FolderList'

import { FaPlus } from 'react-icons/fa6'

interface FolderTabProps {
  setSelectedFolderId: (folderId: number) => void // 상위 컴포넌트에서 전달받는 함수
  isOpen: boolean // FolderTab이 열렸는지 여부
  onClose: () => void // FolderTab을 닫는 함수
}

const FolderTab: React.FC<FolderTabProps> = ({
  setSelectedFolderId,
  isOpen,
  onClose,
}) => {
  const { items } = useDnd() // items는 폴더 목록을 의미
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null) // activeFolderId 상태 추가

  // 선택된 폴더가 변경될 때 호출
  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.folderId) // 새로운 폴더를 활성화 또는 비활성화
    setActiveFolderId(folder.folderId) // 상위 컴포넌트로 선택된 폴더 ID 전달
  }

  return (
    <div
      className={`bg-beige transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
      style={{ height: '100%' }}
    >
      <div className="flex justify-between p-4">
        <p className="font-bold">억만장자</p>
        <button onClick={onClose} className="text-gray dark:text-white">
          닫기
        </button>
      </div>

      <button
        className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid bg-white text-sm"
        style={{ borderColor: '#e8e8e8' }}
      >
        <FaPlus size={12} />
        <p className="px-1">Create Folder</p>
      </button>

      <ul className="m-0 p-0">
        {items.map((folder: any) => (
          <FolderList
            key={folder.folderId}
            folder={folder}
            onSelectFolder={handleSelectFolder}
            isActive={activeFolderId === folder.folderId} // 활성화 상태 전달
          />
        ))}
      </ul>
    </div>
  )
}

export default FolderTab
