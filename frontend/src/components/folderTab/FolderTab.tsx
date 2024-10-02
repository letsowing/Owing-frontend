// FolderTab.tsx
import React from 'react'

import { useDnd } from '@hooks/useDnd'

import FolderList from './FolderList'

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

  // 선택된 폴더가 변경될 때 호출
  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.folderId) // 상위 컴포넌트로 선택된 폴더 ID 전달
  }

  return (
    <div
      className={`bg-beige transition-all duration-300 ease-in-out ${
        isOpen ? 'w-72' : 'w-0'
      } overflow-hidden`}
      style={{ height: '100%' }}
    >
      <div className="flex justify-between p-4">
        <h2>Folder View</h2>
        <button onClick={onClose} className="text-gray dark:text-white">
          닫기
        </button>
      </div>
      <ul style={{ padding: 0, margin: 0 }}>
        {items.map((folder: any) => (
          <FolderList
            key={folder.folderId}
            folder={folder}
            onSelectFolder={handleSelectFolder}
          />
        ))}
      </ul>
    </div>
  )
}

export default FolderTab
