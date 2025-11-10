import { createServer } from '@/infra/http/server.ts'
import { makeStudentController } from '@/main/factories/make-register-student-controller.ts'
import { studentRoutes } from '@/infra/http/routes/student-routes.ts'
import { apiReference } from '@scalar/express-api-reference'
import { errorHandler } from '@/infra/http/middlewares/error-handling.ts'
import cors from 'cors'

export async function bootstrap() {
  const app = createServer()

  const studentController = makeStudentController()

  app.get('/openapi.json', (req, res) => {
    res.sendFile('openapi.json', { root: '.' })
  })

  app.use(
    '/reference',
    apiReference({
      theme: 'elysiajs',
      title: 'API de Gerenciamento de Alunos',
      url: '/openapi.json',
      metaData: {
        title: 'Alunos API - Documentação',
        description:
          'Documentação interativa da API de gerenciamento de alunos',
        ogDescription: 'API REST para gerenciar alunos com operações CRUD',
      },
      darkMode: true,
      showToolbar: 'never',
      layout: 'modern',
      servers: [
        {
          url: 'http://localhost:3333/api',
          description: 'Servidor de Desenvolvimento',
        },
      ],
    }),
  )

  app.use(cors({ origin: '*' }))
  app.use('/api', studentRoutes(studentController))
  app.use(errorHandler)

  return app
}
