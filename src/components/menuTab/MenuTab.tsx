import React from 'react'

import { useThemeStore } from '@stores/themeStore'

import useNavigation from '@hooks/useNavigation'

import MenuTabList from './MenuTabList'

import DarkHeaderOwing from '@assets/common/DarkHeaderOwing.png'
import HeaderOwing from '@assets/common/HeaderOwing.png'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MenuTabProps {
  style?: React.CSSProperties
  isTabOpen: boolean
  onToggle: () => void
  onItemClick?: () => void
}

const MenuTab: React.FC<MenuTabProps> = ({
  style,
  isTabOpen,
  onToggle,
  onItemClick,
}) => {
  const { isDarkMode } = useThemeStore()
  const { goToMain } = useNavigation()

  return (
    <nav
      className="flex h-full flex-col border-e border-lightgray bg-white dark:border-coldbeige dark:bg-verydarkblack"
      style={style}
    >
      <div className="flex items-center justify-between p-3">
        {isTabOpen && (
          <img
            src={isDarkMode ? DarkHeaderOwing : HeaderOwing}
            alt={isDarkMode ? 'DarkHeaderOwing' : 'HeaderOwing'}
            className="ml-2 h-auto w-16 cursor-pointer"
            onClick={goToMain}
          />
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-gray dark:text-coldbeige"
        >
          {isTabOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      <div className="flex-grow overflow-x-hidden">
        <MenuTabList onItemClick={onItemClick} />
      </div>
    </nav>
  )
}

export default MenuTab
