import React, { useState } from 'react'

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
  const [editedImageUrl, setEditedImageUrl] = useState(castData.imageUrl || '')

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
        <div className="flex-center align-center flex h-80 w-80 rounded-xl bg-beige dark:bg-coldbeige">
          <CastImage imageUrl={castData.imageUrl || editedImageUrl || ''} />
        </div>
        {isEditing && (
          <AIImageGenerationPrompt
            onGenerateAiImageClick={handleGenerateAiImage}
          />
        )}
      </div>
    </div>
  )
}

export default CastImageSection
