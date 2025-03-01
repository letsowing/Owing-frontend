import React, { useState } from 'react'

import useMemberStore from '@stores/memberStore'
import { useThemeStore } from '@stores/themeStore'

import useNavigation from '@hooks/useNavigation'

import DarkHeaderOwing from '@assets/common/DarkHeaderOwing.png'
import HeaderOwing from '@assets/common/HeaderOwing.png'

import { postLogout } from '@services/authService'

import LoginPopup from '@components/common/LoginPopup'
import ThemeToggleSwitch from '@/components/common/DarkModeToggle'

const LeftHeader: React.FC = () => {
  const { isDarkMode } = useThemeStore()
  const { goToLanding } = useNavigation()

  return (
    <>
      <button onClick={goToLanding}>
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
  const { goToLanding, goToContactUs, goToLogin, goToMain } = useNavigation()
  const { isLoggedIn, logout } = useMemberStore()
  const [ showPopup, setShowPopup ] = useState(false);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout()
      postLogout()
      goToLanding()
    } else {
      goToLogin()
    }
  }

  const handleMainRedirection = () => {
    if (isLoggedIn) {
      goToMain()
    } else {
      setShowPopup(true)
    }
  }

  return (
    <nav className="flex items-center space-x-12">
      <ThemeToggleSwitch />

      <button
        onClick={goToContactUs}
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        문의하기
      </button>
      <button
        onClick={handleAuthClick}
        className="bg-gradient-to-b from-redorange to-orange bg-clip-text font-bold text-transparent dark:from-blue dark:to-skyblue"
      >
        {isLoggedIn ? '로그아웃' : '로그인'}
      </button>

      <button
        onClick={handleMainRedirection}
        className="rounded-full bg-gradient-to-r from-redorange to-orange px-6 py-2 font-bold text-white dark:from-blue dark:to-skyblue"
      >
        메인으로
      </button>
      {showPopup && <LoginPopup onClose={() => setShowPopup(false)} />}
    </nav>
  )
}

interface HeaderProps {
  isTabOpen: boolean
}

const Header = ({ isTabOpen }: HeaderProps) => {
  return (
    <header
      className={`dark:bg-verydarkblack ${isTabOpen ? 'justify-end' : 'justify-between'} inset-0 flex h-auto w-full items-center bg-white px-8 py-2`}
    >
      {!isTabOpen && <LeftHeader />}
      <RightHeader />
    </header>
  )
}

export default Header
