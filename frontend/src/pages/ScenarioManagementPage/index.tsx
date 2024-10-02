import { useState } from 'react'

import DnDWrapper from '@components/dnd/DnDWrapper'
import Tab from '@components/dnd/Tab'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ScenarioManagement = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(0) // 선택된 폴더 ID 상태 관리

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Tab에서 폴더 선택 시 상태 업데이트 */}
      <Tab setSelectedFolderId={setSelectedFolderId} />
      {/* DnDWrapper에서 선택된 폴더 ID에 따라 파일 렌더링 */}
      <DnDWrapper selectedFolderId={selectedFolderId} />
    </DndProvider>
  )
}

export default ScenarioManagement
