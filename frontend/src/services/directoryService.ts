import axiosInstance from '@utils/httpCommons'

import { FileItem, FolderItem } from '@types'

const createDirectoryService = (folderPath: string, filePath: string) => ({
  // 폴더 관련 함수
  getFolders: async (projectId: number): Promise<FolderItem[]> => {
    try {
      const response = await axiosInstance.get(
        `${folderPath}?projectId=${projectId}`,
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
      const response = await axiosInstance.post(`${folderPath}`, data)
      return response.data
    } catch (error) {
      console.error('새 폴더 생성 실패:', error)
      throw error
    }
  },

  putFolder: async (
    storyFolderId: string,
    data: {
      name: string
      description: string
    },
  ): Promise<void> => {
    try {
      await axiosInstance.put(`${folderPath}/${storyFolderId}`, data)
      console.log('폴더가 성공적으로 수정되었습니다.')
    } catch (error) {
      console.error('폴더 수정 실패:', error)
      throw error
    }
  },

  deleteFolder: async (storyFolderId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${folderPath}/${storyFolderId}`)
      console.log('폴더가 성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
      throw error
    }
  },

  moveFolder: async (
    storyFolderId: number,
    position: number,
  ): Promise<void> => {
    try {
      await axiosInstance.patch(`${folderPath}/${storyFolderId}`, {
        position,
      })
      console.log('폴더가 성공적으로 이동되었습니다.')
    } catch (error) {
      console.error('폴더 이동 실패:', error)
      throw error
    }
  },

  // 파일 관련 함수
  getFile: async (storyFolderId: number): Promise<FileItem> => {
    try {
      const response = await axiosInstance.get(
        `${filePath}?storyFolderId=${storyFolderId}`,
      )
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error('파일 조회 실패:', error)
      throw error
    }
  },

  postFile: async (data: {
    name: string
    description: string
    folderId: number
  }): Promise<FileItem> => {
    try {
      const response = await axiosInstance.post(`${filePath}`, data)
      return response.data
    } catch (error) {
      console.error('새 파일 생성 실패:', error)
      throw error
    }
  },

  putFile: async (
    fileId: number,
    data: { name: string; description: string },
  ): Promise<void> => {
    try {
      await axiosInstance.put(`${filePath}/${fileId}`, data)
      console.log('파일이 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error('파일 저장 실패:', error)
      throw error
    }
  },

  deleteFile: async (fileId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${filePath}/${fileId}`)
      console.log('파일이 성공적으로 삭제되었습니다.')
    } catch (error) {
      console.error('파일 삭제 실패:', error)
      throw error
    }
  },

  moveFile: async (
    storyPlotId: number,
    data: {
      position: number
      folderId: number
    },
  ): Promise<void> => {
    try {
      console.log(data, storyPlotId)
      await axiosInstance.patch(`${filePath}/${storyPlotId}`, data)
      console.log('파일이 성공적으로 이동되었습니다.')
    } catch (error) {
      console.error('파일 이동 실패:', error)
      throw error
    }
  },
})

export const characterDirectoryService = createDirectoryService(
  '/castingFolder',
  '/casting',
)
export const worldViewDirectoryService = createDirectoryService(
  '/universeFolder',
  '/universe',
)
export const scenarioDirectoryService = createDirectoryService(
  '/storyFolder',
  '/storyPlot',
)
