import { useDndStore } from '../../stores/dndStore'
import DraggableBox from './DraggableBox'

import AlertOwing from '@assets/common/AlertOwing.png'

interface DnDWrapperProps {
  selectedFolderId: number | null // 상위 컴포넌트에서 전달받는 선택된 폴더 ID
}

export default function DnDWrapper({ selectedFolderId }: DnDWrapperProps) {
  const { items } = useDndStore()
  const selectedFolder = items.find(
    (folder) => folder.folderId === selectedFolderId,
  )

  return (
    <div className="ml-20 p-5">
      {selectedFolder ? (
        selectedFolder.files.length === 0 ? ( // 폴더는 있지만 파일이 없는 경우
          <div className="mt-[200px] text-center">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto mb-4 h-auto w-20"
            />
            <div className="text-redorange">파일을 생성해 주세요!</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {selectedFolder &&
              selectedFolder.files.map((file, index) => (
                <DraggableBox
                  key={file.fileId}
                  id={file.fileId}
                  index={index}
                  name={file.name}
                  description={file.description}
                  folderId={selectedFolder.folderId}
                />
              ))}
          </div>
        )
      ) : (
        // 폴더가 없는 경우
        <div className="mt-[200px] text-center">
          <img
            src={AlertOwing}
            alt="AlertOwing"
            className="mx-auto mb-4 h-auto w-20"
          />
          <div className="text-redorange">폴더를 생성해 주세요!</div>
        </div>
      )}
    </div>
  )
}
