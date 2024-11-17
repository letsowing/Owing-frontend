import React from 'react'

import CustomSelect from '@components/common/CustomSelect'

import { FolderSummary } from '@types'

interface FolderSelectListProps {
  folders: FolderSummary[]
  selectedFolderId?: number
  onFolderSelect: (folderId: number) => void
  isEditable: boolean
}

const FolderSelectList: React.FC<FolderSelectListProps> = ({
  folders,
  selectedFolderId,
  onFolderSelect,
  isEditable,
}) => {
  const options = folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    value: folder.id,
  }))

  return (
    <div className="flex flex-col">
      <label className="flex font-semibold text-darkgray dark:text-white">
        폴더 선택
        {isEditable && (
          <div className="flex items-center gap-3">
            <span className="ml-1 text-redorange dark:text-blue">*</span>
            {!selectedFolderId && (
              <p className="text-xs font-normal text-redorange dark:text-blue">
                폴더를 선택해주세요.
              </p>
            )}
          </div>
        )}
      </label>
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
