import { createServer } from "@/infra/http/server.ts";
import { makeRegisterStudentController } from "@/main/factories/make-register-student-controller.ts";
import { studentRoutes } from "@/infra/http/routes/student-routes.ts";

export async function bootstrap() {
  const app = createServer();

  const registerStudentController = makeRegisterStudentController();

  app.use("/api", studentRoutes(registerStudentController));

  return app;
}
