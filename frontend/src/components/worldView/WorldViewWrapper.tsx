import { useWorldViewStore } from '@stores/worldViewStore'

import WorldViewDraggableBox from './WorldViewDraggableBox'

import AlertOwing from '@assets/common/AlertOwing.png'

interface WorldViewWrapperProps {
  selectedFolderId: number | null
}

export default function WorldViewWrapper({
  selectedFolderId,
}: WorldViewWrapperProps) {
  const { items } = useWorldViewStore()
  const selectedFolder = items.find(
    (folder) => folder.folderId === selectedFolderId,
  )
  return (
    <div>
      {selectedFolder ? (
        selectedFolder.files.length === 0 ? (
          <div className="mt-[200px] text-center">
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
                {selectedFolder.folderDesc}
              </p>
            </div>

            <div className="flex w-full flex-wrap bg-[#FCFBFA] py-2">
              {selectedFolder &&
                selectedFolder.files.map((file, index) => (
                  <WorldViewDraggableBox
                    key={file.fileId}
                    id={file.fileId}
                    index={index}
                    name={file.name}
                    description={file.description}
                    folderId={selectedFolder.folderId}
                    imageUrl={file.imageUrl}
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
