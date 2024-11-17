import axiosInstance from '@utils/httpCommons'

// 휴지통 리스트 조회
export const getTrashcanList = async (projectId: number) => {
  try {
    const response = await axiosInstance.get(
      `/trashcans/folders?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 리스트 조회 실패:', error)
    throw error
  }
}

// 휴지통 비우기
export const deleteAllTrashes = async (projectId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/trashcans/folders?projectId=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 비우기 실패:', error)
    throw error
  }
}

//휴지통 요소 영구 삭제
export const deleteTrashcanFile = async (trashId: number) => {
  try {
    const response = await axiosInstance.delete(`/trashcans/${trashId}`)
    return response.data
  } catch (error) {
    console.error('휴지통 요소 영구 삭제 실패:', error)
    throw error
  }
}

//휴지통 요소 복원하기
export const postRestoreTrashcanFile = async (trashId: number) => {
  try {
    const response = await axiosInstance.post(`/trashcans/${trashId}`)
    return response.data
  } catch (error) {
    console.error('휴지통 요소 복원 실패:', error)
    throw error
  }
}

//휴지통 폴더 영구 삭제
export const deleteTrashcanFolder = async (trashId: number) => {
  try {
    const response = await axiosInstance.delete(`/trashcans/folders/${trashId}`)
    return response.data
  } catch (error) {
    console.error('휴지통 요소 영구 삭제 실패:', error)
    throw error
  }
}

//휴지통 폴더 복원하기
export const postRestoreTrashcanFolder = async (trashId: number) => {
  try {
    const response = await axiosInstance.post(`/trashcans/folders/${trashId}`)
    return response.data
  } catch (error) {
    console.error('휴지통 요소 복원 실패:', error)
    throw error
  }
}

//휴지통 개별 요소 가져오기
export const getTrashcanContent = async (
  trashId: number,
  contentType: string, // story/cast/universe
) => {
  try {
    const response = await axiosInstance.get(
      `/trashcans/${trashId}/${contentType}`,
    )
    return response.data
  } catch (error) {
    console.error(`휴지통 ${contentType} 조회 실패:`, error)
    throw error
  }
}

//휴지통 개별 폴더 가져오기
export const getTrashcanFolderContent = async (
  trashId: number,
  contentType: string, // story/cast/universe
) => {
  try {
    const response = await axiosInstance.get(`/trashcans/folders/${trashId}`)
    return response.data
  } catch (error) {
    console.error(`휴지통 폴더 ${contentType} 조회 실패:`, error)
    throw error
  }
}
