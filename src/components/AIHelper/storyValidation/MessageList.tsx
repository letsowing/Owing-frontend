import React from 'react'

import { MessageBubble } from './MessageBubble'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
}

interface MessageListProps {
  messages: Message[]
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          type={message.type}
          content={message.content}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
