import HeaderTabLayout from '@layouts/HeaderTabLayout'

import CharacterPage from '@pages/CharacterPage'
import CharacterRelationshipPage from '@pages/CharacterRelationshipPage'
import Landing from '@pages/LandingPage'
import Login from '@pages/LoginPage'
import Main from '@pages/MainPage'
import Register from '@pages/RegisterPage'
import ScenarioManagementPage from '@pages/ScenarioManagementPage'

import App from '@/App'
import FolderTabLayout from '@/layouts/FolderTabLayout'
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
          {
            path: 'main',
            element: <Main />,
          },
        ],
      },
      {
        element: <FolderTabLayout />,
        children: [
          {
            path: 'scenarioManagement',
            element: <ScenarioManagementPage />,
          },
          {
            path: 'character',
            element: <CharacterPage />,
          },
          {
            path: 'worldView',
            element: <WorldView />,
          },
        ],
      },
      // {
      //   element: <FolderTabLayout />,
      //   children: [
      //     {
      //       path: 'worldView',
      //       element: <WorldView />,
      //     },
      //   ],
      // },

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
