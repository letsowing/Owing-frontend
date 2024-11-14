import { useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { MessageList } from './MessageList'
import { ValidationButton } from './validationButton'

import { postStoryConflictCheck } from '@services/storyService'
import { Message } from '@types'

export const ValidationChat = () => {
  const [messages, setMessages] = useState<Array<Message>>([
    {
      base: '',
      add: '',
      reason: '',
      createdAt: new Date(),
    },
  ])
  // const [isGenerating, setIsGenerating] = useState(false)
  const { selectedFileId, currentProject } = useProjectStore()
  const [currentStoryId] = useState(selectedFileId!)
  const [currentProjectId] = useState(currentProject.id!)

  const handleClickValidation = async () => {
    // setIsGenerating(true)
    try {
      const data = await postStoryConflictCheck(currentStoryId, {
        projectId: currentProjectId,
      })
      setMessages(data.items)
    } catch (error) {
      console.error('원고 설정 충돌 체크 실패:', error)
    } finally {
      // setIsGenerating(false)
    }
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="px-5 py-3">
        <ValidationButton onClickValidation={handleClickValidation} />
      </div>
      <div className="mx-4 my-2 h-full rounded-lg border border-lightgray px-1">
        <MessageList messages={messages} />
      </div>
      <p className="ms-5 mt-2 text-xs font-bold text-redorange dark:text-blue">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
