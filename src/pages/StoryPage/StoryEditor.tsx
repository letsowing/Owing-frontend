import editorConfig from './editorConfig'

import { Editor } from '@tinymce/tinymce-react'

interface StoryEditorProps {
  initialValue: string
}

export const StoryEditor = ({ initialValue }: StoryEditorProps) => {
  return (
    <Editor
      apiKey="xp2713ap1r9doy0rwb0yl6j9f2t804a7xo6dsd3qwlntso02"
      initialValue={initialValue}
      init={editorConfig}
    />
  )
}

export default StoryEditor
