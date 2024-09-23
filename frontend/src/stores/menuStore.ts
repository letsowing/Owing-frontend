import { MenuPath } from '@/constants/menu'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface MenuState {
  activePath: MenuPath
  setActivePath: (path: MenuPath) => void
}

const useMenuStore = create<MenuState>()(
  persist(
    (set) => {
      const storedMenu = localStorage.getItem('menu')
      const initialActivePath: MenuPath = storedMenu
        ? JSON.parse(storedMenu).state.activePath
        : 'story'

      return {
        activePath: initialActivePath,
        setActivePath: (path) => set({ activePath: path }),
      }
    },
    {
      name: 'menu',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useMenuStore
