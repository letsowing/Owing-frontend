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

  const goToProject = (id: number) => {
    navigate(`/scenarioManagement?id=${id}`)
  }

  return {
    goTo,
    goToMain,
    goToLogin,
    goToRegister,
    goToContactUs,
    goToCharacterRelationship,
    goToScenarioManagement,
    goToProject,
    activePath,
    setActivePath,
  }
}

export default useNavigation
