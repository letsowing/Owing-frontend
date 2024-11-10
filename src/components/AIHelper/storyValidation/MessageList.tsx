import React from 'react'

import { MessageBubble } from './MessageBubble'

interface Message {
  id: number
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
    <div className="flex-1 flex-col gap-3">
      {messages.map((message) => (
        <MessageBubble key={message.id} content={message.content} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  )
}
