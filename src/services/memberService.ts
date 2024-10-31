import axiosInstance from '@utils/httpCommons'

import { Member } from '@types'

export const getMember = async (id: number): Promise<Member> => {
  try {
    const response = await axiosInstance.get(`/member/${id}`)
    return response.data
  } catch (error) {
    console.error('회원 조회 실패:', error)
    throw error
  }
}
