import DnDWrapper from '@components/dnd/DnDWrapper'

import useFolderStore from '@stores/folderStore'

const ScenarioManagement = () => {
  const { selectedFolderId } = useFolderStore() // zustand로부터 전역 상태 가져오기

  return <DnDWrapper selectedFolderId={selectedFolderId} />
}

export default ScenarioManagement
