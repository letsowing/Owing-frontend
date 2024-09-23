import useThemeStore from '@/stores/themeStore'

const ThemeToggleSwitch = () => {
  const { toggleDarkMode } = useThemeStore()

  return (
    <div className="bg-beige dark:bg-coldbeige rounded-lg p-2 font-semibold">
      <button
        onClick={toggleDarkMode}
        className="relative h-12 w-48 rounded-full"
      >
        <div className="absolute top-1 h-10 w-24 translate-x-1 rounded-lg bg-white transition-transform duration-300 ease-in-out dark:translate-x-24"></div>
        <div className="flex items-center justify-between px-8">
          <span className="text-orange dark:text-gray z-10">Light</span>
          <span className="text-gray dark:text-blue z-10">Dark</span>
        </div>
      </button>
    </div>
  )
}

export default ThemeToggleSwitch
