import editorConfig from './editorConfig'

import { Editor } from '@tinymce/tinymce-react'

export const StoryEditor = () => {
  return (
    <div className="editor-wrapper">
      <Editor
        apiKey="xp2713ap1r9doy0rwb0yl6j9f2t804a7xo6dsd3qwlntso02"
        initialValue=""
        init={editorConfig}
      />
    </div>
  )
}

export default StoryEditor
