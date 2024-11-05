import { useThemeStore } from '@stores/themeStore'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'

const EmptyFolder = ({ isFolderEmpty }: { isFolderEmpty: boolean }) => {
  const { isDarkMode } = useThemeStore()

  return (
    <div className="mt-[200px] text-center">
      {isDarkMode ? (
        <img
          src={DarkAlertOwing}
          alt="DarkAlertOwing"
          className="mx-auto mb-4 h-auto w-24"
        />
      ) : (
        <img
          src={AlertOwing}
          alt="AlertOwing"
          className="mx-auto mb-4 h-auto w-24"
        />
      )}
      <div className="text-redorange dark:text-skyblue">
        {isFolderEmpty ? '폴더를 생성해 주세요!' : '파일을 생성해 주세요!'}
      </div>
    </div>
  )
}

export default EmptyFolder
