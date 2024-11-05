import { Cast } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CastState {
  casts: Cast[]
  setCasts: (casts: Cast[]) => void
  addCast: (cast: Cast) => void
  updateCast: (cast: Cast) => void
  deleteCast: (id: string) => void
}

export const useCastStore = create(
  persist<CastState>(
    (set) => ({
      casts: [],

      setCasts: (casts: Cast[]) =>
        set({
          casts: casts.map((char) => ({
            ...char,
            position: { ...char.position },
          })),
        }),

      addCast: (cast: Cast) => {
        set((state) => ({
          casts: [
            ...state.casts,
            {
              ...cast,
              position: { ...cast.position },
            },
          ],
        }))
      },

      updateCast: (cast: Cast) =>
        set((state) => ({
          casts: state.casts.map((char) =>
            char.id === cast.id
              ? {
                  ...cast,
                  position: { ...cast.position },
                }
              : char,
          ),
        })),

      deleteCast: (id) =>
        set((state) => ({
          casts: state.casts.filter((char) => char.id !== id),
        })),
    }),
    {
      name: 'cast-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
