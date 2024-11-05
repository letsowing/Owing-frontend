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
    (path: MenuPath) => {
      setActivePath(path)
      navigate(`/${path}`)
    },
    [navigate, setActivePath],
  )

  const navigationActions = useCallback(
    () => ({
      goToLanding: () => navigate('/'),
      goToMain: () => navigate('/main'),
      goToLogin: () => navigate('/login'),
      goToRegister: () => navigate('/register'),
      goToContactUs: () => navigate('/contactUs'),
      goToStory: (storyId: number) => navigate(`/story/${storyId}`),
      goToProject: (projectId: number) =>
        navigate(`/storyManagement/${projectId}`),
      goToStoryManagement: (projectId: number) =>
        navigate(`/storyManagement/${projectId}`),
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
