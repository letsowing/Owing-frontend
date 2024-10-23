/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@utils/httpCommons'

import { PartialBlock } from '@blocknote/core'

export const getScenario = async (
  storyPlotId: number,
): Promise<PartialBlock[]> => {
  try {
    const response = await axiosInstance.get(
      `/storyPage?storyPlotId=${storyPlotId}`,
    )
    console.log(response.data.blocks)
    return response.data.blocks
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.log('시나리오를 찾을 수 없습니다. 새로 생성합니다.')
      return await postScenario({
        storyPlotId: storyPlotId,
        blocks: [], // 빈 블록으로 새 시나리오 생성
      })
    }
    console.error('시나리오 조회 실패:', error)
    throw error
  }
}
export const postScenario = async (data: {
  storyPlotId: number
  blocks: PartialBlock[]
}): Promise<PartialBlock[]> => {
  try {
    const response = await axiosInstance.post('/storyPage', data)
    return response.data
  } catch (error) {
    console.error('새 시나리오 생성 실패:', error)
    throw error
  }
}

export const putScenario = async (data: {
  storyPlotId: number
  blocks: PartialBlock[]
}): Promise<void> => {
  try {
    await axiosInstance.put(`/storyPage`, data)
  } catch (error) {
    console.error('시나리오 저장 실패:', error)
    throw error
  }
}

export const deleteScenario = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/storyPage/${id}`)
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
  async (data: {
    storyPlotId: number
    blocks: PartialBlock[]
  }): Promise<void> => {
    try {
      await putScenario(data)
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
      `/storyPlot/${id}/findStoryConflict`,
      payload,
    )
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error('일관성 체크 실패:', error)
    throw error
  }
}
