/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

import { useConfirm } from '@hooks/useConfirm'
import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import { FileItem } from '@types'
import { useDrag, useDrop } from 'react-dnd'
import { GoPencil } from 'react-icons/go'
import { PiTrashSimpleLight } from 'react-icons/pi'

interface FolderListItemProps {
  index: number
  folderId: number
  files: FileItem[]
  isActive: boolean
  currentService: any
  onSelectFile: (fileId: number) => void
}

export default function FolderListItem({
  index,
  folderId,
  files,
  isActive,
  currentService,
  onSelectFile,
}: FolderListItemProps) {
  const file = files[index]
  const { moveFileItem, updateFileName, deleteFile } = useDnd()
  const { activePath, goToStory } = useNavigation()
  const { confirmDelete } = useConfirm()

  const [isFileEditing, setIsFileEditing] = useState(false)
  const [newFileName, setNewFileName] = useState(file.name)

  const ref = useRef<HTMLLIElement>(null)
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

  const handleSaveFileName = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedFileName = newFileName.trim()
    if (!trimmedFileName || trimmedFileName === file.name) {
      setNewFileName(file.name)
      setIsFileEditing(false)
      return
    }
    try {
      await currentService.patchFileTitle(file.id, { name: trimmedFileName })
      updateFileName(folderId, file.id, trimmedFileName)
    } catch (error) {
      console.error('파일 이름 업데이트 실패:', error)
      setNewFileName(file.name)
    } finally {
      setIsFileEditing(false)
    }
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.nativeEvent.isComposing === false) {
        e.preventDefault()
        handleSaveFileName(e)
      }
    }
  }

  const handleDeleteFile = async () => {
    try {
      const isConfirmed = await confirmDelete({
        title: '파일을 삭제하시겠습니까?',
        text: '휴지통으로 옮겨집니다.',
      })
      if (isConfirmed) {
        await currentService.deleteFile(file.id)
        deleteFile(folderId, file.id)
      }
    } catch (error) {
      console.error('파일 삭제 실패:', error)
    }
  }

  const handleItemClick = () => {
    onSelectFile(file.id)
    if (activePath.includes('storyManagement')) {
      goToStory(file.id)
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
    item: { id: file.id, index },
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

      let beforeId = null
      let afterId = null

      if (index > 0) {
        beforeId = files[index - 1].id
      }

      if (index < files.length - 1) {
        afterId = files[index].id
      }

      moveFileItem(folderId, dragIndex, index)
      item.index = index

      currentService
        .patchFilePosition(item.id, {
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
          <p
            className={`mx-2 max-w-32 truncate text-[15px] ${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          >
            {file.name}
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
