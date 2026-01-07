import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    localStorage.setItem('user_token', 'demo-token')
    navigate('/activities')
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Cadastro'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Nome</label>
              <input type="text" required />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" required />
          </div>
          <button type="submit" className="btn-primary">
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <button 
          className="btn-link" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Criar nova conta' : 'Já tenho conta'}
        </button>
      </div>
    </div>
  )
}