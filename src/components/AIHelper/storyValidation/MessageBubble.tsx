import React from 'react'

interface MessageBubbleProps {
  type: 'user' | 'ai'
  content: string
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  type,
  content,
}) => {
  return (
    <div
      className={`max-w-[80%] rounded-lg p-4 ${
        type === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
      }`}
    >
      <p className="whitespace-pre-wrap break-words">{content}</p>
    </div>
  )
}
