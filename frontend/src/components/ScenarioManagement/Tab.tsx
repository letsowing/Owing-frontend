import { useState } from 'react'

import { useDndStore } from '../../stores/dndStore'
import DraggableListItem from './DraggableListItem'

interface FolderItemProps {
  folder: any // 폴더의 타입을 정의할 수 있습니다
  onSelectFolder: (folder: any) => void // 폴더가 선택될 때 호출할 함수
}

interface TabProps {
  setSelectedFolderId: (folderId: number) => void // 상위 컴포넌트에서 전달받는 함수
}

// 폴더와 파일을 렌더링하는 컴포넌트
const FolderList = ({ folder, onSelectFolder }: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false) // 폴더 열고 닫기 상태

  const toggleFolder = () => {
    setIsOpen(!isOpen) // 폴더 클릭 시 열고 닫기 토글
    onSelectFolder(folder) // 폴더 선택 시 상위 컴포넌트에 알림
  }

  return (
    <li style={{ listStyle: 'none', marginBottom: '10px' }}>
      <div
        style={{
          cursor: 'pointer',
          backgroundColor: '#f0f0f0',
          padding: '5px',
          borderRadius: '4px',
        }}
        onClick={toggleFolder}
      >
        <h3>{folder.name}</h3>
      </div>

      {isOpen && (
        <ul style={{ paddingLeft: '20px' }}>
          {folder.files?.map((file: any, index: number) => (
            <DraggableListItem
              key={file.fileId}
              id={file.fileId}
              index={index}
              name={file.name}
              folderId={folder.folderId}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default function Tab({ setSelectedFolderId }: TabProps) {
  const { items } = useDndStore() // items는 폴더 목록을 의미

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
