import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ThemeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => {
      const storedTheme = localStorage.getItem('dark-mode')
      const isDarkMode = storedTheme
        ? JSON.parse(storedTheme).state.isDarkMode
        : false

      // 초기 다크 모드 설정
      if (isDarkMode) {
        document.documentElement.classList.add('dark')
      }

      return {
        isDarkMode,
        toggleDarkMode: () => {
          set((state) => {
            document.documentElement.classList.toggle('dark', !state.isDarkMode)
            localStorage.setItem(
              'dark-mode',
              JSON.stringify({ state: { isDarkMode: !state.isDarkMode } }),
            )
            return { isDarkMode: !state.isDarkMode }
          })
        },
      }
    },
    {
      name: 'dark-mode',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useThemeStore
