import { useState } from 'react'

import { postStoryConflict } from '@services/scenarioService'
import { useParams } from 'react-router-dom'

const onConflictCheck = (id: number, targetStory: string, setResult: any) => {
  const conflictCheck = async () => {
    try {
      const data = await postStoryConflict(id, targetStory)
      setResult(data)
    } catch (error) {
      console.error('설정충돌 체크 실패', error)
    }
  }
  conflictCheck()
}

export function AiHelper() {
  const { id } = useParams<{ id: string }>()

  const [result, setResult] = useState('')
  const [targetStory, setTargetStory] = useState('')

  return (
    <div className="mx-auto mt-10 max-w-sm rounded-[10px] border border-lightgray p-4 shadow-sm">
      <div className="mb-2 flex h-[4rem] rounded-[10px] bg-[#F7F7F7] p-2">
        <button className="w-1/2 rounded-[10px] bg-white py-2 text-center font-semibold">
          AI Helper
        </button>
        <button className="w-1/2 py-2 text-center font-semibold">
          맞춤법 검사
        </button>
      </div>

      <div className="space-y-1 rounded-b-lg">
        <textarea
          className="h-[15rem] w-full resize-none overflow-y-auto rounded-[10px] border border-lightgray p-3 text-sm text-black focus:outline-none focus:ring-1 focus:ring-lightgray"
          value={targetStory}
          onChange={(e) => setTargetStory(e.target.value)}
        />
        <div className="h-[25rem] w-full resize-none overflow-y-auto rounded-[10px] bg-[#F7F7F7] p-3 text-sm text-black">
          {result || '설정충돌 체크 응답'}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="text-md mt-2 h-10 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
          onClick={() => onConflictCheck(Number(id), targetStory, setResult)}
        >
          Create
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-redorange">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
