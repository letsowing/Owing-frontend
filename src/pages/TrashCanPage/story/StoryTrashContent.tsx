import EmptyTrash from '../EmptyTrash'
import StoryContentItem from './StoryContentItem'
import StoryTrashDetail from './StoryTrashDetail'

import { FileItem, TrashContentProps } from '@types'

const StoryTrashContent: React.FC<TrashContentProps> = ({
  selection,
  actions,
}) => {
  if (!selection.selectedFile || !selection.selectedFolder) {
    return <EmptyTrash />
  }

  const handleSelectItem = (file: FileItem) => {
    actions.onFileSelect(file)
    actions.setIsStoryDetail(true)
  }

  return (
    <>
      {selection.isStoryDetail ? (
        <StoryTrashDetail selection={selection} actions={actions} />
      ) : (
        <div className="grid grid-cols-2 gap-4 p-6 xs:grid-cols-3 sm:grid-cols-4">
          {selection.selectedFolder &&
            selection.selectedFolder.files.map((file) => (
              <StoryContentItem
                key={`${selection.selectedFolder!.id}-${file.id}`}
                name={file.name}
                description={file.description}
                onClickStoryTrash={() => handleSelectItem(file)}
              />
            ))}
        </div>
      )}
    </>
  )
}

export default StoryTrashContent
