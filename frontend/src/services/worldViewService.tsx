import axiosInstance from '@utils/httpCommons'

interface Universe {
  data?: []
}

interface UniverseFolder {
  title: string
  description: string
}

export const getUniverseFolderList = async (): Promise<Universe> => {
  try {
    const response = await axiosInstance.get('/universe/folder/list')
    return response.data
  } catch (error) {
    console.error('세계관 폴더 리스트 조회 실패:', error)
    throw error
  }
}

export const postUniverseFolder = async (
  body: UniverseFolder,
): Promise<void> => {
  try {
    const response = await axiosInstance.post('/universe/folder/create', {
      body,
    })
    return response.data
  } catch (error) {
    console.error('세계관 폴더 생성 실패:', error)
    throw error
  }
}

export const putUniverseFolder = async (
  id: number,
  body: UniverseFolder,
): Promise<void> => {
  try {
    await axiosInstance.put(`/universe/folder/update/${id}`, { body })
    console.log('세계관 폴더가 성공적으로 수정되었습니다.')
  } catch (error) {
    console.error('세계관 폴더 수정 실패:', error)
    throw error
  }
}

export const deleteUniverseFolder = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/universe/folder/delete/${id}`)
    console.log('세계관 폴더가 성공적으로 삭제되었습니다.')
  } catch (error) {
    console.error('세계관 폴더 삭제 실패:', error)
    throw error
  }
}
