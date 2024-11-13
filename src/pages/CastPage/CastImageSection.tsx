import React from 'react'

import AIImageGenerationPrompt from './AIImageGenerationPrompt'
import CastImage from './CastImage'

import { Cast } from '@types'
import { BsPlusCircle } from 'react-icons/bs'

interface CastImageSectionProps {
  castData: Cast
  isEditing: boolean
  onImageUpload: (file: File) => Promise<void>
}

const CastImageSection: React.FC<CastImageSectionProps> = ({
  castData,
  isEditing,
  onImageUpload,
}) => {
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
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onImageUpload(file)
              }}
            />
            <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
          </label>
        )}
        <div className="flex-center align-center flex h-80 w-80 rounded-xl bg-beige dark:bg-coldbeige">
          <CastImage imageUrl={castData.imageUrl || ''} />
        </div>
        {isEditing && <AIImageGenerationPrompt />}
      </div>
    </div>
  )
}

export default CastImageSection
