import { useCallback, useEffect, useState } from 'react'

import ThemeToggleSwitch from '@components/common/DarkModeToggle'

import { useWorkStore } from '@stores/workStore'

import { useModalManagement } from '@hooks/useModal'
import useNavigation from '@hooks/useNavigation'

import AllScenario from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'
import WorkModal from './modal/ProjectModal'

import useMenuStore from '@/stores/menuStore'
import { WORD_COUNT_STATS } from '@datas/wordCountStats'
import { getMember } from '@services/memberService'
import { postCreateWork } from '@services/workService'
import { getAllWork } from '@services/workService'
import { Member, ModalType, Work } from '@types'

const initialMember: Member = {
  id: 0,
  email: '',
  name: '',
  nickname: '',
  imageUrl: '',
}

interface Project {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  imageUrl: string
}

const Main = () => {
  const { modals, openModal, closeModal } = useModalManagement()
  const { goToProject } = useNavigation()
  const { setCurrentWork } = useWorkStore()
  const [member, setMember] = useState<Member>(initialMember)
  const [projects, setProjects] = useState<Project[]>([])
  const [sortedProjects, setSortedProjects] = useState<Project[]>([])
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
        const fetchedProjects = await getAllWork()
        setProjects(fetchedProjects.projects)
        const sortedProjectsList = fetchedProjects.projects.sort(
          (a: Project, b: Project) =>
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

  const handleMoveWork = useCallback(
    (work: Work) => {
      setCurrentWork(work)
      goToProject(work.id)
      setActivePath('scenarioManagement')
    },
    [goToProject, setActivePath, setCurrentWork],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleSaveWork = useCallback(
    (work: Work) => {
      const saveWork = async () => {
        try {
          const savedWork = await postCreateWork(
            work.title,
            work.description || '',
            work.category || '',
            work.genres || [],
            work.imageUrl,
          )
          work.id = savedWork.id
          handleMoveWork(work)
        } catch (error) {
          console.error('프로젝트 생성 실패:', error)
        }
      }
      saveWork()
    },
    [handleMoveWork],
  )

  const handleAddWork = useCallback(() => {
    openModal({
      type: ModalType.WORK,
      isEditable: true,
      onSave: handleSaveWork,
      onClose: handleCloseModal,
    })
  }, [handleCloseModal, handleSaveWork, openModal])

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
            handleAddWork={handleAddWork}
            projects={projects}
            onProjectClick={handleMoveWork}
          />
          <div className="mb-20 mt-16 w-full dark:bg-darkblack">
            <AllScenario
              projects={sortedProjects}
              onProjectClick={handleMoveWork}
            />
          </div>
        </div>
      </div>
      {modals.map((modal, index) => {
        if (modal.type === 'WORK') {
          return (
            <WorkModal
              key={index}
              onSave={handleSaveWork}
              isEditable={true}
              onClose={handleCloseModal}
              type={ModalType.WORK}
              work={modal.work}
            />
          )
        }
        return null
      })}
    </>
  )
}

export default Main
