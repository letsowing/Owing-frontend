import axiosInstance from '@utils/httpCommons'

import { Work } from '@types'

export const getAllProject = async (): Promise<Work[]> => {
  try {
    const response = await axiosInstance.get('/project/load')
    return response.data
  } catch (error) {
    console.error('프로젝트 리스트 조회 실패:', error)
    throw error
  }
}
