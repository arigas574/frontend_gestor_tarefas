import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, User, ArrowRight, Loader2 } from 'lucide-react'

export function LoginPage() {
  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Estados separados para Login e Cadastro
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const toggleMode = () => {
    setIsRegister(!isRegister)
    setError('') // Limpa erros anteriores ao trocar de tela
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const endpoint = isRegister ? '/register' : '/login'
    
    // Seleciona o payload correto baseado na tela atual
    const payload = isRegister ? registerData : loginData

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const response = await fetch(`http://localhost:3333${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Erro na requisição')

      if (isRegister) {
        alert('Conta criada com sucesso! Faça login.')
        // Opcional: Limpar formulário de cadastro após sucesso
        setRegisterData({ name: '', email: '', password: '' })
        setIsRegister(false)
      } else {
        localStorage.setItem('user_id', data.id)
        localStorage.setItem('user_name', data.name)
        navigate('/activities')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <header className="login-header">
          <h2>{isRegister ? 'Crie sua conta' : 'Bem-vindo'}</h2>
          <p>{isRegister ? 'Preencha os dados para começar' : 'Insira suas credenciais para acessar'}</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {error && <div style={{ color: '#b91c1c', fontSize: '0.9rem', background: '#fef2f2', padding: '0.75rem', borderRadius: '6px', border: '1px solid #fecaca', textAlign: 'center' }}>{error}</div>}

          {isRegister ? (
            // --- CAMPOS DE CADASTRO ---
            <>
              <div className="input-group">
                <label style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>Nome</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    name="name"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Seu nome completo"
                    value={registerData.name} 
                    onChange={handleRegisterChange} 
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>E-mail</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    name="email"
                    type="email" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="exemplo@email.com"
                    value={registerData.email} 
                    onChange={handleRegisterChange} 
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>Senha</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    name="password"
                    type="password" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Crie uma senha forte"
                    value={registerData.password} 
                    onChange={handleRegisterChange} 
                    required 
                  />
                </div>
              </div>
            </>
          ) : (
            // --- CAMPOS DE LOGIN ---
            <>
              <div className="input-group">
                <label style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>E-mail</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    name="email"
                    type="email" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="exemplo@email.com"
                    value={loginData.email} 
                    onChange={handleLoginChange} 
                    required 
                  />
                </div>
              </div>

              <div className="input-group">
                <label style={{ fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>Senha</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} />
                  <input 
                    name="password"
                    type="password" 
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Sua senha"
                    value={loginData.password} 
                    onChange={handleLoginChange} 
                    required 
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn-primary" disabled={isLoading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                {isRegister ? 'Criar Conta' : 'Entrar'}
                {!isRegister && <ArrowRight size={18} />}
              </>
            )}
          </button>
        </form>

        <div className="toggle-text" onClick={toggleMode}>
          {isRegister ? 'Já tem uma conta? Faça Login' : 'Não tem conta? Crie uma agora'}
        </div>
      </div>
    </div>
  )
}