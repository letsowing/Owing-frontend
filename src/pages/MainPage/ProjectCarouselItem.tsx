import { useThemeStore } from '@stores/themeStore'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'

interface ProjectProps {
  id: number
  title: string
  createdAt: Date
  imageUrl: string
  onProjectClick: () => void
}

const ProjectCarouselItem = ({
  title,
  createdAt,
  imageUrl,
  onProjectClick,
}: ProjectProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const defaultImage = isDarkMode ? DarkAlertOwing : AlertOwing

  return (
    <div
      className="my-1 flex h-48 w-36 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-md dark:bg-coldbeige"
      onClick={onProjectClick}
    >
      <div className="flex flex-1 bg-white">
        <img
          className="h-36 w-full bg-cover"
          src={imageUrl ? imageUrl : defaultImage}
        />
      </div>
      <div className="flex flex-col">
        <label className="mt-1 cursor-pointer truncate px-2 text-sm font-medium dark:text-gray">
          {title}
        </label>
        <label className="mx-auto mb-1 cursor-pointer text-[11px] font-normal dark:text-gray">
          {new Date(createdAt).toLocaleDateString()}{' '}
          {new Date(createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </label>
      </div>
    </div>
  )
}

export default ProjectCarouselItem
