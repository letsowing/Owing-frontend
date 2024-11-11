import React from 'react'

import { MessageList } from './MessageList'
import { ValidationButton } from './validationButton'

import { Message } from '@types'

export const ValidationChat: React.FC = () => {
  const [messages] = React.useState<Array<Message>>([
    { id: 1, content: '안녕하세요', date: '24/10/30 14:19:52' },
    {
      id: 2,
      content:
        '이전 3회차에서는 주인공이 사건을 해결하는 과정에서 긴장감이 고조되었는데, 이번 회차에서는 느슨한 전개로 이어지고 있어 흐름이 충돌하는 느낌이 듭니다. 3회차에서는 주인공이 의심스러워하던 인물이 반전을 일으키며 긴박한 상황을 만들었지만, 이번 회차에서는 같은 인물이 다시 평온한 모습으로 등장해 전개가 모순됩니다.',
      date: '24/10/30 14:19:52',
    },
    {
      id: 3,
      content: '안녕하세요! 무엇을 도와드릴까요?',
      date: '24/10/30 14:19:52',
    },
    {
      id: 4,
      content: '안녕하세요! 무엇을 도와드릴까요?',
      date: '24/10/30 14:19:52',
    },
    {
      id: 5,
      content: '안녕하세요! 무엇을 도와드릴까요?',
      date: '24/10/30 14:19:52',
    },
    {
      id: 6,
      content: '안녕하세요! 무엇을 도와드릴까요?',
      date: '24/10/30 14:19:52',
    },
  ])

  const handleClickValidation = () => {
    console.log('ai 설정 체크')
  }

  return (
    <div className="flex h-full flex-1 flex-col">
      <div className="px-5 py-3">
        <ValidationButton onClickValidation={handleClickValidation} />
      </div>
      <div className="mx-4 my-2 h-full rounded-lg border border-lightgray px-1">
        <MessageList messages={messages} />
      </div>
      <p className="ms-5 mt-2 text-xs font-bold text-redorange dark:text-blue">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
