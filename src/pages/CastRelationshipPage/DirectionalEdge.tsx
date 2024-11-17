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
    const offset = sourceX < targetX ? 60 : -60
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
      <defs>
        <EdgeMarker id={`${id}-end`} color={edgeColor} />
      </defs>
      <EdgePath
        id={id}
        edgeColor={edgeColor}
        pathData={edgePath}
        markerEnd={`url(#${id}-end)`}
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
        borderColor={edgeColor}
      />
    </>
  )
}
