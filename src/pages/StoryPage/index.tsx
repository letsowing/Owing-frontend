import { useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { TabItem } from '@components/aiHelper/TabItem'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { StoryEditor } from './StoryEditor'

import { Feature } from '@types'

const StoryWrapper = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature['id']>('home')

  const renderContent = () => {
    switch (selectedFeature) {
      case 'validation':
        return <ValidationView />
      case 'spelling':
        return <SpellingView />
      case 'search':
        return <SearchView />
      case 'home':
        return <AIHelper onFeatureSelect={setSelectedFeature} />
    }
  }

  return (
    <>
      <StoryEditor />
      <div className="flex">
        <div className="flex-1">{renderContent()}</div>
        {selectedFeature && (
          <div className="flex flex-col border-l">
            <TabItem
              label="홈"
              isActive={selectedFeature === 'home'}
              onClick={() => setSelectedFeature('home')}
            />
            <TabItem
              label="검증"
              isActive={selectedFeature === 'validation'}
              onClick={() => setSelectedFeature('validation')}
            />
            <TabItem
              label="맞춤법"
              isActive={selectedFeature === 'spelling'}
              onClick={() => setSelectedFeature('spelling')}
            />
            <TabItem
              label="검색어"
              isActive={selectedFeature === 'search'}
              onClick={() => setSelectedFeature('search')}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default StoryWrapper
