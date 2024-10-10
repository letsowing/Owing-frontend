import DnDWrapper from '@components/dnd/DnDWrapper'

import useFolderStore from '@stores/folderStore'

import { worldViewDirectoryService } from '@services/directoryService'

export default function WorldView() {
  const { selectedFolderId } = useFolderStore() // zustand로부터 전역 상태 가져오기

  return (
    <DnDWrapper
      selectedFolderId={selectedFolderId}
      currentService={worldViewDirectoryService}
    />
  )
}
