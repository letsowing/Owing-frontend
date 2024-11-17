import { useState } from 'react'

import { Header } from '@components/aiHelper/Header'
import { ValidationButton } from '@components/aiHelper/validationButton'
import Loader from '@components/common/Loader'

import { useProjectStore } from '@stores/projectStore'

import { SpellingResults } from './SpellingResults'

import { postSpellingCheck } from '@services/storyService'
import { SpellingError } from '@types'

export const SpellingView = () => {
  const [errors, setErrors] = useState<SpellingError[]>([
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
  ])
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
      <div className="px-5 py-3">
        <ValidationButton
          title="설정 충돌 검사"
          onClickValidation={handleSpellingCheck}
        />
      </div>
      <div className="mx-4 my-2 h-full rounded-lg border border-lightgray px-1">
        <SpellingResults errors={errors} />
      </div>
      <p className="ms-5 mt-2 text-xs font-bold text-redorange dark:text-blue">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
