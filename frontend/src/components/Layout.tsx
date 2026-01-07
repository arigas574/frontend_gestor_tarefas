import { Link, Outlet, useNavigate } from 'react-router-dom'

export function Layout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user_token')
    navigate('/')
  }

  return (
    <div className="layout">
      <nav className="sidebar">
        <h2 className="brand">TimeTracker</h2>
        <div className="nav-links">
          <Link to="/activities" className="nav-item">Atividades</Link>
          <Link to="/report" className="nav-item">Relatório</Link>
        </div>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}