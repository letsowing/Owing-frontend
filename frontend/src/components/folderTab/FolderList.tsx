import { useEffect, useRef, useState } from 'react'

import DraggableListItem from '@components/dnd/DraggableListItem'

import { useDnd } from '@/hooks/useDnd'
import { useDrag, useDrop } from 'react-dnd'
import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight } from 'react-icons/pi'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface FolderItemProps {
  folder: any // 폴더의 타입 정의
  index: number
  onSelectFolder: (folder: any) => void // 폴더가 선택될 때 호출할 함수
  isActive: boolean // 폴더가 활성화 상태인지 확인하는 prop
}

// 폴더와 파일을 렌더링하는 컴포넌트
const FolderList = ({
  folder,
  index,
  onSelectFolder,
  isActive,
}: FolderItemProps) => {
  const { moveFolder, addFile, updateFolderName, deleteFolder } = useDnd()
  const [isOpen, setIsOpen] = useState(false) // 폴더 열고 닫기 상태

  const [isFolderEditing, setIsEditingFolder] = useState(false) // 폴더 이름 편집 상태
  const [newFolderName, setNewFolderName] = useState(folder.name) // 새 폴더 이름 상태

  const [isFileEditing, setIsFileEditing] = useState(false) // 파일 이름 입력 상태
  const [newFileName, setNewFileName] = useState('') // 새 파일 이름 상태

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null) // 파일 이름 입력을 위한 ref
  const folderNameRef = useRef<HTMLInputElement>(null) // 폴더 이름 입력을 위한 ref

  // 폴더 이름 편집 시작
  const handleEditFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 폴더 선택 이벤트 방지
    setIsEditingFolder(true)
    setTimeout(() => moveCursorToEnd(), 0)
  }

  const moveCursorToEnd = () => {
    if (folderNameRef.current) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(folderNameRef.current)
      range.collapse(false) // false: 끝으로 이동
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  // 폴더 이름 저장
  const handleSaveFolderName = () => {
    if (newFolderName.trim()) {
      updateFolderName(folder.folderId, newFolderName) // 폴더 이름 업데이트
    } else {
      setNewFolderName(folder.name) // 이름이 비어 있으면 기존 이름으로 되돌림
    }
    setIsEditingFolder(false)
  }

  const handleFolderNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFolderName()
  }

  // 파일 추가 버튼 클릭 이벤트
  const handleAddFileClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 폴더 선택 이벤트 방지
    setIsOpen(true) // 폴더가 닫혀있을 경우 열기
    setIsFileEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0) // 파일 이름 입력에 포커스
  }

  // 파일 이름 저장 및 추가
  const handleSaveFile = () => {
    if (newFileName.trim()) {
      addFile(folder.folderId, newFileName) // 파일 추가
    }
    setNewFileName('')
    setIsFileEditing(false)
  }

  const handleCancelFile = () => {
    setNewFileName('')
    setIsFileEditing(false)
  }

  // Enter 키로 파일 저장
  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFile()
  }

  const toggleFolder = () => {
    if (!isFolderEditing) {
      setIsOpen(!isOpen) // 폴더 클릭 시 열고 닫기 토글
      onSelectFolder(folder) // 폴더 선택 시 상위 컴포넌트에 알림
    }
  }

  useEffect(() => {
    if (folderNameRef.current) {
      folderNameRef.current.textContent = newFolderName
    }

    if (isFileEditing) {
      inputRef.current?.focus()
    }
  }, [isFolderEditing, isFileEditing])

  // 폴더 간 드래그 앤 드롭 설정
  const [, drop] = useDrop({
    accept: 'FOLDER',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveFolder(item.index, index) // 폴더 이동
        item.index = index // 드래그 중인 아이템의 인덱스를 업데이트
      }
    },
  })

  const [, drag] = useDrag({
    type: 'FOLDER',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <li className="mx-2 mb-4 list-none">
      <div
        ref={ref}
        className="group flex w-full cursor-pointer items-center justify-between rounded-[7px] px-2 py-2 hover:bg-white"
        onClick={toggleFolder}
      >
        <div className="flex items-center">
          <CiFolderOn
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />

          {isFolderEditing ? (
            <div
              ref={folderNameRef}
              contentEditable={isFolderEditing} // 편집 중일 때만 true로 설정
              suppressContentEditableWarning={true} // 경고 메시지 방지
              onInput={(e) =>
                setNewFolderName(e.currentTarget.textContent || '')
              }
              onBlur={handleSaveFolderName}
              onKeyDown={handleFolderNameKeyDown}
              className="w-40 resize-none overflow-hidden bg-transparent px-2 text-base outline-none"
              style={{
                whiteSpace: 'pre-wrap',
                maxWidth: '130px', // 한 줄 최대 길이 설정
                height: 'auto', // 높이를 자동으로 설정
              }}
            />
          ) : (
            <p
              className={`px-2 text-base ${
                isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'
              }`}
            >
              {newFolderName}
            </p>
          )}
        </div>

        <div className="flex hidden w-16 items-center justify-between group-hover:flex">
          <PiFilePlusLight
            onClick={handleAddFileClick} // 파일 추가 클릭 이벤트
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <GoPencil
            onClick={handleEditFolderClick} // 폴더 이름 편집 시작
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <PiTrashSimpleLight
            onClick={() => deleteFolder(folder.folderId)}
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
              file={file}
            />
          ))}

          {isFileEditing && (
            <li className="mb-4 flex items-center">
              <div className="mr-4 h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>
              <div
                ref={inputRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={(e) =>
                  setNewFileName(e.currentTarget.textContent || '')
                }
                onBlur={handleCancelFile} // 포커스가 벗어나면 취소
                onKeyDown={handleFileNameKeyDown} // Enter로 파일 저장
                className="flex-1 border-gray text-base"
              />
            </li>
          )}
        </ul>
      )}
    </li>
  )
}

export default FolderList
