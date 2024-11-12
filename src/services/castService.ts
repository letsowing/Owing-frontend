import axiosInstance from '@utils/httpCommons'

import {
  Cast,
  CastAiImageRequest,
  CastCoord,
  CastGraph,
  CastPostRequest,
  CastPutRequest,
  CastRelationship,
  PostCastRelationshipRequest,
} from '@types'

export const getCast = async (castId: string): Promise<Cast> => {
  try {
    const response = await axiosInstance.get<Cast>(`/cast/${castId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

export const postCast = async (cast: CastPostRequest): Promise<Cast> => {
  const response = await axiosInstance.post('/cast', cast)
  return {
    ...response.data,
    position: response.data.coordinate,
  }
}

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

export const deleteCast = async (castId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/${castId}`)
  } catch (error) {
    console.error('Failed to delete cast:', error)
    throw error
  }
}

export const patchCastCoord = async (
  castId: string,
  data: CastCoord,
): Promise<Cast> => {
  try {
    const response = await axiosInstance.patch<Cast>(`/cast/${castId}`, data)
    return response.data
  } catch (error) {
    console.error('Failed to update cast coord:', error)
    throw error
  }
}

// PUT /api/cast/relationship/{uuid}
export const patchCastRelationship = async (
  id: string,
  data: PostCastRelationshipRequest,
): Promise<CastRelationship> => {
  try {
    const response = await axiosInstance.put<CastRelationship>(
      `/cast/relationship/${id}`,
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

// POST /api/cast/relationship
export const postCastRelationship = async (
  data: PostCastRelationshipRequest,
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

export const getCastPresignedUrl = async (
  fileName: string,
): Promise<{
  presignedUrl: string
  fileURl: string
  fileName: string
}> => {
  try {
    const response = await axiosInstance.get(`/cast/files/${fileName}`)
    return response.data
  } catch (error) {
    console.error('인물 Presigned Url 생성 실패:', error)
    throw error
  }
}
