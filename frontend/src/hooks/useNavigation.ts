import { useCallback } from 'react'

import { useMenuStore } from '@stores/menuStore'

import { MenuPath } from '@constants/menu'
import { useNavigate } from 'react-router-dom'

const useNavigation = () => {
  const navigate = useNavigate()
  const { activePath, setActivePath } = useMenuStore(
    useCallback(
      (state) => ({
        activePath: state.activePath,
        setActivePath: state.setActivePath,
      }),
      [],
    ),
  )

  const goTo = useCallback(
    (path: MenuPath, projectId?: number) => {
      setActivePath(path)
      // 리터럴 타입으로 직접 체크
      if (
        projectId !== undefined &&
        (path === 'character' ||
          path === 'scenarioManagement' ||
          path === 'worldView')
      ) {
        navigate(`/${path}/${projectId}`)
      } else {
        navigate(`/${path}`)
      }
    },
    [navigate, setActivePath],
  )

  const navigationActions = useCallback(
    () => ({
      goToMain: () => navigate('/main'),
      goToLogin: () => navigate('/login'),
      goToRegister: () => navigate('/register'),
      goToContactUs: () => navigate('/contactUs'),
      goToCharacterRelationship: () => navigate('/characterRelationship'),
      goToScenarioManagement: () => navigate('/scenarioManagement'),
      goToScenario: (id: number) => navigate(`/scenario/${id}`),
      goToProject: (projectId: number) =>
        navigate(`/scenarioManagement/${projectId}`),
      goToWorldView: (projectId: number) => navigate(`/worldView/${projectId}`),
      goToCharacter: (projectId: number) => navigate(`/character/${projectId}`),
    }),
    [navigate],
  )()

  return {
    goTo,
    ...navigationActions,
    activePath,
    setActivePath,
  }
}

export default useNavigation
