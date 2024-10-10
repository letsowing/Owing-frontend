import React, { useCallback, useEffect, useState } from 'react'

import { BlueButton } from './BlueButton'
import { customDarkTheme, customLightTheme } from './ScenarioTheme'

import useThemeStore from '@/stores/themeStore'
import { BlockNoteEditor } from '@blocknote/core'
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
  Scenario,
  debouncedSave,
  getScenario,
  putScenario,
} from '@services/scenarioService'
import { useParams } from 'react-router-dom'

const ScenarioPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { isDarkMode } = useThemeStore()

  const editor = useCreateBlockNote()

  useEffect(() => {
    const loadScenario = async () => {
      if (id) {
        try {
          setIsLoading(true)
          const scenarioData = await getScenario(Number(id))
          setScenario(scenarioData)

          if (editor && scenarioData.content) {
            editor.replaceBlocks(editor.topLevelBlocks, scenarioData.content)
          }
        } catch (error) {
          console.error('시나리오 로드 실패:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadScenario()
  }, [id, editor])

  const handleContentChange = useCallback(
    (editor: BlockNoteEditor) => {
      if (scenario && id) {
        const newContent = editor.topLevelBlocks
        const updatedScenario = { ...scenario, content: newContent }
        setScenario(updatedScenario)
        debouncedSave(Number(id), newContent)
      }
    },
    [scenario, id],
  )

  const handleSaveClick = async () => {
    if (id && editor) {
      const content = editor.topLevelBlocks
      try {
        await putScenario(Number(id), content)
        console.log('시나리오가 성공적으로 저장되었습니다.')
      } catch (error) {
        console.error('시나리오 저장 실패:', error)
      }
    }
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <BlockNoteView
        editor={editor}
        formattingToolbar={false}
        onChange={() => handleContentChange(editor)}
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
      <button onClick={handleSaveClick}>저장하기</button>
    </>
  )
}

export default ScenarioPage
