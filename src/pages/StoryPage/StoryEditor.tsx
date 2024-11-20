import MainButton from '@components/common/MainButton'

import editorConfig from './editorConfig'

import { Editor } from '@tinymce/tinymce-react'

interface StoryEditorProps {
  value: string
  isDarkMode: boolean
  onEditorChange: (newContent: string) => void
  onSave: () => void
}

export const StoryEditor = ({
  value,
  isDarkMode,
  onEditorChange,
  onSave,
}: StoryEditorProps) => {
  return (
    <div>
      <Editor
        value={value}
        apiKey={import.meta.env.VITE_TINY_MCE_ID}
        init={editorConfig(isDarkMode)}
        onEditorChange={onEditorChange}
      />
      <div className="fixed bottom-3 right-24">
        <MainButton value="저장" onClick={onSave} />
      </div>
    </div>
  )
}

export default StoryEditor
