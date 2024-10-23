import React from 'react'

import AIImageGenerationPrompt from './AIImageGenerationPrompt'
import CharacterImage from './CharacterImage'

import { Character } from '@types'
import { BsPlusCircle } from 'react-icons/bs'

interface CharacterImageSectionProps {
  characterData: Character
  isEditing: boolean
  onImageUpload: (file: File) => Promise<void>
}

const CharacterImageSection: React.FC<CharacterImageSectionProps> = ({
  characterData,
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
        <div className="flex-center align-center flex h-80 w-80 rounded-xl bg-coldbeige">
          <CharacterImage imageUrl={characterData.imageUrl} />
        </div>
        {isEditing && <AIImageGenerationPrompt />}
      </div>
    </div>
  )
}

export default CharacterImageSection
