import { useDndStore } from '../../stores/dndStore'
import DraggableBox from './DraggableBox'

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
      <div className="grid grid-cols-4 gap-4">
        {selectedFolder &&
          selectedFolder.files.map((file, index) => (
            <DraggableBox
              key={file.fileId} // 파일의 고유한 fileId 사용
              id={file.fileId} // 파일의 ID 사용
              index={index} // 파일의 인덱스
              name={file.name} // 파일 이름
              description={file.description} // 파일 설명
              folderId={selectedFolder.folderId} // 선택된 폴더의 folderId 전달
            />
          ))}
      </div>
    </div>
  )
}
