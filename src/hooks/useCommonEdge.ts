import { useCallback, useEffect, useState } from 'react'

import { useThemeStore } from '@stores/themeStore'

export type EdgeType = 'DIRECTIONAL' | 'BIDIRECTIONAL'

interface UseCommonEdgeParams {
  id: string
  label: React.ReactNode
  onLabelChange: (edgeId: string, newLabel: string) => void
}

export const useCommonEdge = ({
  id,
  label,
  onLabelChange,
}: UseCommonEdgeParams) => {
  const [isEditing, setIsEditing] = useState(false)
  const [labelText, setLabelText] = useState('')

  useEffect(() => {
    setLabelText(typeof label === 'string' ? label : '')
  }, [label])

  const handleLabelClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleLabelInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLabelText(event.target.value)
    },
    [],
  )

  const handleFinishEditing = useCallback(() => {
    setIsEditing(false)
    onLabelChange(id, labelText)
  }, [id, labelText, onLabelChange])

  return {
    labelText,
    isEditing,
    handleLabelClick,
    handleLabelInputChange,
    handleFinishEditing,
  }
}

export const useEdgeColor = (type: EdgeType): string => {
  const { isDarkMode } = useThemeStore()

  return type === 'BIDIRECTIONAL'
    ? '#AEE156'
    : isDarkMode
      ? '#A49AFF'
      : '#FB5D2B'
}
