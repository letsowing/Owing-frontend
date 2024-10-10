import { useCallback } from 'react'

import ThemeToggleSwitch from '@components/common/DarkModeToggle'

import { useWorkStore } from '@stores/workStore'

import { useModalManagement } from '@hooks/useModal'
import useNavigation from '@hooks/useNavigation'

import AllScenario from './AllScenario'
import Dashboard from './Dashboard'
import Profile from './Profile'
import QuickAccess from './QuickAccess'
import WorkModal from './modal/ProjectModal'

import { MEMBER } from '@datas/member'
import { PROJECT_LIST } from '@datas/projectList'
import { WORD_COUNT_STATS } from '@datas/wordCountStats'
import { ModalType, Work } from '@types'

const Main = () => {
  const { modals, openModal, closeModal } = useModalManagement()
  const { goToProject } = useNavigation()
  const { setCurrentWork } = useWorkStore()

  const handleMoveWork = useCallback(
    (work: Work) => {
      // Zustand 저장
      setCurrentWork(work)
      // MoveNavigation workId 수정
      goToProject(work.id)
    },
    [goToProject, setCurrentWork],
  )

  const handleCloseModal = useCallback(() => {
    closeModal()
  }, [closeModal])

  const handleSaveWork = useCallback(
    (work: Work) => {
      // axios
      handleMoveWork(work)
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
          <Profile member={MEMBER} />
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
          <QuickAccess handleAddWork={handleAddWork} projects={PROJECT_LIST} />
          <div className="mb-20 mt-16 w-full dark:bg-darkblack">
            <AllScenario projects={PROJECT_LIST} />
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
