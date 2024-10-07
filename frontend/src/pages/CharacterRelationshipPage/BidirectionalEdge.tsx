import { useMemo } from 'react'

import { CommonEdgeProps, useCommonEdge } from '@hooks/useCommonEdge'

import { EdgeLabelRenderer, getBezierPath } from '@xyflow/react'

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
    edgeColor,
    isEditing,
    labelText,
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
  } = useCommonEdge(id, label, onLabelChange, type)

  const [edgePath, labelX, labelY] = useMemo(() => {
    const [path, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
    })
    return [path, labelX, labelY]
  }, [sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition])

  return (
    <>
      <path
        id={id}
        style={{ stroke: edgeColor }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={`url(#${id}-end-marker)`}
        markerStart={`url(#${id}-start-marker)`}
      />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan pointer-events-auto absolute z-20 -translate-x-1/2 -translate-y-1/2 transform text-xs"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          {isEditing ? (
            <input
              value={labelText}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              className="rounded border border-2 border-olive bg-white px-1 py-0.5 text-xs outline-none"
              autoFocus
            />
          ) : (
            <div
              className="cursor-pointer rounded border border-2 border-olive bg-white px-1 py-0.5 text-xs"
              onClick={handleLabelClick}
            >
              {label}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
      <marker
        id={`${id}-end-marker`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="10"
        markerHeight="10"
        orient="auto"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={edgeColor} />
      </marker>
      <marker
        id={`${id}-start-marker`}
        viewBox="0 0 10 10"
        refX="5"
        refY="5"
        markerUnits="strokeWidth"
        markerWidth="10"
        markerHeight="10"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" fill={edgeColor} />
      </marker>
    </>
  )
}
