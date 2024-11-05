import React from 'react'

import { useProjectStore } from '@stores/projectStore'

import { StoryEditor } from './StoryEditor'

export const StoryWrapper: React.FC = () => {
  const [selectedFileId] = useProjectStore((state) => [state.selectedFileId])

  return <StoryEditor key={selectedFileId} selectedFileId={selectedFileId} />
}

export default StoryWrapper
