import { useDndStore } from '../../stores/dndStore'
import DraggableListItem from './DraggableListItem'

export default function Tab() {
  const { items } = useDndStore()

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '120px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <h2>List View</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {items.map((item, index) => (
          <DraggableListItem
            key={item.id}
            id={item.id}
            index={index}
            name={item.name}
          />
        ))}
      </ul>
    </div>
  )
}

// const folderList = [
//   { folderId: 0, name: '폴더명1', files: [
//     { fileId: 1, name: '파일1', description: '' },
//     { fileId: 2, name: '파일2', description: '' },
//   ]},
//   { folderId: 1, name: '폴더명2', files: [] },
//   { folderId: 2, name: '폴더명3', files: [] },
// ]
