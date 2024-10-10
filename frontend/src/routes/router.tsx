import FolderTabLayout from '@layouts/FolderTabLayout'
import HeaderTabLayout from '@layouts/HeaderTabLayout'

import CharacterPage from '@pages/CharacterPage'
import CharacterRelationshipPage from '@pages/CharacterRelationshipPage'
import ContactUsPage from '@pages/ContactUsPage'
import Landing from '@pages/LandingPage'
import Login from '@pages/LoginPage'
import Main from '@pages/MainPage'
import Register from '@pages/RegisterPage'
import ScenarioManagementPage from '@pages/ScenarioManagementPage'
import WorldViewPage from '@pages/WorldViewPage'

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
            element: <WorldViewPage />,
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
    ],
  },
])

export default router
