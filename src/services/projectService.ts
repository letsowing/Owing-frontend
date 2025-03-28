import { getImageExtensionFromBase64 } from '@utils/base64'
import axiosInstance from '@utils/httpCommons'

import { putUploadImageToS3 } from './s3Service'

import { Project, ProjectPutRequest, ProjectSummary } from '@types'

export const postCreateProject = async (
  title: string,
  description: string,
  category: string,
  genres: string[],
  coverUrl: string,
): Promise<ProjectSummary> => {
  try {
    if (coverUrl.startsWith('data:')) {
      const presignedUrlData = await getProjectPresignedUrl(
        getImageExtensionFromBase64(coverUrl),
      )
      await putUploadImageToS3(presignedUrlData.presignedUrl, coverUrl)
      coverUrl = presignedUrlData.fileUrl
    }
    const payload = {
      title,
      description,
      category,
      genres,
      coverUrl,
    }
    const response = await axiosInstance.post<ProjectSummary>(
      '/projects',
      payload,
    )
    return response.data
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const postProjectGenerateAiImage = async (
  title: string,
  description: string,
  category: string,
  genres: string[],
): Promise<{ imageUrl: string }> => {
  try {
    const payload = {
      title,
      description,
      category,
      genres,
    }
    const response = await axiosInstance.post('/projects/images', payload)
    return response.data
  } catch (error) {
    console.error('프로젝트 AI 표지 생성 실패:', error)
    throw error
  }
}

export const getAllProjects = async (
  sort: string,
): Promise<ProjectSummary[]> => {
  try {
    const response = await axiosInstance.get(`/projects?projectSort=${sort}`)
    return response.data.projectList.content
  } catch (error) {
    console.error('프로젝트 리스트 조회 실패:', error)
    throw error
  }
}

export const getProject = async (projectId: number): Promise<Project> => {
  try {
    const response = await axiosInstance.get(`/projects/${projectId}`)
    return response.data
  } catch (error) {
    console.error('프로젝트 리스트 조회 실패:', error)
    throw error
  }
}

export const putProject = async (
  projectId: number,
  data: ProjectPutRequest,
): Promise<void> => {
  try {
    if (data.coverUrl.startsWith('data:')) {
      const presignedUrlData = await getProjectPresignedUrl(
        getImageExtensionFromBase64(data.coverUrl),
      )
      await putUploadImageToS3(presignedUrlData.presignedUrl, data.coverUrl)
      data.coverUrl = presignedUrlData.fileUrl
    }
    await axiosInstance.put(`/projects/${projectId}`, data)
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/projects/${projectId}`)
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const getProjectPresignedUrl = async (
  fileExtension: string,
): Promise<{
  presignedUrl: string
  fileUrl: string
}> => {
  try {
    const response = await axiosInstance.get(`/projects/files/${fileExtension}`)
    return response.data
  } catch (error) {
    console.error('프로젝트 Presigned Url 생성 실패:', error)
    throw error
  }
}
