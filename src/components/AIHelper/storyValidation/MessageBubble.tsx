import { Bot } from 'lucide-react'

interface MessageBubbleProps {
  content: string
}

export const MessageBubble = ({ content }: MessageBubbleProps) => {
  return (
    <div className="flex items-start gap-3">
      <Bot className="text-gray-400 h-6 w-6" />
      <p className="text-gray-700 text-sm">{content}</p>
    </div>
  )
}
