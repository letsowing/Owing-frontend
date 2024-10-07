import { World } from '@types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorldState {
  worlds: World[]
  currentWorld: World | null
  setCurrentWorld: (world: World | null) => void
  updateWorld: (world: World) => void
  addWorld: (world: World) => void
  deleteWorld: (id: number) => void
}

export const useWorldStore = create(
  persist<WorldState>(
    (set) => ({
      worlds: [],
      currentWorld: null,
      setCurrentWorld: (world) => set({ currentWorld: world }),
      updateWorld: (updatedWorld) =>
        set((state) => ({
          worlds: state.worlds.map((w) =>
            w.id === updatedWorld.id ? updatedWorld : w,
          ),
          currentWorld: updatedWorld,
        })),
      addWorld: (newWorld) =>
        set((state) => ({
          worlds: [...state.worlds, newWorld],
        })),
      deleteWorld: (id) =>
        set((state) => ({
          worlds: state.worlds.filter((w) => w.id !== id),
          currentWorld:
            state.currentWorld?.id === id ? null : state.currentWorld,
        })),
    }),
    {
      name: 'world-storage',
      getStorage: () => localStorage,
    },
  ),
)
