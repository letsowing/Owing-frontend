import React from 'react'

import { useThemeStore } from '@stores/themeStore'

import useNavigation from '@hooks/useNavigation'

import DarkHeaderOwing from '@assets/common/DarkHeaderOwing.png'
import HeaderOwing from '@assets/common/HeaderOwing.png'

const LeftHeader: React.FC = () => {
  const { isDarkMode } = useThemeStore()
  const { goToMain } = useNavigation()

  return (
    <>
      <button onClick={goToMain}>
        <img
          src={isDarkMode ? DarkHeaderOwing : HeaderOwing}
          alt={isDarkMode ? 'DarkHeaderOwing' : 'HeaderOwing'}
          className="mx-auto ml-2 mt-4 h-auto w-[120px]"
        />
      </button>
    </>
  )
}

const RightHeader: React.FC = () => {
  const { goToLanding, goToContactUs, goToLogin } = useNavigation()
  return (
    <nav className="flex items-center space-x-12">
      <button
        onClick={goToLanding}
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        How to use
      </button>

      <button
        onClick={goToLogin}
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        Logout
      </button>

      <button
        onClick={goToContactUs}
        className="rounded-full bg-gradient-to-r from-redorange to-orange px-6 py-2 font-bold text-white dark:from-blue dark:to-skyblue"
      >
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
