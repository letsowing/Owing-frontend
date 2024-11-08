/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import { FileItem } from '@/types'
import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface FolderListItemProps {
  id: number
  index: number
  name: string
  folderId: number
  files: FileItem[]
  currentService: any
  onSelectFile: (fileId: number) => void
}

export default function FolderListItem({
  id,
  index,
  name,
  folderId,
  files,
  currentService,
  onSelectFile,
}: FolderListItemProps) {
  const file = files[index]
  const { moveFileItem, updateFileName, deleteFile } = useDnd()
  const { activePath, goToStory } = useNavigation()
  const ref = useRef<HTMLLIElement>(null)

  const [isFileEditing, setIsFileEditing] = useState(false)
  const [newFileName, setNewFileName] = useState(file.name)

  const fileNameRef = useRef<HTMLDivElement>(null)

  const moveCursorToEnd = () => {
    if (fileNameRef.current) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(fileNameRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const handleEditFileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFileEditing(true)
    setTimeout(() => moveCursorToEnd(), 0)
  }

  const handleSaveFileName = async () => {
    const trimmedFileName = newFileName.trim()
    if (!trimmedFileName || trimmedFileName === file.name) {
      return
    }
    try {
      const data = {
        name: trimmedFileName,
        description: file.description,
      }
      await currentService.putFile(id, data)
      updateFileName(folderId, id, trimmedFileName)
    } catch (error) {
      console.error('파일 이름 업데이트 실패:', error)
      setNewFileName(file.name)
    } finally {
      setIsFileEditing(false)
    }
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFileName()
  }

  const handleDeleteFile = async () => {
    try {
      await currentService.deleteFile(id)
      deleteFile(folderId, id)
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  const handleItemClick = () => {
    onSelectFile(id)
    if (activePath.includes('storyManagement')) {
      goToStory(id)
    }
  }

  const handleFileNameInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || ''

    if (content.trim().length <= 50) {
      setNewFileName(content.trim())
    }
  }

  const [{ isDragging }, drag] = useDrag({
    type: 'TAB_ITEM',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'TAB_ITEM',
    hover(item: { id: number; index: number }) {
      if (!ref.current) return

      const dragIndex = item.index
      if (dragIndex === index) return

      let beforeId = -1
      let afterId = -1

      if (index > 0) {
        beforeId = files[index - 1].id
      }

      if (index < files.length - 1) {
        afterId = files[index].id
      }

      moveFileItem(folderId, dragIndex, index)
      item.index = index

      currentService
        .patchFile(item.id, {
          beforeId,
          afterId,
          folderId,
        })
        .catch((error: any) => {
          console.error('파일 이동 실패:', error)
        })
    },
  })

  drag(drop(ref))

  useEffect(() => {
    if (isFileEditing) {
      fileNameRef.current?.focus()

      if (fileNameRef.current) {
        fileNameRef.current.textContent = newFileName
      }
    }
  }, [isFileEditing, newFileName])

  return (
    <li
      ref={ref}
      className={`${
        isDragging ? 'bg-white opacity-50' : ''
      } group my-2 flex h-10 w-full items-center justify-between rounded-[7px] hover:bg-white`}
      onClick={handleItemClick}
    >
      <div className="flex items-center">
        <div className="ms-2 h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>

        {isFileEditing ? (
          <div
            ref={fileNameRef}
            contentEditable={isFileEditing}
            suppressContentEditableWarning={true}
            onInput={handleFileNameInput}
            onBlur={handleSaveFileName}
            onKeyDown={handleFileNameKeyDown}
            className="h-auto w-40 max-w-[130px] resize-none overflow-hidden whitespace-pre-wrap bg-transparent px-2 text-base outline-none"
          ></div>
        ) : (
          <p className="mx-2 max-w-32 truncate text-[15px] text-darkgray">
            {name}
          </p>
        )}
      </div>

      <div className="me-1 flex hidden w-10 items-center justify-between group-hover:flex">
        <GoPencil
          className={`${
            isFileEditing ? 'text-redorange dark:text-blue' : 'text-darkgray'
          } cursor-pointer`}
          onClick={handleEditFileClick}
        />
        <PiTrashSimpleLight
          onClick={handleDeleteFile}
          className="cursor-pointer text-darkgray"
        />
      </div>
    </li>
  )
}
