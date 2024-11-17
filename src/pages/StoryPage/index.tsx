import { useEffect, useRef, useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { AIWindow } from '@components/aiHelper/AIWindow'
import { FloatingAIButton } from '@components/aiHelper/FloatingAIButton'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { useProjectStore } from '@stores/projectStore'

import { useConfirm } from '@hooks/useConfirm'

import { StoryEditor } from './StoryEditor'

import { getStory, postStory } from '@services/storyService'
import { Feature } from '@types'
import { Loader } from 'lucide-react'
import { createPortal } from 'react-dom'

const StoryWrapper = () => {
  const { showSuccessDialog } = useConfirm()
  const { selectedFileId } = useProjectStore()

  const storyContentRef = useRef('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<Feature['id'] | null>(
    null,
  )

  useEffect(() => {
    const fetchStoryContent = async () => {
      try {
        setIsLoading(true)
        const data = await getStory(selectedFileId!)
        storyContentRef.current = data.content || ''
      } catch (error) {
        console.error('스토리 원고 조회 실패', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStoryContent()
  }, [selectedFileId])

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
      await postStory(selectedFileId!, { content: storyContentRef.current })
    } catch (error) {
      console.error('원고 저장 실패:', error)
    } finally {
      showSuccessDialog('저장되었습니다.')
    }
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
