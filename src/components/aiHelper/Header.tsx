import React from 'react'

import { FcApproval } from 'react-icons/fc'

interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title = '호쇼기' }) => {
  return (
    <header className="flex items-center justify-between px-5 py-3">
      <div className="flex flex-col">
        <h1 className="flex items-center font-semibold">
          <span>{title}</span>
          <FcApproval className="ml-1" />
        </h1>
        <h1 className="font-semibold">오늘은 무엇을 도와드릴까요?</h1>
      </div>
    </header>
  )
}
