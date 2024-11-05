/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'

import { useDnd } from '@hooks/useDnd'
import useNavigation from '@hooks/useNavigation'

import FolderListItem from './FolderListItem'

import { FileItem, FolderItem } from '@types'
import { useDrag, useDrop } from 'react-dnd'
import { CiFolderOn } from 'react-icons/ci'
import { GoPencil } from 'react-icons/go'
import { PiFilePlusLight, PiTrashSimpleLight } from 'react-icons/pi'

interface FolderListProps {
  folder: FolderItem
  index: number
  onSelectFolder: (folder: FolderItem) => void
  onSelectFile: (fileId: number | null) => void
  isActive: boolean
  currentService: any
}

const FolderList: React.FC<FolderListProps> = ({
  folder,
  index,
  onSelectFolder,
  onSelectFile,
  isActive,
  currentService,
}) => {
  const { moveFolder, addFile, updateFolderName, deleteFolder } = useDnd()
  const [isOpen, setIsOpen] = useState(true)
  const [isFolderEditing, setIsEditingFolder] = useState(false)
  const [newFolderName, setNewFolderName] = useState(folder.name)
  const [isFileEditing, setIsFileEditing] = useState(false)
  const [newFileName, setNewFileName] = useState('')
  const { activePath } = useNavigation()

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
    if (!trimmedFolderName || trimmedFolderName === folder.name) {
      return
    }
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
    } finally {
      setIsEditingFolder(false)
    }
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
    const trimmedFileName = newFileName.trim()
    if (!trimmedFileName) {
      return
    }

    try {
      let data
      let newFile

      if (activePath === 'cast') {
        data = {
          name: trimmedFileName,
          age: 0,
          gender: '',
          role: '',
          detail: '',
          position: { x: Math.random() * 500, y: Math.random() * 500 },
          folderId: folder.id,
          imageUrl: '',
        }
        newFile = await currentService.postCast(data)
      } else {
        data = {
          folderId: folder.id,
          name: trimmedFileName,
          description: '',
        }
        newFile = await currentService.postFile(data)
      }

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
    if (e.key === 'Enter') handleSaveFile()
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
      await currentService.deleteFolder(folder.id)
      deleteFolder(folder.id)
    } catch (error) {
      console.error('폴더 삭제 실패:', error)
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
        moveFolder(item.index, index)
        item.index = index

        currentService.patchFolder(item.id, item.index).catch((error: any) => {
          console.error('폴더 이동 실패:', error)
        })
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
              onInput={handleFileNameInput}
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
              id={file.id}
              index={fileIndex}
              name={file.name}
              folderId={folder.id}
              file={file}
              currentService={currentService}
              onSelectFile={(id) => {
                onSelectFolder(folder)
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
