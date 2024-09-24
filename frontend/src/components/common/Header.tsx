import React from 'react'

import { Link } from 'react-router-dom'

const LeftHeader: React.FC = () => {
  return (
    <div>
      <Link
        to="/"
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text text-2xl font-bold text-transparent dark:from-blue dark:to-skyblue"
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
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        How to use
      </Link>
      <Link
        to="/"
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        Login
      </Link>
      <button className="rounded-full bg-gradient-to-r from-redorange to-orange px-6 py-2 font-bold text-white dark:from-blue dark:to-skyblue">
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
