import axiosInstance from '@utils/httpCommons'

import {
  Cast,
  CastPostRequest,
  CastPutRequest,
  FileItem,
  FilePostRequest,
  FilePutRequest,
  FolderItem,
  UpdateFilePositionRequest,
  UpdateFolderPositionRequest,
} from '@types'

const createDirectoryService = (path: string) => ({
  // 폴더 관련 함수
  getFolders: async (projectId: number): Promise<FolderItem[]> => {
    try {
      const response = await axiosInstance.get(
        `${path}/folders?projectId=${projectId}`,
      )
      return response.data
    } catch (error) {
      console.error('폴더 목록 조회 실패:', error)
      throw error
    }
  },

  postFolder: async (data: {
    projectId: number
    name: string
    description: string
  }): Promise<FolderItem> => {
    try {
      const response = await axiosInstance.post(`${path}/folders`, data)
      return response.data
    } catch (error) {
      console.error('새 폴더 생성 실패:', error)
      throw error
    }
  },

  putFolder: async (
    folderId: string,
    data: {
      name: string
      description: string
    },
  ): Promise<void> => {
    try {
      await axiosInstance.put(`${path}/folders/${folderId}`, data)
      console.log('폴더가 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('폴더 수정 실패:', error)
      throw error
    }
  },

  deleteFolder: async (folderId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${path}/folders/${folderId}`)
      console.log('폴더가 성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
      throw error
    }
  },

  patchFolder: async (
    folderId: number,
    { beforeId, afterId }: UpdateFolderPositionRequest,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/folders/${folderId}`, {
        beforeId,
        afterId,
      })
    } catch (error) {
      console.error('폴더 이동 실패:', error)
      throw error
    }
  },

  // 파일 관련 함수
  getFile: async (fileId: number): Promise<FileItem> => {
    try {
      const response = await axiosInstance.get(`${path}/${fileId}`)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('파일 조회 실패:', error)
      throw error
    }
  },

  postFile: async (data: FilePostRequest): Promise<FileItem> => {
    try {
      const response = await axiosInstance.post(`${path}`, data)
      return response.data
    } catch (error) {
      console.error('새 파일 생성 실패:', error)
      throw error
    }
  },

  postCast: async (cast: Partial<CastPostRequest>): Promise<FileItem> => {
    try {
      const response = await axiosInstance.post(`${path}`, cast)
      return response.data
    } catch (error) {
      console.error('새 파일 생성 실패:', error)
      throw error
    }
  },

  putFile: async (fileId: number, data: FilePutRequest): Promise<void> => {
    try {
      await axiosInstance.put(`${path}/${fileId}`, data)
      console.log('파일이 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('파일 저장 실패:', error)
      throw error
    }
  },

  putCast: async (castId: string, cast: CastPutRequest): Promise<void> => {
    try {
      await axiosInstance.put<Cast>(`${path}/${castId}`, cast)
    } catch (error) {
      console.error('Failed to update cast:', error)
      throw error
    }
  },

  deleteFile: async (fileId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${path}/${fileId}`)
      console.log('파일이 성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('파일 삭제 실패:', error)
      throw error
    }
  },

  patchFile: async (
    fileId: number,
    data: UpdateFilePositionRequest,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/${fileId}`, data)
      console.log('파일이 성공적으로 이동되었습니다.')
    } catch (error) {
      console.error('파일 이동 실패:', error)
      throw error
    }
  },
})

export const castDirectoryService = createDirectoryService('/cast')
export const universeDirectoryService = createDirectoryService('/universes')
export const storyDirectoryService = createDirectoryService('/stories')
