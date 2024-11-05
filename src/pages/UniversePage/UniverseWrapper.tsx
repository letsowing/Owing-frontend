/* eslint-disable @typescript-eslint/no-explicit-any */
import UniverseDraggableBox from '@pages/UniversePage/UniverseDraggableBox'

import { useDnd } from '@hooks/useDnd'

import EmptyFolder from '@/components/common/EmptyFolder'

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

  if (!selectedFolder || !selectedFolder.files) {
    return <EmptyFolder isFolderEmpty={!selectedFolder} />
  }

  return (
    <>
      <div className="m-4">
        <h3 className="text-[24px] font-semibold">{selectedFolder.name}</h3>
        <p className="my-5 text-[18px] text-gray">
          {selectedFolder.description}
        </p>
      </div>

      <div className="flex flex-grow flex-col bg-[#FCFBFA] py-2">
        {selectedFolder &&
          selectedFolder.files.map((file, index) => (
            <UniverseDraggableBox
              key={file.id}
              id={file.id}
              index={index}
              name={file.name}
              description={file.description}
              folderId={selectedFolder.id}
              imageUrl={file.imageUrl}
              currentService={currentService}
            />
          ))}
      </div>
    </>
  )
}
