import { useCallback } from 'react'

import { useCastStore } from '@stores/castStore'

import { Cast } from '@types'

export const useCast = () => {
  const { casts, setCasts, addCast, updateCast, deleteCast } = useCastStore(
    useCallback(
      (state) => ({
        casts: state.casts,
        setCasts: state.setCasts,
        addCast: state.addCast,
        updateCast: state.updateCast,
        deleteCast: state.deleteCast,
      }),
      [],
    ),
  )

  const handleSetCasts = useCallback(
    (newCasts: Cast[]) => {
      setCasts(newCasts)
    },
    [setCasts],
  )

  const handleAddCast = useCallback(
    (cast: Cast) => {
      addCast(cast)
    },
    [addCast],
  )

  const handleUpdateCast = useCallback(
    (cast: Cast) => {
      updateCast(cast)
    },
    [updateCast],
  )

  const handleDeleteCast = useCallback(
    (id: string) => {
      deleteCast(id)
    },
    [deleteCast],
  )

  const getCastById = useCallback(
    (id: string) => casts.find((char) => char.id === id),
    [casts],
  )

  return {
    casts,
    setCasts: handleSetCasts,
    addCast: handleAddCast,
    updateCast: handleUpdateCast,
    deleteCast: handleDeleteCast,
    getCastById,
  }
}
