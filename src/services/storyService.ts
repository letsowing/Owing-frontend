import axiosInstance from '@utils/httpCommons'

import { Message, SpellingError } from '@types'

export const getStory = async (
  storyId: number,
): Promise<{
  storyId: number
  name: string
  description?: string
  textCount: number
  content?: string
}> => {
  try {
    const response = await axiosInstance.get(`/stories/${storyId}`)
    return response.data
  } catch (error) {
    console.error('시나리오 조회 실패:', error)
    throw error
  }
}

export const postStory = async (
  storyId: number,
  data: {
    content: string
  },
): Promise<{ content: string }> => {
  try {
    const response = await axiosInstance.post(`/stories/${storyId}`, data)
    return response.data
  } catch (error) {
    console.error('시나리오 저장 실패:', error)
    throw error
  }
}

export const putStory = async (
  fileId: number,
  data: { name: string; description: string },
): Promise<void> => {
  try {
    await axiosInstance.put(`stories/${fileId}`, data)
    console.log('파일이 성공적으로 저장되었습니다.')
  } catch (error) {
    console.error('파일 저장 실패:', error)
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
  async (storyId: number, content: string): Promise<void> => {
    try {
      await postStory(storyId, { content: content })
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

export const postStoryConflictCheck = async (
  storyId: number,
  data: { projectId: number },
): Promise<{
  items: Message[]
}> => {
  try {
    const response = await axiosInstance.post(
      `/stories/${storyId}/crash-check`,
      data,
    )
    return response.data
  } catch (error) {
    console.error('설정 충돌 검사 실패:', error)
    throw error
  }
}

export const postSpellingCheck = async (
  storyId: number,
): Promise<SpellingError[]> => {
  try {
    const response = await axiosInstance.post<SpellingError[]>(
      `/stories/${storyId}/spell-check`,
    )
    return response.data
  } catch (error) {
    console.error('맞춤법 검사 실패:', error)
    throw error
  }
}
