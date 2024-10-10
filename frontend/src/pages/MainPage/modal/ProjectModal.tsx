import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import InputField from '@components/common/InputField'
import Modal from '@components/common/Modal'
import TextAreaField from '@components/common/TextAreaField'

import ProjectTagField from './ProjectTagField'

import { CATEGORY_LIST } from '@constants/categoryList'
import { GENRE_LIST } from '@constants/genreList'
import { postGenerateAiImage } from '@services/workService'
import { ModalType, Work, WorkModalProps } from '@types'

const initialWork: Work = {
  id: 0,
  title: '',
  genres: [],
  category: '',
  description: '',
  imageUrl: '',
}

const WorkModal = ({ isEditable, work, onSave, onClose }: WorkModalProps) => {
  const [currentWork, setCurrentWork] = useState<Work>(initialWork)

  useEffect(() => {
    if (work) {
      setCurrentWork(work)
    } else {
      setCurrentWork(initialWork)
    }
  }, [work])

  const handleInputChange = (field: keyof Work, value: string) => {
    setCurrentWork((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(currentWork)
    onClose()
  }

  const onImageChange = (imageUrl: string) => {
    setCurrentWork((prev) => ({
      ...prev,
      imageUrl: imageUrl,
    }))
  }

  const onAiGenerateClick = () => {
    const generateAiImage = async () => {
      try {
        const data = await postGenerateAiImage(
          currentWork.title,
          currentWork.description || '',
          currentWork.category || '',
          currentWork.genres || [],
        )
        onImageChange(data)
      } catch (error) {
        console.error('AI 이미지 생성 실패', error)
      }
    }
    generateAiImage()
  }

  const onCategoryTagClick = (value: string) => {
    setCurrentWork((prevWork) => ({
      ...prevWork,
      category: prevWork.category === value ? '' : value,
    }))
  }

  const onGenreTagClick = (value: string) => {
    setCurrentWork((prevWork) => {
      const isTagSelected = prevWork.genres.includes(value)

      const updatedGenres = isTagSelected
        ? prevWork.genres.filter((genre) => genre !== value)
        : prevWork.genres.length < 5
          ? [...prevWork.genres, value]
          : prevWork.genres

      return {
        ...prevWork,
        genres: updatedGenres,
      }
    })
    console.log(currentWork.genres)
  }

  return (
    <Modal
      modalType={ModalType.WORK}
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onPrimaryAction={handleSave}
      onSecondaryAction={onClose}
    >
      <div className="mx-20 mt-8 flex flex-col gap-5">
        <div className="flex justify-center">
          <ImageForm
            isEditable={isEditable}
            image={currentWork.imageUrl}
            onImageChange={onImageChange}
            onAIGenerateClick={onAiGenerateClick}
          />
        </div>
        <InputField
          type="text"
          labelValue="작품명"
          isRequired={isEditable}
          maxLength={50}
          isEditable={isEditable}
          value={currentWork.title}
          onChange={(value) => handleInputChange('title', value)}
        />
        <ProjectTagField
          labelValue="분류"
          tagList={CATEGORY_LIST}
          isEditable={isEditable}
          work={currentWork}
          onTagClick={onCategoryTagClick}
          type="category"
        />
        <div className="w-3/4">
          <ProjectTagField
            labelValue="장르"
            tagList={GENRE_LIST}
            isEditable={isEditable}
            work={currentWork}
            onTagClick={onGenreTagClick}
            type="genres"
          />
        </div>
        <TextAreaField
          labelValue="작품 설명"
          isRequired={isEditable}
          maxLength={1000}
          isEditable={isEditable}
          value={currentWork.description || ''}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
    </Modal>
  )
}

export default WorkModal
