import React from 'react'

import { ChatInput } from './ChatInput'
import { MessageList } from './MessageList'

export const ValidationChat: React.FC = () => {
  const [messages, setMessages] = React.useState<
    Array<{
      id: string
      type: 'user' | 'ai'
      content: string
    }>
  >([
    { id: '1', type: 'user', content: '안녕하세요' },
    { id: '2', type: 'ai', content: '안녕하세요! 무엇을 도와드릴까요?' },
  ])

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'user', content },
    ])
  }

  return (
    <div className="flex flex-1 flex-col">
      <MessageList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
