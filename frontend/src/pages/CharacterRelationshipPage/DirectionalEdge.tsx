import React from 'react'

import { getSpecialPath } from './getSpecialPath'

import { CommonEdgeProps, useCommonEdge } from '@/hooks/useCommonEdge'
import { EdgeLabelRenderer } from '@xyflow/react'

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
              className="rounded border border-2 border-redorange bg-white px-1 py-0.5 text-xs text-darkgray outline-none dark:border-violet"
              autoFocus
            />
          ) : (
            <div
              className="cursor-pointer rounded border border-2 border-redorange bg-white px-1 py-0.5 text-xs text-darkgray dark:border-violet"
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
