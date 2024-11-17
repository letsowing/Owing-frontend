import { useMemo } from 'react'

import { useCommonEdge, useEdgeColor } from '@hooks/useCommonEdge'

import { EdgeLabel, EdgeMarker, EdgePath } from './EdgeComponents'

import { CommonEdgeProps } from '@types'
import { getBezierPath } from '@xyflow/react'

export default function BidirectionalEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  sourcePosition,
  targetPosition,
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

  const [edgePath, labelX, labelY] = useMemo(() => {
    const [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })
    return [path, labelX, labelY] as const
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition])
  return (
    <>
      <defs>
        <EdgeMarker id={`${id}-start`} color={edgeColor} isStart={true} />
        <EdgeMarker id={`${id}-end`} color={edgeColor} />
      </defs>
      <EdgePath
        id={id}
        edgeColor={edgeColor}
        pathData={edgePath}
        markerEnd={`url(#${id}-end)`}
        markerStart={`url(#${id}-start)`}
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
