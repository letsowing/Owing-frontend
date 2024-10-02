import { useDnd } from '@hooks/useDnd'

import FolderList from './FolderList'

interface TabProps {
  setSelectedFolderId: (folderId: number) => void // 상위 컴포넌트에서 전달받는 함수
}

export default function Tab({ setSelectedFolderId }: TabProps) {
  const { items } = useDnd() // items는 폴더 목록을 의미

  // 선택된 폴더가 변경될 때 호출
  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.folderId) // 상위 컴포넌트로 선택된 폴더 ID 전달
  }

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
      <h2>Folder View</h2>
      <ul style={{ padding: 0, margin: 0 }}>
        {items.map((folder: any) => (
          <FolderList
            key={folder.folderId}
            folder={folder}
            onSelectFolder={handleSelectFolder}
          />
        ))}
      </ul>
    </div>
  )
}
