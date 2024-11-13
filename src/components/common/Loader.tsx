import { useThemeStore } from '@stores/themeStore'

import '@assets/common/Loader.css'

const Loader = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  return (
    <div className={`loader ${isDarkMode ? 'dark' : ''}`}>
      <div className="bubble"></div>
      <div className="bubble"></div>
      <div className="bubble"></div>
    </div>
  )
}

export default Loader
