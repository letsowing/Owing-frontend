import { useEffect, useState } from 'react'

import { ValidationButton } from '@components/aiHelper/validationButton'
import Loader from '@components/common/Loader'

import { useProjectStore } from '@stores/projectStore'

import { MessageList } from './MessageList'

import {
  getStoryConflictCheck,
  postStoryConflictCheck,
} from '@services/storyService'
import { CrashCheck } from '@types'

export const ValidationChat = () => {
  const [crashChecks, setCrashChecks] = useState<CrashCheck[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { selectedFileId, currentProject } = useProjectStore()
  const currentStoryId = selectedFileId!
  const currentProjectId = currentProject.id!

  useEffect(() => {
    const fetchPreviousHistory = async () => {
      try {
        setIsLoading(true)
        const data = await getStoryConflictCheck(currentStoryId)
        setCrashChecks(data)
      } catch (error) {
        console.error('이전 설정 충돌 내역 조회 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (currentStoryId) {
      fetchPreviousHistory()
    }
  }, [currentStoryId])

  const handleClickValidation = async () => {
    if (!currentStoryId || !currentProjectId) return

    setIsGenerating(true)
    try {
      const data = await postStoryConflictCheck(currentStoryId, {
        projectId: currentProjectId,
      })

      setCrashChecks((prevChecks) => [...prevChecks, data])
    } catch (error) {
      console.error('원고 설정 충돌 체크 실패:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading || isGenerating) {
    return <Loader />
  }

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pb-3">
        <ValidationButton
          title="설정 충돌 검사"
          onClickValidation={handleClickValidation}
        />
      </div>
      <div className="mx-5 h-3/4 overflow-y-auto rounded-lg border border-lightgray px-1 scrollbar-thin scrollbar-track-white scrollbar-thumb-lightredorange dark:scrollbar-thumb-skyblue">
        {crashChecks.map((check) => (
          <div key={check.id} className="my-4">
            <MessageList
              messages={check.crashCheckItemResponseList}
              createdAt={check.createdAt}
            />
          </div>
        ))}
      </div>
      <p className="ms-5 mt-4 text-xs font-bold text-redorange dark:text-blue">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
