import { useCallback, useEffect, useState } from 'react'

import { useMenuStore } from '@stores/menuStore'
import { useProjectStore } from '@stores/projectStore'

import { useModalManagement } from '@hooks/useModal'
import useNavigation from '@hooks/useNavigation'

import AllProjects from './AllProjects'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'
import ProjectModal from './modal/ProjectModal'

import { WORD_COUNT_STATS } from '@datas/wordCountStats'
import { getMember } from '@services/memberService'
import { getAllProjects, postCreateProject } from '@services/projectService'
import { Member, ModalType, Project, ProjectSummary } from '@types'

const initialMember: Member = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  imageUrl: '',
}

const Main = () => {
  const { modals, openModal, closeModal } = useModalManagement()
  const { goToProject } = useNavigation()
  const { setCurrentProject } = useProjectStore()
  const [member, setMember] = useState<Member>(initialMember)
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [sortedProjects, setSortedProjects] = useState<ProjectSummary[]>([])
  const setActivePath = useMenuStore((state) => state.setActivePath)

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const fetchedMember = await getMember(1)
        setMember(fetchedMember)
      } catch (error) {
        console.error('회원 조회 실패', error)
      }
    }
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await getAllProjects('CREATED_AT')
        setProjects(fetchedProjects)
        const sortedProjectsList = await getAllProjects('ACCESSED_AT')
        setSortedProjects(sortedProjectsList)
      } catch (error) {
        console.error('프로젝트 리스트 조회 실패:', error)
      }
    }
    fetchMember()
    fetchProjects()
  }, [])

  const handleMoveProject = useCallback(
    (project: Project) => {
      setCurrentProject(project)
      goToProject(project.id)
      setActivePath('storyManagement')
    },
    [goToProject, setActivePath, setCurrentProject],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleSaveProject = useCallback(
    (project: Project) => {
      const saveProject = async () => {
        try {
          const savedProject = await postCreateProject(
            project.title,
            project.description || '',
            project.category || '',
            project.genres || [],
            project.coverUrl,
          )
          project.id = savedProject.id
          handleMoveProject(project)
        } catch (error) {
          console.error('프로젝트 생성 실패:', error)
        }
      }
      saveProject()
    },
    [handleMoveProject],
  )

  const handleAddProject = useCallback(() => {
    openModal({
      type: ModalType.PROJECT,
      isEditable: true,
      onSave: handleSaveProject,
      onClose: handleCloseModal,
    })
  }, [openModal, handleSaveProject, handleCloseModal])

  return (
    <>
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="mt-6 lg:w-1/4">
            <Profile member={member} />
            <Dashboard
              todayWordCount={WORD_COUNT_STATS.todayWordCount}
              monthTotalWordCount={WORD_COUNT_STATS.monthTotalWordCount}
              monthAvgWordCount={WORD_COUNT_STATS.monthAvgWordCount}
              dailyStats={WORD_COUNT_STATS.dailyStats}
            />
          </div>
          <div className="lg:w-3/4">
            <QuickAccess
              handleAddProject={handleAddProject}
              projects={projects}
              onProjectClick={handleMoveProject}
            />
            <AllProjects
              projects={sortedProjects}
              onProjectClick={handleMoveProject}
            />
          </div>
        </div>
      </div>
      {modals.map((modal, index) => {
        if (modal.type === 'PROJECT') {
          return (
            <ProjectModal
              key={index}
              onSave={handleSaveProject}
              isEditable={true}
              onClose={handleCloseModal}
              type={ModalType.PROJECT}
              project={modal.project}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default Main
