import axiosInstance from '@utils/httpCommons'

import {
  Cast,
  CastAiImageRequest,
  CastCoord,
  CastGraph,
  CastPostRequest,
  CastPutRequest,
  CastRelationship,
} from '@types'

// GET /api/cast/{castId}
export const getCast = async (castId: string): Promise<Cast> => {
  try {
    const response = await axiosInstance.get<Cast>(`/cast/${castId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

// PUT /api/cast/{castingId}
export const putCast = async (
  castId: string,
  cast: CastPutRequest,
): Promise<void> => {
  try {
    await axiosInstance.put<Cast>(`/cast/${castId}`, cast)
  } catch (error) {
    console.error('Failed to update cast:', error)
    throw error
  }
}

// DELETE /api/cast/{castingId}
export const deleteCast = async (castingId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/${castingId}`)
  } catch (error) {
    console.error('Failed to delete cast:', error)
    throw error
  }
}

// PUT /api/cast/{castingId}/coord
export const putCastCoord = async (
  castingId: string,
  data: CastCoord,
): Promise<Cast> => {
  try {
    const response = await axiosInstance.put<Cast>(
      `/cast/${castingId}/coord`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update cast coord:', error)
    throw error
  }
}

// PUT /api/cast/relationship/{uuid}
export const putCastRelationship = async (
  uuid: string,
  data: CastRelationship,
): Promise<CastRelationship> => {
  try {
    const response = await axiosInstance.put<CastRelationship>(
      `/cast/relationship/${uuid}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update cast relationship:', error)
    throw error
  }
}

// DELETE /api/cast/relationship/{uuid}
export const deleteCastRelationship = async (uuid: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/relationship/${uuid}`)
  } catch (error) {
    console.error('Failed to delete cast relationship:', error)
    throw error
  }
}

// GET /api/cast
export const getCasts = async (folderId: string): Promise<Cast[]> => {
  try {
    const response = await axiosInstance.get<Cast[]>(
      `/cast?folderId=${folderId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get casts:', error)
    throw error
  }
}

export const postCast = async (
  cast: Partial<CastPostRequest>,
): Promise<Cast> => {
  const response = await axiosInstance.post('/cast', cast)
  return {
    ...response.data,
    position: response.data.coordinate,
  }
}

// POST /api/cast/relationship
export const postCastRelationship = async (
  data: CastRelationship,
): Promise<CastRelationship> => {
  try {
    const response = await axiosInstance.post<CastRelationship>(
      '/cast/relationship',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to create cast relationship:', error)
    throw error
  }
}

// POST /api/cast/image
export const uploadCastImage = async (data: Partial<Cast>): Promise<string> => {
  try {
    const response = await axiosInstance.post<string>('/cast/image', data)
    return response.data
  } catch (error) {
    console.error('Failed to upload cast image:', error)
    throw error
  }
}

// GET /api/cast/graph
export const getCastGraph = async (projectId: number): Promise<CastGraph> => {
  try {
    const response = await axiosInstance.get<CastGraph>(
      `/cast/graph?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get cast graph:', error)
    throw error
  }
}

export const postCastGenerateAiImage = async (
  data: CastAiImageRequest,
): Promise<{ imageUrl: string }> => {
  try {
    const response = await axiosInstance.post('cast/images', data)
    return response.data
  } catch (error) {
    console.error('Failed to generate cast AI iamge:', error)
    throw error
  }
}
