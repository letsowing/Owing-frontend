import { useEffect, useState } from 'react'

import { useProjectStore } from '@stores/projectStore'

import useNavigation from '@hooks/useNavigation'

import ProjectInfoBtns from './ProjectInfoBtns'
import ProjectInfoForm from './ProjectInfoFormProps '

import {
  deleteProject,
  getProject,
  postProjectGenerateAiImage,
  putProject,
} from '@services/projectService'
import { Project } from '@types'
import { Loader } from 'lucide-react'

const ProjectInfoPage = () => {
  const { currentProject, setCurrentProject } = useProjectStore()

  const [project, setProject] = useState<Project>(currentProject)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { goToMain } = useNavigation()

  const handleInputChange = (field: keyof Project, value: string) => {
    setProject((prev) => ({ ...prev, [field]: value }))
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true)
        const data = await getProject(currentProject.id)
        setProject(data)
      } catch (error) {
        console.error('프로젝트 조회 실패:', error)
        alert('프로젝트 정보를 불러오는데 실패했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [currentProject.id, setCurrentProject])

  const handleSave = async () => {
    if (
      !project.title.trim() ||
      !project.description.trim() ||
      !project.category ||
      !project.genres.length
    ) {
      alert('필수 항목을 모두 입력해주세요.')
      return
    }

    setIsDisabled(true)
    try {
      const payload = {
        title: project.title,
        description: project.description,
        category: project.category,
        genres: project.genres,
        coverUrl: project.coverUrl || '',
      }

      await putProject(project.id, payload)
      alert('프로젝트가 수정되었습니다.')

      setCurrentProject(project)
    } catch (error) {
      console.error('프로젝트 수정 실패:', error)
      alert('프로젝트 수정에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsDisabled(false)
      setIsEditable(false)
    }
  }

  const handleEdit = () => {
    setIsEditable((prev) => !prev)
  }

  const handleCancel = () => {
    setProject(currentProject)
    setIsEditable(false)
  }

  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말 삭제하시겠습니까?')

    if (isConfirmed) {
      try {
        await deleteProject(project.id)
        alert('프로젝트가 삭제되었습니다.')
        goToMain()
      } catch (error) {
        console.error('프로젝트 삭제 실패:', error)
        alert('프로젝트 삭제에 실패했습니다. 다시 시도해주세요.')
      }
    }
  }

  const onImageChange = (imageUrl: string) => {
    setProject((prev) => ({
      ...prev,
      coverUrl: imageUrl,
    }))
  }

  const onAiGenerateClick = async () => {
    setIsGenerating(true)
    try {
      const data = await postProjectGenerateAiImage(
        project.title,
        project.description || '',
        project.category || '',
        project.genres || [],
      )
      onImageChange(data.imageUrl)
    } catch (error) {
      console.error('AI 이미지 생성 실패', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onCategoryTagClick = (value: string) => {
    setProject((prevProject) => ({
      ...prevProject,
      category: prevProject.category === value ? '' : value,
    }))
  }

  const onGenreTagClick = (value: string) => {
    setProject((prevProject) => {
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

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="mx-20 mt-4 flex flex-col gap-7 overflow-y-auto px-10 scrollbar-hide">
      <ProjectInfoForm
        isEditable={isEditable}
        isGenerating={isGenerating}
        project={project}
        onImageChange={onImageChange}
        onAIGenerateClick={onAiGenerateClick}
        onInputChange={handleInputChange}
        onCategoryTagClick={onCategoryTagClick}
        onGenreTagClick={onGenreTagClick}
      />
      <ProjectInfoBtns
        isEditable={isEditable}
        isDisabled={isDisabled}
        onCancel={handleCancel}
        onSave={handleSave}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ProjectInfoPage
