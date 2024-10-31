import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import InputField from '@components/common/InputField'
import Loader from '@components/common/Loader'
import Modal from '@components/common/Modal'
import TextAreaField from '@components/common/TextAreaField'

import ProjectTagField from './ProjectTagField'

import { CATEGORY_LIST } from '@constants/categoryList'
import { GENRE_LIST } from '@constants/genreList'
import { postGenerateAiImage } from '@services/projectService'
import { ModalType, Project, ProjectModalProps } from '@types'

const initialProject: Project = {
  id: 0,
  title: '',
  genres: [],
  category: '',
  description: '',
  imageUrl: '',
}

const ProjectModal = ({
  isEditable,
  project,
  onSave,
  onClose,
}: ProjectModalProps) => {
  const [currentProject, setCurrentProject] = useState<Project>(initialProject)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (project) {
      setCurrentProject(project)
    } else {
      setCurrentProject(initialProject)
    }
  }, [project])

  const handleInputChange = (field: keyof Project, value: string) => {
    setCurrentProject((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(currentProject)
    onClose()
  }

  const onImageChange = (imageUrl: string) => {
    setCurrentProject((prev) => ({
      ...prev,
      imageUrl: imageUrl,
    }))
  }

  const onAiGenerateClick = () => {
    const generateAiImage = async () => {
      setIsGenerating(true)
      try {
        const data = await postGenerateAiImage(
          currentProject.title,
          currentProject.description || '',
          currentProject.category || '',
          currentProject.genres || [],
        )
        onImageChange(data)
      } catch (error) {
        console.error('AI 이미지 생성 실패', error)
      } finally {
        setIsGenerating(false)
      }
    }
    generateAiImage()
  }

  const onCategoryTagClick = (value: string) => {
    setCurrentProject((prevProject) => ({
      ...prevProject,
      category: prevProject.category === value ? '' : value,
    }))
  }

  const onGenreTagClick = (value: string) => {
    setCurrentProject((prevProject) => {
      const isTagSelected = prevProject.genres.includes(value)

      const updatedGenres = isTagSelected
        ? prevProject.genres.filter((genre) => genre !== value)
        : prevProject.genres.length < 5
          ? [...prevProject.genres, value]
          : prevProject.genres

      return {
        ...prevProject,
        genres: updatedGenres,
      }
    })
    console.log(currentProject.genres)
  }

  return (
    <Modal
      modalType={ModalType.PROJECT}
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onPrimaryAction={handleSave}
      onSecondaryAction={onClose}
    >
      <div className="mx-20 mt-8 flex flex-col gap-5">
        <div className="flex justify-center">
          {isGenerating ? (
            <div className="flex h-[22rem] w-[22rem] items-center justify-center">
              <Loader />
            </div>
          ) : (
            <ImageForm
              isEditable={isEditable}
              image={currentProject.imageUrl}
              onImageChange={onImageChange}
              onAIGenerateClick={onAiGenerateClick}
            />
          )}
        </div>
        <InputField
          type="text"
          labelValue="작품명"
          isRequired={isEditable}
          maxLength={50}
          isEditable={isEditable}
          value={currentProject.title}
          onChange={(value) => handleInputChange('title', value)}
        />
        <ProjectTagField
          labelValue="분류"
          tagList={CATEGORY_LIST}
          isEditable={isEditable}
          project={currentProject}
          onTagClick={onCategoryTagClick}
          type="category"
        />
        <div className="w-3/4">
          <ProjectTagField
            labelValue="장르"
            tagList={GENRE_LIST}
            isEditable={isEditable}
            project={currentProject}
            onTagClick={onGenreTagClick}
            type="genres"
          />
        </div>
        <TextAreaField
          labelValue="작품 설명"
          isRequired={isEditable}
          maxLength={1000}
          isEditable={isEditable}
          value={currentProject.description || ''}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
    </Modal>
  )
}

export default ProjectModal
