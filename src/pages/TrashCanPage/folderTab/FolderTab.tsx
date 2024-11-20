import React from 'react'

import { useProjectStore } from '@stores/projectStore'

import FolderSection from './FolderSection'

import {
  TrashActions,
  TrashContentType,
  TrashFolderData,
  TrashSelection,
} from '@types'

interface FolderTabProps {
  items: TrashFolderData
  selection: TrashSelection
  actions: TrashActions
}

const FolderTab: React.FC<FolderTabProps> = ({
  items,
  selection,
  actions,
}: FolderTabProps) => {
  const currentProject = useProjectStore((state) => state.currentProject)

  const handleClearTrash = () => {
    if (currentProject) {
      actions.onEmptyTrash(currentProject.id)
    }
  }

  const sectionTitles = {
    story: '스토리 원고',
    cast: '캐릭터',
    universe: '세계관',
  }

  return (
    <div className="flex h-full flex-col border-x border-whitegray transition-all duration-300 ease-in-out dark:bg-coldbeige">
      <div className="flex-none">
        <div className="flex justify-between p-4">
          <p className="truncate font-bold">{currentProject.title}</p>
        </div>

        <button
          onClick={handleClearTrash}
          className="mx-4 mb-4 flex h-10 w-52 items-center justify-center rounded-md border border-solid border-whitegray bg-white text-sm hover:bg-beige dark:bg-darkgray dark:hover:bg-gray"
        >
          <p className="px-1 dark:text-white">휴지통 비우기</p>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-beige scrollbar-thumb-lightredorange dark:scrollbar-track-coldbeige dark:scrollbar-thumb-skyblue">
        {Object.entries(items).map(([key, folders]) => (
          <FolderSection
            key={key}
            title={sectionTitles[key as keyof typeof sectionTitles]}
            items={folders}
            selectedType={key as TrashContentType}
            selection={selection}
            actions={actions}
          />
        ))}
      </div>
    </div>
  )
}

export default FolderTab
