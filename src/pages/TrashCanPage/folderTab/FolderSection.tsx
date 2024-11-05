import React, { useState } from 'react'

import FolderList from './FolderList'

import {
  FolderItem,
  TrashActions,
  TrashContentType,
  TrashSelection,
} from '@types'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

interface FolderSectionProps {
  title: string
  items: FolderItem[]
  selectedType: TrashContentType
  selection: TrashSelection
  actions: TrashActions
}

const FolderSection: React.FC<FolderSectionProps> = ({
  title,
  items,
  selectedType,
  selection,
  actions,
}) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleSection = () => {
    setIsExpanded(!isExpanded)
    actions.setSelectedType(selectedType)
    actions.onFolderSelect(items?.length > 0 ? items[0] : null)
    actions.onFileSelect(
      items?.length > 0 ? (items[0].files?.[0] ?? null) : null,
    )
  }

  return (
    <div className="bg-red mb-4">
      <div
        className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray"
        onClick={toggleSection}
      >
        {isExpanded ? (
          <IoIosArrowDown className="mr-2" />
        ) : (
          <IoIosArrowForward className="mr-2" />
        )}
        <span className="font-medium">{title}</span>
        <span className="ml-2 text-xs text-gray">({items.length})</span>
      </div>

      {isExpanded && (
        <>
          {items.map((folder) => (
            <FolderList
              key={folder.id}
              folder={folder}
              selectedType={selectedType}
              selection={selection}
              actions={actions}
              isActive={selection.selectedFolder?.id === folder.id}
            />
          ))}
        </>
      )}
      <div className="bg-whitegray mx-4 mt-4 h-[1px]" />
    </div>
  )
}

export default FolderSection
