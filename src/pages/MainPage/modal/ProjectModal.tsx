import { useEffect, useState } from 'react'

import ImageForm from '@components/common/ImageForm'
import InputField from '@components/common/InputField'
import Modal from '@components/common/Modal'
import ProjectTagField from '@components/common/ProjectTagField'
import TextAreaField from '@components/common/TextAreaField'

import { useConfirm } from '@hooks/useConfirm'

import { CATEGORY_LIST } from '@constants/categoryList'
import { GENRE_LIST } from '@constants/genreList'
import { postProjectGenerateAiImage } from '@services/projectService'
import { ModalType, Project, ProjectModalProps } from '@types'

const initialProject: Project = {
  id: 0,
  title: '',
  genres: [],
  category: '',
  description: '',
  coverUrl: '',
}

const ProjectModal = ({
  isEditable,
  project,
  onSave,
  onClose,
}: ProjectModalProps) => {
  const { confirmAIImageGeneration } = useConfirm()
  const [projectInput, setProjectInput] = useState<Project>(initialProject)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    if (project) {
      setProjectInput(project)
    } else {
      setProjectInput(initialProject)
    }
  }, [project])

  const isFormValid = () => {
    return !!(
      projectInput.title.trim() &&
      projectInput.genres.length &&
      projectInput?.category &&
      projectInput.description.trim()
    )
  }

  const handleInputChange = (field: keyof Project, value: string) => {
    setProjectInput((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave(projectInput)
    onClose()
  }

  const onImageChange = (coverUrl: string) => {
    setProjectInput((prev) => ({
      ...prev,
      coverUrl: coverUrl,
    }))
  }

  const onAiGenerateClick = async () => {
    const isConfirmed = await confirmAIImageGeneration()
    if (!isConfirmed) {
      return
    }
    setIsGenerating(true)
    try {
      const data = await postProjectGenerateAiImage(
        projectInput.title,
        projectInput.description || '',
        projectInput.category || '',
        projectInput.genres || [],
      )
      onImageChange(data.imageUrl)
    } catch (error) {
      console.error('AI 이미지 생성 실패', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onCategoryTagClick = (value: string) => {
    setProjectInput((prevProject) => ({
      ...prevProject,
      category: prevProject.category === value ? '' : value,
    }))
  }

  const onGenreTagClick = (value: string) => {
    setProjectInput((prevProject) => {
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
  }

  return (
    <Modal
      modalType={ModalType.PROJECT}
      isValid={isFormValid()}
      primaryButtonText="저장"
      secondaryButtonText="취소"
      onPrimaryAction={handleSave}
      onSecondaryAction={onClose}
    >
      <div className="mx-20 mt-8 flex flex-col gap-7">
        <div className="flex justify-center">
          <ImageForm
            isEditable={isEditable}
            image={projectInput.coverUrl}
            onImageChange={onImageChange}
            onAIGenerateClick={onAiGenerateClick}
            isGenerating={isGenerating}
          />
        </div>
        <InputField
          type="text"
          labelValue="작품명"
          isRequired={isEditable}
          maxLength={50}
          isEditable={isEditable}
          value={projectInput.title}
          onChange={(value) => handleInputChange('title', value)}
        />
        <ProjectTagField
          labelValue="분류"
          tagList={CATEGORY_LIST}
          isEditable={isEditable}
          project={projectInput}
          onTagClick={onCategoryTagClick}
          type="category"
        />
        <ProjectTagField
          labelValue="장르"
          tagList={GENRE_LIST}
          isEditable={isEditable}
          project={projectInput}
          onTagClick={onGenreTagClick}
          type="genres"
        />
        <TextAreaField
          labelValue="작품 설명"
          isRequired={isEditable}
          maxLength={5000}
          isEditable={isEditable}
          value={projectInput.description || ''}
          onChange={(value) => handleInputChange('description', value)}
        />
      </div>
    </Modal>
  )
}

export default ProjectModal
