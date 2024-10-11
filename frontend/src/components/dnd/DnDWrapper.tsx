/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import DraggableBox from './DraggableBox'

import AlertOwing from '@assets/common/AlertOwing.png'

interface DnDWrapperProps {
  selectedFolderId: number | null
  currentService: any
}

export default function DnDWrapper({
  selectedFolderId,
  currentService,
}: DnDWrapperProps) {
  const { items } = useDnd()

  const selectedFolder = items.find((folder) => folder.id === selectedFolderId)

  return (
    <div className="p-6">
      {selectedFolder ? (
        !selectedFolder.files ? (
          <div className="mt-[200px] text-center">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto mb-4 h-auto w-24"
            />
            <div className="text-redorange">파일을 생성해 주세요!</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4">
            {selectedFolder &&
              selectedFolder.files.map((file, index) => (
                <DraggableBox
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
        )
      ) : (
        <div className="mt-[200px] text-center">
          <img
            src={AlertOwing}
            alt="AlertOwing"
            className="mx-auto mb-4 h-auto w-24"
          />
          <div className="text-redorange">폴더를 생성해 주세요!</div>
        </div>
      )}
    </div>
  )
}
