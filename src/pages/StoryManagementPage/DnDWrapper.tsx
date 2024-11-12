/* eslint-disable @typescript-eslint/no-explicit-any */
import { useProjectStore } from '@stores/projectStore'

import { useDnd } from '@hooks/useDnd'

import DraggableBox from './DraggableBox'

import EmptyFolder from 'components/common/EmptyFolder'

interface DnDWrapperProps {
  selectedFolderId: number | null
  currentService: any
}

export default function DnDWrapper({
  selectedFolderId,
  currentService,
}: DnDWrapperProps) {
  const { items } = useDnd()
  const { setSelectedFileId } = useProjectStore()

  const selectedFolder = items.find((folder) => folder.id === selectedFolderId)

  if (!selectedFolder || !selectedFolder.files.length) {
    return <EmptyFolder isFolderEmpty={!selectedFolder} />
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4">
        {selectedFolder &&
          selectedFolder.files.map((file, index) => (
            <DraggableBox
              key={file.id}
              index={index}
              files={selectedFolder.files}
              folderId={selectedFolder.id}
              currentService={currentService}
              onSelectFile={setSelectedFileId}
            />
          ))}
      </div>
    </div>
  )
}
