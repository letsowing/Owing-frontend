import { useProjectStore } from '@stores/projectStore'

import WorldViewWrapper from './WorldViewWrapper'

import { worldViewDirectoryService } from '@services/directoryService'

export default function WorldView() {
  const { selectedFolderId } = useProjectStore()
  return (
    <WorldViewWrapper
      selectedFolderId={selectedFolderId}
      currentService={worldViewDirectoryService}
    />
  )
}
