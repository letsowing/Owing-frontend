import React from 'react'

import DarkModeToggle from '@components/common/DarkModeToggle'

import MenuTabList from './MenuTabList'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MenuTabProps {
  style?: React.CSSProperties
  isTabOpen: boolean
  onToggle: () => void
  onItemClick?: () => void // 항목 클릭 시 호출할 함수 추가
}

const MenuTab: React.FC<MenuTabProps> = ({
  style,
  isTabOpen,
  onToggle,
  onItemClick,
}) => {
  return (
    <nav
      className="flex h-full flex-col bg-white transition-all duration-300 ease-in-out dark:bg-darkblack"
      style={style}
    >
      <div className="flex items-center justify-between p-3">
        {isTabOpen && (
          <div className="bg-gradient-to-b from-redorange to-orange bg-clip-text text-2xl font-bold text-transparent dark:from-blue dark:to-skyblue">
            Owing
          </div>
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
