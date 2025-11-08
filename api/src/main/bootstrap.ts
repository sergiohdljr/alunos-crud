import { createServer } from "@/infra/http/server.ts";
import { makeRegisterStudentController } from "@/main/factories/make-register-student-controller.ts";
import { studentRoutes } from "@/infra/http/routes/student-routes.ts";
import { apiReference } from "@scalar/express-api-reference";

export async function bootstrap() {
  const app = createServer();

  const registerStudentController = makeRegisterStudentController();

  app.get('/openapi.json', (req, res) => {
    res.sendFile('openapi.json', { root: '.' });
  });

  app.use(
    '/reference',
    apiReference({
      title: 'API de Gerenciamento de Alunos',
      url: '/openapi.json',
      metaData: {
        title: 'Alunos API - Documentação',
        description: 'Documentação interativa da API de gerenciamento de alunos',
        ogDescription: 'API REST para gerenciar alunos com operações CRUD',
      },
      darkMode: false,
      layout: 'modern',
      servers: [
        {
          url: 'http://localhost:3333/api',
          description: 'Servidor de Desenvolvimento',
        },
      ],
    }),
  )

  app.use("/api", studentRoutes(registerStudentController));

  return app;
}
