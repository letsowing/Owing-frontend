import EmptyTrash from './EmptyTrash'
import StoryContentItem from './StoryContentItem'

import { TrashContentProps } from '@types'

const StoryTrashContent: React.FC<TrashContentProps> = ({ selection }) => {
  if (!selection.selectedFile || !selection.selectedFolder) {
    return <EmptyTrash />
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-6 xs:grid-cols-3 sm:grid-cols-4">
      {selection.selectedFolder &&
        selection.selectedFolder.files.map((file) => (
          <StoryContentItem
            key={file.id}
            name={file.name}
            description={file.description}
          />
        ))}
    </div>
  )
}

export default StoryTrashContent
