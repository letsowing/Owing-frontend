import React from 'react'

import { Settings } from 'lucide-react'

interface HeaderProps {
  title?: string
  onSettingsClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  title = '호쇼기',
  onSettingsClick,
}) => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-3">
      <div className="flex items-center">
        <h1 className="flex items-center font-medium">
          <span>{title}</span>
          <span className="ml-2 text-yellow-400">⭐</span>
        </h1>
      </div>
      <button
        className="hover:bg-gray-100 rounded-lg p-2"
        onClick={onSettingsClick}
        aria-label="설정"
      >
        <Settings className="h-5 w-5" />
      </button>
    </header>
  )
}
