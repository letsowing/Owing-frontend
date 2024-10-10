import useMenuStore from '@stores/menuStore'

import { MenuPath } from '@constants/menu'
import { useNavigate } from 'react-router-dom'

const useNavigation = () => {
  const navigate = useNavigate()
  const { activePath, setActivePath } = useMenuStore()

  const goTo = (path: MenuPath) => {
    setActivePath(path)
    navigate(path)
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
    activePath,
    setActivePath,
  }
}

export default useNavigation
