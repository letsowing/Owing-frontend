import { EdgeLabelRenderer } from '@xyflow/react'

interface EdgeLabelProps {
  labelX: number
  labelY: number
  isEditing: boolean
  label: React.ReactNode
  labelText: string
  handleLabelInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleLabelClick: () => void
  handleFinishEditing: () => void
  borderColor: string
}

interface EdgeMarkerProps {
  id: string
  color: string
  isStart?: boolean
}

interface EdgePathProps {
  id: string
  edgeColor: string
  pathData: string
  markerStart?: string
  markerEnd?: string
}

export const EdgeLabel = ({
  labelX,
  labelY,
  isEditing,
  label,
  labelText,
  handleLabelInputChange,
  handleLabelClick,
  handleFinishEditing,
  borderColor,
}: EdgeLabelProps) => {
  return (
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
            onChange={handleLabelInputChange}
            onBlur={handleFinishEditing}
            onKeyDown={(e) => e.key === 'Enter' && handleFinishEditing()}
            className={`rounded border-2 bg-white px-1 py-1 text-xs text-darkgray outline-none`}
            autoFocus
            style={{ borderColor: borderColor }}
          />
        ) : (
          <div
            className={`cursor-pointer rounded border-2 bg-white px-1 py-1 text-xs text-darkgray`}
            onClick={handleLabelClick}
            style={{ borderColor: borderColor }}
          >
            {label}
          </div>
        )}
      </div>
    </EdgeLabelRenderer>
  )
}

export const EdgeMarker = ({ id, color, isStart = false }: EdgeMarkerProps) => {
  return (
    <marker
      id={id}
      viewBox="0 0 10 10"
      refX="10"
      refY="5"
      markerUnits="strokeWidth"
      markerWidth="20"
      markerHeight="20"
      orient={isStart ? 'auto-start-reverse' : 'auto'}
    >
      <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
    </marker>
  )
}

export const EdgePath = ({
  id,
  edgeColor,
  pathData,
  markerStart,
  markerEnd,
}: EdgePathProps) => {
  return (
    <path
      id={id}
      style={{ stroke: edgeColor }}
      className="react-flow__edge-path"
      d={pathData}
      markerEnd={markerEnd}
      markerStart={markerStart}
    />
  )
}
