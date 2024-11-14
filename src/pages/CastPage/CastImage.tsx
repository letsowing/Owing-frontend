import React from 'react'

import { useThemeStore } from '@stores/themeStore'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'

interface CastImageProps {
  imageUrl: string
}

const CastImage: React.FC<CastImageProps> = ({ imageUrl }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src={imageUrl ? imageUrl : isDarkMode ? DarkAlertOwing : AlertOwing}
        alt="Cast"
        className="h-full w-full rounded-xl object-cover"
      />
    </div>
  )
}

export default CastImage
