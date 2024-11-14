/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import { useConfirm } from '@hooks/useConfirm'
import { useDnd } from '@hooks/useDnd'

import FolderListItem from './FolderListItem'

import { FileItem, FolderItem } from '@types'
import { useDrag, useDrop } from 'react-dnd'
import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight, PiTrashSimpleLight } from 'react-icons/pi'

interface FolderListProps {
  folders: FolderItem[]
  index: number
  onSelectFolder: (folder: FolderItem) => void
  onSelectFile: (fileId: number | null) => void
  isActive: boolean
  currentService: any
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  index,
  onSelectFolder,
  onSelectFile,
  isActive,
  currentService,
}) => {
  const folder = folders[index]
  const { moveFolder, addFile, updateFolderName, deleteFolder } = useDnd()
  const currentProject = useProjectStore((state) => state.currentProject)
  const { confirmDelete } = useConfirm()

  const [isOpen, setIsOpen] = useState(true)
  const [isFolderEditing, setIsEditingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState(folder.name)
  const [isFileEditing, setIsFileEditing] = useState(false)
  const [newFileName, setNewFileName] = useState('')

  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLDivElement>(null)
  const folderNameRef = useRef<HTMLInputElement>(null)

  const handleEditFolderClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditingFolder(true)
    setTimeout(() => moveCursorToEnd(), 0)
  }

  const moveCursorToEnd = () => {
    if (folderNameRef.current) {
      const range = document.createRange()
      const selection = window.getSelection()
      range.selectNodeContents(folderNameRef.current)
      range.collapse(false)
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }

  const handleSaveFolderName = async () => {
    const trimmedFolderName = newFolderName.trim()
    if (trimmedFolderName === '' || trimmedFolderName === folder.name) {
      setNewFolderName(folder.name)
      setIsEditingFolder(false)
      return
    }
    try {
      await currentService.patchFolderTitle(folder.id, {
        name: trimmedFolderName,
      })
      updateFolderName(folder.id, trimmedFolderName)
    } catch (error) {
      console.error('폴더 이름 업데이트 실패:', error)
      setNewFolderName(folder.name)
    } finally {
      setIsEditingFolder(false)
    }
  }

  const handleFolderNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (
        newFolderName.trim().length > 0 &&
        e.nativeEvent.isComposing === false
      ) {
        handleSaveFolderName()
      }
    }
  }

  const handleAddFileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
    setIsFileEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSaveFile = async () => {
    const trimmedFileName = newFileName.trim()
    if (!trimmedFileName) {
      setIsFileEditing(false)
      return
    }

    try {
      const newFile = await currentService.postFile({
        folderId: folder.id,
        name: trimmedFileName,
      })

      addFile(folder.id, newFile.id, trimmedFileName)
    } catch (error) {
      console.error('파일 추가 실패:', error)
    }
    setNewFileName('')
    setIsFileEditing(false)
  }

  const handleCancelFile = () => {
    setNewFileName('')
    setIsFileEditing(false)
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (
        newFileName.trim().length > 0 &&
        e.nativeEvent.isComposing === false
      ) {
        handleSaveFile()
      }
    }
  }

  const toggleFolder = () => {
    if (!isFolderEditing) {
      setIsOpen((prev) => !prev)
      onSelectFolder(folder)
      onSelectFile(folder.files?.length > 0 ? folder.files?.[0].id : null)
    }
  }

  const handleDeleteFolder = async () => {
    try {
      const isConfirmed = await confirmDelete({
        title: '폴더를 삭제하시겠습니까?',
        text: '휴지통으로 옮겨집니다.',
      })
      if (isConfirmed) {
        await currentService.deleteFolder(folder.id)
        deleteFolder(folder.id)
      }
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
    }
  }
  const handleFolderNameInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || ''
    const trimmedContent = content.trim()

    if (trimmedContent.length <= 50) {
      setNewFolderName(trimmedContent)
    }
  }

  const handleFileNameInput = (e: React.FormEvent<HTMLDivElement>) => {
    const content = e.currentTarget.textContent || ''
    const trimmedContent = content.trim()

    if (trimmedContent.length <= 50) {
      setNewFileName(trimmedContent)
    }
  }

  const [, drop] = useDrop({
    accept: 'FOLDER',
    hover(item: { index: number; id: number }) {
      if (item.index !== index) {
        let beforeId = null
        let afterId = null

        if (index > 0) {
          beforeId = folders[index - 1].id
        }

        if (index < folders.length - 1) {
          afterId = folders[index].id
        }

        currentService
          .patchFolderPosition(item.id, {
            beforeId,
            afterId,
            projectId: currentProject.id,
          })
          .catch((error: any) => {
            console.error('폴더 이동 실패:', error)
          })

        moveFolder(item.index, index)
        item.index = index
      }
    },
  })

  const [, drag] = useDrag({
    type: 'FOLDER',
    item: { index, id: folder.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  useEffect(() => {
    if (isFolderEditing) {
      if (folderNameRef.current) {
        folderNameRef.current.textContent = newFolderName
        moveCursorToEnd()
      }
    }
  }, [isFolderEditing, newFolderName])

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
              contentEditable={isFolderEditing}
              suppressContentEditableWarning={true}
              onInput={handleFolderNameInput}
              onBlur={handleSaveFolderName}
              onKeyDown={handleFolderNameKeyDown}
              className="h-auto w-40 max-w-[130px] resize-none overflow-hidden whitespace-pre-wrap bg-transparent px-2 text-base outline-none"
            />
          ) : (
            <p
              className={`max-w-36 truncate px-2 text-base ${
                isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'
              }`}
            >
              {newFolderName}
            </p>
          )}
        </div>

        <div className="flex hidden w-16 items-center justify-between group-hover:flex">
          <PiFilePlusLight
            onClick={handleAddFileClick}
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <GoPencil
            onClick={handleEditFolderClick}
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
          <PiTrashSimpleLight
            onClick={handleDeleteFolder}
            className={`${isActive ? 'text-redorange dark:text-blue' : 'text-darkgray'}`}
          />
        </div>
      </div>

      {isOpen && (
        <ul className="pe-2 ps-4">
          {folder.files?.map((file: FileItem, fileIndex: number) => (
            <FolderListItem
              key={file.id}
              index={fileIndex}
              folderId={folder.id}
              files={folder.files}
              currentService={currentService}
              onSelectFile={(id) => {
                onSelectFolder(folders[index])
                onSelectFile(id)
              }}
            />
          ))}

          {isFileEditing && (
            <li className="mb-4 flex items-center">
              <div className="mr-4 h-1 w-1 rounded-full bg-redorange dark:bg-blue"></div>
              <div
                ref={inputRef}
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleFileNameInput}
                onBlur={handleCancelFile}
                onKeyDown={handleFileNameKeyDown}
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
