interface Activity {
  id: string
  name: string
  startDate: string
  endDate: string
}

const MOCK_DATA: Activity[] = [
  { id: '1', name: 'Consulta', startDate: '2022-01-05T09:00', endDate: '2022-01-05T09:30' }, 
  { id: '2', name: 'Almoço', startDate: '2022-01-05T12:00', endDate: '2022-01-05T13:30' },   
  { id: '3', name: 'Reunião', startDate: '2022-01-06T13:00', endDate: '2022-01-06T14:00' },  
  { id: '4', name: 'Visita', startDate: '2022-01-06T16:00', endDate: '2022-01-06T18:30' },   
]

export function ReportPage() {
  
  const processReport = (data: Activity[]) => {
    const reportMap = new Map<string, number>()

    data.forEach(activity => {
      const start = new Date(activity.startDate)
      const end = new Date(activity.endDate)
      const dateKey = start.toLocaleDateString('pt-BR')
      
      const diffMs = end.getTime() - start.getTime()
      const diffHours = diffMs / (1000 * 60 * 60)

      const currentTotal = reportMap.get(dateKey) || 0
      reportMap.set(dateKey, currentTotal + diffHours)
    })

    return Array.from(reportMap.entries())
  }

  const reportData = processReport(MOCK_DATA)

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Relatório de Horas</h1>
      </header>

      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Dia</th>
              <th className="text-right">Tempo Total</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map(([date, hours]) => (
              <tr key={date}>
                <td>{date}</td>
                <td className="text-right">
                  {hours.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 1 })}hrs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}