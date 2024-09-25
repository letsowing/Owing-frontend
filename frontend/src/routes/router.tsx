import App from '@/App'
import HeaderTabLayout from '@/layouts/HeaderTabLayout'
import CharacterRelationshipPage from '@/pages/CharacterRelationshipPage'
import Landing from '@/pages/LandingPage'
import Login from '@/pages/LoginPage'
import Main from '@/pages/MainPage'
import Register from '@/pages/RegisterPage'
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
