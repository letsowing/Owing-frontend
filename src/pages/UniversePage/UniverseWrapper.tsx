/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseDraggableBox from '@pages/UniversePage/UniverseDraggableBox'

import EmptyFolder from '@components/common/EmptyFolder'

import { useDnd } from '@hooks/useDnd'

interface DnDWrapperProps {
  selectedFolderId: number | null
  currentService: any
}

export default function UniverseWrapper({
  selectedFolderId,
  currentService,
}: DnDWrapperProps) {
  const { items } = useDnd()

  const selectedFolder = items.find((folder) => folder.id === selectedFolderId)

  if (!selectedFolder || !selectedFolder.files.length) {
    return <EmptyFolder isFolderEmpty={!selectedFolder} />
  }

  return (
    <>
      <div className="w-full px-4 pb-2 text-darkgray dark:text-white">
        <h3 className="ms-5 text-2xl font-semibold">{selectedFolder.name}</h3>
        <p className="text-md my-5">{selectedFolder.description}</p>
      </div>

      <div className="flex flex-col py-2">
        {selectedFolder &&
          selectedFolder.files.map((file, index) => (
            <UniverseDraggableBox
              key={`${selectedFolder.id}-${file.id}`}
              index={index}
              files={selectedFolder.files}
              folderId={selectedFolder.id}
              currentService={currentService}
            />
          ))}
      </div>
    </>
  )
}
