import { useCallback, useEffect, useState } from 'react'

import ThemeToggleSwitch from '@components/common/DarkModeToggle'

import { useMenuStore } from '@stores/menuStore'
import { useProjectStore } from '@stores/projectStore'

import { useModalManagement } from '@hooks/useModal'
import useNavigation from '@hooks/useNavigation'

import AllProjects from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'
import ProjectModal from './modal/ProjectModal'

import { WORD_COUNT_STATS } from '@datas/wordCountStats'
import { getMember } from '@services/memberService'
import { postCreateProject } from '@services/projectService'
import { getAllProjects } from '@services/projectService'
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
        const fetchedProjects = await getAllProjects()
        setProjects(fetchedProjects.projects)
        const sortedProjectsList = fetchedProjects.projects.sort(
          (a: ProjectSummary, b: ProjectSummary) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
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
      setActivePath('scenarioManagement')
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
            project.imageUrl,
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
      <div className="mx-[5%] flex w-[90%]">
        <div className="mt-5 flex-col xl:w-[20%] 2xl:w-[25%]">
          <Profile member={member} />
          <div className="my-9">
            <Dashboard
              todayWordCount={WORD_COUNT_STATS.todayWordCount}
              monthTotalWordCount={WORD_COUNT_STATS.monthTotalWordCount}
              monthAvgWordCount={WORD_COUNT_STATS.monthAvgWordCount}
              dailyStats={WORD_COUNT_STATS.dailyStats}
            />
          </div>
          <div className="flex w-[85%] justify-center">
            <ThemeToggleSwitch />
          </div>
        </div>
        <div className="mt-6 flex-col xl:w-[80%] 2xl:w-[75%]">
          <QuickAccess
            handleAddProject={handleAddProject}
            projects={projects}
            onProjectClick={handleMoveProject}
          />
          <div className="mb-20 mt-16 w-full dark:bg-darkblack">
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
