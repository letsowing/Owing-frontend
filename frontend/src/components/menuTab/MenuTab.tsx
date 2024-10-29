import React from 'react'

import DarkModeToggle from '@components/common/DarkModeToggle'

import { useThemeStore } from '@stores/themeStore'

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
  return (
    <nav
      className="flex h-full flex-col bg-white dark:bg-darkblack"
      style={style}
    >
      <div className="flex items-center justify-between p-3">
        {isTabOpen && (
          <img
            src={isDarkMode ? DarkHeaderOwing : HeaderOwing}
            alt={isDarkMode ? 'DarkHeaderOwing' : 'HeaderOwing'}
            className="mx-auto ml-2 mt-4 h-auto w-[120px]"
          />
        )}
        <button
          onClick={onToggle}
          className="ml-auto text-gray dark:text-coldbeige"
        >
          {isTabOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>
      </div>
      <div className="flex-grow overflow-x-hidden">
        <MenuTabList onItemClick={onItemClick} />
      </div>
      <div className="p-4">{isTabOpen && <DarkModeToggle />}</div>
    </nav>
  )
}

export default MenuTab
