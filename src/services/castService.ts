import axiosInstance from '@utils/httpCommons'

import {
  Cast,
  CastAiImageRequest,
  CastCoord,
  CastGraph,
  CastPostRequest,
  CastPutRequest,
  CastRelationship,
  FolderSummary,
  PostCastRelationshipRequest,
  getCastResponse,
} from '@types'

export const getCast = async (castId: string): Promise<getCastResponse> => {
  try {
    const response = await axiosInstance.get<getCastResponse>(`/cast/${castId}`)
    return response.data
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

export const getFolderList = async (
  projectId: number,
): Promise<FolderSummary[]> => {
  try {
    const response = await axiosInstance.get<FolderSummary[]>(
      `/cast/${projectId}/folderList`,
    )
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
export const deleteCastRelationship = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/relationship/${id}`)
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
  fileExtension: string,
): Promise<{
  presignedUrl: string
  fileUrl: string
}> => {
  try {
    const response = await axiosInstance.get(`/cast/files/${fileExtension}`)
    return response.data
  } catch (error) {
    console.error('인물 Presigned Url 생성 실패:', error)
    throw error
  }
}
