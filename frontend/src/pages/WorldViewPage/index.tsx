import WorldViewWrapper from '@/components/worldView/WorldViewWrapper'
import useFolderStore from '@/stores/folderStore'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function WorldView() {
  const { selectedFolderId } = useFolderStore() // zustand로부터 전역 상태 가져오기

  return (
    <DndProvider backend={HTML5Backend}>
      <WorldViewWrapper selectedFolderId={selectedFolderId} />
    </DndProvider>
  )
}
