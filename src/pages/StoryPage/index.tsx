import { useEffect, useRef, useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { AIWindow } from '@components/aiHelper/AIWindow'
import { FloatingAIButton } from '@components/aiHelper/FloatingAIButton'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { useProjectStore } from '@stores/projectStore'

import { StoryEditor } from './StoryEditor'

import { getStory, postStory } from '@services/storyService'
import { Feature } from '@types'
import { Loader } from 'lucide-react'
import { createPortal } from 'react-dom'

const StoryWrapper = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<Feature['id'] | null>(
    null,
  )
  const storyContentRef = useRef('')
  const { selectedFileId } = useProjectStore()
  const [currentStoryId] = useState(selectedFileId!)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStoryContent = async () => {
      try {
        setIsLoading(true)
        const data = await getStory(currentStoryId)
        storyContentRef.current = data.content || ''
      } catch (error) {
        console.error('스토리 원고 조회 실패', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStoryContent()
  }, [currentStoryId])

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

  const handleEditorChange = (newContent: string) => {
    storyContentRef.current = newContent
  }

  const handleSave = async () => {
    try {
      await postStory(currentStoryId, { content: storyContentRef.current })
    } catch (error) {
      console.error('원고 저장 실패:', error)
    }
    console.log('저장된 내용:', storyContentRef.current)
  }

  if (isLoading) {
    return <Loader />
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
        <StoryEditor
          initialValue={storyContentRef.current}
          onEditorChange={handleEditorChange}
          onSave={handleSave}
        />
      </div>
    </>
  )
}

export default StoryWrapper
