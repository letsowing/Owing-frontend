import axiosInstance from '@utils/httpCommons'

import { Cast, CastCoord, CastGraph, CastRelationship } from '@types'

// GET /api/casting/{castingId}
export const getCast = async (castingId: string): Promise<Cast> => {
  try {
    const response = await axiosInstance.get<Cast>(`/casting/${castingId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}
export const putCast = async (data: Cast): Promise<Cast> => {
  try {
    console.log(data)
    const response = await axiosInstance.put<Cast>(`/casting/${data.id}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update cast:', error)
    throw error
  }
}

// DELETE /api/casting/{castingId}
export const deleteCast = async (castingId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/casting/${castingId}`)
  } catch (error) {
    console.error('Failed to delete cast:', error)
    throw error
  }
}

// PUT /api/casting/{castingId}/coord
export const putCastCoord = async (
  castingId: string,
  data: CastCoord,
): Promise<Cast> => {
  try {
    const response = await axiosInstance.put<Cast>(
      `/casting/${castingId}/coord`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update cast coord:', error)
    throw error
  }
}

// PUT /api/casting/relationship/{uuid}
export const putCastRelationship = async (
  uuid: string,
  data: CastRelationship,
): Promise<CastRelationship> => {
  try {
    const response = await axiosInstance.put<CastRelationship>(
      `/casting/relationship/${uuid}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update cast relationship:', error)
    throw error
  }
}

// DELETE /api/casting/relationship/{uuid}
export const deleteCastRelationship = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/casting/relationship/${uuid}`)
  } catch (error) {
    console.error('Failed to delete cast relationship:', error)
    throw error
  }
}

// GET /api/casting
export const getCasts = async (folderId: string): Promise<Cast[]> => {
  try {
    const response = await axiosInstance.get<Cast[]>(
      `/casting?folderId=${folderId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get casts:', error)
    throw error
  }
}

export const postCast = async (cast: Partial<Cast>): Promise<Cast> => {
  const response = await axiosInstance.post<Cast>('/casting', cast)
  return response.data
}

// POST /api/casting/relationship
export const postCastRelationship = async (
  data: CastRelationship,
): Promise<CastRelationship> => {
  try {
    const response = await axiosInstance.post<CastRelationship>(
      '/casting/relationship',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to create cast relationship:', error)
    throw error
  }
}

// POST /api/casting/image
export const uploadCastImage = async (data: Partial<Cast>): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>('/casting/image', data)
    return response.data
  } catch (error) {
    console.error('Failed to upload cast image:', error)
    throw error
  }
}

// GET /api/casting/graph
export const getCastGraph = async (projectId: number): Promise<CastGraph> => {
  try {
    const response = await axiosInstance.get<CastGraph>(
      `/casting/graph?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get cast graph:', error)
    throw error
  }
}
