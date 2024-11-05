import React, { useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import FolderListItem from './FolderListItem'

import {
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
  const currentProject = useProjectStore((state) => state.currentProject)

  const handleRestoreFolder = async () => {
    await actions.onRestore(folder.id, currentProject.id)
  }

  const toggleFolder = () => {
    setIsOpen((prev) => !prev)
    actions.setSelectedType(selectedType)
    actions.onFolderSelect(folder)
    actions.onFileSelect(
      folder.files?.length > 0 ? (folder.files?.[0] ?? null) : null,
    )
  }

  const handleDeleteFolder = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      if (folder.id) {
        await actions.onDeleteFolder(folder.id, currentProject.id)
      }
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
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
                actions.setSelectedType(selectedType)
                actions.onFolderSelect(folder)
                actions.onFileSelect(file)
              }}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default FolderList
