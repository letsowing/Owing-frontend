import { useRef, useState } from 'react'

import { useWorldViewStore } from '@stores/worldViewStore'

import WorldViewListItem from './WorldViewListItem'

import { useDrag, useDrop } from 'react-dnd'
import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight, PiTrashSimpleLight } from 'react-icons/pi'

interface WorldViewFolderListProps {
  folder: any
  index: number
  onSelectFolder: (folder: any) => void
  isActive: boolean
}

export default function WorldViewFolderList({
  folder,
  index,
  onSelectFolder,
  isActive,
}: WorldViewFolderListProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { moveFolder } = useWorldViewStore()

  const toggleFolder = () => {
    setIsOpen(!isOpen)
    onSelectFolder(folder)
  }

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
          {folder.files?.map((file: any, fileIndex: number) => (
            <WorldViewListItem
              key={file.fileId}
              id={file.fileId}
              index={fileIndex}
              name={file.name}
              folderId={folder.folderId}
              folder={file}
            />
          ))}
        </ul>
      )}
    </li>
  )
}
