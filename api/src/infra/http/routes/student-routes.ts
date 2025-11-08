import { Router } from "express";
import { StudentController } from "@/infra/http/controllers/student-controller.ts";

export function studentRoutes(controller: StudentController) {
  const router = Router();

  router.post("/students", (req, res, next) => controller.handleRegisterStudent(req, res, next));
  router.get("/students", (req, res, next) => controller.handleListStudents(req, res, next));

  return router;
}
