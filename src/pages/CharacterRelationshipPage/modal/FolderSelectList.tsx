import React from 'react'

import { ChevronDown } from 'lucide-react'

interface Folder {
  id: number
  name: string
}

interface FolderSelectListProps {
  folders: Folder[]
  selectedFolderId: number | null
  onFolderSelect: (folderId: number) => void
  isEditable: boolean
}

const FolderSelectList: React.FC<FolderSelectListProps> = ({
  folders,
  selectedFolderId,
  onFolderSelect,
  isEditable,
}) => {
  return (
    <div className="relative">
      <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
        폴더 선택
      </label>
      <div className="relative">
        <select
          value={selectedFolderId || ''}
          onChange={(e) => onFolderSelect(Number(e.target.value))}
          disabled={!isEditable}
          className="border-gray-300 bg-gray-50 text-gray-900 focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 block w-full rounded-lg border p-2.5 text-sm dark:text-white"
        >
          <option value="">폴더를 선택해주세요</option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </select>
        <ChevronDown className="text-gray-400 pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2" />
      </div>
    </div>
  )
}

export default FolderSelectList
