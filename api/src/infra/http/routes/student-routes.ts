import { Router } from "express";
import { StudentController } from "@/infra/http/controllers/student-controller.ts";

export function studentRoutes(controller: StudentController) {
  const router = Router();

  router.post("/students", (req, res) => controller.handleRegisterStudent(req, res));
  router.get("/students", (req, res) => controller.handleListStudents(req, res));

  return router;
}
