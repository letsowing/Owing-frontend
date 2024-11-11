import { Message } from '@types'
import { Bot } from 'lucide-react'

export const MessageBubble = ({ message }: { message: Message }) => {
  return (
    <div className="relative pl-8">
      <div className="relative rounded-lg border border-lightgray bg-white p-4">
        {/* 로봇 아이콘 */}
        <div className="absolute -left-10 top-4">
          <Bot className="h-6 w-6" />
        </div>

        {/* 말풍선 꼬리 */}
        <div className="absolute -left-2 top-5 h-4 w-4 rotate-45 transform border-b border-l border-lightgray bg-white" />

        {/* 내용 */}
        <p className="text-xs">{message.content}</p>

        {/* 시간 */}
        <div className="-mb-2 mt-2 text-right text-xs">{message.date}</div>
      </div>
    </div>
  )
}
