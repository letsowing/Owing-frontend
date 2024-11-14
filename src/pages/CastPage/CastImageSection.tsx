import React, { useState } from 'react'

import Loader from '@components/common/Loader'

import { useConfirm } from '@hooks/useConfirm'

import AIImageGenerationPrompt from './AIImageGenerationPrompt'
import CastImage from './CastImage'

import { postCastGenerateAiImage } from '@services/castService'
import { Cast } from '@types'
import { BsPlusCircle } from 'react-icons/bs'

interface CastImageSectionProps {
  castData: Cast
  isEditing: boolean
}

const CastImageSection: React.FC<CastImageSectionProps> = ({
  castData,
  isEditing,
}) => {
  const { confirmAIImageGeneration } = useConfirm()
  const [editedImageUrl, setEditedImageUrl] = useState(castData.imageUrl || '')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedImageUrl(reader.result as string)
        castData.imageUrl = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerateAiImage = async () => {
    const isConfirmed = await confirmAIImageGeneration()
    if (!isConfirmed) {
      return
    }
    setIsGenerating(true)
    try {
      const data = await postCastGenerateAiImage({
        name: castData.name,
        age: castData.age || 0,
        gender: castData.gender,
        role: castData.role,
        description: castData.description,
      })
      castData.imageUrl = data.imageUrl
      setEditedImageUrl(data.imageUrl)
    } catch (error) {
      console.error('인물 AI 이미지 생성 실패:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex-col">
        {isEditing && (
          <label
            htmlFor="imageUpload"
            className="mb-1 flex w-80 cursor-pointer justify-end"
          >
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
          </label>
        )}
        <div className="flex h-80 w-80 items-center rounded-xl bg-beige dark:bg-coldbeige">
          {isGenerating ? (
            <div className="w-full flex-col">
              <div className="my-10">
                <Loader />
              </div>
              <label className="px-14 py-10 text-sm font-black text-orange text-opacity-60 dark:text-cornflowerblue dark:text-opacity-70">
                이미지 생성에 1분 정도 소요됩니다.
              </label>
            </div>
          ) : (
            <CastImage imageUrl={castData.imageUrl || editedImageUrl || ''} />
          )}
        </div>
        {isEditing && (
          <AIImageGenerationPrompt
            onGenerateAiImageClick={handleGenerateAiImage}
            isGenerating={isGenerating}
          />
        )}
      </div>
    </div>
  )
}

export default CastImageSection
