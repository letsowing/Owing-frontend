/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import Loader from '@components/common/Loader'

import { useDnd } from '@hooks/useDnd'

import AlertOwing from '@assets/common/AlertOwing.png'
import {
  postUniverseGenerateAiImage,
  putUniverse,
} from '@services/universeService'
import { DraggableBoxProps } from '@types'
import { useDrag, useDrop } from 'react-dnd'

export default function UniverseDraggableBox({
  index,
  files,
  folderId,
  currentService,
}: DraggableBoxProps) {
  const file = files[index]
  const { moveFileItem, updateFile } = useDnd()
  const ref = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(file.name)
  const [editedDescription, setEditedDescription] = useState(file.description)
  const [editedImageUrl, setEditedImageUrl] = useState(file.imageUrl)

  const [, drop] = useDrop({
    accept: 'GRID_ITEM',
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

  const [{ isDragging }, drag] = useDrag({
    type: 'GRID_ITEM',
    item: { id: file.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleSave = async (e: React.MouseEvent) => {
    const trimmedEditedName = editedName.trim()
    if (!trimmedEditedName) {
      setIsEditing(false)
      return
    }
    e.stopPropagation()
    console.log(editedDescription)
    try {
      await putUniverse(file.id, {
        name: trimmedEditedName,
        description: editedDescription,
        imageUrl: editedImageUrl || '',
      })

      updateFile(folderId, file.id, {
        name: trimmedEditedName,
        description: editedDescription,
        imageUrl: editedImageUrl,
      })
      setIsEditing(false)
    } catch (error) {
      console.error('파일 업데이트 실패:', error)
    }
  }

  const handleCancel = () => {
    setEditedName(file.name)
    setEditedDescription(file.description)
    setIsEditing(false)
  }

  const handleAiImage = async () => {
    setIsGenerating(true)
    try {
      const data = await postUniverseGenerateAiImage({
        name: editedName,
        description: editedDescription,
      })
      setEditedImageUrl(data.imageUrl)
    } catch (error) {
      console.error('세계관 AI 이미지 생성 실패:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      ref={ref}
      className={`shadow-gray-300/50 m-4 flex items-center rounded-md bg-white p-6 shadow-lg ${
        isDragging ? 'opacity-20' : ''
      }`}
    >
      <div className="flex w-full items-center">
        {isGenerating ? (
          <div className="h-[240px] w-[240px] flex-col items-center border border-lightgray">
            <div className="mb-10 mt-20">
              <Loader />
            </div>
            <label className="px-4 py-10 text-sm font-black text-orange text-opacity-60 dark:text-cornflowerblue dark:text-opacity-70">
              이미지 생성에 1분 정도 소요됩니다.
            </label>
          </div>
        ) : editedImageUrl ? (
          <div
            className="h-[240px] w-[240px] min-w-[240px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${editedImageUrl})`,
            }}
          ></div>
        ) : (
          <div className="flex h-[240px] w-[240px] min-w-[240px] flex-col items-center justify-center rounded-[6px] border border-[#CFCDCD]">
            <img
              src={AlertOwing}
              alt="AlertOwing"
              className="mx-auto h-auto w-12"
            />
            <div className="mt-4 text-redorange">이미지를 추가해 주세요!</div>
          </div>
        )}

        <div className="m-4 mb-auto flex w-3/4 flex-grow flex-col">
          {isEditing ? (
            <>
              <input
                className="mb-2 w-full border-b border-lightgray text-2xl font-semibold"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <textarea
                className="mt-1 h-[11rem] w-full min-w-full overflow-y-auto rounded border border-lightgray p-2 text-darkgray"
                rows={5}
                value={editedDescription || ''}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <strong className="text-2xl font-semibold">{file.name}</strong>
              <p className="mt-4 h-[11rem] overflow-y-auto text-darkgray">
                {file.description}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="ml-auto flex h-56 w-1/4 flex-col items-end justify-between font-semibold">
        {isEditing ? (
          <>
            <div className="mb-auto flex flex-col items-end">
              <button
                className={`h-10 from-redorange to-orange px-4 text-sm text-redorange hover:rounded-[10px] hover:bg-gradient-to-r hover:text-white ${
                  !isGenerating ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={handleAiImage}
              >
                + Create Image with AI
              </button>
              <button
                className="mt-2 h-10 px-4 text-sm text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
                onClick={handleUploadClick}
              >
                + Upload Image locally
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="mt-auto flex flex-row items-center space-x-2">
              <button
                onClick={handleCancel}
                className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="mt-auto h-12 px-4 text-lg text-darkgray hover:rounded-[10px] hover:bg-darkgray hover:text-white"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}
