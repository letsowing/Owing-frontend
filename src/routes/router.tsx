import FolderTabLayout from '@layouts/FolderTabLayout'
import HeaderTabLayout from '@layouts/HeaderTabLayout'

import CastPage from '@pages/CastPage'
import CastRelationshipPage from '@pages/CastRelationshipPage'
import ContactUsPage from '@pages/ContactUsPage'
import Landing from '@pages/LandingPage'
import Login from '@pages/LoginPage'
import Main from '@pages/MainPage'
import ProjectInfoPage from '@pages/ProjectInfoPage'
import Register from '@pages/RegisterPage'
import StoryManagementPage from '@pages/StoryManagementPage'
import StoryPage from '@pages/StoryPage'
import TrashCanPage from '@pages/TrashCanPage'
import UniversePage from '@pages/UniversePage'

import App from '@/App'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <HeaderTabLayout />,
        children: [
          {
            index: true,
            element: <Landing />,
          },

          {
            path: 'contactUs',
            element: <ContactUsPage />,
          },
          {
            path: 'castRelationship',
            element: <CastRelationshipPage />,
          },
          {
            path: 'main',
            element: <Main />,
          },
          {
            path: 'projectInfo',
            element: <ProjectInfoPage />,
          },
        ],
      },
      {
        element: <FolderTabLayout />,
        children: [
          {
            path: 'storyManagement/:projectId',
            element: <StoryManagementPage />,
          },
          {
            path: 'cast',
            element: <CastPage />,
          },
          {
            path: 'story/:storyId',
            element: <StoryPage />,
          },
          {
            path: 'universe',
            element: <UniversePage />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'trashCan',
        element: <TrashCanPage />,
      },
    ],
  },
])

export default router
