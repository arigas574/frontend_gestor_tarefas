import { useState } from 'react'
import { Trash2 } from 'lucide-react'

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

  const handleAdd = (e: any) => {
    e.preventDefault()
    
    const newActivity: Activity = {
      id: crypto.randomUUID(),
      name,
      startDate: start,
      endDate: end
    }

    setActivities([...activities, newActivity])
    setName('')
    setStart('')
    setEnd('')
  }

  const handleDelete = (id: string) => {
    setActivities(activities.filter(a => a.id !== id))
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Minhas Atividades</h1>
      </header>

      <section className="card-form">
        <form onSubmit={handleAdd} className="activity-form">
          <div className="input-group">
            <label>Atividade</label>
            <input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ex: Consulta médica" 
              required 
            />
          </div>
          <div className="row">
            <div className="input-group">
              <label>Início</label>
              <input 
                type="datetime-local" 
                value={start} 
                onChange={e => setStart(e.target.value)} 
                required 
              />
            </div>
            <div className="input-group">
              <label>Fim</label>
              <input 
                type="datetime-local" 
                value={end} 
                onChange={e => setEnd(e.target.value)} 
                required 
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">Registrar</button>
        </form>
      </section>

      <section className="activity-list">
        {activities.map(activity => (
          <div key={activity.id} className="activity-item">
            <div className="activity-info">
              <strong>{activity.name}</strong>
              <span>
                {formatDate(activity.startDate)} - {formatDate(activity.endDate)}
              </span>
            </div>
            <button 
              onClick={() => handleDelete(activity.id)} 
              className="btn-icon-danger"
              title="Excluir"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </section>
    </div>
  )
}