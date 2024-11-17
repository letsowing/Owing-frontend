import MainButton from '@components/common/MainButton'

import editorConfig from './editorConfig'

import { Editor } from '@tinymce/tinymce-react'

interface StoryEditorProps {
  initialValue: string
  onEditorChange: (newContent: string) => void
  onSave: () => void
}

export const StoryEditor = ({
  onEditorChange,
  initialValue,
  onSave,
}: StoryEditorProps) => {
  return (
    <div>
      <Editor
        apiKey="xp2713ap1r9doy0rwb0yl6j9f2t804a7xo6dsd3qwlntso02"
        initialValue={initialValue}
        init={editorConfig}
        onEditorChange={onEditorChange}
      />
      <div className="ms-3 mt-3 w-20 flex-row justify-end">
        <MainButton value="저장" onClick={onSave} />
      </div>
    </div>
  )
}

export default StoryEditor
