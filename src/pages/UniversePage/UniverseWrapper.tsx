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
      <div className="w-full bg-white px-4 pb-2">
        <h3 className="text-[24px] font-semibold">{selectedFolder.name}</h3>
        <p className="my-5 text-[18px] text-gray">
          {selectedFolder.description}
        </p>
      </div>

      <div className="flex flex-col py-2">
        {selectedFolder &&
          selectedFolder.files.map((file, index) => (
            <UniverseDraggableBox
              key={file.id}
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
