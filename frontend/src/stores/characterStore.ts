import { Character } from '@types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CharacterState {
  characters: Character[]
  setCharacters: (characters: Character[]) => void
  addCharacter: (character: Character) => void
  updateCharacter: (character: Character) => void
  deleteCharacter: (id: string) => void
}

export const useCharacterStore = create(
  persist<CharacterState>(
    (set) => ({
      characters: [],

      setCharacters: (characters: Character[]) =>
        set({
          characters: characters.map((char) => ({
            ...char,
            position: { ...char.position },
          })),
        }),

      addCharacter: (character: Character) => {
        set((state) => ({
          characters: [
            ...state.characters,
            {
              ...character,
              position: { ...character.position },
            },
          ],
        }))
      },

      updateCharacter: (character: Character) =>
        set((state) => ({
          characters: state.characters.map((char) =>
            char.id === character.id
              ? {
                  ...character,
                  position: { ...character.position },
                }
              : char,
          ),
        })),

      deleteCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((char) => char.id !== id),
        })),
    }),
    {
      name: 'character-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
