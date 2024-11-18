import React from 'react'

import CustomSelect from '@components/common/CustomSelect'

import { FolderSummary } from '@types'
import { BsPlusCircle } from 'react-icons/bs'

interface FolderSelectListProps {
  folders: FolderSummary[]
  selectedFolderId?: number
  isEditable: boolean
  onFolderSelect: (folderId: number) => void
  handleCreateFolder: () => void
}

const FolderSelectList: React.FC<FolderSelectListProps> = ({
  folders,
  selectedFolderId,
  isEditable,
  onFolderSelect,
  handleCreateFolder,
}) => {
  const options = folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    value: folder.id,
  }))

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-semibold text-darkgray dark:text-white">
            폴더 선택
          </span>
          {isEditable && (
            <span className="ml-1 text-redorange dark:text-blue">*</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isEditable && (
            <>
              <BsPlusCircle
                className="cursor-pointer text-redorange dark:text-blue"
                onClick={handleCreateFolder}
              />
              {!selectedFolderId && (
                <p className="text-xs font-normal text-redorange dark:text-blue">
                  폴더를 선택해주세요.
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <CustomSelect
        value={selectedFolderId || ''}
        onChange={(value) => onFolderSelect(Number(value))}
        options={options}
        disabled={!isEditable}
      />
    </div>
  )
}

export default FolderSelectList
