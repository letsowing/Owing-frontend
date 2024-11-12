import axiosInstance from '@utils/httpCommons'

export const putUniverseDescription = async (
  fileId: number,
  data: { name: string; description: string; imageUrl: string },
): Promise<void> => {
  try {
    await axiosInstance.put(`universes/${fileId}`, data)
    console.log('파일이 성공적으로 저장되었습니다.')
  } catch (error) {
    console.error('파일 저장 실패:', error)
    throw error
  }
}
