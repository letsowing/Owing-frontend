import useFolderStore from '@stores/folderStore'

import WorldViewWrapper from './WorldViewWrapper'

import { worldViewDirectoryService } from '@services/directoryService'

export default function WorldView() {
  const { selectedFolderId } = useFolderStore() // zustand로부터 전역 상태 가져오기

  return (
    <WorldViewWrapper
      selectedFolderId={selectedFolderId}
      currentService={worldViewDirectoryService}
    />
  )
}
