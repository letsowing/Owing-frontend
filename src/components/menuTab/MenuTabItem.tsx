import React from 'react'

import { ChevronDown, ChevronRight } from 'lucide-react'

interface MenuTabItemProps {
  icon: React.ElementType
  text: string
  isActive: boolean
  onClickMenu: () => void
}

const MenuTabItem: React.FC<MenuTabItemProps> = ({
  icon: Icon,
  text,
  isActive,
  onClickMenu,
}) => {
  let disabled = false
  if (text === '휴지통' || text === '도움말' || text === '설정') {
    disabled = !disabled
  }

  return (
    <div
      className={`flex cursor-pointer items-center justify-between p-3 ${
        isActive
          ? 'bg-beige text-redorange dark:bg-coldbeige dark:text-blue'
          : 'text-gray hover:bg-beige dark:text-coldbeige dark:hover:bg-coldbeige dark:hover:text-gray'
      }`}
      onClick={() => {
        if (!disabled) {
          onClickMenu()
        }
      }}
    >
      <div className="flex items-center">
        <Icon size={22} />
        <span className="ml-2">{text}</span>
      </div>
      {isActive ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
    </div>
  )
}

export default MenuTabItem
