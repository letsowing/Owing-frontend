import React from 'react'

import { MessageBubble } from './MessageBubble'

import { Message } from '@types'

interface MessageListProps {
  messages: Message[]
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-lightredorange dark:scrollbar-thumb-skyblue">
      {/* px-5에서 px-8로 변경하여 아이콘 공간 확보 */}
      <div className="space-y-4 px-3 py-5">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
