/* eslint-disable @typescript-eslint/no-explicit-any */
import WorldViewDraggableBox from '@pages/WorldViewPage/WorldViewDraggableBox'

import { useDnd } from '@hooks/useDnd'

import AlertOwing from '@assets/common/AlertOwing.png'

interface DnDWrapperProps {
  selectedFolderId: number | null
  currentService: any
}

export default function WorldViewWrapper({
  selectedFolderId,
  currentService,
}: DnDWrapperProps) {
  const { items } = useDnd()

  const selectedFolder = items.find((folder) => folder.id === selectedFolderId)

  return (
    <div>
      {selectedFolder ? (
        selectedFolder.files.length === 0 ? (
          <div className="mt-[200px] w-full text-center">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto mb-4 h-auto w-24"
            />
            <div className="text-redorange">파일을 생성해 주세요!</div>
          </div>
        ) : (
          <>
            <div className="m-4">
              <h3 className="text-[24px] font-semibold">
                {selectedFolder.name}
              </h3>
              <p className="my-5 text-[18px] text-gray">
                {selectedFolder.description}
              </p>
            </div>

            <div className="flex flex-grow flex-col bg-[#FCFBFA] py-2">
              {selectedFolder &&
                selectedFolder.files.map((file, index) => (
                  <WorldViewDraggableBox
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
