import axiosInstance from '@utils/httpCommons'

import { putUploadImageToS3 } from './s3Service'

import { ProjectSummary } from '@types'

export const postCreateProject = async (
  title: string,
  description: string,
  category: string,
  genres: string[],
  coverUrl: string,
): Promise<ProjectSummary> => {
  try {
    const payload = {
      title,
      description,
      category,
      genres,
      coverUrl,
    }
    const response = await axiosInstance.post('/projects', payload)
    await putUploadImageToS3(response.data.presignedUrl, coverUrl)
    return response.data
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const postGenerateAiImage = async (
  title: string,
  description: string,
  category: string,
  genres: string[],
): Promise<string> => {
  try {
    const payload = {
      title,
      description,
      category,
      genres,
    }
    const response = await axiosInstance.post('/projects/image', payload)
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

export const putProject = async (
  projectId: number,
  title: string,
  description: string,
  category: string,
  genres: string[],
  coverUrl: string,
): Promise<void> => {
  try {
    const payload = {
      title,
      description,
      category,
      genres,
      coverUrl,
    }
    await axiosInstance.post(`/projects/${projectId}`, payload)
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    await axiosInstance.post(`/projects/${projectId}`)
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}
