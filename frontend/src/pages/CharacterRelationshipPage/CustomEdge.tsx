import useThemeStore from '@stores/themeStore'

import { getSpecialPath } from './getSpecialPath'

import {
  EdgeProps,
  ReactFlowState,
  getBezierPath,
  useStore,
} from '@xyflow/react'

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

  const path = isBiDirectionEdge
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
