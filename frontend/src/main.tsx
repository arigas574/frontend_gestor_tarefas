import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import { LoginPage } from './pages/Login'
import { Layout } from './components/Layout'
import { ActivitiesPage } from './pages/Atividades'
import { ReportPage } from './pages/Relatorio' 

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/activities",
        element: <ActivitiesPage />
      },
      {
        path: "/report", 
        element: <ReportPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)