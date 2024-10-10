import axiosInstance from '@utils/httpCommons'

import { Work } from '@types'

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
    return response.data
  } catch (error) {
    console.error('프로젝트 생성 실패:', error)
    throw error
  }
}

export const getAllProject = async (): Promise<Work[]> => {
  try {
    const response = await axiosInstance.get('/project/load')
    return response.data
  } catch (error) {
    console.error('프로젝트 리스트 조회 실패:', error)
    throw error
  }
}
