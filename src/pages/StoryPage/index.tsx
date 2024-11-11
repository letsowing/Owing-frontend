import { useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { TabItem } from '@components/aiHelper/TabItem'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { StoryEditor } from './StoryEditor'

import { Feature } from '@types'
import { createPortal } from 'react-dom'
import { BiMessageError } from 'react-icons/bi'
import { ImMenu } from 'react-icons/im'
import { LiaSearchSolid } from 'react-icons/lia'
import { MdOutlineThumbUp } from 'react-icons/md'

const StoryWrapper = () => {
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
        return <AIHelper onSelectFeature={setSelectedFeature} />
    }
  }

  return (
    <>
      {createPortal(
        <div className="z-999 absolute right-10 top-20 h-4/5 w-1/3 rounded-lg border border-lightgray bg-white pl-1 text-darkgray">
          <div className="flex h-full">
            <div className="h-2/3 flex-1">{renderContent()}</div>
            {selectedFeature && (
              <div className="flex flex-col bg-beige dark:bg-coldbeige">
                <TabItem
                  label="홈"
                  icon={ImMenu}
                  onClick={() => setSelectedFeature(null)}
                />
                <TabItem
                  label="설정 검사"
                  icon={BiMessageError}
                  isActive={selectedFeature === 'validation'}
                  onClick={() => setSelectedFeature('validation')}
                />
                <TabItem
                  label="맞춤법 검사"
                  icon={MdOutlineThumbUp}
                  isActive={selectedFeature === 'spelling'}
                  onClick={() => setSelectedFeature('spelling')}
                />
                <TabItem
                  label="검색어 추천"
                  icon={LiaSearchSolid}
                  isActive={selectedFeature === 'search'}
                  onClick={() => setSelectedFeature('search')}
                />
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
      <div className="relative z-0 mt-10">
        <StoryEditor />
      </div>
    </>
  )
}

export default StoryWrapper
