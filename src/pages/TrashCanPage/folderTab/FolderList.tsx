import React, { useState } from 'react'

import FolderListItem from './FolderListItem'

import {
  FileItem,
  FolderItem,
  TrashActions,
  TrashContentType,
  TrashSelection,
} from '@types'
import { CiFolderOn } from 'react-icons/ci'
import { PiTrashSimpleLight } from 'react-icons/pi'
import { TbArrowBackUp } from 'react-icons/tb'

interface FolderListProps {
  folder: FolderItem
  selectedType: TrashContentType
  selection: TrashSelection
  actions: TrashActions
  isActive: boolean
}

const FolderList: React.FC<FolderListProps> = ({
  folder,
  selectedType,
  selection,
  actions,
  isActive,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleRestoreFolder = async () => {
    await actions.onRestore(folder.id, true)
  }

  const handleDeleteFolder = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (folder.id) {
        await actions.onDelete(folder.id, true)
      }
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
    }
  }
  const toggleFolder = () => {
    if (selectedType === 'story') {
      actions.setIsStoryDetail(false)
    }
    setIsOpen((prev) => !prev)
    actions.setSelectedType(selectedType)
    actions.onFolderSelect(folder)
    actions.onFileSelect(
      folder.files?.length > 0 ? (folder.files?.[0] ?? null) : null,
    )
  }

  const handleSelectItem = (file: FileItem) => {
    actions.onFolderSelect(folder)
    actions.onFileSelect(file)
    actions.setSelectedType(selectedType)
    if (selectedType === 'story') {
      // 스토리에서 파일을 클릭하면
      actions.setIsStoryDetail(true)
    }
  }

  return (
    <li className="mx-2 mb-4 list-none">
      <div
        className="group flex w-full cursor-pointer items-center justify-between rounded-[7px] px-2 py-2 hover:bg-white"
        onClick={toggleFolder}
      >
        <div className="flex items-center">
          <CiFolderOn
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />

          <p
            className={`max-w-36 truncate px-2 text-base ${
              isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'
            }`}
          >
            {folder.name}
          </p>
        </div>

        <div className="flex hidden w-10 items-center justify-between group-hover:flex">
          <TbArrowBackUp
            onClick={handleRestoreFolder}
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <PiTrashSimpleLight
            onClick={handleDeleteFolder}
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
        </div>
      </div>

      {isOpen && (
        <ul className="pe-2 ps-4">
          {folder.files?.map((file) => (
            <FolderListItem
              key={file.id}
              file={file}
              selection={selection}
              actions={actions}
              toggleFile={() => {
                handleSelectItem(file)
              }}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default FolderList
