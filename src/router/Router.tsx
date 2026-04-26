import { createBrowserRouter } from 'react-router-dom'
import { Login } from '../components/pages/Login'
import { HeaderLayout } from '../components/templates/HeaderLayout'
import { StudyRecords } from '../components/pages/StudyRecords'
import { Page404 } from '../components/pages/Page404'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'study-records',
    element: <HeaderLayout />,
    children: [
      {
        index: true,
        element: <StudyRecords />,
      },
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
])
