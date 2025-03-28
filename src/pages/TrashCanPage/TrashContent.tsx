import CastTrashContent from './CastTrashContent'
import RestoreHeader from './RestoreHeader'
import UniverseTrashContent from './UniverseTrashContent'
import StoryTrashContent from './story/StoryTrashContent'

import { TrashContentProps } from '@types'

const contentComponents = {
  story: StoryTrashContent,
  cast: CastTrashContent,
  universe: UniverseTrashContent,
}

const TrashContent = ({ selection, actions }: TrashContentProps) => {
  const ContentComponent = contentComponents[selection.selectedType]

  return (
    <div className="h-full w-full">
      <RestoreHeader selection={selection} actions={actions} />
      <ContentComponent selection={selection} actions={actions} />
    </div>
  )
}
export default TrashContent
