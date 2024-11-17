import { useProjectStore } from '@stores/projectStore'

import DnDWrapper from './DnDWrapper'

import { storyDirectoryService } from '@services/directoryService'

const StoryManagement = () => {
  const { selectedFolderId } = useProjectStore()

  return (
    <DnDWrapper
      selectedFolderId={selectedFolderId}
      currentService={storyDirectoryService}
    />
  )
}

export default StoryManagement
