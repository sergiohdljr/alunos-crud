import { Student } from "@/domain/entities/student.ts";

export interface StudentRepository {
    create(student: Student): Promise<Record<string, number>>;
    list({name, cpf, email}: Partial<Student>): Promise<Student[]>;
}
