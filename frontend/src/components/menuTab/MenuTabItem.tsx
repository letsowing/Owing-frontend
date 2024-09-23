import React from 'react'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { LiaFeatherAltSolid } from 'react-icons/lia'

interface MenuTabItemProps {
  text: string
  isActive: boolean
  onClick: () => void
}

const MenuTabItem: React.FC<MenuTabItemProps> = ({
  text,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between p-3 ${
        isActive
          ? 'bg-beige text-redorange dark:bg-coldbeige dark:text-blue'
          : 'hover:bg-beige dark:hover:bg-coldbeige text-gray'
      }`}
      onClick={() => {
        onClick()
      }}
    >
      <div className="flex items-center">
        <LiaFeatherAltSolid size={20} />
        <span className="ml-2">{text}</span>
      </div>
      {isActive ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
    </div>
  )
}

export default MenuTabItem
