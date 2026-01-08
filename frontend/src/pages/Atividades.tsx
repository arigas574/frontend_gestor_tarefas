import { useState, useEffect } from 'react'
import { Trash2, Plus, Calendar, Clock, AlertCircle } from 'lucide-react'

interface Activity {
  id: string
  name: string
  startDate: string
  endDate: string
}

export function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [name, setName] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [loading, setLoading] = useState(false)
  
  const userId = localStorage.getItem('user_id')

  // Buscar dados ao carregar
  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3333/activities/${userId}`)
        .then(res => res.json())
        .then(data => {
            // Garante que é um array, se der erro vem objeto de erro
            if(Array.isArray(data)) setActivities(data)
        })
        .catch(err => console.error("Erro ao buscar:", err))
    }
  }, [userId])

  const handleAdd = async (e: any) => {
    e.preventDefault()
    if (!userId) return alert("Erro: Usuário não identificado. Faça login novamente.")

    setLoading(true)

    try {
      // 1. Converter datas para formato ISO Universal para não dar erro no banco
      const startDateISO = new Date(start).toISOString()
      const endDateISO = new Date(end).toISOString()

      // 2. Enviar requisição
      const response = await fetch('http://localhost:3333/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            userId, 
            name, 
            startDate: startDateISO, 
            endDate: endDateISO 
        })
      })

      const data = await response.json()

      if (!response.ok) throw new Error(data.error || 'Erro ao salvar')

      // 3. Atualizar lista visualmente
      setActivities([...activities, data])
      
      // 4. Limpar formulário
      setName('')
      setStart('')
      setEnd('')

    } catch (error: any) {
      alert(`Falha ao registrar: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Tem certeza que deseja excluir?")) return
    
    try {
      await fetch(`http://localhost:3333/activities/${id}`, { method: 'DELETE' })
      setActivities(activities.filter(a => a.id !== id))
    } catch (error) {
      alert("Erro ao deletar")
    }
  }

  return (
    <div className="page-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>Minhas Atividades</h1>
        <p style={{ color: '#64748b' }}>Informe suas tarefas e registre seu tempo.</p>
      </header>

      <section className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Nova Atividade</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          
          <div className="input-group">
            <label style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Descrição</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Adicione atividades" required />
          </div>

          <div className="input-group">
            <label style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Início</label>
            <input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} required />
          </div>

          <div className="input-group">
            <label style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem', display: 'block' }}>Fim</label>
            <input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} required />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ height: '42px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> {loading ? '...' : 'Registrar'}
          </button>
        </form>
      </section>

      <section className="activity-list">
        {activities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px' }}>
            <AlertCircle size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>Nenhuma atividade registrada ainda.</p>
          </div>
        )}
        
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-info">
              <strong style={{ display: 'block', fontSize: '1.1rem', color: '#334155' }}>{activity.name}</strong>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Calendar size={14} /> {new Date(activity.startDate).toLocaleDateString()}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={14} /> {new Date(activity.startDate).toLocaleTimeString().slice(0,5)} - {new Date(activity.endDate).toLocaleTimeString().slice(0,5)}
                </span>
              </div>
            </div>
            <button onClick={() => handleDelete(activity.id)} className="btn-icon-danger" title="Excluir">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}