import React from 'react'

import { Link } from 'react-router-dom'

const LeftHeader: React.FC = () => {
  return (
    <div>
      <Link
        to="/"
        className="from-redorange to-orange dark:from-blue dark:to-skyblue bg-gradient-to-b bg-clip-text text-2xl font-bold text-transparent"
      >
        Owing.
      </Link>
    </div>
  )
}

const RightHeader: React.FC = () => {
  return (
    <nav className="flex items-center space-x-12">
      <Link
        to="/"
        className="from-redorange to-orange dark:from-blue dark:to-skyblue bg-gradient-to-b bg-clip-text font-bold text-transparent"
      >
        How to use
      </Link>
      <Link
        to="/"
        className="from-redorange to-orange dark:from-blue dark:to-skyblue bg-gradient-to-b bg-clip-text font-bold text-transparent"
      >
        Login
      </Link>
      <button className="from-redorange to-orange dark:from-blue dark:to-skyblue rounded-full bg-gradient-to-r px-6 py-2 font-bold text-white">
        Contact us
      </button>
    </nav>
  )
}

interface HeaderProps {
  isTabOpen: boolean
}

const Header = ({ isTabOpen }: HeaderProps) => {
  return (
    <header
      className={`dark:bg-darkblack ${isTabOpen ? 'justify-end' : 'justify-between'} inset-0 flex h-auto w-full items-center bg-white px-8 py-2`}
    >
      {!isTabOpen && <LeftHeader />}
      <RightHeader />
    </header>
  )
}

export default Header
