import React from 'react'

import MenuTabList from './MenuTabList'

import DarkModeToggle from '@/components/common/DarkModeToggle'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MenuTabProps {
  style?: React.CSSProperties
  isTabOpen: boolean
  onToggle: () => void
}

const MenuTab: React.FC<MenuTabProps> = ({ style, isTabOpen, onToggle }) => {
  return (
    <nav
      className="dark:bg-darkblack flex h-full flex-col bg-white transition-all duration-300 ease-in-out"
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
        <MenuTabList />
      </div>
      <div className="p-4">{isTabOpen && <DarkModeToggle />}</div>
    </nav>
  )
}

export default MenuTab
