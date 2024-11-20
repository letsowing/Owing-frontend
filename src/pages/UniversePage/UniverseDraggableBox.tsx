/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'

import Loader from '@components/common/Loader'

import { useThemeStore } from '@stores/themeStore'

import { useConfirm } from '@hooks/useConfirm'
import { useDnd } from '@hooks/useDnd'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'
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
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const { confirmAIImageGeneration } = useConfirm()
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

  const isFormValid = () => {
    return !!editedName.trim()
  }

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
    const isConfirmed = await confirmAIImageGeneration()
    if (!isConfirmed) {
      return
    }
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
      className={`mx-8 mb-6 flex items-center rounded-md bg-white p-6 text-darkgray shadow-lg dark:bg-darkblack dark:text-white dark:shadow-black ${
        isDragging ? 'opacity-20' : ''
      }`}
    >
      <div className="flex w-full items-center">
        {isGenerating ? (
          <div className="h-60 w-60 flex-col items-center rounded-md border text-center">
            <div className="mb-10 mt-20">
              <Loader />
            </div>
            <label className="px-4 py-10 text-xs font-black text-orange text-opacity-60 dark:text-cornflowerblue dark:text-opacity-70">
              이미지 생성에 1분 정도 소요됩니다.
            </label>
          </div>
        ) : editedImageUrl ? (
          <div
            className="h-60 w-60 min-w-60 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${editedImageUrl})`,
            }}
          ></div>
        ) : (
          <div className="flex h-60 w-60 min-w-60 flex-col items-center justify-center rounded-md border border-lightgray dark:border-lightdarkgray">
            <img
              src={isDarkMode ? DarkAlertOwing : AlertOwing}
              alt="AlertOwing"
              className="mx-auto h-auto w-12"
            />
            <div className="mt-4 text-redorange dark:text-skyblue">
              이미지를 추가해 주세요!
            </div>
          </div>
        )}

        <div className="m-2 ms-5 flex flex-grow flex-col">
          {isEditing ? (
            <>
              <input
                className="mb-2 w-full rounded-md border p-2 text-2xl font-semibold dark:bg-verydarkblack"
                value={editedName}
                placeholder="필수 입력입니다."
                onChange={(e) => setEditedName(e.target.value)}
              />
              <textarea
                placeholder="설명을 입력할 수 있습니다."
                className="scroll-hide mt-1 h-[11rem] w-full min-w-full resize-none overflow-y-auto rounded-md border p-2 dark:bg-verydarkblack"
                value={editedDescription || ''}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
            </>
          ) : (
            <>
              <div className="mb-2 p-2 text-2xl font-semibold">{file.name}</div>
              <p className="scroll-hide h-44 overflow-y-auto rounded-md p-2">
                {file.description || '설명을 입력할 수 있습니다.'}
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
                className={`h-10 from-redorange to-orange px-4 text-sm text-redorange hover:rounded-md hover:bg-gradient-to-r hover:text-white dark:from-blue dark:to-skyblue dark:text-blue dark:hover:text-white ${
                  !isGenerating ? 'cursor-pointer' : 'cursor-not-allowed'
                }`}
                onClick={handleAiImage}
              >
                + AI 이미지 생성하기
              </button>
              <button
                className="mt-2 h-10 px-4 text-sm hover:rounded-md hover:bg-darkgray hover:text-white"
                onClick={handleUploadClick}
              >
                + 내 이미지 불러오기
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden dark:bg-verydarkblack"
              />
            </div>
            <div className="mt-auto flex flex-row items-center space-x-2">
              <button
                onClick={handleCancel}
                className="h-12 px-4 text-lg hover:rounded-md hover:bg-darkgray hover:text-white"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                className="h-12 px-4 text-lg hover:rounded-md hover:bg-darkgray hover:text-white"
                disabled={!isFormValid()}
              >
                저장
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="mt-auto h-12 px-4 text-lg hover:rounded-md hover:bg-darkgray hover:text-white dark:hover:bg-skyblue dark:hover:text-darkgray"
          >
            줄거리 수정
          </button>
        )}
      </div>
    </div>
  )
}
