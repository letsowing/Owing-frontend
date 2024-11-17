import { TrashContentProps } from '@types'

const StoryTrashDetail = ({ selection }: TrashContentProps) => {
  if (!selection.selectedFile || !selection.selectedFolder) {
    return null
  }

  return <div className="p-6">{selection.selectedFile.name}</div>
}

export default StoryTrashDetail
