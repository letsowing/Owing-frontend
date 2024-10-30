import React from 'react'

import { useCommonEdge, useEdgeColor } from '@hooks/useCommonEdge'

import { EdgePath } from './EdgeComponents'
import { EdgeLabel, EdgeMarker } from './EdgeComponents'
import { getSpecialPath } from './getSpecialPath'

import { CommonEdgeProps } from '@types'

export default function DirectionalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  onLabelChange,
  type,
}: CommonEdgeProps) {
  const {
    isEditing,
    labelText,
    handleLabelClick,
    handleLabelInputChange,
    handleFinishEditing,
  } = useCommonEdge({ id, label, onLabelChange })

  const edgeColor = useEdgeColor(type)

  const [edgePath, labelX, labelY] = React.useMemo(() => {
    const offset = sourceX < targetX ? 50 : -50
    return getSpecialPath(
      {
        sourceX,
        sourceY,
        targetX,
        targetY,
      },
      offset,
    )
  }, [sourceX, sourceY, targetX, targetY])

  return (
    <>
      <EdgePath
        id={id}
        edgeColor={edgeColor}
        pathData={edgePath}
        markerEnd={`url(#${id}-marker)`}
      />
      <EdgeLabel
        labelX={labelX}
        labelY={labelY}
        isEditing={isEditing}
        label={label}
        labelText={labelText}
        handleLabelInputChange={handleLabelInputChange}
        handleLabelClick={handleLabelClick}
        handleFinishEditing={handleFinishEditing}
        borderColor="redorange dark:violet"
      />
      <EdgeMarker id={id} color={edgeColor} />
    </>
  )
}
