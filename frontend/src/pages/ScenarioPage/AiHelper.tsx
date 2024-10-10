export function AiHelper() {
  return (
    <div className="mx-auto mt-10 max-w-sm rounded-[10px] border border-lightgray p-4 shadow-sm">
      {/* Header Tabs */}
      <div className="mb-2 flex h-[4rem] rounded-[10px] bg-[#F7F7F7] p-2">
        <button className="w-1/2 rounded-[10px] bg-white py-2 text-center font-semibold">
          AI Helper
        </button>
        <button className="w-1/2 py-2 text-center font-semibold">
          맞춤법 검사
        </button>
      </div>

      {/* Content Area */}
      <div className="space-y-4 rounded-b-lg bg-[#F7F7F7] p-4">
        <textarea
          className="h-[25rem] w-full resize-none overflow-y-auto rounded-[10px] bg-transparent p-3 text-sm text-black focus:outline-none focus:ring-1 focus:ring-lightgray"
          defaultValue="이전 3회차 내용과 충돌합니다.\n3회차에서는 ~~~ 이랬는데 지금은 이렇게..."
        />
      </div>
      <div className="flex justify-end">
        <button className="text-md mt-2 h-10 px-4 text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white">
          Create
        </button>
      </div>

      {/* Footer Note */}
      <p className="mt-4 text-center text-xs text-redorange">
        * 판단은 작가의 몫이며 정확하지 않은 정보가 포함될 수 있습니다.
      </p>
    </div>
  )
}
