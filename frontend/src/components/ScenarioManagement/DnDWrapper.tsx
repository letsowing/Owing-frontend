import { useDndStore } from '../../stores/dndStore'
import DraggableBox from './DraggableBox'

export default function DnDWrapper() {
  const { items } = useDndStore()

  return (
    <div className="ml-20 p-5">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item, index) => (
          <DraggableBox
            key={item.id}
            id={item.id}
            index={index}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  )
}
