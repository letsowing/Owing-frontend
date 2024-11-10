import React from 'react'

import { Bookmark, Send, Share, ThumbsDown } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSendMessage(message)
    setMessage('')
  }

  return (
    <div className="border-t bg-white">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="relative">
          <textarea
            className="min-h-[100px] w-full resize-none rounded-lg border p-3 pr-12"
            placeholder="오늘은 무엇을 도와드릴까요?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <button
            type="submit"
            className="hover:bg-gray-100 absolute bottom-3 right-3 rounded-lg p-2"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button type="button" className="hover:bg-gray-100 rounded-lg p-2">
            <Share className="h-5 w-5" />
          </button>
          <button type="button" className="hover:bg-gray-100 rounded-lg p-2">
            <Bookmark className="h-5 w-5" />
          </button>
          <button type="button" className="hover:bg-gray-100 rounded-lg p-2">
            <ThumbsDown className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  )
}
