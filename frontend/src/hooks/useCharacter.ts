import { useCallback } from 'react'

import { useCharacterStore } from '@stores/characterStore'

import { Character } from '@types'

export const useCharacter = () => {
  const { characters, addCharacter, updateCharacter, deleteCharacter } =
    useCharacterStore()

  const handleAddCharacter = useCallback(
    (character: Character) => {
      addCharacter(character)
    },
    [addCharacter],
  )

  const handleUpdateCharacter = useCallback(
    (character: Character) => {
      updateCharacter(character)
    },
    [updateCharacter],
  )

  const handleDeleteCharacter = useCallback(
    (id: string) => {
      deleteCharacter(id)
    },
    [deleteCharacter],
  )

  const getCharacterById = useCallback(
    (id: string) => {
      return characters.find((char) => char.id === id)
    },
    [characters],
  )

  return {
    characters,
    addCharacter: handleAddCharacter,
    updateCharacter: handleUpdateCharacter,
    deleteCharacter: handleDeleteCharacter,
    getCharacterById,
  }
}
