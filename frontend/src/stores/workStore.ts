import { Work } from '@types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorkState {
  works: Work[]
  currentWork: Work | null
  setCurrentWork: (work: Work | null) => void
  updateWork: (work: Work) => void
  addWork: (work: Work) => void
  deleteWork: (id: number) => void
}

export const useWorkStore = create(
  persist<WorkState>(
    (set) => ({
      works: [],
      currentWork: null,
      setCurrentWork: (work) => set({ currentWork: work }),
      updateWork: (updatedWork) =>
        set((state) => ({
          works: state.works.map((w) =>
            w.id === updatedWork.id ? updatedWork : w,
          ),
          currentWork: updatedWork,
        })),
      addWork: (newWork) =>
        set((state) => ({
          works: [...state.works, newWork],
        })),
      deleteWork: (id) =>
        set((state) => ({
          works: state.works.filter((w) => w.id !== id),
          currentWork: state.currentWork?.id === id ? null : state.currentWork,
        })),
    }),
    {
      name: 'work-storage',
      getStorage: () => localStorage,
    },
  ),
)
