import { SpellingItem } from './SpellingItem'

import { SpellingError } from '@types'

interface SpellingResultsProps {
  errors: SpellingError[]
}

export const SpellingResults = ({ errors }: SpellingResultsProps) => {
  return (
    <div className="mx-auto w-full max-w-3xl p-6">
      <div className="rounded-lg bg-white shadow-sm">
        {errors.map((error, index) => (
          <SpellingItem key={index} error={error} />
        ))}
      </div>
    </div>
  )
}
