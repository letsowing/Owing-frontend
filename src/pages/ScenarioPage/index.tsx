import React from 'react'

import { useProjectStore } from '@stores/projectStore'

import { ScenarioEditor } from './ScenarioEditor'

export const ScenarioWrapper: React.FC = () => {
  const [selectedFileId] = useProjectStore((state) => [state.selectedFileId])

  return <ScenarioEditor key={selectedFileId} selectedFileId={selectedFileId} />
}

export default ScenarioWrapper
