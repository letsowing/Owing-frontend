import axiosInstance from '@utils/httpCommons'

import { putUploadImageToS3 } from './s3Service'

export const postCreateWork = async (
  title: string,
  description: string,
  category: string,
  genres: string[],
  imageUrl: string,
): Promise<{
  id: number
  name: string
  presignedUrl: string
}> => {
  try {
    const payload = {
      title,
      description,
      category,
      genres,
      imageUrl,
    }
    const response = await axiosInstance.post('/project', payload)
    await putUploadImageToS3(response.data.presignedUrl, imageUrl)
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
    const response = await axiosInstance.post('/project/image', payload)
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('프로젝트 AI 표지 생성 실패:', error)
    throw error
  }
}

export const getAllWork = async (): Promise<{
  projects: {
    id: number
    title: string
    createdAt: Date
    updatedAt: Date
    imageUrl: string
  }[]
}> => {
  try {
    const response = await axiosInstance.get('/project')
    console.log(response.data)
    console.log()
    return response.data
  } catch (error) {
    console.error('프로젝트 리스트 조회 실패:', error)
    throw error
  }
}
