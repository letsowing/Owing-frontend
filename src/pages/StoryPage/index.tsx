import { useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { AIWindow } from '@components/aiHelper/AIWindow'
import { FloatingAIButton } from '@components/aiHelper/FloatingAIButton'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { StoryEditor } from './StoryEditor'

import { Feature } from '@types'
import { createPortal } from 'react-dom'

const StoryWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
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

  const handleHomeClick = () => {
    setSelectedFeature(null)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedFeature(null)
  }

  return (
    <>
      {createPortal(
        <FloatingAIButton isOpen={isOpen} onClick={() => setIsOpen(true)} />,
        document.body,
      )}

      {createPortal(
        <AIWindow
          isOpen={isOpen}
          selectedFeature={selectedFeature}
          onClose={handleClose}
          onHomeClick={handleHomeClick}
          onSelectFeature={setSelectedFeature}
        >
          {renderContent()}
        </AIWindow>,
        document.body,
      )}

      <div className="relative z-0 mt-10">
        <StoryEditor />
      </div>
    </>
  )
}

export default StoryWrapper
