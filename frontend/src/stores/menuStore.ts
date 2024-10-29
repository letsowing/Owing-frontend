import { MenuPath } from '@constants/menu'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MenuState {
  activePath: MenuPath
  setActivePath: (path: MenuPath) => void
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      activePath: 'scenarioManagement',
      setActivePath: (path: MenuPath) => set({ activePath: path }),
    }),
    {
      name: 'menu',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
