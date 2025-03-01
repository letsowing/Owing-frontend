import { useThemeStore } from '@stores/themeStore'
import { Sun, Moon } from 'lucide-react'

const ThemeToggleSwitch = () => {
  const { toggleDarkMode, isDarkMode } = useThemeStore()

  return (
    <button
        onClick={toggleDarkMode}
        className="relative h-8 w-8 rounded-full"
      >
        { isDarkMode ? <Sun /> : <Moon /> }
      </button>
  )
}

export default ThemeToggleSwitch
