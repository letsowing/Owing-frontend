import {
  BaseEdge,
  EdgeProps,
  ReactFlowState,
  getBezierPath,
  useStore,
} from '@xyflow/react'

// 엣지의 시작점과 끝점의 좌표 정의
export type GetSpecialPathParams = {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}
// 양방향 엣지를 그릴 때 사용되는 곡선 경로 생성
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
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
}: EdgeProps) {
  const isBiDirectionEdge = useStore((s: ReactFlowState) => {
    const edgeExists = s.edges.some(
      (e) =>
        (e.source === target && e.target === source) ||
        (e.target === source && e.source === target),
    )

    return edgeExists
  })

  const edgePathParams = {
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  }

  let path = ''

  if (isBiDirectionEdge) {
    path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25)
  } else {
    ;[path] = getBezierPath(edgePathParams)
  }

  return <BaseEdge path={path} markerEnd={markerEnd} />
}
