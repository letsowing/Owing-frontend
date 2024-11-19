import { CrashMessage } from '@types'
import { Bot } from 'lucide-react'

interface MessageBubbleProps {
  message: CrashMessage
  createdAt: string
}

export const MessageBubble = ({ message, createdAt }: MessageBubbleProps) => {
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
        <strong>기존 설정</strong>
        <p className="text-xs">{message.base}</p>
        <br />
        <strong>현재 원고에서 문제가 되는 설정</strong>
        <p className="text-xs">{message.add}</p>
        <br />
        <strong>설정 충돌 이유</strong>
        <p className="text-xs">{message.reason}</p>
        <br />

        {/* 시간 */}
        <div className="-mb-2 text-right text-xs">
          {new Date(createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </div>
      </div>
    </div>
  )
}
