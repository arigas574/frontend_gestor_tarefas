import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, LogOut } from 'lucide-react'

export function Layout() {
  const navigate = useNavigate()
  const location = useLocation()
  const userName = localStorage.getItem('user_name') || 'Usuário'

  const handleLogout = () => {
    localStorage.removeItem('user_token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_name')
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path ? 'nav-item active' : 'nav-item'

  return (
    <div className="layout">
      <nav className="sidebar">
        <div className="brand">
          <LayoutDashboard size={24} color="#818cf8" />
          <span>Gestor de Tarefas</span>
        </div>
        
        <div style={{ marginBottom: '2rem', fontSize: '0.85rem', color: '#64748b' }}>
          Olá, {userName}
        </div>

        <div className="nav-links">
          <Link to="/activities" className={isActive('/activities')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LayoutDashboard size={18} /> Atividades
            </span>
          </Link>
          <Link to="/report" className={isActive('/report')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} /> Relatório
            </span>
          </Link>
        </div>
        
        <button onClick={handleLogout} className="btn-logout" title="Sair do sistema">
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LogOut size={18} /> Sair
          </span>
        </button>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}