import DnDWrapper from '@components/dnd/DnDWrapper'

import { useProjectStore } from '@stores/projectStore'

import { scenarioDirectoryService } from '@services/directoryService'

const ScenarioManagement = () => {
  const { selectedFolderId } = useProjectStore()

  return (
    <DnDWrapper
      selectedFolderId={selectedFolderId}
      currentService={scenarioDirectoryService}
    />
  )
}

export default ScenarioManagement
