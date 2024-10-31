import { useCallback } from 'react'

import { useCharacterStore } from '@stores/characterStore'

import { Character } from '@types'

export const useCharacter = () => {
  const {
    characters,
    setCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
  } = useCharacterStore(
    useCallback(
      (state) => ({
        characters: state.characters,
        setCharacters: state.setCharacters,
        addCharacter: state.addCharacter,
        updateCharacter: state.updateCharacter,
        deleteCharacter: state.deleteCharacter,
      }),
      [],
    ),
  )

  const handleSetCharacters = useCallback(
    (newCharacters: Character[]) => {
      setCharacters(newCharacters)
    },
    [setCharacters],
  )

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
    (id: string) => characters.find((char) => char.id === id),
    [characters],
  )

  return {
    characters,
    setCharacters: handleSetCharacters,
    addCharacter: handleAddCharacter,
    updateCharacter: handleUpdateCharacter,
    deleteCharacter: handleDeleteCharacter,
    getCharacterById,
  }
}
