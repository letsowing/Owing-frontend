import React from 'react'

import { MessageList } from './MessageList'
import { ValidationButton } from './validationButton'

import { Message } from '@types'

export const ValidationChat: React.FC = () => {
  const [messages] = React.useState<Array<Message>>([
    { id: 1, content: '안녕하세요' },
    { id: 2, content: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 3, content: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 4, content: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 5, content: '안녕하세요! 무엇을 도와드릴까요?' },
    { id: 6, content: '안녕하세요! 무엇을 도와드릴까요?' },
  ])

  const handleClickValidation = () => {
    console.log('ai 설정 체크')
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-4 py-4">
        <ValidationButton onClickValidation={handleClickValidation} />
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <MessageList messages={messages} />
      </div>
    </div>
  )
}
