import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LoginPage } from './pages/Login'         
import { ActivitiesPage } from './pages/Atividades' 
import { ReportPage } from './pages/Relatorio'      

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App