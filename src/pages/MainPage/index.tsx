import { useCallback, useEffect, useState } from 'react'

import useMemberStore from '@stores/memberStore'
import { useMenuStore } from '@stores/menuStore'
import { useProjectStore } from '@stores/projectStore'

import { useModalManagement } from '@hooks/useModal'
import useNavigation from '@hooks/useNavigation'

import AllProjects from './AllProjects'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'
import ProjectModal from './modal/ProjectModal'

import { getAllProjects, postCreateProject } from '@services/projectService'
import { getDailyStats } from '@services/statsService'
import { ModalType, Project, ProjectSummary } from '@types'

const initialMember = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  profileUrl: '',
}

const initialDailyStats = {
  todayCount: 0,
  monthlyCount: 0,
  monthlyAvgCount: 0,
  graph: [
    {
      date: new Date(),
      dailyCount: 0,
    },
  ],
}

const Main = () => {
  const { modals, openModal, closeModal } = useModalManagement()
  const { goToProject } = useNavigation()
  const { setCurrentProject } = useProjectStore()
  const { member } = useMemberStore()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [sortedProjects, setSortedProjects] = useState<ProjectSummary[]>([])
  const [dailyStats, setDailyStats] = useState(initialDailyStats)
  const setActivePath = useMenuStore((state) => state.setActivePath)

  useEffect(() => {
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

    const fetchDailyStats = async () => {
      try {
        const fetchedDailyStats = await getDailyStats()
        setDailyStats(fetchedDailyStats)
      } catch (error) {
        console.error('글자수 통계 데이터 조회 실패:', error)
      }
    }

    fetchProjects()
    fetchDailyStats()
  }, [])

  const handleMoveProject = useCallback(
    (project: Project) => {
      setCurrentProject(project)
      goToProject()
      setActivePath('projectInfo')
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
            project.description,
            project.category,
            project.genres,
            project.coverUrl,
          )
          project.id = savedProject.id
          project.accessedAt = savedProject.accessedAt
          project.createdAt = savedProject.createdAt
          project.updatedAt = savedProject.updatedAt
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
            <Profile member={member || initialMember} />
            <Dashboard
              todayWordCount={dailyStats.todayCount}
              monthTotalWordCount={dailyStats.monthlyCount}
              monthAvgWordCount={dailyStats.monthlyAvgCount}
              dailyStats={dailyStats.graph}
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
