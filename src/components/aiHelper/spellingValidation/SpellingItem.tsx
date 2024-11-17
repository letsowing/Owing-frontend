import { SpellingError } from '@types'

interface SpellingErrorItemProps {
  error: SpellingError
}

export const SpellingItem = ({ error }: SpellingErrorItemProps) => {
  return (
    <div className="flex flex-col space-y-3 border-b p-4 last:border-b-0">
      <div className="flex items-start space-x-3">
        <span className="mt-1 font-medium text-red-500">✕</span>
        <div className="flex-1">
          <p className="text-gray-700">{error.orgStr}</p>
          <p className="text-gray-500 mt-1 text-sm">{error.errMsg}</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <span className="mt-1 font-medium text-green-500">✓</span>
        <div className="flex-1">
          <p className="text-gray-900 font-medium">{error.candWord}</p>
          <p className="text-blue-600 mt-1 text-sm">{error.help}</p>
        </div>
      </div>
    </div>
  )
}
