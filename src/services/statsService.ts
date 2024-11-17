import axiosInstance from '@utils/httpCommons'

export const getDailyStats = async (): Promise<{
  todayCount: number
  monthlyCount: number
  monthlyAvgCount: number
  graph: {
    date: Date
    dailyCount: number
  }[]
}> => {
  try {
    const response = await axiosInstance.get('/dashboard')
    return response.data
  } catch (error) {
    console.error('글자수 통계 데이터 조회 실패:', error)
    throw error
  }
}
