import React, { useState } from 'react'

import { SearchView } from '@components/AIHelper/aiSearch/searchView'
import { FeatureSelection } from '@components/AIHelper/main/FeatureSelection'
import { SpellingView } from '@components/AIHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/AIHelper/storyValidation/ValidationView'

import { StoryEditor } from './StoryEditor'

import { Feature } from '@types'

export const StoryWrapper: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature['id'] | null>(
    null,
  )

  const renderContent = () => {
    switch (selectedFeature) {
      case 'validation':
        return <ValidationView />
      case 'spelling':
        return <SpellingView />
      case 'search':
        return <SearchView />
      default:
        return <FeatureSelection onSelectFeature={setSelectedFeature} />
    }
  }
  return (
    <>
      <StoryEditor />
      {renderContent()}
    </>
  )
}

export default StoryWrapper
