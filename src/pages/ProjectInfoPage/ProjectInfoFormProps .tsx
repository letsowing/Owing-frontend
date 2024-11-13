import ImageForm from '@components/common/ImageForm'
import InputField from '@components/common/InputField'
import Loader from '@components/common/Loader'
import ProjectTagField from '@components/common/ProjectTagField'
import TextAreaField from '@components/common/TextAreaField'

import { CATEGORY_LIST } from '@constants/categoryList'
import { GENRE_LIST } from '@constants/genreList'
import { Project } from '@types'

interface ProjectInfoFormProps {
  isEditable: boolean
  isGenerating: boolean
  project: Project
  onImageChange: (imageUrl: string) => void
  onAIGenerateClick: () => void
  onInputChange: (field: keyof Project, value: string) => void
  onCategoryTagClick: (value: string) => void
  onGenreTagClick: (value: string) => void
}

const ProjectInfoForm = ({
  isEditable,
  isGenerating,
  project,
  onImageChange,
  onAIGenerateClick,
  onInputChange,
  onCategoryTagClick,
  onGenreTagClick,
}: ProjectInfoFormProps) => {
  return (
    <>
      <div className="flex justify-center">
        <ImageForm
          isEditable={isEditable}
          image={project.coverUrl}
          onImageChange={onImageChange}
          onAIGenerateClick={onAIGenerateClick}
          isGenerating={isGenerating}
        />
      </div>
      <InputField
        type="text"
        labelValue="작품명"
        isRequired={true}
        maxLength={50}
        isEditable={isEditable}
        value={project.title}
        onChange={(value) => onInputChange('title', value)}
      />
      <ProjectTagField
        labelValue="분류"
        tagList={CATEGORY_LIST}
        isEditable={isEditable}
        project={project}
        onTagClick={onCategoryTagClick}
        type="category"
      />
      <div className="w-5/6">
        <ProjectTagField
          labelValue="장르"
          tagList={GENRE_LIST}
          isEditable={isEditable}
          project={project}
          onTagClick={onGenreTagClick}
          type="genres"
        />
      </div>
      <TextAreaField
        labelValue="작품 설명"
        isRequired={true}
        maxLength={1000}
        isEditable={isEditable}
        value={project.description || ''}
        onChange={(value) => onInputChange('description', value)}
      />
    </>
  )
}

export default ProjectInfoForm
