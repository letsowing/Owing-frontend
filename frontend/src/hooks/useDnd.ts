import { useDndStore } from '@stores/dndStore'

export const useDnd = () => {
  const items = useDndStore((state) => state.items)
  const moveFileItem = useDndStore((state) => state.moveFileItem)

  return { items, moveFileItem }
}
