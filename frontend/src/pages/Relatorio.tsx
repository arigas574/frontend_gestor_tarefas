import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface Activity {
  id: string
  name: string
  startDate: string
  endDate: string
}

export function ReportPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const userId = localStorage.getItem('user_id')

  useEffect(() => {
    if (userId) {
      fetch(`https://frontend-gestor-tarefas.onrender.com${userId}`)
        .then(res => res.json())
        .then(data => {
             if(Array.isArray(data)) setActivities(data)
        })
    }
  }, [userId])

  // calcula a diferença de horas
  const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime()
    const endTime = new Date(end).getTime()
    const diffMs = endTime - startTime
    
    // conversao de milisegundos para horas
    const hours = diffMs / (1000 * 60 * 60)
    return hours.toFixed(2) 
  }

  // calcula total
  const totalHours = activities.reduce((acc, curr) => {
    return acc + parseFloat(calculateDuration(curr.startDate, curr.endDate))
  }, 0).toFixed(2)

  return (
    <div className="page-container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1e293b' }}>Relatório de Horas</h1>
        <p style={{ color: '#64748b' }}>Resumo de produtividade e tempo gasto.</p>
      </header>

      <div className="card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', borderColor: '#818cf8', background: '#e0e7ff' }}>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '50%', color: '#4f46e5' }}>
            <Clock size={32} />
        </div>
        <div>
            <span style={{ display: 'block', fontSize: '0.9rem', color: '#4338ca', fontWeight: 600 }}>TEMPO TOTAL REGISTRADO</span>
            <strong style={{ fontSize: '2rem', color: '#312e81' }}>{totalHours} horas</strong>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>DATA</th>
              <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>ATIVIDADE</th>
              <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>HORÁRIO</th>
              <th style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748b' }}>DURAÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
                <tr>
                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                        Sem dados para o relatório.
                    </td>
                </tr>
            ) : (
                activities.map(act => (
                <tr key={act.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', color: '#334155' }}>
                        {new Date(act.startDate).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>
                        {act.name}
                    </td>
                    <td style={{ padding: '1rem', color: '#64748b', fontSize: '0.9rem' }}>
                        {new Date(act.startDate).toLocaleTimeString().slice(0,5)} - {new Date(act.endDate).toLocaleTimeString().slice(0,5)}
                    </td>
                    <td style={{ padding: '1rem', color: '#4f46e5', fontWeight: 600 }}>
                        {calculateDuration(act.startDate, act.endDate)} h
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}