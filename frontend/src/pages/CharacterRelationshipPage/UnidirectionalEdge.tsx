import React from 'react'

import { getSpecialPath } from './getSpecialPath'

import { CommonEdgeProps, useCommonEdge } from '@/hooks/useCommonEdge'
import { EdgeLabelRenderer } from '@xyflow/react'

export default function UnidirectionalEdge({
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
    edgeColor,
    isEditing,
    labelText,
    handleLabelClick,
    handleLabelChange,
    handleLabelBlur,
  } = useCommonEdge(id, label, onLabelChange, type)

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
      <path
        id={id}
        style={{ stroke: edgeColor }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={`url(#${id}-marker)`}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {isEditing ? (
            <input
              value={labelText}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              className="rounded border border-2 border-redorange bg-white px-1 py-0.5 text-xs outline-none dark:border-violet"
              autoFocus
            />
          ) : (
            <div
              className="cursor-pointer rounded border border-2 border-redorange bg-white px-1 py-0.5 text-xs dark:border-violet"
              onClick={handleLabelClick}
            >
              {label}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
      <marker
        id={`${id}-marker`}
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
    </>
  )
}
