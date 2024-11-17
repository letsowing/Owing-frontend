import React from 'react'

import { useThemeStore } from '@stores/themeStore'

import Loader from './Loader'

import AlertOwing from '@assets/common/AlertOwing.png'
import DarkAlertOwing from '@assets/common/DarkAlertOwing.png'
import { BsPlusCircle } from 'react-icons/bs'
import { MdLightbulbOutline } from 'react-icons/md'

interface ImageFormProps {
  isEditable: boolean
  image: string
  onImageChange: (image: string) => void
  onAIGenerateClick: () => void
  isGenerating?: boolean
}

const ImageForm: React.FC<ImageFormProps> = ({
  isEditable,
  image,
  onImageChange,
  onAIGenerateClick,
  isGenerating = false,
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode)
  const imageUrl = image || isDarkMode ? DarkAlertOwing : AlertOwing

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col ps-1">
      <div className="flex w-80 justify-between">
        <label className="font-semibold dark:text-coldbeige">이미지</label>
        {isEditable && (
          <label htmlFor="imageUpload" className="cursor-pointer">
            <BsPlusCircle className="mt-1 text-redorange dark:text-blue" />
          </label>
        )}
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
          disabled={!isEditable}
        />
      </div>
      <div className="my-1 flex h-80 w-80 items-center justify-center rounded-xl border border-lightgray dark:border-lightdarkgray dark:bg-verydarkblack">
        {isGenerating ? (
          <div className="flex-col">
            <div className="my-10">
              <Loader />
            </div>
            <label className="py-10 text-sm font-black text-orange text-opacity-60 dark:text-cornflowerblue dark:text-opacity-70">
              이미지 생성에 1분 정도 소요됩니다.
            </label>
          </div>
        ) : (
          <img
            src={image ? image : imageUrl}
            alt="잘못된 경로입니다."
            className="h-full w-full rounded-xl object-cover text-xs text-gray"
          />
        )}
      </div>
      {isEditable && (
        <div
          onClick={onAIGenerateClick}
          className={`mt-3 flex w-80 items-center justify-between rounded-full border border-lightgray p-3 px-4 dark:border-lightdarkgray ${
            !isGenerating ? 'cursor-pointer' : 'cursor-not-allowed'
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="text-xl font-medium text-redorange dark:text-blue">
              <MdLightbulbOutline />
            </div>
            <span className="text-[10px] font-medium text-darkgray dark:text-coldbeige">
              AI를 활용하여 이미지를 생성할 수 있어요!
            </span>
          </div>
          <span className="mx-2 rounded-full bg-orange bg-opacity-20 px-2 text-sm text-redorange dark:bg-coldbeige dark:text-blue">
            Click
          </span>
        </div>
      )}
    </div>
  )
}

export default ImageForm
