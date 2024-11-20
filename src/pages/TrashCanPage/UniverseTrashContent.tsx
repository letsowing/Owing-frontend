import { useThemeStore } from '@stores/themeStore'

import EmptyTrash from './EmptyTrash'
import UniverseContentItem from './UniverseContentItem'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'
import { TrashContentProps } from '@types'

const UniverseTrashContent: React.FC<TrashContentProps> = ({ selection }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  if (!selection.selectedFile || !selection.selectedFolder) {
    return <EmptyTrash />
  }

  return (
    <>
      <div className="w-full px-4 pb-2 text-darkgray dark:text-white">
        <h3 className="ms-5 text-2xl font-semibold">
          {selection.selectedFolder?.name}
        </h3>
        <p className="my-5 text-[18px] text-gray">
          {selection.selectedFolder?.description}
        </p>
      </div>
      <div className="flex flex-grow flex-col py-2">
        {selection.selectedFolder &&
          selection.selectedFolder.files.map((file) => (
            <UniverseContentItem
              key={`${selection.selectedFolder!.id}-${file.id}`}
              name={file.name}
              description={file.description}
              imageUrl={
                file.imageUrl || (isDarkMode ? DarkAlertOwing : AlertOwing)
              }
            />
          ))}
      </div>
    </>
  )
}
export default UniverseTrashContent
