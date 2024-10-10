import axiosInstance from '@utils/httpCommons'

import { PartialBlock } from '@blocknote/core'

export interface Scenario {
  id: number
  title: string
  content: PartialBlock[]
}

export const getScenario = async (id: number): Promise<Scenario> => {
  try {
    const response = await axiosInstance.get(`/storyBlock/${id}`)
    return response.data
  } catch (error) {
    console.error('시나리오 조회 실패:', error)
    throw error
  }
}

export const postScenario = async (): Promise<Scenario> => {
  try {
    const response = await axiosInstance.post('/storyBlock')
    return response.data
  } catch (error) {
    console.error('새 시나리오 생성 실패:', error)
    throw error
  }
}

export const putScenario = async (
  id: number,
  content: PartialBlock[],
): Promise<void> => {
  try {
    await axiosInstance.put(`/storyBlock/${id}`, { content })
    console.log('시나리오가 성공적으로 저장되었습니다.')
  } catch (error) {
    console.error('시나리오 저장 실패:', error)
    throw error
  }
}

export const deleteScenario = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/storyBlock/${id}`)
    console.log('시나리오가 성공적으로 삭제되었습니다.')
  } catch (error) {
    console.error('시나리오 삭제 실패:', error)
    throw error
  }
}

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number,
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return ((...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    return new Promise<ReturnType<T>>((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(func(...args))
      }, delay)
    })
  }) as T
}

export const debouncedSave = debounce(
  async (id: number, content: PartialBlock[]): Promise<void> => {
    try {
      await putScenario(id, content)
      console.log('시나리오가 성공적으로 저장되었습니다.')
    } catch (error) {
      console.error(
        '시나리오 저장 실패:',
        error instanceof Error ? error.message : '알 수 없는 오류',
      )
    }
  },
  7000,
)
