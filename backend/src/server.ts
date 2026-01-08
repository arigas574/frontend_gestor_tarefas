import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
//prisma para comunicar com bd
const prisma = new PrismaClient()

//express comunica com json e cors comunica front e back
app.use(express.json())
app.use(cors())

app.post('/register', async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body
    //verifica se o e-mail existe
    const userExists = await prisma.user.findUnique({ where: { email } })
    if (userExists) {
        //retorna que existe ja
      return res.status(400).json({ error: 'Este e-mail já está em uso.' })
    }
    const user = await prisma.user.create({
      data: { name, email, password }
    })
    return res.json(user)
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar usuário.' })
  }
})

app.post('/login', async (req: any, res: any) => {
  const { email, password } = req.body
  
  // logica de como funciona o email
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return res.status(404).json({ error: 'E-mail não cadastrado. Crie uma conta!' })
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Senha incorreta.' })
  }
  return res.json({ id: user.id, name: user.name })
})

app.get('/activities/:userId', async (req: any, res: any) => {
  const { userId } = req.params
  try {
    const activities = await prisma.activity.findMany({
      where: { userId },
      //atividades mais novas aparecem primeiro
      orderBy: { startDate: 'desc' }
    })
    return res.json(activities)
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao buscar atividades.' })
  }
})

app.post('/activities', async (req: any, res: any) => {
  const { name, startDate, endDate, userId } = req.body
  try {
    const activity = await prisma.activity.create({
      data: {
        name,
        //converte string para data
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        userId
      }
    })
    return res.json(activity)
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar atividade.' })
  }
})

app.delete('/activities/:id', async (req: any, res: any) => {
  const { id } = req.params
  try {
    //seleciona o id para deletar
    await prisma.activity.delete({ where: { id } })
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao deletar atividade.' })
  }
})

const PORT = 3333
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// caso queira visualizar os clientes cadastrados, visualizar pelo npx prisma studio