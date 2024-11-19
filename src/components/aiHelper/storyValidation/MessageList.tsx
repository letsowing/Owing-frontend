import React from 'react'

import { MessageBubble } from './MessageBubble'

import { CrashMessage } from '@types'

interface MessageListProps {
  messages: CrashMessage[]
  createdAt: string
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  createdAt,
}) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-col">
      <div className="space-y-4 px-3">
        {messages.map((message, index) => (
          <MessageBubble key={index} message={message} createdAt={createdAt} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  )
}
