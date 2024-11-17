import axiosInstance from '@utils/httpCommons'

import {
  FileItem,
  FolderItem,
  PatchFilePositionRequest,
  PatchFolderPositionRequest,
  PostFileRequest,
} from '@types'

const createDirectoryService = (path: string) => ({
  // 폴더 관련 함수
  getFolders: async (parentId: number): Promise<FolderItem[]> => {
    try {
      const response = await axiosInstance.get(
        `${path}/folders?parentId=${parentId}`,
      )
      return response.data.folderList
    } catch (error) {
      console.error('폴더 목록 조회 실패:', error)
      throw error
    }
  },

  getFolder: async (projectId: number): Promise<FolderItem[]> => {
    try {
      const response = await axiosInstance.get(`${path}/folders/${projectId}`)
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
      const response = await axiosInstance.post(`${path}/folders/dnd`, data)
      return response.data
    } catch (error) {
      console.error('새 폴더 생성 실패:', error)
      throw error
    }
  },

  patchFolderTitle: async (
    folderId: string,
    data: { name: string },
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/folders/${folderId}/title`, data)
      console.log('폴더가 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('폴더 수정 실패:', error)
      throw error
    }
  },

  patchFolderPosition: async (
    folderId: number,
    { beforeId, afterId, projectId }: PatchFolderPositionRequest,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/folders/${folderId}/position`, {
        beforeId,
        afterId,
        projectId,
      })
    } catch (error) {
      console.error('폴더 이동 실패:', error)
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

  postFile: async (data: PostFileRequest): Promise<FileItem> => {
    try {
      const response = await axiosInstance.post(`${path}/dnd`, data)
      return response.data
    } catch (error) {
      console.error('새 파일 생성 실패:', error)
      throw error
    }
  },

  patchFileTitle: async (
    fileId: number,
    data: { name: string },
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/${fileId}/title`, data)
      console.log('파일이 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('파일 저장 실패:', error)
      throw error
    }
  },

  patchFilePosition: async (
    fileId: number,
    data: PatchFilePositionRequest,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${path}/${fileId}/position`, data)
      console.log('파일이 성공적으로 이동되었습니다.')
    } catch (error) {
      console.error('파일 이동 실패:', error)
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
})

export const castDirectoryService = createDirectoryService('/cast')
export const universeDirectoryService = createDirectoryService('/universes')
export const storyDirectoryService = createDirectoryService('/stories')
