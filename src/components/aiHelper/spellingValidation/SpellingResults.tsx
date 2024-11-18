import { SpellingItem } from './SpellingItem'

import { SpellingMessage } from '@types'

interface SpellingResultsProps {
  errors: SpellingMessage[]
}

export const SpellingResults = ({ errors }: SpellingResultsProps) => {
  console.log(errors)
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-lg bg-white shadow-sm">
        {errors.map((error) => (
          <SpellingItem
            key={`${error.orgStr}-${error.start}-${error.end}`}
            error={error}
          />
        ))}
      </div>
    </div>
  )
}
