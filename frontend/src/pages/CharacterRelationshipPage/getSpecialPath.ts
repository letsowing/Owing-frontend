type GetSpecialPathParams = {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

export const getSpecialPath = (
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams,
  offset: number,
): [string, number, number] => {
  const centerX = (sourceX + targetX) / 2
  const centerY = (sourceY + targetY) / 2
  const path = `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`

  // Calculate label position
  const labelX = centerX
  const labelY = centerY + offset / 2

  return [path, labelX, labelY]
}
