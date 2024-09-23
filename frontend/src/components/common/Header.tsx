import React from 'react'

const LeftHeader: React.FC = () => {
  return (
    <div>
      <a
        href="/"
        className="from-redorange to-orange bg-gradient-to-b bg-clip-text text-2xl font-bold text-transparent"
      >
        Owing.
      </a>
    </div>
  )
}

const RightHeader: React.FC = () => {
  return (
    <nav className="flex items-center space-x-12">
      <a className="from-redorange to-orange bg-gradient-to-b bg-clip-text font-bold text-transparent">
        How to use
      </a>
      <a className="from-redorange to-orange bg-gradient-to-b bg-clip-text font-bold text-transparent">
        Login
      </a>
      <button className="from-redorange to-orange rounded-full bg-gradient-to-r px-6 py-2 font-bold text-white">
        Contact us
      </button>
    </nav>
  )
}

const Header: React.FC = () => {
  return (
    <header className="inset-0 flex h-auto w-full items-center justify-between bg-white px-8 py-4">
      <LeftHeader />
      <RightHeader />
    </header>
  )
}

export default Header
