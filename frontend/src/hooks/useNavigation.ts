import useMenuStore from '@stores/menuStore'

import { MenuPath } from '@constants/menu'
import { useNavigate } from 'react-router-dom'

const useNavigation = () => {
  const navigate = useNavigate()
  const { activePath, setActivePath } = useMenuStore()

  const goTo = (path: MenuPath, projectId?: number) => {
    setActivePath(path)
    if (
      projectId !== undefined &&
      ['character', 'scenarioManagement', 'worldView'].includes(path)
    ) {
      navigate(`/${path}/${projectId}`)
    } else {
      navigate(`/${path}`)
    }
  }

  const goToMain = () => {
    navigate('/main')
  }

  const goToLogin = () => {
    navigate('/login')
  }

  const goToRegister = () => {
    navigate('/register')
  }
  const goToContactUs = () => {
    navigate('/contactUs')
  }

  const goToCharacterRelationship = () => {
    navigate('/characterRelationship')
  }

  const goToScenarioManagement = () => {
    navigate('/scenarioManagement')
  }

  const goToScenario = (id: number) => {
    navigate(`/scenario/${id}`)
  }

  const goToProject = (projectId: number) => {
    navigate(`/scenarioManagement/${projectId}`)
  }

  const goToWorldView = (projectId: number) => {
    navigate(`/worldView/${projectId}`)
  }

  const goToCharacter = (projectId: number) => {
    navigate(`/character/${projectId}`)
  }

  return {
    goTo,
    goToMain,
    goToLogin,
    goToRegister,
    goToContactUs,
    goToCharacterRelationship,
    goToScenarioManagement,
    goToScenario,
    goToProject,
    goToWorldView,
    goToCharacter,
    activePath,
    setActivePath,
  }
}

export default useNavigation
