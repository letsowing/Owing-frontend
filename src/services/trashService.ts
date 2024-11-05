import axiosInstance from '@utils/httpCommons'

import { trashFolder } from '@datas/trash'

// 휴지통 리스트 조회
export const getTrashcansList = async (projectId: number) => {
  try {
    //const response = await axiosInstance.get(`/trashcans?project=${projectId}`)
    //return response.data
    console.log(projectId)
    return trashFolder
  } catch (error) {
    console.error('휴지통 리스트 조회 실패:', error)
    throw error
  }
}

// 휴지통 비우기
export const deleteTrashcans = async (projectId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/trashcans?project=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 비우기 실패:', error)
    throw error
  }
}

// 휴지통 요소 영구 삭제
export const deleteTrashcanElement = async (
  elementId: number,
  projectId: number,
) => {
  try {
    const response = await axiosInstance.delete(
      `/trashcans/${elementId}?project=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 요소 영구 삭제 실패:', error)
    throw error
  }
}

// 휴지통 요소 복원하기
export const postRestoreTrashcanElement = async (
  elementId: number,
  projectId: number,
) => {
  try {
    const response = await axiosInstance.post(
      `/trashcans/${elementId}?project=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 요소 복원 실패:', error)
    throw error
  }
}

// 휴지통 요소 원고 보여주기
export const getTrashcanElementStory = async (
  elementId: number,
  projectId: number,
) => {
  try {
    const response = await axiosInstance.get(
      `/trashcans/${elementId}/story?project=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 요소 원고 조회 실패:', error)
    throw error
  }
}

// 휴지통 요소 인물 보여주기
export const getTrashcanElementCast = async (
  elementId: number,
  projectId: number,
) => {
  try {
    // const response = await axiosInstance.get(
    //   `/trashcans/${elementId}/cast?project=${projectId}`,
    // )
    // return response.data
    console.log(elementId, projectId)
    return {
      id: 'cast123',
      name: '김배우',
      age: 28,
      gender: '남성',
      role: '주인공',
      description:
        '밝고 긍정적인 성격의 소프트웨어 엔지니어. 주변 사람들을 도와주는 것을 좋아하며 문제 해결에 탁월한 능력을 보임.',
      position: { x: 150, y: 200 },
      imageUrl: '',
    }
  } catch (error) {
    console.error('휴지통 요소 인물 조회 실패:', error)
    throw error
  }
}

// 휴지통 요소 세계관 보여주기
export const getTrashcanElementUniverse = async (
  elementId: number,
  projectId: number,
) => {
  try {
    const response = await axiosInstance.get(
      `/trashcans/${elementId}/universe?project=${projectId}`,
    )
    return response.data
  } catch (error) {
    console.error('휴지통 요소 세계관 조회 실패:', error)
    throw error
  }
}
