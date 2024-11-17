import { getImageExtensionFromBase64 } from '@utils/base64'
import axiosInstance from '@utils/httpCommons'

import { putUploadImageToS3 } from './s3Service'

import {
  Cast,
  CastCoord,
  CastGraph,
  CustomEdge,
  FolderSummary,
  PostCastRelationshipRequest,
  PostCastRelationshipResponse,
  PostCastRequest,
  PutCastRelationshipRequest,
  PutCastRequest,
  getCastResponse,
} from '@types'

// 캐릭터 단일 조회 => folderId와 Cast
export const getCast = async (castId: string): Promise<getCastResponse> => {
  try {
    const response = await axiosInstance.get<getCastResponse>(`/cast/${castId}`)
    return {
      folderId: response.data.folderId,
      cast: {
        ...response.data.cast,
        id: response.data.cast.id.toString(),
      },
    }
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

// 캐릭터 추가 시 폴더 선택 => {id, name}[]
export const getFolderList = async (
  projectId: number,
): Promise<FolderSummary[]> => {
  try {
    const response = await axiosInstance.get<FolderSummary[]>(
      `/cast/folders/${projectId}/dropdown`,
    )
    return response.data
  } catch (error) {
    console.error('Failed to get cast:', error)
    throw error
  }
}

// 인물관계도 전체 조회 => CastResponse[], CustomEdge[]
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

// 캐릭터 생성 => folderId, coordinate 추가
export const postCast = async (cast: PostCastRequest): Promise<Cast> => {
  try {
    cast.imageUrl = cast.imageUrl || ''
    if (cast.imageUrl.startsWith('data:')) {
      const presignedUrlData = await getCastPresignedUrl(
        getImageExtensionFromBase64(cast.imageUrl),
      )
      await putUploadImageToS3(presignedUrlData.presignedUrl, cast.imageUrl)
      cast.imageUrl = presignedUrlData.fileUrl
    }
    const response = await axiosInstance.post('/cast', cast)
    return {
      ...response.data,
      position: response.data.coordinate,
    }
  } catch (error) {
    console.error('Failed to update cast:', error)
    throw error
  }
}

// 캐릭터 수정 => coordinate 제거
export const putCast = async (
  castId: string,
  cast: PutCastRequest,
): Promise<void> => {
  try {
    cast.imageUrl = cast.imageUrl || ''
    if (cast.imageUrl.startsWith('data:')) {
      const presignedUrlData = await getCastPresignedUrl(
        getImageExtensionFromBase64(cast.imageUrl),
      )
      await putUploadImageToS3(presignedUrlData.presignedUrl, cast.imageUrl)
      cast.imageUrl = presignedUrlData.fileUrl
    }
    await axiosInstance.put<void>(`/cast/${castId}`, cast)
  } catch (error) {
    console.error('Failed to update cast:', error)
    throw error
  }
}

// 캐릭터 삭제
export const deleteCast = async (castId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/${castId}`)
  } catch (error) {
    console.error('Failed to delete cast:', error)
    throw error
  }
}

// 캐릭터 이동 => {x,y}
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

// 관계 생성
export const postCastRelationship = async (
  data: PostCastRelationshipRequest,
): Promise<PostCastRelationshipResponse> => {
  try {
    const response = await axiosInstance.post<PostCastRelationshipResponse>(
      '/cast/relationships',
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to create cast relationship:', error)
    throw error
  }
}

// 관계 라벨 수정 => label: string
export const patchCastRelationshipLabel = async (
  relationshipId: string,
  data: { label: string },
): Promise<void> => {
  try {
    await axiosInstance.patch<void>(
      `/cast/relationships/${relationshipId}/label`,
      data,
    )
  } catch (error) {
    console.error('Failed to update cast relationship:', error)
    throw error
  }
}

// 관계 handle 이동 => id를 제외한 CustomEdge 값
export const putCastRelationshipHandle = async (
  relationshipId: string,
  data: PutCastRelationshipRequest,
): Promise<CustomEdge> => {
  try {
    const response = await axiosInstance.put<CustomEdge>(
      `/cast/relationships/${relationshipId}`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('Failed to update cast relationship:', error)
    throw error
  }
}

// 관계 삭제
export const deleteCastRelationship = async (
  relationshipId: string,
): Promise<void> => {
  try {
    await axiosInstance.delete(`/cast/relationships/${relationshipId}`)
  } catch (error) {
    console.error('Failed to delete cast relationship:', error)
    throw error
  }
}

// image
export const postCastGenerateAiImage = async (data: {
  name: string
  age: number
  gender: string
  role: string
  description: string
}): Promise<{ imageUrl: string }> => {
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
