import { Student } from "@/domain/entities/student.ts";

export interface StudentRepository {
    create(student: Student): Promise<Student>;
    list(): Promise<Student[]>;
}
