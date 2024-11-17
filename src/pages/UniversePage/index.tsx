import { useProjectStore } from '@stores/projectStore'

import UniverseWrapper from './UniverseWrapper'

import { universeDirectoryService } from '@services/directoryService'

export default function Universe() {
  const { selectedFolderId } = useProjectStore()
  return (
    <UniverseWrapper
      selectedFolderId={selectedFolderId}
      currentService={universeDirectoryService}
    />
  )
}
