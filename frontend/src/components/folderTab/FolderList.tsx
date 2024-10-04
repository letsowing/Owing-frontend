import { useState } from 'react'

import DraggableListItem from '@components/dnd/DraggableListItem'

import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight } from 'react-icons/pi'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface FolderItemProps {
  folder: any // 폴더의 타입을 정의할 수 있습니다
  onSelectFolder: (folder: any) => void // 폴더가 선택될 때 호출할 함수
  isActive: boolean // 폴더가 활성화 상태인지 확인하는 prop
}

// 폴더와 파일을 렌더링하는 컴포넌트
const FolderList = ({ folder, onSelectFolder, isActive }: FolderItemProps) => {
  const [isOpen, setIsOpen] = useState(false) // 폴더 열고 닫기 상태

  const toggleFolder = () => {
    setIsOpen(!isOpen) // 폴더 클릭 시 열고 닫기 토글
    onSelectFolder(folder) // 폴더 선택 시 상위 컴포넌트에 알림
  }

  return (
    <li className="mx-2 mb-4 list-none">
      <div
        className="flex w-full cursor-pointer items-center justify-between px-2"
        onClick={toggleFolder}
      >
        <div className="flex items-center">
          <CiFolderOn
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <p
            className={`px-2 text-base ${
              isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'
            }`}
          >
            {folder.name}
          </p>
        </div>
        <div className="flex w-16 items-center justify-between">
          <PiFilePlusLight
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <GoPencil
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <PiTrashSimpleLight
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
        </div>
      </div>

      {isOpen && (
        <ul style={{ paddingLeft: '20px', paddingRight: '20px' }}>
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

export default FolderList
