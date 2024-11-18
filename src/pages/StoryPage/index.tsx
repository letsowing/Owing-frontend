import { useCallback, useEffect, useState } from 'react'

import { AIHelper } from '@components/aiHelper/AIHelper'
import { AIWindow } from '@components/aiHelper/AIWindow'
import { FloatingAIButton } from '@components/aiHelper/FloatingAIButton'
import { SearchView } from '@components/aiHelper/aiSearch/SearchView'
import { SpellingView } from '@components/aiHelper/spellingValidation/SpellingView'
import { ValidationView } from '@components/aiHelper/storyValidation/ValidationView'

import { useProjectStore } from '@stores/projectStore'
import { useThemeStore } from '@stores/themeStore'

import { useConfirm } from '@hooks/useConfirm'

import { StoryEditor } from './StoryEditor'

import { debouncedSave, getStory, postStory } from '@services/storyService'
import { Feature } from '@types'
import { Loader } from 'lucide-react'
import { createPortal } from 'react-dom'

const StoryWrapper = () => {
  const { showSuccessDialog } = useConfirm()
  const { selectedFileId } = useProjectStore()
  const isDarkMode = useThemeStore((state) => state.isDarkMode)

  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFeature, setSelectedFeature] = useState<Feature['id'] | null>(
    null,
  )

  useEffect(() => {
    const fetchStoryContent = async () => {
      if (!selectedFileId) return

      setIsLoading(true)
      try {
        const data = await getStory(selectedFileId)
        setContent(data.content || '')
      } catch (error) {
        console.error('스토리 원고 조회 실패', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStoryContent()
  }, [selectedFileId])

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => setIsLoading(false), 100)
  }, [isDarkMode])

  useEffect(() => {
    if (selectedFileId && content) {
      debouncedSave(selectedFileId, content)
    }
  }, [content, selectedFileId])

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

  const handleEditorChange = useCallback((newContent: string) => {
    setContent(newContent)
  }, [])

  // 수동 저장 버튼을 위한 핸들러
  const handleSave = async () => {
    try {
      await postStory(selectedFileId!, { content })
      showSuccessDialog('저장되었습니다.')
    } catch (error) {
      console.error('원고 저장 실패:', error)
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

      <div className="relative z-0 mx-2">
        <StoryEditor
          value={content}
          isDarkMode={isDarkMode}
          onEditorChange={handleEditorChange}
          onSave={handleSave}
        />
      </div>
    </>
  )
}

export default StoryWrapper
