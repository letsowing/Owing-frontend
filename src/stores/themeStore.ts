import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface ThemeState {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode
          document.documentElement.classList.toggle('dark', newDarkMode)
          return { isDarkMode: newDarkMode }
        }),
    }),
    {
      name: 'dark-mode',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        // 초기 로드 시 다크 모드 클래스 적용
        if (state?.isDarkMode) {
          document.documentElement.classList.add('dark')
        }
      },
    },
  ),
)
