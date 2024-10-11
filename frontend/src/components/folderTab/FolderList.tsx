/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'

import DraggableListItem from '@components/dnd/DraggableListItem'

import { useDnd } from '@hooks/useDnd'

import { FileItem, FolderItem } from '@types'
import { useDrag, useDrop } from 'react-dnd'
import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight, PiTrashSimpleLight } from 'react-icons/pi'

interface FolderListProps {
  folder: FolderItem
  index: number
  onSelectFolder: (folder: FolderItem) => void
  isActive: boolean
  currentService: any
}

const FolderList: React.FC<FolderListProps> = ({
  folder,
  index,
  onSelectFolder,
  isActive,
  currentService,
}) => {
  const { moveFolder, addFile, updateFolderName, deleteFolder } = useDnd()
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
    if (newFolderName.trim() && newFolderName !== folder.name) {
      try {
        const data = {
          name: newFolderName,
          description: folder.description,
        }
        await currentService.putFolder(folder.id, data)
        updateFolderName(folder.id, newFolderName)
      } catch (error) {
        console.error('폴더 이름 업데이트 실패:', error)
        setNewFolderName(folder.name)
      }
    } else {
      setNewFolderName(folder.name)
    }
    setIsEditingFolder(false)
  }

  const handleFolderNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFolderName()
  }

  const handleAddFileClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(true)
    setIsFileEditing(true)
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const handleSaveFile = async () => {
    if (newFileName.trim()) {
      try {
        const data = {
          name: newFileName,
          description: 'This is a file description',
          folderId: folder.id,
        }
        const newFile = await currentService.postFile(data)
        addFile(folder.id, newFile.id, newFileName)
      } catch (error) {
        console.error('파일 추가 실패:', error)
      }
    }
    setNewFileName('')
    setIsFileEditing(false)
  }

  const handleCancelFile = () => {
    setNewFileName('')
    setIsFileEditing(false)
  }

  const handleFileNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSaveFile()
  }

  const toggleFolder = () => {
    if (!isFolderEditing) {
      setIsOpen((prev) => !prev)
      onSelectFolder(folder)
    }
  }

  const handleDeleteFolder = async () => {
    try {
      await currentService.deleteFolder(folder.id)
      deleteFolder(folder.id)
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
    }
  }

  const [, drop] = useDrop({
    accept: 'FOLDER',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveFolder(item.index, index)
        item.index = index

        currentService.moveFolder(folder.id, item.index).catch((error: any) => {
          console.error('폴더 이동 실패:', error)
        })
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
              contentEditable={isFolderEditing}
              suppressContentEditableWarning={true}
              onInput={(e) =>
                setNewFolderName(e.currentTarget.textContent || '')
              }
              onBlur={handleSaveFolderName}
              onKeyDown={handleFolderNameKeyDown}
              className="w-40 resize-none overflow-hidden bg-transparent px-2 text-base outline-none"
              style={{
                whiteSpace: 'pre-wrap',
                maxWidth: '130px',
                height: 'auto',
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
        <ul className="mx-5">
          {folder.files?.map((file: FileItem, fileIndex: number) => (
            <DraggableListItem
              key={file.id}
              id={file.id}
              index={fileIndex}
              name={file.name}
              folderId={folder.id}
              file={file}
              currentService={currentService}
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
