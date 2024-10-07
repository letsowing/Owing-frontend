import { useState } from 'react'

import { useWorldViewStore } from '@stores/worldViewStore'

import WorldViewFolderList from './WorldViewFolderList'

import { FaPlus } from 'react-icons/fa6'

interface WorldViewTabProps {
  setSelectedFolderId: (folderId: number) => void
  isTabOpen: boolean
  tabHandler: () => void
}

export default function WorldViewTab({
  setSelectedFolderId,
  isTabOpen,
  tabHandler,
}: WorldViewTabProps) {
  const { items } = useWorldViewStore()
  const [activeFolderId, setActiveFolderId] = useState<number | null>(null)

  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.folderId)
    setActiveFolderId(folder.folderId)
  }

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
        className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid border-[#e8e8e8] bg-white text-sm dark:bg-darkgray"
      >
        <FaPlus className="dark:text-white" size={12} />
        <p className="px-1 dark:text-white">Create Folder</p>
      </button>

      <ul className="m-0 p-0">
        {items.map((folder: any, index: number) => (
          <WorldViewFolderList
            key={folder.folderId}
            folder={folder}
            index={index}
            onSelectFolder={handleSelectFolder}
            isActive={activeFolderId === folder.folderId} // 활성화 상태 전달
          />
        ))}
      </ul>
    </div>
  )
}
