import { StudentRepository } from "@/application/repositories/student-repository-interface.ts";
import { Student } from "@/domain/entities/student.ts";

export class InMemoryRepository implements StudentRepository {
    constructor(private readonly students: Student[] = []) {}
    
    async create(student: Student): Promise<Record<string, number>> {
        const newStudent = {...student, id: this.students.length + 1};
        this.students.push(newStudent);
        return {id: newStudent.id};
    }
    
    async list(student: Partial<Student>): Promise<Student[]> {
        return this.students.filter((s) => {
            const matchesName = !student.name || s.name === student.name;
            const matchesEmail = !student.email || s.email === student.email;
            const matchesCpf = !student.cpf || s.cpf === student.cpf;
            
            return matchesName && matchesEmail && matchesCpf;
        });
    }
}