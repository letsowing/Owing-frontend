import { useCallback, useState } from 'react'

import useThemeStore from '@stores/themeStore'

import { EdgeProps } from '@xyflow/react'

export interface CommonEdgeProps extends EdgeProps {
  onLabelChange: (edgeId: string, newLabel: string) => void
  type: 'Directional' | 'Bidirectional'
}

export const useCommonEdge = (
  id: string,
  label: React.ReactNode,
  onLabelChange: (edgeId: string, newLabel: string) => void,
  type: string,
) => {
  const { isDarkMode } = useThemeStore()

  const edgeColor =
    type === 'Bidirectional' ? '#AEE156' : isDarkMode ? '#A49AFF' : '#FB5D2B'

  const [isEditing, setIsEditing] = useState(false)
  const [labelText, setLabelText] = useState(
    typeof label === 'string' ? label : '',
  )

  const handleLabelClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleLabelChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLabelText(event.target.value)
    },
    [],
  )

  const handleLabelBlur = useCallback(() => {
    setIsEditing(false)
    onLabelChange(id, labelText)
  }, [id, labelText, onLabelChange])

  return {
    edgeColor,
    isEditing,
    labelText,
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
  }
}
