import axiosInstance from '@utils/httpCommons'

export const getStory = async (storyId: number): Promise<void> => {
  try {
    const response = await axiosInstance.get(`/stories/${storyId}`)
    return response.data.blocks
  } catch (error) {
    console.error('시나리오 조회 실패:', error)
    throw error
  }
}

export const postStory = async (
  storyId: number,
  content: string,
): Promise<void> => {
  try {
    const response = await axiosInstance.post(`/stories/${storyId}`, content)
    return response.data
  } catch (error) {
    console.error('시나리오 저장 실패:', error)
    throw error
  }
}

export const putStoryDescription = async (
  fileId: number,
  data: { name: string; description: string },
): Promise<void> => {
  try {
    await axiosInstance.put(`universes/${fileId}`, data)
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
      await postStory(storyId, content)
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

export const postStoryConflict = async (
  id: number,
  targetStory: string,
): Promise<string> => {
  try {
    const payload = {
      targetStory,
    }
    const response = await axiosInstance.post(
      `/stories/${id}/findStoryConflict`,
      payload,
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('일관성 체크 실패:', error)
    throw error
  }
}
