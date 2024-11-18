import EmptyTrash from './EmptyTrash'
import UniverseContentItem from './UniverseContentItem'

import { TrashContentProps } from '@types'

const UniverseTrashContent: React.FC<TrashContentProps> = ({ selection }) => {
  if (!selection.selectedFile || !selection.selectedFolder) {
    return <EmptyTrash />
  }

  return (
    <>
      <div className="m-4">
        <h3 className="text-[24px] font-semibold">
          {selection.selectedFolder?.name}
        </h3>
        <p className="my-5 text-[18px] text-gray">
          {selection.selectedFolder?.description}
        </p>
      </div>
      <div className="flex flex-grow flex-col bg-[#FCFBFA] py-2">
        {selection.selectedFolder &&
          selection.selectedFolder.files.map((file) => (
            <UniverseContentItem
              key={`${selection.selectedFolder!.id}-${file.id}`}
              name={file.name}
              description={file.description}
              imageUrl=""
            />
          ))}
      </div>
    </>
  )
}
export default UniverseTrashContent
