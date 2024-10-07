import HeaderFolderTabLayout from '@layouts/HeaderFolderTabLayout'
import HeaderTabLayout from '@layouts/HeaderTabLayout'

import CharacterRelationshipPage from '@pages/CharacterRelationshipPage'
import Landing from '@pages/LandingPage'
import Login from '@pages/LoginPage'
import Main from '@pages/MainPage'
import Register from '@pages/RegisterPage'
import ScenarioManagementPage from '@pages/ScenarioManagementPage'

import App from '@/App'
import WorldViewTabLayout from '@/layouts/WorldViewTabLayout'
import WorldView from '@/pages/WorldViewPage'
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
            path: 'characterRelationship',
            element: <CharacterRelationshipPage />,
          },
        ],
      },
      {
        element: <HeaderFolderTabLayout />, // 2차탭(폴더탭) 존재
        children: [
          {
            path: 'scenarioManagement',
            element: <ScenarioManagementPage />,
          },
        ],
      },
      {
        element: <WorldViewTabLayout />,
        children: [
          {
            path: 'worldView',
            element: <WorldView />,
          },
        ],
      },
      {
        path: 'main',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])

export default router
