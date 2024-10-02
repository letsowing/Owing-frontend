import DnDWrapper from '@components/dnd/DnDWrapper'

import useFolderStore from '@stores/folderStore'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ScenarioManagement = () => {
  const { selectedFolderId } = useFolderStore() // zustand로부터 전역 상태 가져오기

  return (
    <DndProvider backend={HTML5Backend}>
      <DnDWrapper selectedFolderId={selectedFolderId} />
    </DndProvider>
  )
}

export default ScenarioManagement
