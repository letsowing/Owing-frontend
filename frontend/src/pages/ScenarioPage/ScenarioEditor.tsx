import { useCallback, useEffect, useState } from 'react'

import { useThemeStore } from '@stores/themeStore'

import { AiHelper } from './AiHelper'
import { BlueButton } from './BlueButton'
import { customDarkTheme, customLightTheme } from './ScenarioTheme'

import '@blocknote/core/style.css'
import { BlockNoteView } from '@blocknote/mantine'
import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from '@blocknote/react'
import {
  debouncedSave,
  getScenario,
  putScenario,
} from '@services/scenarioService'

interface ScenarioEditorProps {
  selectedFileId: number
}

export const ScenarioEditor = ({ selectedFileId }: ScenarioEditorProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const { isDarkMode } = useThemeStore()

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: 'paragraph',
        content: '',
      },
    ],
  })

  useEffect(() => {
    const loadScenario = async () => {
      if (!selectedFileId) return

      try {
        setIsLoading(true)
        const scenarioData = await getScenario(selectedFileId)

        if (editor && scenarioData) {
          editor.replaceBlocks(editor.topLevelBlocks, scenarioData)
        }
      } catch (error) {
        console.error('시나리오 로드 실패:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadScenario()
  }, [editor, selectedFileId])

  const handleContentChange = useCallback(() => {
    if (!editor || !selectedFileId) return

    debouncedSave({
      storyPlotId: selectedFileId,
      blocks: editor.topLevelBlocks,
    })
  }, [editor, selectedFileId])

  const handleSaveClick = async () => {
    if (selectedFileId && editor) {
      try {
        await putScenario({
          storyPlotId: selectedFileId,
          blocks: editor.topLevelBlocks,
        })
        console.log('시나리오가 성공적으로 저장되었습니다.')
      } catch (error) {
        console.error('시나리오 저장 실패:', error)
      }
    }
  }

  if (isLoading || !editor) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="mx-auto flex space-x-4 p-4">
      <div className="w-1/4">
        <AiHelper />
      </div>

      <div className="w-full">
        <BlockNoteView
          className="mx-4 h-full rounded-[10px] border border-lightgray"
          editor={editor}
          formattingToolbar={false}
          onChange={handleContentChange}
          theme={isDarkMode ? customDarkTheme : customLightTheme}
        >
          <FormattingToolbarController
            formattingToolbar={() => (
              <FormattingToolbar>
                <BlockTypeSelect key={'blockTypeSelect'} />
                <BlueButton key={'customButton'} />
                <FileCaptionButton key={'fileCaptionButton'} />
                <FileReplaceButton key={'replaceFileButton'} />
                <BasicTextStyleButton
                  basicTextStyle={'bold'}
                  key={'boldStyleButton'}
                />
                <BasicTextStyleButton
                  basicTextStyle={'italic'}
                  key={'italicStyleButton'}
                />
                <BasicTextStyleButton
                  basicTextStyle={'underline'}
                  key={'underlineStyleButton'}
                />
                <BasicTextStyleButton
                  basicTextStyle={'strike'}
                  key={'strikeStyleButton'}
                />
                <BasicTextStyleButton
                  basicTextStyle={'code'}
                  key={'codeStyleButton'}
                />
                <TextAlignButton
                  textAlignment={'left'}
                  key={'textAlignLeftButton'}
                />
                <TextAlignButton
                  textAlignment={'center'}
                  key={'textAlignCenterButton'}
                />
                <TextAlignButton
                  textAlignment={'right'}
                  key={'textAlignRightButton'}
                />
                <ColorStyleButton key={'colorStyleButton'} />
                <NestBlockButton key={'nestBlockButton'} />
                <UnnestBlockButton key={'unnestBlockButton'} />
                <CreateLinkButton key={'createLinkButton'} />
              </FormattingToolbar>
            )}
          />
        </BlockNoteView>
        <div className="flex justify-end py-1">
          <button
            className="mx-10 mt-2 h-10 w-20 text-xl text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
            onClick={handleSaveClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
export default ScenarioEditor
