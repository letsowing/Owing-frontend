import React from 'react'

import useThemeStore from '@/stores/themeStore'
import {
  EdgeProps,
  ReactFlowState,
  getBezierPath,
  useStore,
} from '@xyflow/react'

export type GetSpecialPathParams = {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number,
) => {
  const centerX = (sourceX + targetX) / 2
  const centerY = (sourceY + targetY) / 2

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`
}

export default function CustomEdge({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
}: EdgeProps) {
  const { isDarkMode } = useThemeStore()
  const edgeColor = isDarkMode ? '#fff' : '#000'

  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    return s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    )
  })

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  }

  let path = isBiDirectionEdge
    ? getSpecialPath(edgePathParams, sourceX < targetX ? 50 : -50)
    : getBezierPath(edgePathParams)[0]

  return (
    <>
      <path
        id={id}
        style={{ ...style, stroke: edgeColor }}
        className="react-flow__edge-path"
        d={path}
        markerEnd={`url(#${id}-marker)`}
      />
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
