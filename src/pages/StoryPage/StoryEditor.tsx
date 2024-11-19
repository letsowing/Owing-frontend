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
        apiKey={import.meta.env.VITE_TINY_MCE_ID}
        value={value}
        init={editorConfig(isDarkMode)}
        onEditorChange={onEditorChange}
      />
      <div className="ms-3 mt-3 w-20 flex-row justify-end">
        <MainButton value="저장" onClick={onSave} />
      </div>
    </div>
  )
}

export default StoryEditor
