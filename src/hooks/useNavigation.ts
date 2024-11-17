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
      goToProject: () => navigate(`/projectInfo`),
      goToStoryManagement: (projectId: number) =>
        navigate(`/storyManagement/${projectId}`),
      goToCast: () => navigate(`/cast`),
      goToTrash: () => navigate(`/trashCan`),
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
