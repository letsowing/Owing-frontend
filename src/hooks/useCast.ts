import { useCallback } from 'react'

import {
  deleteCast as deleteCastAPI,
  getCast,
  postCast,
  putCast,
} from '@services/castService'
import { CastPostRequest, CastPutRequest } from '@types'

export const useCast = () => {
  const handleAddCast = useCallback(async (castData: CastPostRequest) => {
    try {
      const newCast = await postCast(castData)
      return newCast
    } catch (error) {
      console.error('Failed to add cast:', error)
      throw error
    }
  }, [])

  const handleUpdateCast = useCallback(
    async (castId: string, castData: CastPutRequest) => {
      try {
        await putCast(castId, castData)
      } catch (error) {
        console.error('Failed to update cast:', error)
        throw error
      }
    },
    [],
  )

  const handleDeleteCast = useCallback(async (castId: string) => {
    try {
      await deleteCastAPI(castId)
    } catch (error) {
      console.error('Failed to delete cast:', error)
      throw error
    }
  }, [])

  const handleGetCast = useCallback(async (castId: string) => {
    try {
      const data = await getCast(castId)
      return data.cast
    } catch (error) {
      console.error('Failed to fetch cast:', error)
      throw error
    }
  }, [])

  return {
    addCast: handleAddCast,
    updateCast: handleUpdateCast,
    deleteCast: handleDeleteCast,
    getCast: handleGetCast,
  }
}
