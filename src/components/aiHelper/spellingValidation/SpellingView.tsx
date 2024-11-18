import { useState } from 'react'

import { Header } from '@components/aiHelper/Header'
import { ValidationButton } from '@components/aiHelper/validationButton'
import Loader from '@components/common/Loader'

import { useProjectStore } from '@stores/projectStore'

import { SpellingResults } from './SpellingResults'

import { postSpellingCheck } from '@services/storyService'
import { SpellingCheck } from '@types'

export const SpellingView = () => {
  const [errors, setErrors] = useState<SpellingCheck>({
    id: 1,
    storySpellCheckResponseList: [
      {
        help: '맞춤법 검사 버튼을 눌러 검사를 시작하세요.',
        errorIdx: 0,
        correctMethod: 1,
        start: 0,
        errMsg: '예시) 맞춤법이 잘못되었습니다.',
        end: 3,
        orgStr: '예시) 됬어요',
        candWord: '예시) 됐어요',
      },
    ],
    createdAt: '2024-03-19T15:30:00',
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const { selectedFileId } = useProjectStore()

  const handleSpellingCheck = async () => {
    setIsGenerating(true)
    try {
      const data = await postSpellingCheck(selectedFileId!)
      setErrors(data)
    } catch (error) {
      console.error('맞춤법 검사 실패:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isGenerating) {
    return <Loader />
  }

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="px-5 pb-3">
        <ValidationButton
          title="맞춤법 검사"
          onClickValidation={handleSpellingCheck}
        />
      </div>
      <div className="mx-5 h-3/4 overflow-y-auto rounded-lg border border-lightgray px-1 scrollbar-thin scrollbar-track-white scrollbar-thumb-lightredorange dark:scrollbar-thumb-skyblue">
        <SpellingResults
          key={errors.id}
          errors={errors.storySpellCheckResponseList}
        />
      </div>
      <p className="ms-5 mt-4 text-xs font-bold text-redorange dark:text-blue">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
